import {Injectable} from '@angular/core';
import {DbService} from './db-service';
import {Observable} from 'rxjs';
import {FieldInfo} from 'mysql';
import {MatTableDataSource} from '@angular/material';
import {ProvidersModel} from '../models/providers.model';

@Injectable()
export class ProvidersService {
  constructor(private readonly db: DbService) {
  }

  getProviders(table: MatTableDataSource<ProvidersModel>): Observable<{results?: ProvidersModel[], fields?: FieldInfo[]}> {
    const sql = `select pr.Id, pr.Description, pr.Color, pr.Address, pr.Phone
                from providers as pr
                Order by ${table.sort.active} ${table.sort.direction}
                Limit ${table.paginator.pageSize * table.paginator.pageIndex}, ${table.paginator.pageSize}`;
    return this.db.queryObservable(sql);
  }

  getTotalCount(): Observable<{results?: any[], fields?: FieldInfo[]}> {
    const sql = `select Count(*) as count from providers;`;
    return this.db.queryObservable(sql);
  }
}
