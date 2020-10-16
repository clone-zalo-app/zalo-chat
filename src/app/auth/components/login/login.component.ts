import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import * as CONST from '../../../core/constants';
import {LoginInfoEmail} from '../../../core/models/login-info-email';
import {UserService} from '../../../core/services/user.service';
import {User} from '../../../core/models/user';
// import {LoginReq} from '../../../core/models/login';
// import {AuthService} from "../../../core/services/auth.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  login = true;
  loginEmail = false;
  loginPhone = false;
  forgetPasswordEmail = false;
  forgetPasswordPhone = false;

  loginFormByEmail: FormGroup;
  loginFormByPhone: FormGroup;
  loading = false;
  error = false;
  loginSuccess = false;
  userList: User[];
  // register_url = `/${CONST.frontendUrl.AUTH}/${CONST.frontendUrl.REGISTER}`;
  home_url = `/${CONST.frontendUrl.AUTH}/${CONST.frontendUrl.LOGIN}`

  constructor(private router: Router,
              private fb: FormBuilder,
              private userService: UserService
              ) {
  }

  ngOnInit(): void {
    this.userService.getListUser().subscribe(res => {
      this.userList = res
    })
    this.loginFormByEmail = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.loginFormByPhone = this.fb.group({
      phone: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  get email() {return this.loginFormByEmail.get('email'); }
  get password() {return this.loginFormByEmail.get('password'); }

  clickEmail() {
    this.login = false;
    this.loginEmail = true;
    this.loginPhone = false;
  }

  clickPhone() {
    this.login = false;
    this.loginEmail = false;
    this.loginPhone = true;
  }

  clickBack() {
    this.login = true;
    this.loginEmail = false;
    this.loginPhone = false;
    this.forgetPasswordEmail = false;
    this.forgetPasswordPhone = false;
  }

  clickForgetPassWordEmail() {
    this.login = false;
    this.loginEmail = false;
    this.forgetPasswordEmail = true;
  }

  clickForgetPassWordPhone() {
    this.login = false;
    this.loginPhone = false;
    this.forgetPasswordPhone = true;
  }
  onLoginEmail(){
    this.loginSuccess = true;
    const loginInfo: LoginInfoEmail = {
      email: this.email.value,
      password: this.password.value
    }
    const user: User = {
      id: 1,
      name: this.email.value,
      room: null
    }
    this.userService.createUser(user).subscribe(value => {
      localStorage.setItem('user', JSON.stringify(value));
        this.router.navigate(['/zalo'])
    })
    console.log(loginInfo);
  }


}
