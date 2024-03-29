import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DiscountType, SaleModel} from '../../models/sale.model';
import {MatTableDataSource} from '@angular/material';
import {ProductService} from '../../services/product.service';
import {SalesService} from '../../services/sales.service';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-current-sale',
  templateUrl: './current-sale.component.html',
  styleUrls: ['./current-sale.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class CurrentSaleComponent implements OnInit {

  DiscountType: typeof DiscountType = DiscountType;

  displayedColumns: string[] = ['Id', 'Description', 'Price', 'DiscountPrice', 'Count', 'TotalPrice'];
  sales: MatTableDataSource<SaleModel>;

  constructor(private readonly salesService: SalesService) {
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
  removeSell(element: SaleModel) {
    this.sales.data = this.sales.data.filter(sale => sale !== element );
  }
  sellProducts() {
    this.sales.data.forEach( sale => this.salesService.insertSale(sale));
    this.sales.data = [];
  }


}

