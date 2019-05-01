/**
 * @author - Naim Shaikh
 * @createdDate 05-04-2019
 * @description - This service file are communication between component to server.
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/';
// ----------------------------------------------------------------------------------------------
import { EnvironmentConfigService } from '../core/environment-config/environment-config.service';
import { Onboarding } from './onboarding.model';
import { Domain } from '../manage-domain/domain.model';
/**
 * Injectable - This is use for createing service
 */
@Injectable({
  providedIn: 'root'
})
export class MaintainOnboardingService {

  /** Declare the URL variable for server */
  public serviceUrl: string;

  /** insertActivity */
  public insertActivity: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /** updateOnboardingById */
  public updateOnboardingById: BehaviorSubject<Onboarding> = new BehaviorSubject<Onboarding>(null);
  /**
   * Creates an instance of manage onboarding service.
   * @param httpClient inject HttpClient class to interact with server
   * @param environmentConfigService inject environmentConfigService class for  interact with server
   */
  constructor(private http: HttpClient,
    private environmentConfigService: EnvironmentConfigService) {
    this.serviceUrl = environmentConfigService.getBaseUrl();
  }
  /**
   * getDomain method all the data of the domain
   * @returns domain observable
   */
  public getDomain(): Observable<Domain[]> {
    return this.http.get<Domain[]>(this.serviceUrl + 'Domain');
  }
  /**
   * getOwner method all the data of the owner
   * @returns owner observable
   */
  public getOwner(): Observable<Onboarding[]> {
    return this.http.get<Onboarding[]>(this.serviceUrl + 'OnboardingActivity');
  }

  /** getAllActivityList method are get all activity details from the server */
  public getAllActivityList(): Observable<Onboarding[]> {
    return this.http.get<Onboarding[]>(this.serviceUrl + 'OnboardingActivity');
  }
  /**
   * Gets all activity list by id
   * @param activityId - get the onboarding data by id
   *
   */
  public getActivityListById(activityId: number): Observable<Onboarding> {
    return this.http.get<Onboarding>(this.serviceUrl + 'OnboardingActivity/' + activityId);
  }
  /**
   * createActivity method are add new activity in the server
   * @param onboardingData  - get the onboarding data
   */
  public createActivity(onboardingData: { [key: string]: string | number }): Observable<Onboarding> {
    return this.http.post<Onboarding>(this.serviceUrl + 'OnboardingActivity', onboardingData);
  }
  /**
   * updateActivity method are update the activity deatils on server
   * @param onboarding - get update deatils as per activity
   */
  public updateActivity(onboarding: { [key: string]: string | number }, activityId: number): Observable<Onboarding> {
    return this.http.put<Onboarding>(this.serviceUrl + 'OnboardingActivity/' + activityId, onboarding);
  }
  /**
   * deleteActivityById method are used for delete the record from onboarding
   * @param activityId - delete the record as per activity id
   */
  public deleteActivityById(activityId: number): Observable<Onboarding> {
    return this.http.delete<Onboarding>(this.serviceUrl + 'OnboardingActivity/' + activityId);
  }
  /**
   * Sets activity insert
   * @param flagInsert
   */
  public setActivityInsert(flagInsert: boolean): void {
    this.insertActivity.next(flagInsert);
  }
  /**
   * setOnboardingForUpdate
   */
  public setOnboardingForUpdate(data: Onboarding): void {
    this.updateOnboardingById.next(data);
  }
  /**
   * getOnboardingForUpdate
   * @returns data as observeble
   */
  public getOnboardingForUpdate(): Observable<Onboarding> {
    return this.updateOnboardingById.asObservable();
  }
}
