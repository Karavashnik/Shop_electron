import { Component, OnInit, ViewChild } from '@angular/core';
import {ProductsComponent} from '../products/products.component';
import {CurrentSaleComponent} from '../current-sale/current-sale.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  @ViewChild('appProducts') appProducts: ProductsComponent;
  @ViewChild('appCurrentSale') appCurrentSale: CurrentSaleComponent;

  constructor() { }

  ngOnInit() {
    this.appProducts.onAddToCard.subscribe(sale => {
      this.appCurrentSale.sales.data.push(sale);
      //this.appCurrentSale.refresh();
    });
  }

}
