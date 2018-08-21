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
  MatSortModule, MatGridListModule, MatInputModule, MatCheckboxModule, MatButtonModule
} from '@angular/material';
import { CurrentSaleComponent } from './components/current-sale/current-sale.component';
import { ProductsComponent } from './components/products/products.component';
import {DbService} from './services/db-service';
import {ProductService} from './services/product.service';

@NgModule({
  declarations: [
    AppComponent,
    SalesComponent,
    MainLayoutComponent,
    CurrentSaleComponent,
    ProductsComponent
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
    MatButtonModule
  ],
  exports: [
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro},
    DbService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
