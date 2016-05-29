import {Association} from '../model';
import {AnsweredTask} from '../quiz/answered-task';

export class AnsweredAssocation implements AnsweredTask {

  public examId: string;

  constructor(public task: Association, public answerLetters: string[]) {
  }

  get accepted(): boolean {
    return true;
  }
}
