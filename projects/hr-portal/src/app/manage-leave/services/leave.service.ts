/**
 * @author: Mayur Patel
 * @created date: 05/04/2019
 * @description: In this service, http calls for getting the records is performed.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentConfigService } from '../../core/environment-config/environment-config.service';
import { Observable } from 'rxjs';
import { Leave, LeaveStatus } from '../model/leave.model';
/** used for service dependency */
@Injectable({
  providedIn: 'root'
})
/**
 * @author: Mayur Patel
 * @created date: 05/04/2019
 * @description:This service is used for http calls
 */
export class LeaveService {

  /** url for the http call */
  public baseUrl: string;
  
  constructor (private http: HttpClient, private environmentConfigService: EnvironmentConfigService ) {
    this.baseUrl = environmentConfigService.getBaseUrl();
  }
  /**
   * Gets all the leave records
   * @author: Mayur Patel
   * @created date: 05/04/2019
   * @returns all leaves
   */
  public getAllLeaves (): Observable<Leave[]> {
    return this.http.get<Leave[]>(this.baseUrl + 'leaves/all');
  }
  /**
   * Gets all the leave according to the status
   * @param : statusId of the leave
   * @author: Mayur Patel
   * @created date: 05/04/2019
   * @returns all leaves based on status id
   */
  public getLeavesByStatus (statusId:number): Observable<Leave[]> {
    return this.http.get<Leave[]>(this.baseUrl + 'leaves/status/' + statusId);
  }
 
  /**
   * Updates leave record by leave id
   * @param : leaveId of the record and leave status id of the records
   * @author: Bhumi Desai
   * @created date: 06/04/2019
   * @returns all the updated leaves 
   */
  public updateLeaveById (leaveId: number,leaveStatusId: number): Observable<number> {
    return this.http.put<number>(this.baseUrl + 'leaves/' + leaveId ,{'leaveStatusId':leaveStatusId});
  }
  /**
   * Gets all the leave records between from-date and to-date
   * @author: Bhumi Desai
   * @created date: 08/04/2019
   * @returns all leaves between the filtered dates
   */
  public getLeavesFromDateToDate (FromDate: string,ToDate: string): Observable<Leave[]> {
    return this.http.get<Leave[]>(this.baseUrl + 'leaves?FromDate=' + FromDate + '&ToDate=' + ToDate);
  }

  /**
   * Gets leaves by name
   * @author: Bhumi Desai
   * @created date: 20/04/2019
   * @param firstName : first name 
   * @returns leaves by name 
   */
  public getLeavesByName (firstName: string): Observable<Leave[]> {
    return this.http.get<Leave[]>(this.baseUrl + 'leaves/name/' + firstName);
  }
  
  /**
   * Gets status of the leaves
   * @author: Bhumi Desai
   * @created date: 20/04/2019 
   */
  public getStatus (): Observable<LeaveStatus[]> {
    return this.http.get<LeaveStatus[]>(this.baseUrl + 'leaves/status');
  }

}
