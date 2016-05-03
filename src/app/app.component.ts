import {Component, ViewEncapsulation} from 'angular2/core';
import {RouteConfig} from 'angular2/router';
import {AppState} from './app.service';
import {RouterActive} from './router-active';
import {Database} from './database';
import {Quiz} from './quiz';
import {LocalStorageService} from 'angular2-localstorage/LocalStorageEmitter';
import {History, Recent} from "./history";

@Component({
  selector: 'app',
  pipes: [],
  providers: [Database, LocalStorageService],
  directives: [],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('normalize.css'),
    require('./app.css')
  ],
  template: require('./app.html')
})
@RouteConfig([
  {path: '/', name: 'Quiz', component: Quiz, useAsDefault: true},
  {path: '/history', name: 'History', component: History},
  {path: '/recent', name: 'Recent', component: Recent}
])
export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';

  constructor(public appState: AppState, public database: Database, storageService: LocalStorageService) {
  }

  ngOnInit() {
    if (this.appState.currentTask == null) {
      this.database.getData()
        .subscribe(
          data => {
            this.appState.remainingTasks = data;
            this.appState.nextTask();
            this.appState.loading = false;
          }
        );
    } else {
      this.appState.loading = false;
    }

  }

}
