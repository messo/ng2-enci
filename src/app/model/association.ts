import {Task} from './task';

export interface Association extends Task {

  text: String;
  items: Array<any>;
  legends: Array<any>;

}
