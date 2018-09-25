import {Injectable} from '@angular/core';
import {DbService} from './db-service';
import {SaleModel} from '../models/sale.model';
import {DatePipe} from '@angular/common';

@Injectable()
export class SalesService {
  constructor(private readonly db: DbService, private datePipe: DatePipe) {

  }
  insertSale(sale: SaleModel): void {
    const sql = `insert into sales (Price, ProductId, SaleDate, Count)
     values ('${sale.NewPrice}', '${sale.Product.Id}', '${this.datePipe.transform(Date.now(), 'yyyy-MM-dd H:m:s') }', '${sale.Count}')`;
    this.db.query(sql);
  }
}
