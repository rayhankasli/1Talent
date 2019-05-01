/**
 * @author Rayhan Kasli
 * @craetedDate 03-04-2019
 * @description This file use for authentication
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserManager, UserManagerSettings, WebStorageStateStore } from 'oidc-client';
import { BehaviorSubject, Observable } from 'rxjs/';
import { EnvironmentConfigService } from '../../environment-config/environment-config.service';
/**
 * used for service dependency
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * User manager of auth service
   */
  public _userManager: UserManager;
  /**
   * Current user of auth service
   */
  public currentUser: User;
  /**
   * Current user data of auth service
   */
  public currentUserData: BehaviorSubject<User['profile']> = new BehaviorSubject<User['profile']>(null);
  constructor(private router: Router,private environmentConfigService: EnvironmentConfigService) {
    const settings: UserManagerSettings = {
      authority: this.environmentConfigService.getAuthorityUrl(),
      client_id: this.environmentConfigService.getAuthorityClientId(),
      // redirect_uri: `${Constants.clientRoot}assets/signin-callback.html`,
      redirect_uri: `${this.environmentConfigService.getAngularUrl()}auth-callback`,
      silent_redirect_uri: `${this.environmentConfigService.getAngularUrl()}assets/silent-callback.html`,
      post_logout_redirect_uri: `${this.environmentConfigService.getAngularUrl()}`,
      response_type: 'id_token token',
      scope: `openid profile ${this.environmentConfigService.getAuthorityClientApi()}`,
      loadUserInfo: true,
      acr_values: 'tenant:2A3DF6F5-9D38-44BD-B5D7-98DD6A1CE514',
      userStore: new WebStorageStateStore({ store: window.localStorage })
    };
    this._userManager = new UserManager(settings);
  }
  // constructor(private router: Router) {
  //   const settings: UserManagerSettings = {
  //     authority: 'http://192.168.0.254:8010/',
  //     client_id: '1TalentAdmin',
  //     // redirect_uri: `${Constants.clientRoot}assets/signin-callback.html`,
  //     redirect_uri: 'http://localhost:4200/auth-callback',
  //     silent_redirect_uri: 'http://localhost:4200/assets/silent-callback.html',
  //     post_logout_redirect_uri: 'http://localhost:4200/',
  //     response_type: 'id_token token',
  //     scope: 'openid profile 1TalentAdminApi',
  //     loadUserInfo: true,
  //     acr_values: 'tenant:2A3DF6F5-9D38-44BD-B5D7-98DD6A1CE514',
  //     userStore: new WebStorageStateStore({ store: window.localStorage })
  //   };
  //   this._userManager = new UserManager(settings);
  // }

  /**
   * Gets user
   * @returns user
   */
  public async getUser(): Promise<User> {
    const user: User = await this._userManager.getUser();
    if (user) {
      this.currentUser = user;
      this.currentUserData.next(user.profile);
    }
    return user;
  }

  /**
   * Logins auth service
   * @returns login
   */
  public login(): Promise<void> {
    return this._userManager.signinRedirect();
  }
  /**
   * Renews token
   * @returns token
   */
  public renewToken(): Promise<User> {
    return this._userManager.signinSilent();
  }
  /**
   * Logouts auth service
   * @returns logout
   */
  public logout(): Promise<void> {
    return this._userManager.signoutRedirect();
  }
  /**
   * Gets user data
   * @returns user data
   */
  public getUserData(): Observable<User['profile']> {
    return this.currentUserData;
  }
  /**
   * Gets authorization header value
   * @returns authorization header value
   */
  public getAuthorizationHeaderValue(): string {
    return `${this.currentUser.token_type} ${this.currentUser.access_token}`;
  }
  /**
   * Complates authentication
   * @returns authentication
   */
  public complateAuthentication(): Promise<void> {
    this._userManager.removeUser();
    return this._userManager.signinRedirectCallback()
      .then((user: User) => {
        this.currentUser = user;
        this.currentUserData.next(user.profile);
        this.router.navigate(['/']);
      })
      .catch((error: object) => {
        console.error('Auth error', error);
        this.router.navigate(['/']);
      });
  }
  /**
   * Determines whether loggede in is
   * @returns true if loggede in
   */
  public isLoggedeIn(): boolean {
    const flag: boolean = this.currentUser ? true : false;
    return flag;
  }
}
