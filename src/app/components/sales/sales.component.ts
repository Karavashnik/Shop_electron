import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ProvidersFormComponent} from '../providers-form/providers-form.component';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {SalesService} from '../../services/sales.service';
import {SaleModel} from '../../models/sale.model';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['SaleDate', 'Id', 'Description', 'Count', 'Price'];
  table: MatTableDataSource<SaleModel>;
  isLoadingResults = true;

  constructor(private readonly salesService: SalesService, public dialog: MatDialog) { }

  ngOnInit() {
    this.table = new MatTableDataSource<SaleModel>();
    this.setPageSizeOptions();
    this.getTotalCount();
    this.getSales();
  }

  setPageSizeOptions() {
    this.paginator.pageIndex = 0;
    this.paginator.length = 100;
    this.paginator.pageSize = 50;
    this.paginator.pageSizeOptions = [10, 25, 50, 75, 100];
    this.sort.active = 'SaleDate';
    this.sort.direction = 'desc';
    this.table.paginator = this.paginator;
    this.table.sort = this.sort;
  }
  onPaginationChange() {
    this.getSales();
  }
  getTotalCount () {
    this.salesService.getTotalCount().subscribe(
      (data) => {
        this.table.paginator.length = data.results[0].count;
      },
      (error) => {console.log('(error) error: ' + error); },
      () => {console.log('(complete)'); });
  }

  getSales() {
    this.isLoadingResults = true;
    this.salesService.getSales(this.table).subscribe(
      (data) => {
        console.log(data.results);
        this.table.data = data.results;
      },
      (error) => {console.log('(error) error: ' + error); },
      () => {console.log('(complete)');
        this.isLoadingResults = false;
      });
  }
  sortData(event: MatSort) {
    this.table.sort.direction = event.direction;
    this.table.sort.active = event.active;
    this.getSales();
  }
  openDialog(sale: SaleModel): void {
    const dialogRef = this.dialog.open(ProvidersFormComponent, {
      width: '80%',
      disableClose: true,
      data: sale
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getSales();
    });
  }
  deleteProvider(sale: SaleModel): void {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '40%',
      disableClose: false
    });
    dialogRef.componentInstance.confirmMessage = 'Вы действительно хотите удалить покупку?';

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.salesService.deleteSale(sale);
        this.getSales();
      }
      dialogRef = null;
    });
  }

}
