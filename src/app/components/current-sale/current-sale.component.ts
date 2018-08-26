import {Component, OnInit, ViewChild} from '@angular/core';
import {DiscountType, SaleModel} from '../../models/sale.model';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-current-sale',
  templateUrl: './current-sale.component.html',
  styleUrls: ['./current-sale.component.css']
})

export class CurrentSaleComponent implements OnInit {

  DiscountType: typeof DiscountType = DiscountType;

  displayedColumns: string[] = ['Id', 'Description', 'Price', 'DiscountPrice', 'Count', 'TotalPrice'];
  sales: MatTableDataSource<SaleModel>;

  constructor() {
    this.sales = new MatTableDataSource<SaleModel>();

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
    return element.NewPrice * element.Count;
  }
  getTotalCount(): number {
    return this.sales.data.map(t => t.Count).reduce((acc, value) => acc + value, 0);
  }
  getTotalCost(): number {
    let totalCost = 0;
    for (const sale of this.sales.data) {
      totalCost += this.getTotalSaleCost(sale);
    }
    return totalCost;
  }
}

