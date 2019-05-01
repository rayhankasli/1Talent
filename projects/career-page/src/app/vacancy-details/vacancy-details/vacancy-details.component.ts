import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../core/loader/loader.service';
import { VacancyDetails, VacancyDetailsErrorListMessage } from './vacancy-details.model';
import { VacancyDetailsService } from './vacancy-details.service';
/**
 * Component
 */
@Component({
  selector: 'one-talent-vacancy-details',
  styleUrls: ['./vacancy-details.component.scss'],
  templateUrl: './vacancy-details.component.html',
})
export class VacancyDetailsComponent implements OnInit {

  /** Selected Vacancy for vacancy card id of vacancy details component */
  public vacancyId: number;
  /** Vacancy datails of vacancy details component */
  public vacancyDatails: VacancyDetails;
  /** Job title of is input field of the banner component pass it vacancy details component */
  public jobTitle: string;
  /** Job location of is input field of the banner component of pass it vacancy details component */
  public jobDescription: string;
  
  constructor (private route: ActivatedRoute, private vacancyDetailService: VacancyDetailsService,
               private _loaderService: LoaderService, private _toastr: ToastrService ) {
    this.vacancyId = this.route.snapshot.params.id;
    this._loaderService.displayLoader(true);
   }

  /** On Init Call the Get single vacancy details()  */
  public ngOnInit (): void {
    this.getSingleVacancyDetails(this.vacancyId);
  }
 
  /** Get Vacancy details of Vacancy Id */
  public getSingleVacancyDetails (vacancyId: number): void {
    this._loaderService.displayLoader(true);
    this.vacancyDetailService.getVacancyDetail(vacancyId).subscribe((response: VacancyDetails) => {
      this.vacancyDatails = response;
      this.jobTitle=response.jobName;
      this.jobDescription='Location: '+response.countryName;
      this._loaderService.displayLoader(false);
    },                                                              (error: HttpErrorResponse) => {
        this._loaderService.displayLoader(true);
        if (error.status === 404) {
        this._toastr.error(VacancyDetailsErrorListMessage.InvalidValue, VacancyDetailsErrorListMessage.ErrorMessage);
      } else if (error.status === 204) {
        this._toastr.error(VacancyDetailsErrorListMessage.ContentError, VacancyDetailsErrorListMessage.ErrorMessage);
      } else if (error.status === 500) {
        this._toastr.error(VacancyDetailsErrorListMessage.InternalError, VacancyDetailsErrorListMessage.ErrorMessage);
      }
    });
  }

}
