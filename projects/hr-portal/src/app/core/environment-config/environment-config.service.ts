/**
 * @author : Bhumi Desai
 * @created date: 22/03/2019
 * @description :EnvironmentConfigService is created for getting the Url for the service.
 */

import { Injectable } from '@angular/core';
import { EnvironmentConfig } from './environment-config.model';

/**
 * used for service dependency
 */
@Injectable({
  providedIn: 'root',
})
export class EnvironmentConfigService {

  /**
   * environment for the baseUrl
   */
  public environment: EnvironmentConfig;
  constructor () {
    this.environment = new EnvironmentConfig();
  }

  /**
   * This method is created for getting the Url.
   * @returns base url
   */
  public getBaseUrl (): string {
    // return this.environment.baseUrl = 'http://localhost:3000/Vacancy';
    return this.environment.baseUrl = 'http://192.168.0.28:8080/api/vacancies';
  }
}
