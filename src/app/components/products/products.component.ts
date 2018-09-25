import {Component, EventEmitter, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ProductsModel} from '../../models/products.model';
import {SaleModel} from '../../models/sale.model';
import {MatDialog, MatPaginator, MatSort, MatTable, MatTableDataSource} from '@angular/material';
import {Filters, PriceRange} from '../../models/filters';
import {ProductFormComponent} from '../product-form/product-form.component';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, AfterViewInit  {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ProductsModel>;
  PriceRange: typeof PriceRange = PriceRange;

  displayedColumns: string[] = ['№', 'Id', 'Description', 'Price', 'ProviderDescription', 'Edit'];
  displayedFilterColumns: string[] =
    ['Sell-filter', 'No-filter', 'Description-filter', 'Price-filter', 'ProviderDescription-filter', 'Edit-filter'];
  tableDataSource: MatTableDataSource<ProductsModel>;
  filters: Filters;
  onAddToCard = new EventEmitter<SaleModel>();
  isLoadingResults = true;

  constructor(private readonly productsService: ProductService, public dialog: MatDialog,
              private  changeDetectorRefs: ChangeDetectorRef) {
  }

  ngOnInit() {
    console.log(this.table);
    this.tableDataSource = new MatTableDataSource<ProductsModel>();
    //this.table = new MatTableDataSource<ProductsModel>();
    this.setPageSizeOptions();
    this.filters = new Filters();
    this.getTotalCount();
    this.getProducts();
  }
  ngAfterViewInit() {
    setInterval(() => {
      // require view to be updated
      this.changeDetectorRefs.markForCheck();
    }, 500);
  }

  getTotalCount () {
    this.productsService.getTotalCount(this.filters).subscribe(
      (data) => {
        this.paginator.length = data.results[0].count;
      },
      (error) => {console.log('(error) error: ' + error); },
      () => {console.log('(complete)'); });
  }

  getProducts() {
    this.isLoadingResults = true;
    this.productsService.getProducts(this.tableDataSource, this.filters).subscribe(
      (data) => {
        this.tableDataSource.data = data.results;
      },
      (error) => {console.log('(error) error: ' + error); },
      () => {console.log('(complete)');
        this.refresh();
        this.isLoadingResults = false;
      });
  }
  refresh() {
    this.table.renderRows();
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
    this.tableDataSource.paginator = this.paginator;
    this.tableDataSource.sort = this.sort;
  }

  sortData(event: MatSort) {
      if (event.active === '№' || event.direction === '') { return; }
      this.sort.direction = event.direction;
      this.sort.active = event.active;
      this.getProducts();
  }
  openDialog(product: ProductsModel): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '80%',
      disableClose: true,
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getProducts();
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
        this.getProducts();
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

