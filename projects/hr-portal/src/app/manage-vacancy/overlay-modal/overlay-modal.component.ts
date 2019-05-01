import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../core/loader/loader.service';
import { VacancyService } from '../services/vacancy.service';
import { Country, Designation, Domain, Technology, ToastrErrorMessage, ToastrErrorStatus204,
   ToastrErrorStatus400, ToastrErrorStatus401, ToastrErrorStatus404, ToastrErrorStatus500,
    ToastrInsertSuccessMessage, ToastrUpdateSuccessMessage, Vacancy, ManageOverlayHeading } from '../vacancy.model';
import { validateCharacters, validateNumberAndPlus, validateOnlyNumber, validateSalary } from '../validators/form.validator';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs/internal/Subscription';

/**
 * This is the Component decorator.
 * Component selector, scss adn html files are declared here
 */
@Component({
  selector: 'one-talent-overlay-modal',
  styleUrls: ['./overlay-modal.component.scss'],
  templateUrl: './overlay-modal.component.html'
})

export class OverlayModalComponent implements OnInit {
  
  /** current date */
  public today: string | Date;
  /** minimum date  of overlay modal component */
  public minDate: Date;
  /** maximum date  of overlay modal component */
  public maxDate: Date;
  /** vacancyForm is the FormGroup */
  public vacancyForm: FormGroup;
  /** Domain for the dropdown */
  public domain: Domain[];
  /** Technology for the dropdown */
  public technology: Technology[];
  /** Designation for the dropdown */
  public designation: Designation[];
  /** Country for the dropdown */
  public country: Country[];
  /** id of the record to be updated */
  public updateId: number;
  /** boolean value for scheduling the vacancy */
  public isSchedule: boolean;
  /** boolean value for publishing the vacancy */
  public isPublish: boolean;
  /** Scheduled date of overlay modal component */
  public scheduledDate: string;
  /** modalHeading define the heading of model */
  public modalHeading: string;
  /** domain Subscription  of overlay modal component */
  public domainSub: Subscription;
  /** technology Subscription  of overlay modal component */
  public technologySub: Subscription;
  /** designation Subscription  of overlay modal component */
  public designationSub: Subscription;
  /** country Subscription  of overlay modal component */
  public countrySub: Subscription;
  /** update vacancy Subscription  of overlay modal component */
  public updateVacancySub: Subscription;
  /** insert vacancy Subscription  of overlay modal component */
  public insertVacancySub: Subscription;
  /**
   * Output  of overlay modal component,
   * it emits boolean value to the list component to open and close the modal form
   */
  @Output() public showEvent: EventEmitter<boolean> = new EventEmitter<boolean>() ;

  constructor (private fb: FormBuilder,
               private loaderService: LoaderService,
               private vacancyService: VacancyService,
               private toastr: ToastrService) {

                this.today = new Date();
                this.today.setDate(this.today.getDate() + 1)
                this.minDate = new Date(this.today);
                this.isSchedule = false;
                this.modalHeading = ManageOverlayHeading.AddNewVacancy;
  }

  /**
   * on init, formcontrols are initialised and dropdown
   *
   */
  public ngOnInit (): void {

    this.vacancyForm = this.fb.group({
      countryId: ['', Validators.required],
      designationId: ['', Validators.required],
      domainId: ['', Validators.required],
      experience: ['', Validators.compose([Validators.required, validateNumberAndPlus])],
      jobDescription: ['', Validators.required],
      jobName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20), validateCharacters])],
      jobStatusId: [''],
      publishDate: [''],
      responsibilities: ['', Validators.required],
      salary: ['',  Validators.compose([Validators.required, validateSalary])],
      technologyId: ['', Validators.required],
      vacancies: ['', Validators.compose([Validators.required, validateOnlyNumber])]
    });
    this.modalHeading = ManageOverlayHeading.AddNewVacancy;
    this.clearAll();
    this.loadDropDown();
    this.editForm();
    this.vacancyService.sendData(null);
  }


  /**
   * when editing the record, form fields value will be set, of the particular record
   * @author: Bhumi Desai
   * @created date: 05/04/2019
   */
  public editForm (): void {
    this.vacancyService.getData().subscribe((response: Vacancy) => {
      if (response != null) {
        this.updateId = response.jobId;
        this.vacancyForm.controls.jobName.setValue(response.jobName);
        this.vacancyForm.controls.vacancies.setValue(response.vacancies);
        this.vacancyForm.controls.experience.setValue(response.experience);
        this.vacancyForm.controls.domainId.setValue(response.domainId);
        this.vacancyForm.controls.technologyId.setValue(response.technologyId);
        this.vacancyForm.controls.designationId.setValue(response.designationId);
        this.vacancyForm.controls.countryId.setValue(response.countryId);
        this.vacancyForm.controls.salary.setValue(response.salary);
        this.vacancyForm.controls.jobDescription.setValue(response.jobDescription);
        this.vacancyForm.controls.responsibilities.setValue(response.responsibilities);
        // this.vacancyForm.controls.jobStatusId.setValue(response.jobStatusId);
        this.vacancyForm.controls.publishDate.setValue(response.publishDate);
        if(response.jobId){
          this.modalHeading = ManageOverlayHeading.EditVacancy;
        }else {
          this.clearAll();
        }
        
      } 
    });
  }

  /**
   * On click of schedule button, this method will be called.
   * @returns if date is not selected
   * @author: Bhumi Desai
   * @created date: 05/04/2019
   */
  public onSchedule (): void {
    if (this.vacancyForm.invalid) {
      this.toastr.error(ToastrErrorMessage.Message, ToastrErrorMessage.MessageType);
      return;
    }
    this.isSchedule = true;
  }

  /**
   * On click of publish button, this method will be called.
   * @author: Bhumi Desai
   * @created date: 05/04/2019
   */
  public onPublish (): void {
    this.isPublish = true;
    this.onSubmit();
  }

  /**
   * value false is emitted when this methos is invoked
   * @author: Bhumi Desai
   * @created date: 25/03/2019
   */
  public closeModalForm (): void {
    this.showEvent.emit(false);
  }

  /** Gets all the form controls. */
  public get formControls () {
    return this.vacancyForm.controls;
  }

  /**
   * Gets all the domain for displaying the dropdown
   * @author: Bhumi Desai
   * @created date: 27/03/2019
   */
  public getDomain (): void {
    this.loaderService.displayLoader(true);
    this.domainSub = this.vacancyService.getDomain().subscribe((response: Domain[]) => {
      this.domain = response;
      this.getTechnology();
    },                                                         (error: HttpErrorResponse) => {

      this.errorHandler(error.status);
    });
  }

  /**
   * Gets all the technology for displaying the dropdown
   * @author: Bhumi Desai
   * @created date: 27/03/2019
   */
  public getTechnology (): void {
    this.technologySub = this.vacancyService.getTechnology().subscribe((response: Technology[]) => {
      this.technology = response;
      this.getDesignation();
    },
                                                                       (error: HttpErrorResponse) => {
       this.errorHandler(error.status);
      });
  }

  /**
   * Gets all the designation for displaying the dropdown
   * @author: Bhumi Desai
   * @created date: 27/03/2019
   */
  public getDesignation (): void {
    this.designationSub = this.vacancyService.getDesignation().subscribe((response: Designation[]) => {
      this.designation = response;
      this.getCountry();
    },                                                                   (error: HttpErrorResponse) => {

      this.errorHandler(error.status);
    });
  }

  /**
   * Gets all the country for displaying the dropdown
   * @author: Bhumi Desai
   * @created date: 27/03/2019
   */
  public getCountry (): void {
    this.countrySub = this.vacancyService.getCountry().subscribe((response: Country[]) => {
      this.country = response;
      this.loaderService.displayLoader(false);
    },                                                           (error: HttpErrorResponse) => {

      this.errorHandler(error.status);
    });
  }

  /**
   * calls the api when the form is opened
   * @author: Bhumi Desai
   * @created date: 28/03/2019
   */
  public loadDropDown (): void {
      this.getDomain();
  }

  /**
   * logic of inserting the records is performed
   * @author: Bhumi Desai
   * @created date: 22/03/2019
   */
  public onSubmit (): void {
    let jobStatus :number=2;
    if (this.vacancyForm.invalid) {
      this.toastr.error(ToastrErrorMessage.Message, ToastrErrorMessage.MessageType);
      return;
    }

    if (this.isPublish) {
      
      jobStatus = 3;
      this.vacancyForm.controls.publishDate.setValue(new Date());
    }

    if (this.isSchedule) {
      jobStatus = 1;
      this.scheduledDate = this.vacancyForm.controls.publishDate.value;
      let datePipe: DatePipe = new DatePipe('en-US');
      this.scheduledDate = datePipe.transform(this.scheduledDate, 'MM/dd/yyyy');
    
      if (this.vacancyForm.controls.publishDate.value) {
        this.vacancyForm.controls.publishDate.setValue(this.scheduledDate);
      } else {
        this.toastr.error(ToastrErrorMessage.Message, ToastrErrorMessage.MessageType);
        return;
      }
    }
    
    if (this.updateId) {
      this.vacancyForm.controls.jobStatusId.setValue(jobStatus);
      this.updateVacancySub = this.vacancyService.updateVacancies(this.vacancyForm.value, this.updateId).subscribe((response: Vacancy) => {
        this.closeModalForm();
        this.vacancyService.setRecordInsert(true);
        this.toastr.success(ToastrUpdateSuccessMessage.Message, ToastrUpdateSuccessMessage.MessageType);
      });

    } else {
        this.vacancyForm.controls.jobStatusId.setValue(jobStatus);
        this.insertVacancySub = this.vacancyService.insertVacancies(this.vacancyForm.value).subscribe((response: Vacancy) => {
        this.closeModalForm();
        this.vacancyService.setRecordInsert(true);
        this.toastr.success(ToastrInsertSuccessMessage.Message, ToastrInsertSuccessMessage.MessageType);
      },                                                                                              (error: HttpErrorResponse) => {

        this.errorHandler(error.status);
      });
    }
  }

  /**
   * Clears all the form fields
   * @author: Bhumi Desai
   * @created date: 25/03/2019
   */
  public clearAll (): void {
    this.vacancyForm.reset({domainId : null, technologyId: null, designationId: null , countryId: null});
  }

  /**
   * Error handler method for error status
   */
  public errorHandler (errorCode: number): void {
    if (errorCode === 404) {
      this.toastr.error(ToastrErrorStatus404.Message, ToastrErrorStatus404.MessageType);
    } else if (errorCode === 204) {
      this.toastr.error(ToastrErrorStatus204.Message, ToastrErrorStatus204.MessageType);
    } else if (errorCode === 400) {
      this.toastr.error(ToastrErrorStatus400.Message, ToastrErrorStatus400.MessageType);
    } else if (errorCode === 401) {
      this.toastr.error(ToastrErrorStatus401.Message, ToastrErrorStatus401.MessageType);
    } else if (errorCode === 500) {
      this.toastr.error(ToastrErrorStatus500.Message, ToastrErrorStatus500.MessageType);
    }
    this.loaderService.displayLoader(false);
  }
  
  // public ngOnDestroy(): void {
  //   this.domainSub.unsubscribe();
  //   this.technologySub.unsubscribe();
  //   this.designationSub.unsubscribe();
  //   this.countrySub.unsubscribe();
  //   this.updateVacancySub.unsubscribe();
  //   this.insertVacancySub.unsubscribe();
  // }

}
