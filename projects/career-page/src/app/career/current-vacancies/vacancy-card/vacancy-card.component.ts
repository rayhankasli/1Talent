/**
 * @author : Gaurang Valia
 * @class : VacancyCardComponent
 * @description: this component is use for the display vacancy Cards and check the available vacancies
 * Created Date : 25-03-2019
 */
import { Component,  Input, OnChanges } from '@angular/core';
import { VacancyAnimation } from './vacancyAnimation';
import { Vacancy } from '../model/current-vacancies.model';
// -------------
type Orientation = ('prev' | 'next' | 'none');
/**
 * This is the Component decorator.
 * Component selector, scss, animation and html files are declared here
 */
@Component({
  animations: [VacancyAnimation.cardAnimation],
  selector: 'one-talent-vacancy-card',
  styleUrls: ['./vacancy-card.component.scss'],
  templateUrl: './vacancy-card.component.html',
})
/**  Display vacancy Cards */
export class VacancyCardComponent implements OnChanges {
  
  /** Orientation  of vacancy card component */
  public orientation: Orientation;
  /** pervCounter: it will count the array previous length */
  public prevCounter: number;
  /** nextCounter: it will count the array next length  */
  public nextCounter: number;
  /** IsNextAvailable: check the next click Button is available or not */
  public isNextAvailable: boolean;
  /** IsPrevAvailable: check the previous click Button is available or not */
  public isPrevAvailable: boolean;
  /**  Diplay vacancies of vacancy card component is use to display the dom side all vacancies */
  public diplayVacancies: Vacancy[];
  /** Counter the vacancies length */
  public counter: number;
  /** Countercheck for length of vacancy card component */
  public counterCheck:boolean;
  /** vacancyData is type of vacancy */
  private vacancyData: Vacancy[];
  /**
   * Creates an instance of vacancy card component.
   * @param _service: refernce of VacancyService and is use to call all the service method
   * @param _toastr : its is use to some problem to API side this tostr will display the msg
   * @param _loaderService : its is use to fatch the data to server this time loader will display
   */
  constructor() {
    this.orientation = 'none';
    this.prevCounter = 0;
    this.nextCounter = 3;
    this.isNextAvailable = false;
    this.isPrevAvailable = true;
    this.counterCheck = false;
  }
   /** Every change of this component,and Current-vacancies component OnChaneg() method is called */
   ngOnChanges(): void {
    this.orientation = 'none';
    this.prevCounter = 0;
    this.nextCounter = 3;
    this.isNextAvailable = false;
    this.isPrevAvailable = true;
    if(this.vacanciesDataList){
      this.displayVacancy(); 
    }
  }
  /** Gets vacancies data list return */
  get vacanciesDataList(): Vacancy[] {
    return this.vacancyData;
  }
  /** Sets The data of vacancy list */
  @Input()
  set vacanciesDataList(vacancyData: Vacancy[]) {
    this.vacancyData = vacancyData;
  }
  /**
   * DisplayVacancy() is subscribe the getVacancy() and fetch the response also is call the nextVacancyload() method
   * @author : Gaurang Valia
   * Created Date : 25-03-2019
   */
  public displayVacancy(): void {
      this.counter = this.vacanciesDataList.length;
      if(this.counter === 0){
        this.counterCheck= true;        
      }else{
        this.counterCheck= false;
      }
      this.nextVacancyLoad();
      this.isPrevAvailable = true;
  }
  /**
   * nextVacancyLoad() is display the next 3 vacancy of Vacancies
   * @author : Gaurang Valia
   * Created Date : 26-03-2019
   */
  public nextVacancyLoad(): void {
    if (!this.isNextAvailable) {
      this.orientation = 'next';
      this.diplayVacancies = [];
      this.isPrevAvailable = false;
      this.diplayVacancies = this.vacanciesDataList.slice(this.prevCounter, this.nextCounter);
      if (this.counter <= 3) {
        this.isNextAvailable = true;
      }
      if (this.nextCounter < this.vacanciesDataList.length) {
        this.prevCounter += 3;
        this.nextCounter += 3;
        this.counter -= 3;
      }
    }
  }
  /**
   * prevVacancyLoad() is display the previous 3 vacancy of Vacancies
   * @author : Gaurang Valia
   * Created Date : 26-03-2019
   */
  public prevVacancyLoad(): void {
    //let asd: boolean = false; asd = this.isNextAvailable ? true : false; TODO list
    if (!this.isPrevAvailable) {
      this.orientation = 'prev';
      this.isNextAvailable = false;
      if (this.prevCounter > 0) {
        this.diplayVacancies = [];
        this.prevCounter -= 3;
        this.nextCounter -= 3;

        this.counter += 3;
        this.diplayVacancies = this.vacanciesDataList.slice(this.prevCounter, this.nextCounter);
        // TODO
        // if(asd) {
        //     this.prevCounter = 3;
        //     this.nextCounter = 6;
        //   }
      }
      if (this.prevCounter < 3) {
        this.isPrevAvailable = true;
      }
    }
  }
}
