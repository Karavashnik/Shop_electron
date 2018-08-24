import {Component, OnInit, EventEmitter} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {TableParams} from '../../models/table-params';
import {ProductsModel} from '../../models/products.model';
import {Sort} from '@angular/material/sort/typings/sort';
import {SaleModel} from '../../models/sale.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit  {
  displayedColumns: string[] = ['№', 'Id', 'Description', 'Price', 'ProviderDescription'];
  table: TableParams<ProductsModel>;
  filteredTable: TableParams<ProductsModel>;
  onAddToCard = new EventEmitter<SaleModel>();
  isFiltering: boolean;
  idFilter: number = null;
  descriptionFilter: string = null;
  priceFilter: number = null;
  providerDescriptionFilter: string = null;
  selectedPriceRange: Direction  = Direction.Equally;

  constructor(private readonly productsService: ProductService) {
    this.table = new TableParams<ProductsModel>();
    this.filteredTable = new TableParams<ProductsModel>();

    this.getTotalCount();
    this.getProducts();
  }

  ngOnInit() {

  }

  getTotalCount () {
    this.productsService.getTotalCount().subscribe(
      (data) => {
        this.table.totalCount = data.results[0].count;
      },
      (error) => {console.log('(error) error: ' + error); },
      () => {console.log('(complete)'); });
  }

  getProducts() {
    this.productsService.getProducts(this.table).subscribe(
      (data) => {
        console.log(data.results);
        this.table.data = data.results;
      },
      (error) => {console.log('(error) error: ' + error); },
      () => {console.log('(complete)'); });
  }

  onPaginationChange() {
    this.getProducts();
  }

  sortData(event: Sort) {
      if (event.active === '№' || event.direction === '') { return; }
      this.table.direction = event.direction;
      this.table.orderBy = event.active;
      this.getProducts();
  }
  filterData() {
    this.filteredTable.data = this.table.data;
    if (this.idFilter) { this.filteredTable.data = this.table.data.filter(product => product.Id === this.idFilter); }
    if (this.descriptionFilter) { this.filteredTable.data = this.filteredTable.data.filter( product =>
      product.Description.toLowerCase().indexOf(this.descriptionFilter.toLowerCase()) !== -1); }
    if (this.priceFilter) { this.filteredTable.data = this.filteredTable.data.filter( product =>
       this.selectedPriceRange === Direction.Equally ? product.Price === this.priceFilter :
       this.selectedPriceRange === Direction.Less ? product.Price <= this.priceFilter :
       product.Price >= this.priceFilter); }
    if (this.providerDescriptionFilter) {
       this.filteredTable.data = this.filteredTable.data.filter(product =>
       product.ProviderDescription.toLowerCase().indexOf(this.providerDescriptionFilter.toLowerCase()) !== -1);
    }
    this.isFiltering = true;
  }
  removeFilterData(){
    this.isFiltering = false;
  }

  addToCard(product: ProductsModel, count: number) {
    const sale: SaleModel = new SaleModel(product, count);
    this.onAddToCard.emit(sale);
  }
  getInputValueById(id: number): number {
    let value = parseInt((<HTMLInputElement>document.getElementById('product-count-' + id)).value, 10);
    if (value <= 0 || value == null) {
      value = 1;
      this.setInputValueById(id, value);
    }
    return value;
  }
  setInputValueById(id: number, value: number): void {
    if (value <= 0 || value == null) { value = 1;}
    (<HTMLInputElement>document.getElementById('product-count-' + id)).value = String(value);
  }
  increaseCount(id: number): void {
    let value = this.getInputValueById(id);
    value++;
    this.setInputValueById(id, value);
  }
  decreaseCount(id: number): void {
    let value = this.getInputValueById(id);
    value--;
    this.setInputValueById(id, value);
  }
}
enum Direction {
  Equally = '=',
  Less = '<',
  More = '>',
}
