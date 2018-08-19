export class TableParams<T> {
  page = 0;
  totalCount = 100;
  perPage = 50;
  perPageOption = [10, 25, 50, 75, 100];
  orderBy = 'Id';
  direction = 'DESC';
  data: T[] = new Array<T>();
}
