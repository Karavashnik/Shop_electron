import {Component, OnInit, EventEmitter, ViewChild, ChangeDetectorRef} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ProductsModel} from '../../models/products.model';
import {SaleModel} from '../../models/sale.model';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Filters, PriceRange} from '../../models/filters';
import {ProductFormComponent} from '../product-form/product-form.component';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit  {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  PriceRange: typeof PriceRange = PriceRange;

  displayedColumns: string[] = ['№', 'Id', 'Description', 'Price', 'ProviderDescription', 'Edit'];
  displayedFilterColumns: string[] =
    ['Sell-filter', 'No-filter', 'Description-filter', 'Price-filter', 'ProviderDescription-filter', 'Edit-filter'];
  table: MatTableDataSource<ProductsModel>;
  filters: Filters;
  onAddToCard = new EventEmitter<SaleModel>();

  constructor(private readonly productsService: ProductService, public dialog: MatDialog,
              private changeDetectorRefs: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.table = new MatTableDataSource<ProductsModel>();
    this.setPageSizeOptions();
    this.filters = new Filters();
    this.getTotalCount();
    this.getProducts();
  }

  getTotalCount () {
    this.productsService.getTotalCount(this.filters).subscribe(
      (data) => {
        this.table.paginator.length = data.results[0].count;
      },
      (error) => {console.log('(error) error: ' + error); },
      () => {console.log('(complete)'); });
  }

  getProducts() {
    this.productsService.getProducts(this.table, this.filters).subscribe(
      (data) => {
        this.table.data = data.results;
      },
      (error) => {console.log('(error) error: ' + error); },
      () => {console.log('(complete)'); this.changeDetectorRefs.detectChanges(); });
  }

  onPaginationChange() {
    this.getProducts();
  }
  setPageSizeOptions() {
    this.paginator.pageIndex = 0;
    this.paginator.length = 100;
    this.paginator.pageSize = 50;
    this.paginator.pageSizeOptions = [10, 25, 50, 75, 100];
    this.sort.active = 'Id';
    this.sort.direction = 'desc';
    this.table.paginator = this.paginator;
    this.table.sort = this.sort;
  }

  sortData(event: MatSort) {
      if (event.active === '№' || event.direction === '') { return; }
      this.table.sort.direction = event.direction;
      this.table.sort.active = event.active;
      this.getProducts();
  }
  filterData() {
    this.productsService.getProducts(this.table, this.filters).subscribe(
      (data) => {
        this.table.data = data.results;
      }, (error) => {console.log('(error) error: ' + error); },
      () => {console.log('(complete)'); });
    this.filters.isFiltering = true;
    this.table._updateChangeSubscription();
  }
  removeFilterData() {
    //this.isFiltering = false;
  }
  openDialog(product: ProductsModel): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '80%',
      disableClose: true,
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }
  deleteProduct(product: ProductsModel): void {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '40%',
      disableClose: false
    });
    dialogRef.componentInstance.confirmMessage = 'Вы действительно хотите удалить товар?';

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productsService.deleteProduct(product);
      }
      dialogRef = null;
    });
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
    if (value <= 0 || value == null) { value = 1; }
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

