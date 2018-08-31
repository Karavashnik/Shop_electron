export class Filters{
  isFiltering: boolean;
  Id: number;
  Description: string;
  Price: number;
  ProviderDescription: string;
  SelectedPriceRange: PriceRange  = PriceRange.Equally;
}
export enum PriceRange {
  Equally = '=',
  Less = '<',
  More = '>',
}
