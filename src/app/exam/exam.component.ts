import { Component, OnInit } from 'angular2/core';
import { AppState } from '../app.service';
import { QuestionCard } from '../question';
import { AssociationCard } from '../association';
import { Router } from "angular2/router";
import { AnsweredTask } from '../quiz';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';

@Component({
  selector: 'exam',
  directives: [QuestionCard, AssociationCard],
  pipes: [],
  styles: [require('./exam.css')],
  template: require('./exam.html')
})
export class Exam implements OnInit {

  AppState: any;
  examId: string;

  time: string;
  remaining: number = 200;
  good: number = 0;
  bad: number = 0;
  wrongAnswers: AnsweredTask[] = [];

  constructor(public appState: AppState, public router: Router) {
    this.AppState = AppState;
    this.examId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  ngOnInit() {
    let timer = Observable.timer(1000, 1000);
    timer.subscribe(tick => {
      let duration = moment.duration(3, 'hours').subtract(tick, 'seconds');
      this.time = moment.utc(duration.asMilliseconds()).format("HH:mm:ss");
    });
  }

  get currentTaskIsQuestion(): boolean {
    return this.appState.currentTask && this.appState.currentTask.type == 'QUESTION';
  }

  get currentTaskIsAssociation(): boolean {
    return this.appState.currentTask && this.appState.currentTask.type == 'ASSOCIATION';
  }

  onAnswer(answeredTask: AnsweredTask) {
    if (AppState.isCorrect(answeredTask)) {
      this.appState.solvedTasks.push(answeredTask);
      this.good++;
    } else {
      answeredTask.examId = this.examId;
      this.appState.solvedTasks.unshift(answeredTask);
      this.bad++;
      this.wrongAnswers.push(answeredTask);
    }

    this.appState.nextTaskWithError(this.examId);
    this.remaining--;
  }

  finish() {
    this.remaining = 0;
    if (this.appState.currentTask != null) {
      this.appState.remainingTasks.unshift(this.appState.currentTask);
      this.appState.currentTask = null;
    }
  }
}
