import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SalesComponent } from './components/sales/sales.component';
import { AppRoutingModule } from './app-routing.module';
import {MatPaginatorIntlCro} from './overide/custom-paginator';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import {
  MatToolbarModule, MatTableModule,
  MatPaginatorModule, MatPaginatorIntl,
  MatSortModule, MatGridListModule, MatInputModule, MatCheckboxModule, MatButtonModule, MatIconModule, MatDialogModule
} from '@angular/material';
import { CurrentSaleComponent } from './components/current-sale/current-sale.component';
import { ProductsComponent } from './components/products/products.component';
import {DbService} from './services/db-service';
import {ProductService} from './services/product.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProvidersComponent } from './components/providers/providers.component';
import { ProvidersFormComponent } from './components/providers-form/providers-form.component';
import {ProvidersService} from './services/providers.service';
import { ColorCircleModule } from 'ngx-color/circle';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    SalesComponent,
    MainLayoutComponent,
    CurrentSaleComponent,
    ProductsComponent,
    ProductFormComponent,
    ProvidersComponent,
    ProvidersFormComponent,
    ConfirmationDialogComponent
  ],
  entryComponents: [
    ProductFormComponent,
    ProvidersFormComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    MatDialogModule,
    ColorCircleModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  exports: [
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    MatDialogModule,
    ColorCircleModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro},
    DbService,
    ProductService,
    ProvidersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
