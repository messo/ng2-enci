import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()
export class Database {

  constructor(public http: Http) {
  }

  getData() {
    return this.http.get('/assets/gynd.json')
      .map(res => res.json());
  }

}
