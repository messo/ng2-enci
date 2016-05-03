import {Component} from 'angular2/core';
import {AppState} from '../app.service';
import {QuestionCard, AnsweredQuestion} from '../question';
import {AssociationCard, AnsweredAssocation} from '../association';
import {AnsweredTask} from './answered-task';
import {LocalStorage} from 'angular2-localstorage/WebStorage';

@Component({
  selector: 'quiz',
  directives: [QuestionCard, AssociationCard],
  pipes: [],
  styles: [require('./quiz.css')],
  template: require('./quiz.html')
})
export class Quiz {

  public answers: Array<AnsweredTask> = [];

  constructor(public appState: AppState) {

  }

  get currentTaskIsQuestion(): boolean {
    return this.appState.currentTask && this.appState.currentTask.type == 'QUESTION';
  }

  get currentTaskIsAssociation(): boolean {
    return this.appState.currentTask && this.appState.currentTask.type == 'ASSOCIATION';
  }

  get exerciseMode(): boolean {
    return this.appState.mode == 'EXERCISE';
  }


  onQuestionAnswer(answer: AnsweredQuestion) {
    this.answers.push(answer);
    this.appState.currentTaskIndex++;
  }

  onAssociation(association: AnsweredAssocation) {
    this.answers.push(association);
    this.appState.currentTaskIndex++;
  }

  onCheck() {
    this.appState.set('mode', 'CHECK');
  }

  onContinue() {
    this.answers = [];
    this.appState.set('mode', 'EXERCISE');
  }

  isQuestion(answer: AnsweredTask): boolean {
    return answer instanceof AnsweredQuestion;
  }

  isAssociation(answer: AnsweredAssocation): boolean {
    return answer instanceof AnsweredAssocation;
  }

}
