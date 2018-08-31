import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ProductsModel} from '../../models/products.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product: ProductsModel;
  constructor(public dialogRef: MatDialogRef<ProductFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ProductsModel) {
    this.product = data;
  }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
