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
    if(this.isCorrect(answer)) {
      return "#00c853";
    } else {
      return "red";
    }
  }

  moveItBack(index:number):void {
    const answeredTask:AnsweredTask = this.appState.solvedTasks.splice(index, 1)[0];
    this.appState.remainingTasks.unshift(answeredTask.task);
  }

  isCorrect(answer:AnsweredTask):boolean {
    if (this.isQuestion(answer)) {
      const answeredQuestion:AnsweredQuestion = <AnsweredQuestion>answer;
      return answeredQuestion.answer.letter == answeredQuestion.task.solution.letter
    } else if (this.isAssociation(answer)) {
      const answeredAssociation:AnsweredAssocation = <AnsweredAssocation>answer;
      for (let i = 0; i < answeredAssociation.task.items.length; i++) {
        if (answeredAssociation.task.items[i].match != answeredAssociation.answerLetters[i]) {
          return false;
        }
      }

      return true;
    }
  }

  isQuestion(answer:AnsweredTask):boolean {
    return answer.task.type == 'QUESTION';
  }

  isAssociation(answer:AnsweredTask):boolean {
    return answer.task.type == 'ASSOCIATION';
  }
}
