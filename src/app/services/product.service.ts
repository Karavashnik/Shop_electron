import {Injectable} from '@angular/core';
import {DbService} from './db-service';
import {Observable} from 'rxjs';
import {FieldInfo} from 'mysql';
import {ProductsModel} from '../models/products.model';
import {MatTableDataSource} from '@angular/material';
import {Filters, PriceRange} from '../models/filters';

@Injectable()
export class ProductService {
  constructor(private readonly db: DbService) {
  }

  getProducts(table: MatTableDataSource<ProductsModel>): Observable<{results?: ProductsModel[], fields?: FieldInfo[]}> {
    const sql = `select p.Id as Id, p.Description, p.Price, pr.Description as ProviderDescription, pr.Color from products as p
                join providers as pr on p.ProviderId = pr.Id
                where p.Description like '%%' and pr.Description like '%%' and p.Price like "%"
                Order by ${table.sort.active} ${table.sort.direction}
                Limit ${table.paginator.pageSize * table.paginator.pageIndex}, ${table.paginator.pageSize}`;
    return this.db.queryObservable(sql);
  }
  getFilterProducts(table: MatTableDataSource<ProductsModel>, filters: Filters):
                      Observable<{results?: ProductsModel[], fields?: FieldInfo[]}> {
    const sql = `select p.Id as Id, p.Description, p.Price, pr.Description as ProviderDescription, pr.Color from products as p
                join providers as pr on p.ProviderId = pr.Id
                where p.Id like '%${filters.Id ? filters.Id : ''}%' and
                      p.Description like '%${filters.Description ? filters.Description : ''}%' and
                      pr.Description like '%${filters.ProviderDescription ? filters.ProviderDescription : ''}%'
                      and p.Price ${ filters.Price ? filters.SelectedPriceRange === PriceRange.Equally ? '=' + filters.Price :
        filters.SelectedPriceRange === PriceRange.More ? '>=' + filters.Price :
        filters.SelectedPriceRange === PriceRange.Less ? '<=' + filters.Price : '' : 'like "%"' }
                Order by ${table.sort.active} ${table.sort.direction}
                Limit ${table.paginator.pageSize * table.paginator.pageIndex}, ${table.paginator.pageSize}`;
    return this.db.queryObservable(sql);
  }

  getTotalCount(): Observable<{results?: any[], fields?: FieldInfo[]}> {
    const sql = `select Count(*) as count from products;`;
    return this.db.queryObservable(sql);
  }
}
