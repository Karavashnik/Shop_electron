import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ProvidersModel} from '../../models/providers.model';
import {ColorEvent} from 'ngx-color';
import {ProvidersService} from '../../services/providers.service';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-providers-form',
  templateUrl: './providers-form.component.html',
  styleUrls: ['./providers-form.component.css']
})
export class ProvidersFormComponent implements OnInit {

  DatabaseOperation: typeof DatabaseOperation = DatabaseOperation;
  colors = ['#4D4D4D', '#999999', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF',
    '#FDA1FF', '#333333', '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400', '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF',
    '#FA28FF', '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00', '#808900', '#194D33', '#0C797D', '#0062B1', '#653294',
    '#AB149E'];
  provider: ProvidersModel;
  dbOperation: DatabaseOperation;


  constructor( public dialogRef: MatDialogRef<ProvidersFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ProvidersModel,
               public providersService: ProvidersService,
               public dialog: MatDialog) {
    if (data === null) {
      this.provider = new ProvidersModel();
      this.dbOperation = DatabaseOperation.insert;
    } else {
      this.provider = data;
      this.dbOperation = DatabaseOperation.update;
    }
  }

  ngOnInit() {
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  changeColor($event: ColorEvent): void {
    this.provider.Color = $event.color.hex;
  }
  saveProvider() {
    if (this.dbOperation === DatabaseOperation.update) {
      this.providersService.updateProvider(this.provider);
    } else if (this.dbOperation === DatabaseOperation.insert) {
      this.providersService.insertProvider(this.provider);
    }
    this.closeDialog();
  }
  deleteProvider() {
    let confirmDialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '40%',
      disableClose: false
    });
    confirmDialogRef.componentInstance.confirmMessage = 'Вы действительно хотите удалить поставщика?';

    confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.providersService.deleteProvider(this.provider);
        this.closeDialog();
      }
      confirmDialogRef = null;
    });
  }
  cancelChanges() {
    this.closeDialog();
  }

}
export enum DatabaseOperation {
  insert,
  update,
  delete
}
