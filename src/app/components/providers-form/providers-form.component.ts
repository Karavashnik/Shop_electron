import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ProvidersModel} from '../../models/providers.model';
import {ColorEvent} from 'ngx-color';

@Component({
  selector: 'app-providers-form',
  templateUrl: './providers-form.component.html',
  styleUrls: ['./providers-form.component.css']
})
export class ProvidersFormComponent implements OnInit {

  provider: ProvidersModel;
  constructor(public dialogRef: MatDialogRef<ProvidersFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ProvidersModel) {
    if (data === null) { this.provider = new ProvidersModel(); } else {
      this.provider = data;
    }
  }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  changeComplete($event: ColorEvent): void {
    this.provider.Color = $event.color.hex;
  }
  saveProvider(){

  }

}
