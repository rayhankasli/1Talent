/**
 * @author Rayhan Kasli
 * @createdDate 22-03-2019
 * @dicription EnvironmentConfigService class is used to set service url
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/';
// --------------------------------------- //
import { EnvironmentConfig } from './environment-config.model';
/**
 * Injectable - This service stands for set diffrent url
 */
@Injectable()
export class EnvironmentConfigService {
  /** environment define an instance of EnvironmentConfig class */
  public environment: EnvironmentConfig;
  /** Environment details of environment config service */
  public environmentDetails: Subject<EnvironmentConfig>;

  constructor() {
    this.environmentDetails = new Subject<EnvironmentConfig>();
    this.environment = new EnvironmentConfig();
  }
  /**
   * initializeApplicationEnvironment is use to initializes environment variables based on the current url in the browser's address bar
   */
  public initializeApplicationEnvironment(url: string): void {
    if (url.includes('localhost')) {
      //this.environment.baseUrl = 'http://192.168.0.57:8080/api/';
      this.environment.baseUrl = 'http://192.168.0.254:8014/api/';
      this.environment.authorityUrl = 'http://192.168.0.254:8010/';
      this.environment.angularUrl = 'http://localhost:4200/';

    } else if (url.includes('192.168.0.254:8019')) {
      this.environment.baseUrl = 'http://192.168.0.254:8014/api/';
      this.environment.authorityUrl = 'http://192.168.0.254:8010/';
      this.environment.angularUrl = 'http://192.168.0.254:8019/';
    } else if (url.includes('192.168.0.254:8023')) {
      this.environment.baseUrl = 'http://192.168.0.254:8018/api/';
      this.environment.authorityUrl = 'http://192.168.0.254:8010/';
      this.environment.angularUrl = 'http://192.168.0.254:8023/';
    }
    this.environment.authorityClientId = '1TalentAdmin';
    this.environment.authorityClientApi = '1TalentAdminApi';

  }

  /**
   * getBaseUrl return the url of the server
   * @author Rayhan Kasli
   * @createdDate 22-03-2019
   */
  public getBaseUrl(): string {
    return this.environment.baseUrl;
  }

  /**
   * This method is created for returning the authority url of the server.
   * @returns authority url
   */
  public getAuthorityUrl(): string {
    return this.environment.authorityUrl;
  }

  /**
   * This method is created for getting the frontend Url 
   * @returns angular url
   */
  public getAngularUrl(): string {
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
  public emitEnvironmentDetails(environment: EnvironmentConfig): void {
    this.environmentDetails.next(environment);
  }

}
