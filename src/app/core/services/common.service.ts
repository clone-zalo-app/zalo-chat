import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import * as CONST from '../constants';
import {UserModel} from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  protected chatUrl = environment.chatUrl;
  protected userUrl = environment.userUrl;
  protected createSubject: Subject<any>;
  protected userSubject = new BehaviorSubject(this.getLocalStorage(CONST.LocalStorage.USER))
  currentUser: Observable<UserModel>;

  constructor(protected http: HttpClient, public afAuth: AngularFireAuth) {
    this.currentUser = this.userSubject.asObservable();
  }
    get(url: string): Observable<any> {
      return this.http.get(this.userUrl+url);
    }
    pos(url: string, request: any): Observable<any> {
      return  this.http.post(this.userUrl+url, request);
    }
    put(url: string, request: any): Observable<any> {
      return  this.http.put(this.userUrl+url, request);
    }
    delete(url: string): Observable<any> {
      return  this.http.delete(this.userUrl+url)
    }
    patch(url: string, request: any): Observable<any> {
      return this.http.patch(this.userUrl+url, request);
    }
  saveLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
    if (key == CONST.LocalStorage.USER) {
      this.userSubject.next(value);
    }
  }
  getLocalStorage(key: string): any{
    return JSON.parse(localStorage.getItem(key));
  }

}
