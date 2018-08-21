import { Component, OnInit } from '@angular/core';
import {ProductsModel} from '../../models/products.model';

@Component({
  selector: 'app-current-sale',
  templateUrl: './current-sale.component.html',
  styleUrls: ['./current-sale.component.css']
})
export class CurrentSaleComponent implements OnInit {
  products = new Array<ProductsModel>();
  constructor() { }

  ngOnInit() {
  }

}
