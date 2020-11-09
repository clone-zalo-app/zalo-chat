import {Component, OnInit} from '@angular/core';
import * as CONST from '../../../core/constants';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import {RegisterModel} from '../../../core/models/register.model';
import {VerifyCodeEmailModel} from '../../../core/models/verifyCodeEmail.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  routing = CONST.frontendUrl;
  registerByEmail = false;
  registerByPhone = true;
  formEmail: FormGroup;
  registerForm: FormGroup;
  error: any;
  errorMessage: any;
  loading = false;
  verifyStatus = false;
  codeEmail = false;
  code: string;

  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService
  ) {
  }



  get email() {
    return this.formEmail.get('email');
  }
  get password() {
    return this.formEmail.get('password');
  }
  get rePassword() {
    return this.formEmail.get('rePassword');
  }
  checkRePassword() {
    return this.password.value === this.rePassword.value;
  }
  ngOnInit(): void {

    this.formEmail = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required]]
    });

  }




  onRegisterByEmail() {
    this.loading = true;
    const registerInfo: RegisterModel = {
      email: this.email.value,
      phone: '',
      lastName: '',
      firstName: '',
      password: this.password.value,
      userName: ''
    };
    this.authService.registerByEmail(registerInfo).subscribe(res => {
      this.loading = false;
      this.error = false;
      this.codeEmail = true;
    }, error => {
      console.log(error);
      this.loading = false;
      this.errorMessage = error.error.message;
      this.error = true;
    });

  }

  onVerifyCode() {
    const verifyInfo: VerifyCodeEmailModel = {
      email: this.email.value,
      pass: this.code
    };
    this.loading = true;
    this.authService.onVerifyCodeByeEmail(verifyInfo).subscribe(res => {
      this.loading = false;
      if (res.status == 'fail') {
        this.verifyStatus = true;
        this.loading = false;
        this.error = true;
        this.errorMessage = res.message;
      } else {
        this.router.navigate(['auth', this.routing.LOGIN]);
      }
    }, error => {
      this.loading = false;
    });
  }




}
