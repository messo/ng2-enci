import {Component} from 'angular2/core';
import {AppState} from '../app.service';
import {QuestionCard, AnsweredQuestion} from '../question';
import {AssociationCard, AnsweredAssocation} from '../association';
import {AnsweredTask} from "../quiz/answered-task";

@Component({
  selector: 'history',
  directives: [QuestionCard, AssociationCard],
  pipes: [],
  styles: [require('./history.css')],
  template: require('./history.html')
})
export class History {

  constructor(public appState:AppState) {

  }

  getStyle(answer:AnsweredTask):string {
    if(AppState.isCorrect(answer)) {
      return "#00c853";
    } else {
      return "red";
    }
  }

  moveItBack(index:number):void {
    const answeredTask:AnsweredTask = this.appState.solvedTasks.splice(index, 1)[0];
    this.appState.remainingTasks.unshift(answeredTask.task);
  }

  
}
