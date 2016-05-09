import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()
export class Database {

  constructor(public http:Http) {
  }

  getData(group:string, version:number) {
    return this.http.get('/assets/' + group + '-' + version + '.json')
      .map(res => res.json());
  }

}
