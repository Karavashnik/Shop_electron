import {ProductsModel} from './products.model';

export class SaleModel {
  constructor(product: ProductsModel, count: number){
    this.Product = product;
    this.Count = count;
  }
  Product: ProductsModel;
  DiscountPrice: number;
  Count: number;
}
