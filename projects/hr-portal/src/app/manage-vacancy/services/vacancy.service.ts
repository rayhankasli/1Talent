/**
 * @author: Bhumi Desai
 * @created date: 20/03/2019
 * @description: In this service, http calls for adding and getting the records is performed.
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';
import { EnvironmentConfigService } from '../../core/environment-config/environment-config.service';
import { Country, Designation, Domain, Technology, Vacancy } from '../vacancy.model';

/** used for service dependency */
@Injectable({
  providedIn: 'root',
})

/**
 * @author: Bhumi Desai
 * @created date: 22/03/2019
 * @description:This service is used for http calls
 */
export class VacancyService {

  /** url of the http call */
  public baseUrl: string;
  constructor (private http: HttpClient, private environmentConfigService: EnvironmentConfigService) {
    this.baseUrl = environmentConfigService.getBaseUrl();
  }

  /**
   * Gets all vacancies
   * @author: Bhumi Desai
   * @created date: 22/03/2019
   * @returns all vacancies
   */
  public getAllVacancies (): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(this.baseUrl);
  }

  /**
   * Inserts vacancies
   * @author: Bhumi Desai
   * @created date: 22/03/2019
   * @returns vacancies i.e returns the inserted records
   */
  public insertVacancies (vacancy: Vacancy): Observable<Vacancy> {
    return this.http.post<Vacancy>(this.baseUrl, vacancy);
  }

  /**
   * Gets all the domains
   * @author: Bhumi Desai
   * @created date: 27/03/2019
   * @returns all domains
   */
  public getDomain (): Observable<Domain[]> {
    const domainUrl: string = 'http://192.168.0.79:8080/api/Domains';
    return this.http.get<Domain[]>(domainUrl);
  }

  /**
   * Gets all the technology
   * @author: Bhumi Desai
   * @created date: 27/03/2019
   * @returns all technology
   */
  public getTechnology (): Observable<Technology[]> {
    const technologyUrl: string = 'http://192.168.0.79:8080/api/Technology';
    return this.http.get<Technology[]>(technologyUrl);
  }
  /**
   * Gets all the desigation
   * @author: Bhumi Desai
   * @created date: 27/03/2019
   * @returns all desigation
   */
  public getDesignation (): Observable<Designation[]> {
    const desigationUrl: string = 'http://192.168.0.79:8080/api/Designations';
    return this.http.get<Designation[]>(desigationUrl);
  }
  /**
   * Gets all the country
   * @author: Bhumi Desai
   * @created date: 27/03/2019
   * @returns all country
   */
  public getCountry (): Observable<Country[]> {
    const countryUrl: string = 'http://192.168.0.79:8080/api/Country';
    return this.http.get<Country[]>(countryUrl);
  }

}
