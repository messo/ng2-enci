import { Component, ViewEncapsulation } from 'angular2/core';
import { RouteConfig } from 'angular2/router';
import { AppState } from './app.service';
import { Database } from './database';
import { Quiz, AnsweredTask } from './quiz';
import { LocalStorageService } from 'angular2-localstorage/LocalStorageEmitter';
import { History, Mistakes } from './history';
import { Task } from './model';

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
  {path: '/mistakes', name: 'Mistakes', component: Mistakes}
])
export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';
  currentVersions = {
    'biof': 1,
    'gyhat': 1,
    'gykem': 3,
    'gymb': 1,
    'gynd': 3,
    'gytech': 1,
    'gytort': 1,
    'gyuszt': 2,
    'tgk': 1
  };

  constructor(public appState: AppState, public database: Database, storageService: LocalStorageService) {
  }

  ngOnInit() {
    const changes = {
      'gynd/2': ['GYND - 6.155'],
      'gyuszt/2': ['GYÜSZT - 9.21'],
      'gykem/2': ['GYKÉM - 3.290'],
      'gynd/3': ['GYND - 6.165'],
      'gykem/3': ['GYKÉM - 3.73']
    };

    let toLoad = 9;

    console.log("size of database before: " + this.appState.remainingTasks.length);

    for (const group in this.currentVersions) {
      if (!this.currentVersions.hasOwnProperty(group)) {
        continue;
      }

      if (this.currentVersions[group] > this.appState.versions[group] || (typeof this.appState.versions[group] === 'undefined')) {
        if (typeof this.appState.versions[group] === 'undefined') {
          this.appState.versions[group] = 0;
        }

        this.database.getData(group, (this.appState.versions[group] == 0) ? (this.currentVersions[group]) : (this.appState.versions[group] + 1))
          .subscribe(
            data => {
              toLoad--;
              if (this.appState.versions[group] == 0) {
                console.log(group + ": " + data.length);
                this.appState.remainingTasks = this.appState.remainingTasks.concat(data);
                this.appState.versions[group] = this.currentVersions[group];
              } else if (this.appState.versions[group] + 1 == this.currentVersions[group]) {
                const upgrades = changes[group + '/' + this.currentVersions[group]];
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
                    if (this.appState.remainingTasks[j].id == newTask.id || this.appState.remainingTasks[j].id == null) {
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
                    if (this.appState.solvedTasks[j].task.id == newTask.id || this.appState.solvedTasks[j].task.id == null) {
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

    this.doCheck();
  }

  onLoadFinished() {
    this.appState.loading = false;
    console.log("size of database after: " + this.appState.remainingTasks.length);
    if (this.appState.currentTask == null) {
      this.appState.nextTask();
    }
  }

  private doCheck() {
    const taskIdSet = {};
    let toLoad = 9;

    if (this.appState.currentTask != null) {
      taskIdSet[this.appState.currentTask.id] = true;
    }
    this.appState.remainingTasks.forEach(function (value: Task, index, array) {
      taskIdSet[value.id] = true;
    });
    this.appState.solvedTasks.forEach(function (value: AnsweredTask, index, array) {
      taskIdSet[value.task.id] = true;
    });

    const missing = {};

    console.log(Object.keys(taskIdSet).length);

    for (const group in this.currentVersions) {
      if (!this.currentVersions.hasOwnProperty(group)) {
        continue;
      }

      this.database.getData(group, this.currentVersions[group])
        .subscribe(
          (data:Task[]) => {
            toLoad--;
            data.forEach(function(value:Task, index, array) {
              if(!taskIdSet.hasOwnProperty(value.id)) {
                missing[value.id] = true;
              }
            });

            if (toLoad == 0) {
              alert(JSON.stringify(Object.keys(missing)));
            }
          }
        );
    }


  }
}
