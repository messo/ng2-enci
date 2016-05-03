import {Component} from 'angular2/core';
import {AppState} from '../app.service';
import {QuestionCard, AnsweredQuestion} from '../question';
import {AssociationCard, AnsweredAssocation} from '../association';
import {RouterActive} from "../router-active/router-active.directive";

@Component({
  selector: 'quiz',
  directives: [QuestionCard, AssociationCard, RouterActive],
  pipes: [],
  styles: [require('./quiz.css')],
  template: require('./quiz.html')
})
export class Quiz {

  constructor(public appState:AppState) {

  }

  get currentTaskIsQuestion():boolean {
    return this.appState.currentTask && this.appState.currentTask.type == 'QUESTION';
  }

  get currentTaskIsAssociation():boolean {
    return this.appState.currentTask && this.appState.currentTask.type == 'ASSOCIATION';
  }

  onQuestionAnswer(answer:AnsweredQuestion) {
    this.appState.solvedTasks.push(answer);
    this.appState.recentlySolvedTasks.push(answer);
    this.appState.nextTask();
  }

  onAssociation(association:AnsweredAssocation) {
    this.appState.solvedTasks.push(association);
    this.appState.recentlySolvedTasks.push(association);
    this.appState.nextTask();
  }

}
