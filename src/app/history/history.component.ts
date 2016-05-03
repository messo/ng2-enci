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

  constructor(public appState: AppState) {

  }


  isQuestion(answer: AnsweredTask): boolean {
    return answer.task.type == 'QUESTION';
  }

  isAssociation(answer: AnsweredAssocation): boolean {
    return answer.task.type == 'ASSOCIATION';
  }
}
