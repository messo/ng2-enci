import { Component } from 'angular2/core';
import { AppState } from '../app.service';
import { Task, Question } from '../model';

@Component({
  selector: 'all-true',
  pipes: [],
  styles: [],
  template: require('./all_true.html')
})
export class AllTrue {

  constructor(public appState: AppState) {
  }

  get getAllAnswersAreTrue(): Task[] {
    return this.appState.remainingTasks
      .filter((value: Task) => value.type == 'QUESTION')
      .filter((value: Task) => (<Question>value).solution.text == 'Minden válasz helyes');
  }
}
