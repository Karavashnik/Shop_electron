import {Injectable} from '@angular/core';
import {DbService} from './db-service';
import {SaleModel} from '../models/sale.model';
import {DatePipe} from '@angular/common';
import {MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs';
import {FieldInfo} from 'mysql';

@Injectable()
export class SalesService {
  constructor(private readonly db: DbService, private datePipe: DatePipe) {

  }
  getSales(table: MatTableDataSource<SaleModel>): Observable<{results?: SaleModel[], fields?: FieldInfo[]}> {
    const sql = `select s.Id, s.SaleDate, s.Price, s.Count, p.Description
                from sales as s join products as p on s.ProductId = p.Id
                Order by ${table.sort.active} ${table.sort.direction}
                Limit ${table.paginator.pageSize * table.paginator.pageIndex}, ${table.paginator.pageSize}`;
    return this.db.queryObservable(sql);
  }
  insertSale(sale: SaleModel): void {
    const sql = `insert into sales (Price, ProductId, SaleDate, Count)
     values ('${sale.NewPrice}', '${sale.Product.Id}',
     '${this.datePipe.transform(Date.now(), 'yyyy-MM-dd H:m:s') }', '${sale.Count}')`;
    this.db.query(sql);
  }
  updateSale(sale: SaleModel): void {
    const sql = `update sales
     set Price = '${sale.NewPrice}', Count  = '${sale.Count}',
     SaleDate = '${this.datePipe.transform(Date.now(), 'yyyy-MM-dd H:m:s') }', ProductId = '${sale.Product.Id}'
     where sales.Id = ${sale.Id}`;
    this.db.query(sql);
  }
  deleteSale(sale: SaleModel): void {
    const sql = `delete from sales where sale.Id = ${sale.Id}`;
    this.db.query(sql);
  }

  getTotalCount(): Observable<{results?: any[], fields?: FieldInfo[]}> {
    const sql = `select Count(*) as count from sales;`;
    return this.db.queryObservable(sql);
  }
}
