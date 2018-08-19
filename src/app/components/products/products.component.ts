import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {TableParams} from '../../models/table-params';
import {ProductsModel} from '../../models/products.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Description', 'Price', 'ProviderDescription'];
  table: TableParams<ProductsModel>;
  constructor(private readonly prodService: ProductService) {
    this.table = new TableParams<ProductsModel>()
    this.getTotalCount();
    this.getProducts();
  }

  ngOnInit() {
  }

  getTotalCount () {
    this.prodService.getTotalCount().subscribe(
      (data) => {
        this.table.totalCount = data.results[0].count;
      },
      (error) => {console.log('(error) error: ' + error); },
      () => {console.log('(complete)'); });
  }

  getProducts() {
    this.prodService.getProducts().subscribe(
      (data) => {
        console.log(data.results);
        this.table.data = data.results;
      },
      (error) => {console.log('(error) error: ' + error); },
      () => {console.log('(complete)'); });
  }

}
