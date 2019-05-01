import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/';
import { EnvironmentConfigService } from '../../core/environment-config/environment-config.service';
import { VacancyDetails } from './vacancy-details.model';

/**  Inject the Service Vacancy Details Service */
@Injectable({
  providedIn: 'root',
})
export class VacancyDetailsService {

  /** Base url of vacancy details service */
  private baseUrl: string;
 
  constructor (private http: HttpClient, private environmentConfigService: EnvironmentConfigService) {
    this.baseUrl = environmentConfigService.getBaseUrl();
   }
   /** Get the details of the Vacancy */
  public getVacancyDetail (vacancyId: number): Observable<VacancyDetails> {
    console.log(vacancyId);
    return this.http.get<VacancyDetails>(this.baseUrl + 'career/' + vacancyId);
   }
}
