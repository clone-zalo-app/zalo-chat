import {UserModel} from './user.model';

export interface MessItem {
  id: number,
  content: string;
  time: string;
  send: boolean;
  user: UserModel;
}
