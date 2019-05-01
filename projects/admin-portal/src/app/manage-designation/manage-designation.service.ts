/**
 * @author Rayhan Kasli
 * @createdDate 22-03-2013
 * @description This service file is communication between component to server
 *
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// -------------------------------------------- //
import { BehaviorSubject, Observable } from 'rxjs/';
import { EnvironmentConfigService } from '../core/environment-config/environment-config.service';
import { Designation } from './designation.model';

/**
 * ManageDesignationService is use to perform opration like add, upadate, delete designation with server
 */
@Injectable({
  providedIn: 'root'
})
export class ManageDesignationService {

  /** serviceUrl store url of server */
  public serviceUrl: string;

  /** insertDesignation */
  public insertDesignation: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /** updateDesignationById */
  public updateDesignationById: BehaviorSubject<Designation> = new BehaviorSubject<Designation>(null);

  /**
   * Creates an instance of manage designation service.
   * @param httpClient inject HttpClient class to interact with server
   * @param environmentConfigService inject environmentConfigService class for  interact with server
   */
  constructor (private httpClient: HttpClient, private environmentConfigService: EnvironmentConfigService) {
    this.serviceUrl = environmentConfigService.getBaseUrl();
  }

  /**
   * Gets all designation data using get method of HttpClient
   * @returns all designation data from server
   */
  public getAllDesignation (): Observable<Designation[]> {
    return this.httpClient.get<Designation[]>(this.serviceUrl + 'Designation');
  }

  /**
   * Gets all designation data by their unique id
   * @returns designation data from server as per designation id
   */
  public getDesignationById (designationId: number): Observable<Designation> {
    return this.httpClient.get<Designation>(this.serviceUrl + 'Designation/' + designationId);
  }

  /**
   * createDesignation method is used to add new designation
   * @param designation get the designation data from component
   * @returns designation Observable
   */
  public createDesignation (designation: { [key: string]: string }): Observable<Designation> {
    return this.httpClient.post<Designation>(this.serviceUrl + 'Designation', designation);
  }

  /**
   * editDesignation is used to Update designation as per designation id
   * @param designation get the updated data of designation
   * @returns designation observable
   */
  public updateDesignation (designation: { [key: string]: number | string }): Observable<Designation> {
    return this.httpClient.put<Designation>(this.serviceUrl + 'Designation/' + designation.designationId, designation);
  }

  /**
   * Removes designation
   * @param designationId get unique designation id for delete designation
   * @returns designation Observable
   */
  public deleteDesignation (designationId: number): Observable<Designation[]> {
    return this.httpClient.delete<Designation[]>(this.serviceUrl + 'Designation/' + designationId);
  }

  /**
   * Sets designation insert
   * @param flagInsert
   */
  public setDesignationInsert (flagInsert: boolean): void {
    this.insertDesignation.next(flagInsert);
  }

  /**
   * setDesignationUpdateForUpdate
   */
  public setDesignationForUpdate (data: Designation): void {
    this.updateDesignationById.next(data);
  }

  /**
   * getDesignationUpdateForUpdate
   * @returns data as observeble
   */
  public getDesignationForUpdate (): Observable<Designation> {
    return this.updateDesignationById.asObservable();
  }

}
