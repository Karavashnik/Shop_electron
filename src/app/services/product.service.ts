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

  getProducts(table: MatTableDataSource<ProductsModel>, filters: Filters):
    Observable<{results?: ProductsModel[], fields?: FieldInfo[]}> {
    const sql = `select p.Id as Id, p.Description, p.Price, pr.Description as ProviderDescription, pr.Color, p.ProviderId
                from products as p join providers as pr on p.ProviderId = pr.Id
                where p.Id like '%${filters.Id ? filters.Id : ''}%' and
                      p.Description like '%${filters.Description ? filters.Description : ''}%' and
                      p.Price ${ filters.Price ? filters.SelectedPriceRange === PriceRange.Equally ? '=' + filters.Price :
      filters.SelectedPriceRange === PriceRange.More ? '>=' + filters.Price :
        filters.SelectedPriceRange === PriceRange.Less ? '<=' + filters.Price : '' : 'like "%"' } and
                      pr.Description like '%${filters.ProviderDescription ? filters.ProviderDescription : ''}%'
                Order by ${table.sort.active} ${table.sort.direction}
                Limit ${table.paginator.pageSize * table.paginator.pageIndex}, ${table.paginator.pageSize}`;
    console.log(sql);
    return this.db.queryObservable(sql);
  }
  updateProduct(product: ProductsModel): void {
    const sql = `update products
     set Description = '${product.Description}', Price = '${product.Price}', ProviderId = '${product.Provider.Id}'
     where products.Id = ${product.Id}`;
    this.db.query(sql);
  }
  insertProduct(product: ProductsModel): void {
    const sql = `insert into products (Description, Price, ProviderId)
     values ('${product.Description}', '${product.Price}', '${product.Provider.Id}')`;
    this.db.query(sql);
  }
  deleteProduct(product: ProductsModel): void {
    const sql = `delete from products where products.Id = ${product.Id}`;
    this.db.query(sql);
  }

  getTotalCount(filters: Filters): Observable<{results?: any[], fields?: FieldInfo[]}> {
    const sql = `select Count(p.Id) as count from products as p join providers as pr on p.ProviderId = pr.Id
                where p.Id like '%${filters.Id ? filters.Id : ''}%' and
                      p.Description like '%${filters.Description ? filters.Description : ''}%' and
                      p.Price ${ filters.Price ? filters.SelectedPriceRange === PriceRange.Equally ? '=' + filters.Price :
      filters.SelectedPriceRange === PriceRange.More ? '>=' + filters.Price :
        filters.SelectedPriceRange === PriceRange.Less ? '<=' + filters.Price : '' : 'like "%"' } and
                      pr.Description like '%${filters.ProviderDescription ? filters.ProviderDescription : ''}%'`;
    console.log(sql);
    return this.db.queryObservable(sql);
  }
}
