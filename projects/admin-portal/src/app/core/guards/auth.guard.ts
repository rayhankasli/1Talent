import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { User } from 'oidc-client';

/**
 * Injectable
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) {
  }


  /**
   * Determines whether activate can
   * @param route : routesnapshot
   * @param state : router state
   * @returns boolean value 
   */
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Promise<boolean> {
    return this.getUser();
  }

  /**
   * Gets user
   * @returns user 
   */
  public async getUser(): Promise<boolean> {
    let flag: boolean = false;
    const isLoggedeIn: User = await this.authService.getUser();
    // console.log(isLoggedeIn);

    if (!isLoggedeIn) {
      this.authService.login();
      flag = false;
    } else {
      flag = true;
    }
    return flag;
  }
  /* public canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.authService.isLoggedeIn().subscribe((res :boolean) => {
      console.log('gaurd',res);
      if (!res) {
        this.authService.login();
        return this.authService.isLoggedeIn();
      }
      else {
        return this.authService.isLoggedeIn();
      }
    });
    // console.log('loginFlag',loginFlag);
    return this.authService.isLoggedeIn();
    
  } */

}
