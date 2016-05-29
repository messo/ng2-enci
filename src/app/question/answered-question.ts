import {Answer, Question} from '../model';
import {AnsweredTask} from '../quiz/answered-task';

export class AnsweredQuestion implements AnsweredTask {

  public answer: Answer;
  public examId: string;

  constructor(public task: Question, private answerLetter: string) {
    this.answer = task.answers.find((item: Answer, index: number, array: Array<Answer>) => {
      return item.letter == answerLetter;
    });
  }

  get accepted(): boolean {
    return this.answer.letter == this.task.solution.letter;
  }
}
