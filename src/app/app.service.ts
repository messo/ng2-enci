import {Injectable} from 'angular2/core';
import {HmrState} from 'angular2-hmr';
import {Task} from './model';
import {LocalStorage} from 'angular2-localstorage/WebStorage';

@Injectable()
export class AppState {
  public loading: Boolean = true;

  @LocalStorage()
  public mode: String = 'EXERCISE';

  @HmrState() _state = {
    tasks: [],
    currentTaskIndex: -1,
    currentTask: null
  };


  constructor() {

  }

  // already return a clone of the current state
  get state() {
    return this._state = AppState._clone(this._state);
  }

  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }


  get tasks(): Array<Task> {
    return this._state.tasks;
  }

  set tasks(value: Array<Task>) {
    this._state.tasks = value;
  }

  get currentTaskIndex(): number {
    return this._state.currentTaskIndex;
  }

  set currentTaskIndex(value: number) {
    this._state.currentTaskIndex = value;
    this._state.currentTask = this.tasks[this._state.currentTaskIndex];
  }

  get currentTask(): Task {
    return this._state.currentTask;
  }


  get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state[prop] || state;
  }

  set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }


  static _clone(object) {
    // simple object clone
    return JSON.parse(JSON.stringify(object));
  }
}
