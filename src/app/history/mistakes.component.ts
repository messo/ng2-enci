import {Component} from 'angular2/core';
import {AppState} from '../app.service';
import {QuestionCard, AnsweredQuestion} from '../question';
import {AssociationCard, AnsweredAssocation} from '../association';
import {AnsweredTask} from "../quiz/answered-task";
import {Router} from "angular2/router";

@Component({
  selector: 'mistakes',
  directives: [QuestionCard, AssociationCard],
  pipes: [],
  styles: [require('./history.css')],
  template: require('./mistakes.html')
})
export class Mistakes {

  AppState:any;
  tasks = [];

  constructor(public appState:AppState, public router:Router) {
    this.AppState = AppState;
    this.fillTasks();
  }

  private fillTasks():void {
    var mistakes = this.mistakes;
    this.tasks = mistakes.slice(0, Math.min(10, mistakes.length));
  }

  get mistakes():Array {
    return this.appState.solvedTasks.filter((value, index, array) => {
      return !AppState.isCorrect(value);
    });
  }

  moveItBack(index:number):void {
    const answeredTask:AnsweredTask = this.tasks.splice(index, 1)[0];

    for (let i = 0; i < this.appState.solvedTasks.length; i++) {
      if (this.appState.solvedTasks[i].task.id == answeredTask.task.id) {
        this.appState.solvedTasks.splice(index, 1);
        break;
      }
    }

    this.appState.remainingTasks.unshift(answeredTask.task);

    if (this.tasks.length == 0) {
      this.fillTasks();
    }
  }
}
