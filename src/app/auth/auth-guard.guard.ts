import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

class UserToken {
  token(token?: UserService): any {
    return token.userToken;
  }
}

class Permissions {
  canActivate(user: UserService): boolean {
    return true
  }
}


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private permissions: Permissions, private currentUser: UserToken, private route: Router, private userService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.permissions.canActivate(this.currentUser.token())) {
        return this.permissions.canActivate(this.currentUser.token());
      }
      else {
        this.userService.userToken = null;
        this.route.navigateByUrl('/login')
      }
  }
  
}
