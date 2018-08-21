import {Injectable} from '@angular/core';
import {DbService} from './db-service';
import {Observable} from 'rxjs';
import {FieldInfo} from 'mysql';
import {ProductsModel} from '../models/products.model';
import {TableParams} from '../models/table-params';

@Injectable()
export class ProductService {
  constructor(private readonly db: DbService) {
  }

  getProducts(table: TableParams<ProductsModel>): Observable<{results?: ProductsModel[], fields?: FieldInfo[]}> {
    const sql = `select p.Id as Id, p.Description, p.Price, pr.Description as ProviderDescription, pr.Color from products as p
                join providers as pr on p.ProviderId = pr.Id
                where p.Description like '%%' and pr.Description like '%%' and p.Price like "%"
                Order by ${table.orderBy} ${table.direction}
                Limit ${table.perPage * table.page}, ${table.perPage}`;
    return this.db.queryObservable(sql);
  }

  getTotalCount(): Observable<{results?: any[], fields?: FieldInfo[]}> {
    const sql = `select Count(*) as count from products;`;
    return this.db.queryObservable(sql);
  }
}
