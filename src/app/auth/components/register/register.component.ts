import { Component, OnInit ,AfterViewInit} from '@angular/core';
import * as CONST from '../../../core/constants';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {environment} from '../../../../environments/environment';
import {AuthService} from '../../../core/services/auth.service';
import {RegisterModel} from '../../../core/models/register.model';
import {VerifyCodeEmailModel} from '../../../core/models/verifyCodeEmail.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit , AfterViewInit{

  routing = CONST.frontendUrl;
  registerByEmail = false;
  registerByPhone = true;
  formPhone: FormGroup;
  formEmail: FormGroup;
  registerForm: FormGroup;
  verifyCode = false;
  code: string;
  error: any;
  errorMessage: any;
  loading = false;
  phoneRecaptchaVerifier: firebase.auth.RecaptchaVerifier;
  sendCodeBtn = false;
  message: string;
  confirmation: firebase.auth.ConfirmationResult;
  phoneVerify: string;
  verify = false;
  codeEmail = false;
  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService
  ) {
  }

  ngAfterViewInit(): void {
    firebase.initializeApp(environment.firebaseConfig);
    this.phoneRecaptchaVerifier = new firebase.auth.RecaptchaVerifier('phone-sign-in-recaptcha', {
      'size': 'normal',
      'callback': (response) => {
        this.sendCodeBtn = true;
        this.message = null;
      }
    });
    this.phoneRecaptchaVerifier.render().then();
  }


  ngOnInit(): void {
    this.formPhone = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword:['', [Validators.required, Validators.minLength(6)]]
    })
    this.formEmail = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword:['', [Validators.required, Validators.minLength(6)]]
    });

  }
  get phone() {return this.formPhone.get('phone'); }
  get pass() {return this.formPhone.get('password');}
  get rePass() {return this.formPhone.get('rePassword');}



  get password() {return this.formEmail.get('password'); }
  get email() {return this.formEmail.get('email'); }

  get rePassword() {return this.formEmail.get('rePassword'); }

  onRegisterByEmail() {
    this.loading = true;
    const registerInfo: RegisterModel = {
      email: this.email.value,
      phone:'',
      lastName:'',
      firstName:'',
      password: this.password.value,
      userName: ''
    }
    this.authService.registerByEmail(registerInfo).subscribe(res => {
        this.loading = false;
        this.error = false;
        this.codeEmail = true;
    }, error => {
      console.log(error)
      this.loading = false;
      this.errorMessage = error.error.message
      this.error = true;
    })

  }
  onVerifyCode() {
    const verifyInfo: VerifyCodeEmailModel = {
      email: this.email.value,
      pass: this.code
    }
    this.loading = true;
    this.authService.onVerifyCodeByeEmail(verifyInfo).subscribe(res => {
      this.loading = false;
      if (res.status == 'fail') {
        this.loading = false;
        this.error = true
        this.errorMessage = res.message
      } else {
        this.router.navigate(['auth',this.routing.LOGIN])
      }
      console.log(res);
    }, error => {
      this.loading = false;
      console.log(error);
    })
  }

  sendOTP() {
    let phone= '+84'+ this.phone.value;

    this.authService.sendOTP(phone, this.phoneRecaptchaVerifier).subscribe(value => {
      this.verifyCode = true;
      this.confirmation = value;
      this.message = null;
      this.phoneRecaptchaVerifier.clear();
    }, error => {
      this.message = error.message;
      this.sendCodeBtn = false;
    })
  }
  verifyOTP(){
    this.confirmation.confirm(this.code).then((userCreated) => {
      this.verify = true;
      this.phone.setValue(userCreated.user.phoneNumber);
    }).catch(error => {this.message = error.message})
  }
  onRegisterByPhone() {
    const registerInfo: RegisterModel = {
      email: '',
      userName: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: this.phone.value
    }
    this.authService.registerByPhone(registerInfo).subscribe(res => {
      this.router.navigate([this.routing.AUTH,this.routing.LOGIN])
    })
  }
}
