/**
 * @author : Bhumi Desai
 * @created date: 22/03/2019
 * @description :EnvironmentConfigService is created for getting the Url for the service.
 */

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/';
// --------------------------------------- //
import { EnvironmentConfig } from './environment-config.model';

/**
 * Injectable - This service stands for set diffrent url
 */
@Injectable({
  providedIn: 'root'
})
export class EnvironmentConfigService {

  /** environment define an instance of EnvironmentConfig class */
  public environment: EnvironmentConfig;
  /** Environment details of environment config service */
  public environmentDetails: Subject<EnvironmentConfig>;
  constructor () {
    this.environmentDetails = new Subject<EnvironmentConfig>();
    this.environment = new EnvironmentConfig();
  }

  /**
   * initializeApplicationEnvironment is use to initializes environment variables based on the current url in the browser's address bar
   */
  public initializeApplicationEnvironment (url: string): void {
    if (url.includes('localhost')) {
      this.environment.baseUrl = 'http://192.168.0.254:8013/api/';
      // this.environment.baseUrl = 'http://192.168.0.46:8080/api/';
      this.environment.baseUrlDropdown = 'http://192.168.0.254:8014/api/';
      this.environment.authorityUrl = 'http://192.168.0.254:8010/';
      this.environment.angularUrl = 'http://localhost:4200/';
    } /** dev environment */ else if (url.includes('192.168.0.254:8022')) {
      this.environment.baseUrl = 'http://192.168.0.254:8013/api/';
      this.environment.baseUrlDropdown = 'http://192.168.0.254:8014/api/';
      this.environment.authorityUrl = 'http://192.168.0.254:8010/';
      this.environment.angularUrl = 'http://192.168.0.254:8022/';
    } /** QA environment */ else if (url.includes('192.168.0.254:8026')) {
      this.environment.baseUrl = 'http://192.168.0.254:8017/api/';
      this.environment.baseUrlDropdown = 'http://192.168.0.254:8018/api/';
      this.environment.authorityUrl = 'http://192.168.0.254:8010/';
      this.environment.angularUrl = 'http://192.168.0.254:8026/';
    }
    this.environment.authorityClientId = '1TalentHr';
    this.environment.authorityClientApi = '1TalentHrApi';
  }

  /**
   * This method is created for returning the url of the server.
   * @returns base url
   */
  public getBaseUrl (): string {
    return this.environment.baseUrl;
  }

  /**
   * This method is created for getting the Url for the dropdown.
   * @returns base url for the dropdown
   */
  public getBaseUrlOfDropdown (): string {
    return this.environment.baseUrlDropdown;
  }

  /**
   * This method is created for returning the authority url of the server.
   * @returns authority url
   */
  public getAuthorityUrl (): string {
    return this.environment.authorityUrl;
  }

  /**
   * This method is created for getting the frontend Url 
   * @returns angular url
   */
  public getAngularUrl (): string {
    return this.environment.angularUrl;
  }
  
  /**
   * Gets authority client id
   * @returns authorityClientId 
   */
  public getAuthorityClientId(): string {
    return this.environment.authorityClientId;
  }

  /**
   * Gets authority client api
   * @returns authorityClientApi 
   */
  public getAuthorityClientApi(): string {
    return this.environment.authorityClientApi;
  }

  /**
   * Emits environment details
   * @param environment set the envorment base url
   */
  public emitEnvironmentDetails (environment: EnvironmentConfig): void {
    this.environmentDetails.next(environment);
  }
}
