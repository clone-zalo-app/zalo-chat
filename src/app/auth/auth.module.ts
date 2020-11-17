import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {AuthComponent} from './pages/auth/auth.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import * as CONST from '../core/constants';

import { RegisterByPhoneComponent } from './components/register-by-phone/register-by-phone.component';

const routes: Routes = [
  {
    path: '', component: AuthComponent, children: [
      {path: '', redirectTo: CONST.frontendUrl.LOGIN, pathMatch: 'full'},
      {path: CONST.frontendUrl.LOGIN, component: LoginComponent},
      {path: CONST.frontendUrl.REGISTER, component: RegisterComponent},
    ]
  }
];

@NgModule({
  imports: [SharedModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],
  declarations: [AuthComponent, LoginComponent, RegisterComponent, RegisterByPhoneComponent]
})
export class AuthModule {

}
