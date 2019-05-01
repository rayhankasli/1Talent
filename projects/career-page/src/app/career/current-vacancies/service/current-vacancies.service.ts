/**
 * @author : Gaurang Valia
 * @class : VacancyService
 * @description : This service use for Managa vacancy Opration
 * @Created Date : 04-04-2019
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// --------------------------
import { Observable } from 'rxjs/';
import { EnvironmentConfigService } from '../../../core/environment-config/environment-config.service';
import { Designation, Domain, Technology, Country, Vacancy } from '../model/current-vacancies.model';

/**  Inject the Service CurrentVacanciesService */
@Injectable({
  providedIn: 'root',
})
export class CurrentVacanciesService {
  /** BaseUrl of OpenPosition */
  private baseUrlOpenPosition: string;
  /** BaseUrl of vacancy map */
  private baseUrl: string;
  constructor (private http: HttpClient, private environmentConfigService: EnvironmentConfigService) {
    this.baseUrlOpenPosition = environmentConfigService.getBaseUrlOpenPositionDetails();
    this.baseUrl = environmentConfigService.getBaseUrl();
  }
  /**
   * Gets all designation data using get method of HttpClient
   * @author: Gaurang Valia
   * @Created Date : 05-03-2019
   * @returns all designation data from server
   */
  public getAllDesignationList (): Observable<Designation[]> {
    return this.http.get<Designation[]>(this.baseUrlOpenPosition + 'designation');
  }
  /**
   * GetAllDomainlist method are get all domainlist details from the server
   * @author: Gaurang Valia
   * @created date: 05-03-2019
   * @returns all domain list from server
   */
  public getAllDomainList (): Observable<Domain[]> {
    return this.http.get<Domain[]>(this.baseUrlOpenPosition + 'domain');
  }
  /**
   * Gets all the technology
   * @author: Gaurang Valia
   * Created Date : 05-03-2019
   * @returns all technology list from server
   */
  public getAllTechnologyList (): Observable<Technology[]> {
    return this.http.get<Technology[]>(this.baseUrlOpenPosition + 'technology');
  }
  /**
   * Gets all the country
   * @author: Gaurang Valia
   * @Created Date : 05-03-2019
   * @returns all Country list from server
   */
  public getAllCountryList (): Observable<Country[]> {
    return this.http.get<Country[]>(this.baseUrlOpenPosition + 'country');
  }

  /**
   * Gets all the vacancy data form database
   * @returns all the vacancy base on Vacancy model
   */
  public getVacancy (): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(this.baseUrl + 'Career');
  }

  /**
   * Gets vacancy by filter
   * @param countryId : get the country id
   * @param domainId : get the domain id
   * @param designationId : get the designation id
   * @param technologyId : get the technology id
   * @returns filtered vacancy  
   */
  public getVacancyByFilter (countryId:number,domainId:number,designationId:number,technologyId:number): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(this.baseUrl + 'career/?countryId='+countryId+'&domainId='+domainId+'&designationId='+designationId+'&technologyId='+technologyId);
  }
 
}



