import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from './components/main-layout/main-layout.component';
import {SalesComponent} from './components/sales/sales.component';
import {ProvidersComponent} from './components/providers/providers.component';

const routes: Routes = [
  { path: '', component: MainLayoutComponent},
  { path: 'providers', component: ProvidersComponent},
  { path: 'sales', component: SalesComponent}
];

// @ts-ignore
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
