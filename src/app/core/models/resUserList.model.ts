import {UserModel} from './user.model';
import {User} from './user';

export interface ResUserListModel {
  status: string;
  message: string;
  data: User[];
}
