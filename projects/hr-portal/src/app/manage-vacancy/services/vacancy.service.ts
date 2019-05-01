/**
 * @author: Bhumi Desai
 * @created date: 20/03/2019
 * @description: In this service, http calls for adding and getting the records is performed.
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/';
import { EnvironmentConfigService } from '../../core/environment-config/environment-config.service';
import { Country, Designation, Domain, Technology, Vacancy } from '../vacancy.model';

/** used for service dependency */
@Injectable({
  providedIn: 'root'
})

/**
 * @author: Bhumi Desai
 * @created date: 22/03/2019
 * @description:This service is used for http calls
 */
export class VacancyService {

  /** url for the http call */
  public baseUrl: string;
  /** url of the dropdown for http call */
  public baseUrlDropdown: string;

  /** insertJob is the behaviour subject and initialed with boolean value false  */
  public insertJob$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  /** updateSubject is the behaviour subject to update the records */
  public updateSubject: BehaviorSubject<Vacancy> = new BehaviorSubject(new Vacancy());

  constructor (private http: HttpClient, private environmentConfigService: EnvironmentConfigService) {
    this.baseUrl = environmentConfigService.getBaseUrl();
    this.baseUrlDropdown = environmentConfigService.getBaseUrlOfDropdown();
  }

  /**
   * Gets all vacancies
   * @author: Bhumi Desai
   * @created date: 22/03/2019
   * @returns all vacancies
   */
  public getAllVacancies (): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(this.baseUrl + 'vacancies');
  }

  /**
   * Inserts vacancies
   * @author: Bhumi Desai
   * @created date: 22/03/2019
   * @returns vacancies i.e returns the inserted records
   */
  public insertVacancies (vacancy: Vacancy): Observable<Vacancy> {
    return this.http.post<Vacancy>(this.baseUrl + 'vacancies', vacancy);
  }

  /**
   * Updates vacancies
   * @author: Bhumi Desai
   * @created date: 03/04/2019
   * @returns id and vacancies i.e returns the updated records
   */
  public updateVacancies (vacancy: Vacancy, id: number): Observable<Vacancy> {
    return this.http.put<Vacancy>(this.baseUrl + 'vacancies/' + id, vacancy);
  }

  /**
   * deletes vacancy
   * @author: Bhumi Desai
   * @created date: 03/04/2019
   * @returns id to delete the records
   */
  public deleteVacancy (vacancyId: number): Observable<Vacancy> {
    return this.http.delete<Vacancy>(this.baseUrl + 'vacancies/' + vacancyId);
  }

  /**
   * Gets all the domains
   * @author: Bhumi Desai
   * @created date: 27/03/2019
   * @returns all domains
   */
  public getDomain (): Observable<Domain[]> {
    return this.http.get<Domain[]>(this.baseUrlDropdown + 'Domain');
  }

  /**
   * Gets all the technology
   * @author: Bhumi Desai
   * @created date: 27/03/2019
   * @returns all technology
   */
  public getTechnology (): Observable<Technology[]> {
    return this.http.get<Technology[]>(this.baseUrlDropdown + 'Technology');
  }
  /**
   * Gets all the desigation
   * @author: Bhumi Desai
   * @created date: 27/03/2019
   * @returns all desigation
   */
  public getDesignation (): Observable<Designation[]> {
    return this.http.get<Designation[]>(this.baseUrlDropdown + 'Designation');
  }
  /**
   * Gets all the country
   * @author: Bhumi Desai
   * @created date: 27/03/2019
   * @returns all country
   */
  public getCountry (): Observable<Country[]> {
    return this.http.get<Country[]>(this.baseUrlDropdown + 'Country');
  }


  /**
   * emits the updated data using next.
   * @author: Bhumi Desai
   * @created date: 04/04/2019
   * @param data : updated records
   */
  public sendData (data: Vacancy): void {
    this.updateSubject.next(data);
  }

  /**
   * returns the behaviour subject as observable
   * @author: Bhumi Desai
   * @created date: 04/04/2019
   */
  public getData (): Observable<Vacancy> {
    return this.updateSubject.asObservable();
  }
  /**
   * Sets record insert
   * @author: Bhumi Desai
   * @created date: 04/04/2019
   * @param flagInsert boolean value
   */
  public setRecordInsert (flagInsert: boolean): void {
    this.insertJob$.next(flagInsert);
  }

}
