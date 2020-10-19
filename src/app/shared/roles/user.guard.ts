import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {UserModel} from '../../core/models/user.model';
import {AuthService} from '../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  currentUser: UserModel;
  constructor(private authService: AuthService) {
    this.authService.currentUser.subscribe(value => {
      this.currentUser = value
    });
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.currentUser) {
      return true;
    }
    return false;
  }

}
