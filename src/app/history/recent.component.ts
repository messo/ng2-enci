import {Component} from 'angular2/core';
import {AppState} from '../app.service';
import {QuestionCard, AnsweredQuestion} from '../question';
import {AssociationCard, AnsweredAssocation} from '../association';
import {AnsweredTask} from "../quiz/answered-task";
import {Router} from "angular2/router";

@Component({
  selector: 'recent',
  directives: [QuestionCard, AssociationCard],
  pipes: [],
  styles: [require('./history.css')],
  template: require('./recent.html')
})
export class Recent {

  constructor(public appState:AppState, public router:Router) {

  }

  onContinue() {
    this.appState.recentlySolvedTasks = [];
    this.router.navigate(['Quiz']);
  }

  isQuestion(answer:AnsweredTask):boolean {
    return answer.task.type == 'QUESTION';
  }

  isAssociation(answer:AnsweredAssocation):boolean {
    return answer.task.type == 'ASSOCIATION';
  }
}
