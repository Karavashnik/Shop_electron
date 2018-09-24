import {ChangeDetectorRef, Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {ProvidersService} from '../../services/providers.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ProvidersModel} from '../../models/providers.model';
import {ProvidersFormComponent} from '../providers-form/providers-form.component';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit, OnChanges {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['Id', 'Description', 'Address', 'Phone', 'Edit'];
  table: MatTableDataSource<ProvidersModel>;

  constructor(private readonly providersService: ProvidersService, public dialog: MatDialog,
              private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.table = new MatTableDataSource<ProvidersModel>();
    this.setPageSizeOptions();
    this.getTotalCount();
    this.getProviders();
  }
  ngOnChanges() {}

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
  onPaginationChange() {
    this.getProviders();
  }
  getTotalCount () {
    this.providersService.getTotalCount().subscribe(
      (data) => {
        this.table.paginator.length = data.results[0].count;
      },
      (error) => {console.log('(error) error: ' + error); },
      () => {console.log('(complete)'); });
  }

  getProviders() {
    this.providersService.getProviders(this.table).subscribe(
      (data) => {
        console.log(data.results);
        this.table.data = data.results;
      },
      (error) => {console.log('(error) error: ' + error); },
      () => {console.log('(complete)');
        this.table._updateChangeSubscription();
        //this.changeDetectorRefs.detectChanges();
      });
  }
  sortData(event: MatSort) {
    this.table.sort.direction = event.direction;
    this.table.sort.active = event.active;
    this.getProviders();
  }
  openDialog(provider: ProvidersModel): void {
    const dialogRef = this.dialog.open(ProvidersFormComponent, {
      width: '80%',
      disableClose: true,
      data: provider
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProviders();
    });
  }
  deleteProvider(provider: ProvidersModel): void {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '40%',
      disableClose: false
    });
    dialogRef.componentInstance.confirmMessage = 'Вы действительно хотите удалить поставщика?';

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.providersService.deleteProvider(provider);
        this.getProviders();
      }
      dialogRef = null;
    });
  }

}
