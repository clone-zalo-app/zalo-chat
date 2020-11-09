import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterModel} from '../../../core/models/register.model';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import * as CONST from '../../../core/constants';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-register-by-phone',
  templateUrl: './register-by-phone.component.html',
  styleUrls: ['./register-by-phone.component.scss']
})
export class RegisterByPhoneComponent implements OnInit, AfterViewInit {
  phoneRecaptchaVerifier: firebase.auth.RecaptchaVerifier;
  confirmation: firebase.auth.ConfirmationResult;
  sendCodeBtn = false;
  message: string;
  phoneVerify: string;
  verify = false;
  code: string;
  formPhone: FormGroup;
  loading = false;
  routing = CONST.frontendUrl;
  verifyCode = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  get phone() {
    return this.formPhone.get('phone');
  }

  get pass() {
    return this.formPhone.get('password');
  }

  get rePass() {
    return this.formPhone.get('rePassword');
  }

  ngOnInit(): void {
    this.formPhone = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required, Validators.minLength(6)]]
    });
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebaseConfig);
    }

  }

  ngAfterViewInit(): void {
    this.phoneRecaptchaVerifier = new firebase.auth.RecaptchaVerifier('phone-sign-in-recaptcha', {
      'size': 'normal',
      'callback': (response) => {
        this.sendCodeBtn = true;
        this.message = null;
      }
    });
    this.phoneRecaptchaVerifier.render().then();
  }


  sendOTP() {
    let phone = '+84' + this.phone.value;
    this.loading = true;
    this.authService.sendOTP(phone, this.phoneRecaptchaVerifier).subscribe(value => {
      this.verifyCode = true;
      this.confirmation = value;
      this.message = null;
      this.loading = false;
      this.phoneRecaptchaVerifier.clear();
    }, error => {
      this.message = error.message;
      this.sendCodeBtn = false;
      this.loading = false;
    });
  }

  verifyOTP() {
    this.loading = true;
    this.confirmation.confirm(this.code).then((userCreated) => {
      this.verify = true;
      this.loading = false;
    }).catch(error => {
      this.message = error.message;
      this.loading = false;
    });
  }

  onRegisterByPhone() {
    this.loading = true;
    const registerInfo: RegisterModel = {
      email: '',
      userName: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: this.phone.value
    };
    this.authService.registerByPhone(registerInfo).subscribe(res => {
      this.loading = false;
      this.router.navigate([this.routing.AUTH, this.routing.LOGIN]);
    });
  }
}
