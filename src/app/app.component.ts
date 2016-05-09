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

  constructor(public appState:AppState, public database:Database, storageService:LocalStorageService) {
  }

  ngOnInit() {
    const currentVersions = {
      'biof': 1,
      'gyhat': 1,
      'gykem': 1,
      'gymb': 1,
      'gynd': 2,
      'gytech': 1,
      'gytort': 1,
      'gyuszt': 2,
      'tgk': 1
    };

    const changes = {
      'gynd/2': ['GYND - 6.155'],
      'gyuszt/2': ['GYÜSZT - 9.21']
    };

    let toLoad = 9;

    console.log("size of database before: " + this.appState.remainingTasks.length);

    for (const group in currentVersions) {
      if (!currentVersions.hasOwnProperty(group)) {
        continue;
      }

      if (currentVersions[group] > this.appState.versions[group] || (typeof this.appState.versions[group] === 'undefined')) {
        if (typeof this.appState.versions[group] === 'undefined') {
          this.appState.versions[group] = 0;
        }

        this.database.getData(group, this.appState.versions[group] + 1)
          .subscribe(
            data => {
              toLoad--;
              if (this.appState.versions[group] == 0) {
                console.log(group + ": " + data.length);
                this.appState.remainingTasks = this.appState.remainingTasks.concat(data);
                this.appState.versions[group] = 1;
              } else if (this.appState.versions[group] + 1 == currentVersions[group]) {
                const upgrades = changes[group + '/' + currentVersions[group]];
                for (let i = 0; i < upgrades.length; i++) {
                  const taskId = upgrades[i];
                  let newTask = null;
                  for (let j = 0; j < data.length; j++) {
                    if (data[j].id == taskId) {
                      newTask = data[j];
                      break;
                    }
                  }

                  if (newTask == null) {
                    alert('Task cannot be found: ' + taskId);
                    continue;
                  }

                  console.log('Updating ' + taskId + ' with ', newTask);
                  let updated = false;
                  for (let j = 0; j < this.appState.remainingTasks.length; j++) {
                    if (this.appState.remainingTasks[j].id == newTask.id) {
                      console.log("remaining update: " + newTask.id);
                      this.appState.remainingTasks[j] = newTask;
                      updated = true;
                      break;
                    }
                  }

                  if (updated) {
                    break;
                  }

                  for (let j = 0; j < this.appState.solvedTasks.length; j++) {
                    if (this.appState.solvedTasks[j].task.id == newTask.id) {
                      console.log("solved update: " + newTask.id);
                      this.appState.solvedTasks.splice(j, 1);
                      this.appState.remainingTasks.unshift(newTask);
                      updated = true;
                      break;
                    }
                  }

                  if (!updated) {
                    alert('Nem sikerült a frissítés: ' + newTask.id);
                  }
                }

                this.appState.versions[group] += 1;
              }

              if (toLoad == 0) {
                this.onLoadFinished();
              }
            }
          );
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
    if (this.appState.currentTask == null) {
      this.appState.nextTask();
    }
  }

}
