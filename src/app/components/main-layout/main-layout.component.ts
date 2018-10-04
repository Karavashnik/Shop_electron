import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ProductsComponent} from '../products/products.component';
import {CurrentSaleComponent} from '../current-sale/current-sale.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  @ViewChild('appProducts') appProducts: ProductsComponent;
  @ViewChild('appCurrentSale') appCurrentSale: CurrentSaleComponent;

  constructor(private  changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    setInterval(() => {
      // require view to be updated
      this.changeDetectorRefs.markForCheck();
    }, 500);
    this.appProducts.onAddToCard.subscribe(sale => {
      const findSale = this.appCurrentSale.sales.data.find(find =>  find.Product.Id === sale.Product.Id);
      if (findSale) {
        findSale.Count += sale.Count;
      } else {
        this.appCurrentSale.sales.data.push(sale);
      }
      this.appCurrentSale.sales._updateChangeSubscription();
    });
  }

}
