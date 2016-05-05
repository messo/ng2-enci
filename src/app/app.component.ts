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
    const currentVersions = {
      'gynd': 1,
      'gytort': 1,
      'gyuszt': 1,
      'biof': 1
    };

    var toLoad = 4;

    console.log("size of database before: " + this.appState.remainingTasks.length);

    for (const group in currentVersions) {
      if (!currentVersions.hasOwnProperty(group)) {
        continue;
      }

      if (currentVersions[group] > this.appState.versions[group]) {
        if (this.appState.versions[group] == 0) {
          this.database.getData(group)
            .subscribe(
              data => {
                toLoad--;
                console.log(group + ": " + data.length);
                this.appState.remainingTasks = this.appState.remainingTasks.concat(data);
                this.appState.versions[group] = currentVersions[group];
                if (toLoad == 0) {
                  this.onLoadFinished();
                }
              }
            );
        } else {
          toLoad--;
          console.error("Upgrade not yet supported!");
        }
      } else {
        toLoad--;
      }
    }

    if (toLoad == 0) {
      this.onLoadFinished();
    }
  }

  onLoadFinished() {
    this.appState.loading = false;
    console.log("size of database after: " + this.appState.remainingTasks.length);
    if(this.appState.currentTask == null) {
      this.appState.nextTask();
    }
  }

}
