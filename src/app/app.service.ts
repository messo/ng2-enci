import {Injectable} from 'angular2/core';
import {Task} from './model';
import {LocalStorage} from 'angular2-localstorage/WebStorage';
import {AnsweredTask} from "./quiz/answered-task";

@Injectable()
export class AppState {
  public loading:Boolean = true;

  @LocalStorage()
  public versions = {
    'gynd': 1,
    'gytort': 0,
    'gyuszt': 0,
    'biof': 0
  };

  @LocalStorage()
  public currentTask = null;

  @LocalStorage()
  public remainingTasks:Array<Task> = [];

  @LocalStorage()
  public solvedTasks:Array<AnsweredTask> = [];

  public recentlySolvedTasks:Array<AnsweredTask> = [];


  constructor() {

  }

  nextTask():void {
    if(this.remainingTasks.length == 0) {
      this.currentTask = null;
    } else {
      const nextTaskId = Math.floor(Math.random() * this.remainingTasks.length);
      this.currentTask = this.remainingTasks.splice(nextTaskId, 1)[0];
    }
  }
}
