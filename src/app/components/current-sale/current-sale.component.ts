import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {SaleModel} from '../../models/sale.model';
import {TableParams} from '../../models/table-params';

@Component({
  selector: 'app-current-sale',
  templateUrl: './current-sale.component.html',
  styleUrls: ['./current-sale.component.css']
})
export class CurrentSaleComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Description', 'Price', 'DiscountPrice', 'Count', 'TotalPrice'];
  sales: TableParams<SaleModel>;
  //sales = new Array<SaleModel>();
  constructor(private changeDetectorRefs: ChangeDetectorRef) {
    this.sales = new TableParams<SaleModel>();
  }

  ngOnInit() {
  }
  refresh() {
    this.changeDetectorRefs.detectChanges();
  }
  increaseCount(element: SaleModel){
    element.Count++;
  }
  decreaseCount(element: SaleModel){
    element.Count--;
  }


}
