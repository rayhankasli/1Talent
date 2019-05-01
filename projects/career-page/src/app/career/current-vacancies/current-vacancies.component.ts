/**
 * @author : Gaurang Valia
 * @class : CurrentVacanciesComponent
 * @created Date : 20-03-2019
 */
import { Component, OnInit } from '@angular/core';
import { CurrentVacanciesService } from './service/current-vacancies.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../core/loader/loader.service';
import { Vacancy, VacancyErrorListMessage, OpenPositions } from './model/current-vacancies.model';
import { HttpErrorResponse } from '@angular/common/http';
/**
 * This is the Component decorator.
 * Component selector, scss and html files are declared here
 */
@Component({
  selector: 'one-talent-current-vacancies',
  styleUrls: ['./current-vacancies.component.scss'],
  templateUrl: './current-vacancies.component.html',
})
/**
 * This component is all the current vacancy is display
 * and this is perent component of the vacancy card,map, open position and checked status 
 */
export class CurrentVacanciesComponent implements OnInit {
  
  /** Vacancies is a type of vacancy model */
  public vacancies:Vacancy[];
  
  constructor(private vacancyService: CurrentVacanciesService,
    private _toastr: ToastrService, 
    private _loaderService: LoaderService){
      this._loaderService.displayLoader(true);
  }
  /** On init called the frist time of load a current vacancies */
  ngOnInit(): void {
    console.log('parenton intit call');
    this.getAllVacancies();
  }
  /** Gets all the current vacancies */
  getAllVacancies(): void{
    this._loaderService.displayLoader(true);
    this.vacancyService.getVacancy().subscribe((response: Vacancy[]) => {
      this.vacancies = response;
      this._loaderService.displayLoader(false);
    },
                                      (error: HttpErrorResponse) => {
        this._loaderService.displayLoader(true);
        if (error.status === 404) {
          this._toastr.error(VacancyErrorListMessage.InvalidValue, VacancyErrorListMessage.ErrorMessage);
        } else if (error.status === 500) {
          this._toastr.error(VacancyErrorListMessage.InternalError, VacancyErrorListMessage.ErrorMessage);
        }
      });
  }
  /**
   * Selected filter is use to get filtered vacancies
   * @param filterData : This is type of OpenPosition model and it is use the pass id in getVacancyByFilter()
   */
  public selectedFilter(filterData: OpenPositions):void{
    console.log('data by filter selected Option',filterData);
    this._loaderService.displayLoader(true);
    this.vacancyService.getVacancyByFilter(filterData.countryId,filterData.domainId,filterData.designationId,filterData.technologyId).subscribe((response: Vacancy[])=>{
      this.vacancies = response;
      console.log('filteredData',response);
      this._loaderService.displayLoader(false);
    },(error: HttpErrorResponse) => {
      this._loaderService.displayLoader(true);
      if (error.status === 404) {
        this._toastr.error(VacancyErrorListMessage.InvalidValue, VacancyErrorListMessage.ErrorMessage);
      } else if (error.status === 500) {
        this._toastr.error(VacancyErrorListMessage.InternalError, VacancyErrorListMessage.ErrorMessage);
      }
    });
  }
}
