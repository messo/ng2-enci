import {Answer} from './answer';
import {Task} from './task';

export interface Question extends Task {

  id: string,
  text: string,
  moreText: Array<string>,
  answers: Array<Answer>,
  solution: Answer

}
