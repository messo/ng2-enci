import {Component} from 'angular2/core';
import {AppState} from '../app.service';
import {QuestionCard} from '../question';
import {AssociationCard} from '../association';
import {RouterActive} from "../router-active/router-active.directive";
import {Router} from "angular2/router";
import {AnsweredTask} from "./answered-task";

@Component({
  selector: 'quiz',
  directives: [QuestionCard, AssociationCard, RouterActive],
  pipes: [],
  styles: [require('./quiz.css')],
  template: require('./quiz.html')
})
export class Quiz {

  constructor(public appState:AppState, public router:Router) {

  }

  get currentTaskIsQuestion():boolean {
    return this.appState.currentTask && this.appState.currentTask.type == 'QUESTION';
  }

  get currentTaskIsAssociation():boolean {
    return this.appState.currentTask && this.appState.currentTask.type == 'ASSOCIATION';
  }

  checkQuestion(card:QuestionCard) {
    card.chosen = card.solution;
  }

  checkAssociation(card:AssociationCard) {
    card.chosen = card.options;
  }

  onAnswer(answeredTask:AnsweredTask) {
    if (AppState.isCorrect(answeredTask)) {
      this.appState.solvedTasks.push(answeredTask);
    } else {
      this.appState.solvedTasks.unshift(answeredTask);
    }

    this.appState.nextTask();
  }

  putBack() {
    const task = this.appState.currentTask;
    this.appState.nextTask();
    this.appState.remainingTasks.unshift(task);
  }

}
