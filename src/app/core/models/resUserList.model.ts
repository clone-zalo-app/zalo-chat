import {UserModel} from './user.model';

export interface ResUserListModel {
  status: string;
  message: string;
  data: UserModel[];
}
