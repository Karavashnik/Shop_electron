import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {SaleModel} from '../../models/sale.model';
import {TableParams} from '../../models/table-params';

@Component({
  selector: 'app-current-sale',
  templateUrl: './current-sale.component.html',
  styleUrls: ['./current-sale.component.css']
})
export class CurrentSaleComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Description', 'Price', 'DiscountPrice', 'Count', 'TotalPrice'];
  sales: TableParams<SaleModel>;
  constructor() {
    this.sales = new TableParams<SaleModel>();
  }

  ngOnInit() {
  }
  increaseCount(element: SaleModel) {
    element.Count++;
  }
  decreaseCount(element: SaleModel) {
    element.Count--;
  }
  getTotalSaleCost(element: SaleModel): number {
    return element.DiscountPrice ? element.DiscountPrice * element.Count : element.Product.Price * element.Count;
  }
  getTotalCount(): number {
    return this.sales.data.map(t => t.Count).reduce((acc, value) => acc + value, 0);
  }
  getTotalCost(): number {
    let totalCost;
    for (let sale of this.sales.data) {
      totalCost += this.getTotalSaleCost(sale);
    }
    return totalCost;
  }


}
