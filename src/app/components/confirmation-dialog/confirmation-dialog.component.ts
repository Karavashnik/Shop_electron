import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit, OnDestroy {

  public confirmMessage: string;

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>, private ref: ChangeDetectorRef) {

  }

  ngOnInit() {

  }
  ngOnDestroy() {
  }

}
