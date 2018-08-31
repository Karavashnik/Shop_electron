import {Component, OnInit, ViewChild} from '@angular/core';
import {ProvidersService} from '../../services/providers.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ProvidersModel} from '../../models/providers.model';
import {ProvidersFormComponent} from '../providers-form/providers-form.component';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['Id', 'Description', 'Address', 'Phone', 'Edit'];
  table: MatTableDataSource<ProvidersModel>;

  constructor(private readonly providersService: ProvidersService, public dialog: MatDialog) { }

  ngOnInit() {
    this.table = new MatTableDataSource<ProvidersModel>();
    this.setPageSizeOptions();
    this.getTotalCount();
    this.getProviders();
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
      () => {console.log('(complete)'); });
    this.table._updateChangeSubscription();
  }
  sortData(event: MatSort) {
    this.table.sort.direction = event.direction;
    this.table.sort.active = event.active;
    this.getProviders();
  }
  openDialog(provider: ProvidersModel): void {
    const dialogRef = this.dialog.open(ProvidersFormComponent, {
      width: '80%',
      data: provider
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

}
