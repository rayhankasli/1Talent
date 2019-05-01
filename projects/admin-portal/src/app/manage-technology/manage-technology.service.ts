/**
 * @author Rayhan Kasli
 * @createdDate 05-04-2019
 * @description ManageTechnologyService file is used for communication between component to server
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/';
import { EnvironmentConfigService } from '../core/environment-config/environment-config.service';
import { Domain } from '../manage-domain/domain.model';
import { Skill, Technology } from './technology.model';

/**
 * Injectable
 */
@Injectable({
  providedIn: 'root'
})
export class ManageTechnologyService {

   /** serviceUrl store url of server */
   public serviceUrl: string;

   /** insertTechnology */
   public insertTechnology: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /** updateTechnologyById */
   public updateTechnologyById: BehaviorSubject<Technology> = new BehaviorSubject<Technology>(null);

   /**
    * Creates an instance of manage technology service.
    * @param httpClient inject HttpClient class to interact with server
    * @param environmentConfigService inject environmentConfigService class for  interact with server
    */
   constructor (private httpClient: HttpClient, private environmentConfigService: EnvironmentConfigService) {
    this.serviceUrl = environmentConfigService.getBaseUrl();
  }

  /**
   * Gets all technology data using get method of HttpClient
   * @returns all technology data from server
   */
   public getAllTechnology (): Observable<Technology []> {
    return this.httpClient.get<Technology[]>(this.serviceUrl + 'technology');
  }

   /**
    * addNewTechnology used for add new technology
    * @param technology get the technology data from component
    * @returns technology observable
    */
   public addNewTechnology (technology: {[key: string]: number | string | Skill[]}): Observable<Technology> {
    return this.httpClient.post<Technology>(this.serviceUrl + 'technology', technology);
  }

  /**
   * updateTechnology is used to Update technology as per technology id
   * @param technology get the updated data of technology
   * @returns technology Observable
   */
   public updateTechnology (technology: {[key: string]: number | string | Skill[]}): Observable<Technology> {
    return this.httpClient.put<Technology>(this.serviceUrl + 'technology/' + technology.technologyId , technology);
  }

  /**
   * Delete technology
   * @param technologyId get unique technology id for delete technology
   * @returns technology Observable
   */
   public deleteTechnology (technologyId: number): Observable<Technology> {
    return this.httpClient.delete<Technology>(this.serviceUrl + 'technology/' + technologyId);
  }

  
   /**
    * Deletes skill as per id
    * @param technologyId get unique id of technology
    * @param skillId get unique id of skill
    * @returns technology observable 
    */
   public deleteSkill (technologyId: number, skillId: number): Observable<Skill | Technology> {
     return this.httpClient.delete<Skill | Technology>(this.serviceUrl + 'technology/'+ technologyId + '/skills/' + skillId);
    }

  /**
   * getDomain method all the data of domain
   * @returns domain observable
   */
   public getDomain(): Observable<Domain[]> {
    return this.httpClient.get<Domain[]>(this.serviceUrl + 'Domain');
  }

   /**
    * Sets technology insert
    * @param flagInsert
    */
   public setTechnologyInsert (flagInsert: boolean): void {
    this.insertTechnology.next(flagInsert);
  }

  /**
   * setTechnologyUpdateForUpdate
   * @data
   */
   public setTechnologyForUpdate (data: Technology): void {
    this.updateTechnologyById.next(data);
  }

  /**
   * getTechnologyUpdateForUpdate
   * @returns data as observeble
   */
   public getTechnologyForUpdate (): Observable<Technology> {
    return this.updateTechnologyById.asObservable();
  }

}
