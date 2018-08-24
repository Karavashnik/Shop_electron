import {Injectable} from '@angular/core';
import {ProductsModel} from '../models/products.model';
import {Observable} from 'rxjs';
import {SaleModel} from '../models/sale.model';
import {ProductService} from './product.service';

@Injectable()
export class SalesService {
  Sales: Observable<SaleModel>;
  constructor(products: ProductService){

  }
}
