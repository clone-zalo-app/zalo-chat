import {User} from './user';

export interface MessItem {
  id: number,
  content: string;
  time: string;
  send: boolean;
  user: User;
}
