import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
/** used for service dependency */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (private authService: AuthService) {
  }


  /**
   * Determines whether activate can
   * @param route : routesnapshot
   * @param state : router state
   * @returns boolean value 
   */
  public canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const islogin: boolean = this.authService.isLoggedeIn();
    if (islogin) {
      return true;
    } else {
      this.authService.login();
      return false;
    }
  }

}
