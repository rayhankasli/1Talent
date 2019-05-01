/**
 * @author : Gaurang Valia
 * @class : OpenPositionsComponent
 * Created Date : 20-03-2019
 */
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Designation, Country, Technology, Domain, OpenPositions } from '../model/current-vacancies.model';
import { CurrentVacanciesService } from '../service/current-vacancies.service';
/**
 * This is the Component decorator.
 * Component selector, scss and html files are declared here
 */
@Component({
  selector: 'one-talent-open-positions',
  styleUrls: ['./open-positions.component.scss'],
  templateUrl: './open-positions.component.html',
})
// Display the Open Position
export class OpenPositionsComponent implements OnInit {
  /**
   * all the Designation records will be stored in this variable.
   * this variable will be used in template to display the records.
   */
  public designations: Designation[] = [];
  /** Country  of open positions componen */
  public country: Country[] = [];
  /** Technology  of open positions component */
  public technology: Technology[] = [];
  /** Domain  of open positions component */
  public domain: Domain[] = [];
  /** Open position group of open positions vacancies */
  public openPositionGroup: FormGroup;
  /** Selected country of open positions component */
  public selectedCountry: number;
  /** Btndisable  of open positions component */
  public btndisable: boolean;
  /** Open position of open positions component*/
  public openPosition: OpenPositions;
  /** Emit the OpenPositions Modele type data */
  @Output() public filterOptionsEvent: EventEmitter<OpenPositions> = new EventEmitter<OpenPositions>();

  constructor (private openPositionService: CurrentVacanciesService, private fb: FormBuilder) {
    this.btndisable = true;
  }

  /** On Init getDesignationlist method to display the list is called */
  public ngOnInit (): void {
    this.openPositionGroup = this.fb.group({
    countryId: new FormControl(0),
    designationId: new FormControl(0),
    domainId : new FormControl(0),
    technologyId: new FormControl(0 ),
   });
    this.getCountryList();
    this.openPositionGroup.controls.technologyId.disable();
 }
  /** Search the position of Client filter */
  public checkBtnOpenPosition (): void {
    if (this.openPositionGroup.controls.countryId.value !== 0 || this.openPositionGroup.controls.domainId.value !== 0
      || this.openPositionGroup.controls.technologyId.value !== 0 || this.openPositionGroup.controls.designationId.value !== 0 )
    {
      this.btndisable = false;
    } else {
      this.btndisable = true;
    }
  }
  /** Get all the Designation list here */
  public getDesignationList (): void {
    this.openPositionService.getAllDesignationList().subscribe((response: Designation[]) => {
      this.designations = response;
    });
  }
  /** Get all the Country list here */
  public getCountryList (): void {
    this.openPositionService.getAllCountryList().subscribe((response: Country[]) => {
      this.country = response;
      this.getDomainlist();
    });
  }
  /** Get all the Technology list here */
  public getTechnologylist (): void {
    this.openPositionService.getAllTechnologyList().subscribe((response: Technology[]) => {
      this.technology = response;
      this.getDesignationList();
    });
  }
  
  /** Get all the Technology list here */
  public getDomainlist (): void {
    this.openPositionService.getAllDomainList().subscribe((response: Domain[]) => {
      this.domain = response;
      this.getTechnologylist();
    });
  }

  /** Change event in get Selected domain */
  public getSelectedDomain (event: any): void {
    console.log(event);
    const selectedOptions: any = event.target.options;
    const selectedIndex: number = selectedOptions.selectedIndex;
    const selectElementText: string = selectedOptions[selectedIndex].text;
    console.log(selectElementText);
    selectElementText.toLowerCase();
    if (selectElementText === 'technology') {
       this.openPositionGroup.controls.technologyId.enable();
    } else {
       this.openPositionGroup.controls.technologyId.disable();
       this.openPositionGroup.controls.technologyId.setValue(0);
    }
    this.checkBtnOpenPosition();
  }
  /** Selected country */
  public getSelectCountry (): void {
    this.checkBtnOpenPosition();
  }

  /** Selected technology */
  public getSelectedTechnology():void{
    this.checkBtnOpenPosition();
  }

  /** Selected designation */
  public getSelectedDesignation():void{
    this.checkBtnOpenPosition();
  }

  /** Filters byselection Of Domain by Technology and Emit the value of form */
  public filterByselection():void {
    this.openPositionGroup.controls.technologyId.enable();
    this.filterOptionsEvent.emit(this.openPositionGroup.value);
    this.openPositionGroup.controls.technologyId.disable();
    this.openPositionGroup.reset({technologyId:0,countryId:0,designationId:0,domainId:0});
  }
}
