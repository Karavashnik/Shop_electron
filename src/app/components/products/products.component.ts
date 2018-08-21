import { Component, OnInit, EventEmitter } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {TableParams} from '../../models/table-params';
import {ProductsModel} from '../../models/products.model';
import {Sort} from '@angular/material/sort/typings/sort';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['№', 'Id', 'Description', 'Price', 'ProviderDescription'];
  table: TableParams<ProductsModel>;
  onAddToCard = new EventEmitter<ProductsModel>();
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
    this.prodService.getProducts(this.table).subscribe(
      (data) => {
        console.log(data.results);
        this.table.data = data.results;
      },
      (error) => {console.log('(error) error: ' + error); },
      () => {console.log('(complete)'); });
  }

  onPaginationChange(){
    this.getProducts();
  }

sortData(event: Sort) {
    if (event.active === '№' || event.direction === '') { return; }
    this.table.direction = event.direction;
    this.table.orderBy = event.active;
    this.getProducts();
}

addToCard(prouct: ProductsModel) {
   this.onAddToCard.emit(prouct);
}

}
