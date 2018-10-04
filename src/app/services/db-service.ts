import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { Connection, MysqlError, FieldInfo } from 'mysql';
const mysql = (window as any).require('mysql');

@Injectable()
export class DbService {
  connection: Connection;

  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'werewolf2012',
      database: 'shopmanagment'
    });
    this.connection.connect((err) => {
      if (err) {
        console.log('error connecting', err);
      }
    });
  }

  queryObservable(queryString: string, values?: Array<any>): Observable<{results?: Array<any>, fields?: FieldInfo[]}> {
    return Observable.create(observer => {
      this.connection.query (queryString, values, (err: MysqlError, results?: any, fields?: FieldInfo[]) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next ({results: results, fields: fields});
        }
        observer.complete();
      });
    });
  }
  query(queryString: string, values?: Array<any>) {
      this.connection.query (queryString, values);
  }

}
