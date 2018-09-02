import {ProvidersModel} from './providers.model';

export class ProductsModel {
  Id: number;
  Description: string;
  Price: number;
  //Color: string;
  Provider: ProvidersModel;
}
