import {ProductsModel} from './products.model';

export class SaleModel {
  constructor(product: ProductsModel, count: number) {
    this.Product = product;
    this.Count = count;
    this.resetDiscounts();
    this.DiscountType = DiscountType.Percent;
  }
  Product: ProductsModel;
  Id: number;
  SaleDate: Date;
  private _count: number = null;
  private _discountPercent: number = null;
  private _discountPrice: number = null;
  private _newPrice: number = null;

  DiscountType: DiscountType = null;

  get Count(): number {
    return this._count;
  }
  set Count(value: number) {
    if (value > 0) { this._count = value; } else { this._count = 1; }
  }

  get DiscountPercent(): number {
    return this._discountPercent;
  }
  set DiscountPercent(value: number) {
    if (value > 0 && value <= 100) {
      this._discountPercent = value;
      this.setDiscounts();
    }
  }

  get DiscountPrice(): number {
    return this._discountPrice;
  }
  set DiscountPrice(value: number) {
    if (value > 0 && value <= this.Product.Price) {
      this._discountPrice = value;
      this.setDiscounts();
    }
  }

  get NewPrice(): number {
    return this._newPrice;
  }
  set NewPrice(value: number) {
    if (value > 0 && value < this.Product.Price) {
      this._newPrice = value;
      this.setDiscounts();
    }
  }

  private setDiscounts(): void {
    if (this.DiscountType === DiscountType.Percent) {
      this._discountPrice = (this.Product.Price * this._discountPercent) / 100;
      this._newPrice = this.Product.Price - this._discountPrice;
    }
    if (this.DiscountType === DiscountType.Discount) {
      this._discountPercent = (this._discountPrice / this.Product.Price) * 100;
      this._newPrice = this.Product.Price - this._discountPrice;
    }
    if (this.DiscountType === DiscountType.NewPrice) {
      this._discountPrice = this.Product.Price - this._newPrice;
      this._discountPercent = (this._discountPrice / this.Product.Price) * 100;
    }
  }
  private resetDiscounts(): void {
    this._discountPercent = 0;
    this._newPrice = this.Product.Price;
    this._discountPrice = 0;
  }
}
export enum DiscountType {
  Percent = '%',
  NewPrice = '=',
  Discount = '-'
}
