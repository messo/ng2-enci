import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {AnsweredQuestion} from './answered-question';
import {Question} from '../model';

@Component({
  selector: 'question-card',
  providers: [],
  directives: [],
  pipes: [],
  styles: [require('./question-card.css')],
  template: require('./question-card.html')
})
export class QuestionCard {
  @Input() question: Question;
  @Output() answer: EventEmitter<AnsweredQuestion> = new EventEmitter();

  private _chosen: string = null;
  public solution: string = null;

  constructor() {
  }

  @Input() set chosen(value: string) {
    this._chosen = value;
    this.solution = value;
  }

  get chosen() {
    return this._chosen;
  }

  submitAnswer() {
    this.answer.emit(new AnsweredQuestion(this.question, this.solution));
    this.solution = null;
  }

}
