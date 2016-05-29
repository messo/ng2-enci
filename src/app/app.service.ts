import { Injectable } from 'angular2/core';
import { Task } from './model';
import { LocalStorage } from 'angular2-localstorage/WebStorage';
import { AnsweredTask } from "./quiz/answered-task";
import { AnsweredQuestion } from "./question/answered-question";
import { AnsweredAssocation } from "./association/answered-association";

@Injectable()
export class AppState {
  public loading: Boolean = true;

  @LocalStorage()
  public versions = {};

  @LocalStorage()
  public currentTask: Task = null;

  @LocalStorage()
  public remainingTasks: Array<Task> = [];

  @LocalStorage()
  public solvedTasks: Array<AnsweredTask> = [];


  constructor() {

  }

  nextTask(): void {
    if (this.remainingTasks.length == 0) {
      this.currentTask = null;
    } else {
      const nextTaskId = Math.floor(Math.random() * this.remainingTasks.length);
      this.currentTask = this.remainingTasks.splice(nextTaskId, 1)[0];
    }
  }

  nextTaskWithError(examId: string): void {
    let match = -1;
    let i = 0;
    while (i < this.solvedTasks.length && !AppState.isCorrect(this.solvedTasks[i])) {
      if (!this.solvedTasks[i].hasOwnProperty('examId') || this.solvedTasks[i].examId != examId) {
        match = i;
        break;
      }
      i++;
    }


    // we have error as well!
    if (Math.random() <= 0.3 && match != -1) {
      console.log("Error!");
      this.currentTask = this.solvedTasks.splice(match, 1)[0].task;
      return;
    }

    console.log("Sima!");
    this.nextTask();
  }

  get remainingCount(): number {
    return this.remainingTasks.length;
  }

  get goodOnes(): AnsweredTask[] {
    return this.solvedTasks.filter((value, index, array) => {
      return AppState.isCorrect(value);
    });
  }

  static isCorrect(answer: AnsweredTask): boolean {
    if (this.isQuestion(answer)) {
      const answeredQuestion: AnsweredQuestion = <AnsweredQuestion>answer;
      return answeredQuestion.answer.letter == answeredQuestion.task.solution.letter
    } else if (this.isAssociation(answer)) {
      const answeredAssociation: AnsweredAssocation = <AnsweredAssocation>answer;
      for (let i = 0; i < answeredAssociation.task.items.length; i++) {
        if (answeredAssociation.task.items[i].match != answeredAssociation.answerLetters[i]) {
          return false;
        }
      }

      return true;
    }
  }

  static isQuestion(answer: AnsweredTask): boolean {
    return answer.task.type == 'QUESTION';
  }

  static isAssociation(answer: AnsweredTask): boolean {
    return answer.task.type == 'ASSOCIATION';
  }
}
