import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ProductsModel} from '../../models/products.model';
import {DatabaseOperation} from '../providers-form/providers-form.component';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {ProductService} from '../../services/product.service';
import {ProvidersService} from '../../services/providers.service';
import {ProvidersModel} from '../../models/providers.model';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  DatabaseOperation: typeof DatabaseOperation = DatabaseOperation;
  // todo Create formControl to validate required fields
  requiredControl = new FormControl('', [Validators.required]);

  product: ProductsModel;
  dbOperation: DatabaseOperation;
  providers: Array<ProvidersModel> = new Array<ProvidersModel>();
  constructor(public dialogRef: MatDialogRef<ProductFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ProductsModel,
              public productsService: ProductService,
              public providersService: ProvidersService,
              public dialog: MatDialog) {
    if (data === null) {
      this.product = new ProductsModel();
      this.dbOperation = DatabaseOperation.insert;
    } else {
      this.product = data;
      this.dbOperation = DatabaseOperation.update;
    }
  }

  ngOnInit() {
    this.providersService.getAllProviders().subscribe( providers => this.providers = providers.results as Array<ProvidersModel>);
  }

  saveProduct() {
    if (this.dbOperation === DatabaseOperation.update) {
      this.productsService.updateProduct(this.product);
    } else if (this.dbOperation === DatabaseOperation.insert) {
      this.productsService.insertProduct(this.product);
    }
    this.closeDialog();
  }
  deleteProduct() {
    let confirmDialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '40%',
      disableClose: false
    });
    confirmDialogRef.componentInstance.confirmMessage = 'Вы действительно хотите удалить товар?';

    confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productsService.deleteProduct(this.product);
        this.closeDialog();
      }
      confirmDialogRef = null;
    });
  }
  cancelChanges() {
    this.closeDialog();
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

}
