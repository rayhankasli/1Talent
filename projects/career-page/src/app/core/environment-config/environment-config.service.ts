/**
 * @author : Gaurang Valia
 * @class : EnvironmentConfigService
 * @description : it is use environment level config
 * Created Date : 26-03-2019
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/';
// --------------------------------------- //
import { EnvironmentConfig } from './environment-config.model';
/** Injectable in EnvironmentConfigService */
@Injectable()
export class EnvironmentConfigService {
  /** Environment typeof EnvironmentConfig file */
  public environment: EnvironmentConfig;
  /** Environment details of environment config service */
  public environmentDetails: Subject<EnvironmentConfig>;
  /** Creates an instance of environment config service */
  constructor () {
    this.environmentDetails = new Subject<EnvironmentConfig>();
    this.environment = new EnvironmentConfig();
  }
  /**
   * Gets base url
   * @returns base url of vacancyServices
   */
  public initializeApplicationEnvironment (url: string): void {
    if (url.includes('localhost')) {
      this.environment.baseUrl = 'http://192.168.0.254:8011/api/';
      this.environment.baseUrlOpenPosition = 'http://192.168.0.254:8014/api/';
    } else if (url.includes('192.168.0.254:8020')) {
      this.environment.baseUrl = 'http://192.168.0.254:8011/api/';
      this.environment.baseUrlOpenPosition = 'http://192.168.0.254:8014/api/';
    } else if (url.includes('192.168.0.254:8024')) {
      this.environment.baseUrl = 'http://192.168.0.254:8015/api/';
      this.environment.baseUrlOpenPosition = 'http://192.168.0.254:8018/api/';  
    }
  }

  /**
   * getBaseUrl return the url of the server
   * @author Gaurang Valia
   * @createdDate 22-03-2019
   */
  public getBaseUrl (): string {
    return this.environment.baseUrl;
  }

  /**
   * getBaseUrlOpenPosition return the url of the server
   * @author Gaurang Valia
   * @createdDate 04-04-2019
   */
  public getBaseUrlOpenPositionDetails (): string {
    return this.environment.baseUrlOpenPosition;
  }

  /**
   * Emits environment details
   * @param environment set the envorment base url
   */
  public emitEnvironmentDetails (environment: EnvironmentConfig): void {
    this.environmentDetails.next(environment);
  }
}
