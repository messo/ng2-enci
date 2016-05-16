import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {Association} from '../model';
import {AnsweredAssocation} from './answered-association';

@Component({
  selector: 'association-card',
  providers: [],
  directives: [],
  pipes: [],
  styles: [require('./association-card.css')],
  template: require('./association-card.html')
})
export class AssociationCard {
  @Output() answer: EventEmitter<any> = new EventEmitter();

  private _task: Association = null;
  private _chosen: string[] = null;
  public options: string[];

  constructor() {
  }

  @Input() set chosen(value: string[]) {
    this._chosen = value;
    this.options = value;
  }

  @Input() set task(value: Association) {
    this._task = value;
    if (this._chosen == null) {
      this.options = Array.apply(null, Array(value.items.length)).map(function () {
      });
    }
  }


  get chosen() {
    return this._chosen;
  }


  get task(): Association {
    return this._task;
  }

  get allOptionSelected(): boolean {
    return this.options.reduce((result: boolean, option: string, index: number, options: string[]): boolean => {
      return result && option != null;
    }, true);
  }

  legendFor(letter: string): string {
    return this.task.legends.find((value, index, obj) => {
      return value.letter == letter;
    }).text;
  }

  submitAnswer() {
    this.answer.emit(new AnsweredAssocation(this.task, this.options));
    this.reset();
  }
  
  reset() {
    this._chosen = null;
  }

}
