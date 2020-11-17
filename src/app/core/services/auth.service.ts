import { Injectable } from '@angular/core';
import {CommonService} from './common.service';
import {Observable, Subject} from 'rxjs';
import {RegisterModel} from '../models/register.model';
import * as CONST from '../constants';
import {LoginByPhoneModel} from '../models/loginByPhone.model';
import {LoginByEmailModel} from '../models/loginByEmail.model';
import {VerifyCodeEmailModel} from '../models/verifyCodeEmail.model';
@Injectable()
export class AuthService extends CommonService{


  sendOTP(phoneNumber: string, phoneRecaptchaVerifier: any): Observable<any>{
    this.createSubject = new Subject<any>();
    this.afAuth.signInWithPhoneNumber(phoneNumber, phoneRecaptchaVerifier).then(Confirmation => {
      this.createSubject.next(Confirmation)
    }).catch(error => this.createSubject.error(error));
    return this.createSubject;
  }
  registerByPhone(registerInfo: RegisterModel) {
    return this.pos(CONST.apiUrl.SIGN_UP_PHONE, registerInfo);
  }
  loginByPhone(loginInfo: LoginByPhoneModel) {
    return this.pos(CONST.apiUrl.LOGIN_PHONE, loginInfo);
  }

  registerByEmail(registerInfo: RegisterModel) {
    return this.pos(CONST.apiUrl.SIGN_UP_EMAIL, registerInfo);
  }
  onVerifyCodeByeEmail(verifyInfo: VerifyCodeEmailModel) {
    return this.patch(CONST.apiUrl.VERIFY, verifyInfo);
  }
  loginByEmail(loginInfo: LoginByEmailModel) {
    return this.pos(CONST.apiUrl.LOGIN_EMAIL, loginInfo)
  }
}
