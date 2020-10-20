import { Injectable } from '@angular/core';
import {CommonService} from './common.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';
import {UserModel} from '../models/user.model';
import {ResUserListModel} from '../models/resUserList.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CommonService{



  getListUser(): Observable<ResUserListModel> {
    return this.http.get<ResUserListModel>(this.userUrl+'user')
  }
  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.userUrl+`/user/${id}`);
  }
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl+`/user`, user)
  }
}
