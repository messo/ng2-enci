import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()
export class Database {

  constructor(public http: Http) {
  }

  getData(group: string) {
    return this.http.get('/assets/' + group + '.json')
      .map(res => res.json());
  }

}
