import {Component, OnInit, } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import * as CONST from '../../../core/constants';
import * as firebase from 'firebase';
import {AuthService} from '../../../core/services/auth.service';
import {LoginByPhoneModel} from '../../../core/models/loginByPhone.model';
import {LoginByEmailModel} from '../../../core/models/loginByEmail.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{


  routing = CONST.frontendUrl;
  loginByEmail = false;
  loginByPhone = true;
  formPhone: FormGroup;
  formEmail: FormGroup;
  loading = false;
  error = false;
  errorLabel: string;

  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService
  ) {
  }


  ngOnInit(): void {
    this.formPhone = this.fb.group({
      phone: ['', [Validators.required,Validators.pattern('[0-9]{10}')]],
      passwordByPhone: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.formEmail = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      passwordByEmail: ['', [Validators.required, Validators.minLength(6)]]
    });

  }
  get phone() {return this.formPhone.get('phone'); }
  get passwordByPhone() {return this.formPhone.get('passwordByPhone'); }
  get email() {return this.formEmail.get('email'); }
  get passwordByEmail() {return this.formEmail.get('passwordByEmail'); }
  onLoginByPhone() {
    this.loading = true;
    const loginInfo: LoginByPhoneModel = {
      phone: this.formPhone.get('phone').value,
      password: this.formPhone.get('passwordByPhone').value
    }
    this.authService.loginByPhone(loginInfo).subscribe(res => {
      console.log(res)
      if (res.status == 'fail') {
        this.loading = false;
        this.error = true
        this.errorLabel = res.message
      } else {
        this.authService.saveLocalStorage(CONST.LocalStorage.USER, res.data.user);
        this.authService.saveLocalStorage(CONST.LocalStorage.TOKEN, res.data.token);

        this.router.navigate([this.routing.ZALO_APP])
      }
    },error => {this.loading = false})
  }
  onLoginByEmail() {
    this.error = false;
    this.loading = true;
    const loginInfo: LoginByEmailModel = {
      email: this.formEmail.get('email').value,
      password: this.formEmail.get('passwordByEmail').value
    }
    this.authService.loginByEmail(loginInfo).subscribe(res => {
      this.loading = false;
        if (res.status == 'fail') {
          this.loading = false;
          this.error = true
          this.errorLabel = res.message
        } else {
          this.authService.saveLocalStorage(CONST.LocalStorage.USER, res.data.user);
          this.authService.saveLocalStorage(CONST.LocalStorage.TOKEN, res.data.token);
          this.router.navigate([this.routing.ZALO_APP])
        }
        },
      error => {
      this.error = true;
      this.loading = false;
    })
  }


}
