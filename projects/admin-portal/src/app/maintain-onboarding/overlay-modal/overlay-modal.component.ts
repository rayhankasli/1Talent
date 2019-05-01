/**
 * @author - Naim Shaikh
 * @createDate 06-04-2019
 * @description - This component file are use for add and edit Onboarding.
 */
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs/';
import { takeUntil } from 'rxjs/operators';
// --------------------------------------------------------------------------------------------
import { LoaderService } from '../../core/loader/loader.service';
import { MaintainOnboardingService } from '../maintain-onboarding.service';
import { MaintainOnboardingModal, ManageOverlayHeading, Onboarding } from '../onboarding.model';
import { validateName } from '../validation/form.validator';
import { Domain } from '../../manage-domain/domain.model';
/**
 * Component - This component use for decorate the class
 */
@Component({
  selector: 'one-talent-overlay-modal',
  styleUrls: ['./overlay-modal.component.scss'],
  templateUrl: './overlay-modal.component.html'
})
export class OverlayModalComponent implements OnInit, OnDestroy {

  /** onboardingForm use for Formgroup  */
  public onboardingForm: FormGroup;

  /** ownerList use for activity */
  public ownerList: Onboarding[];

  /** Domain for the dropdown */
  public domainList: Domain[];

  /** modalHeading define the heading of model like and new activity or edit activity */
  public modalHeading: string = ManageOverlayHeading.AddNewActivity;
  /**
   * destroy$ are use for unsubscribe the subscribe observable
   */
  public destroy$: Subject<boolean> = new Subject<boolean>();

  /** isModalShow it is used emitting value for open or close overlay modal */
  @Output() public isModalShow: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * inject the service.
   * @param activityService - for onboarding service
   * @param formBuilder - for usnig form builder in reactive forms
   * @param toastr - for using tostr message
   * @param loaderService - for display loader
   */
  constructor(
    private activityService: MaintainOnboardingService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private loaderService: LoaderService
  ) { }
  /**
   *  load the Onboarding using ngOnInit method
   */
  public ngOnInit(): void {
    this.onboardingForm = this.formBuilder.group({
      activityName: ['', Validators.compose([Validators.required, Validators.maxLength(50), validateName])],
      description: ['', Validators.maxLength(200)],
      domainId: [''],
      ownerId: [''],
      onboardingActivityId: []
    });
    this.getDomainList();
    this.getOwnerList();
    this.activityService.updateOnboardingById.pipe(
      takeUntil(this.destroy$)
    ).subscribe((response: Onboarding) => {
      if (response) {
        this.editOnboarding();
      }
    });
    this.activityService.setOnboardingForUpdate(null);
  }
  /**
   * validationForm is used to put validation on Onboarding form
   */
  // tslint:disable-next-line:typedef
  public get validationForm() {
    return this.onboardingForm.controls;
  }
  /**
   * getDomainList get all the domain data and fill in domain dropdown list
   */
  public getDomainList(): void {
    this.activityService.getDomain().pipe(
      takeUntil(this.destroy$)
    ).subscribe((domainData: Domain[]) => {
      this.domainList = domainData;
    });
  }
  /**
   * getOwnerList get all the owner data and fill in owner dropdown list
   */
  public getOwnerList(): void {
    this.activityService.getOwner().pipe(
      takeUntil(this.destroy$)
    ).subscribe((OwnerData: Onboarding[]) => {
      this.ownerList = OwnerData;
    });
  }
  /**
   * First of fall check the form is valid after then perform create the new record
   * when user submit the create buttton then add new record on server
   * when user submit the upadte  button then upadte existing record on the server
   */
  public addActivity(): void {
    const onboardingData: Onboarding = this.onboardingForm.value;
    const activityId: Onboarding = this.onboardingForm.controls.onboardingActivityId.value;
    if (this.onboardingForm.invalid) {
      this.toastr.error(MaintainOnboardingModal.InvalidValue, MaintainOnboardingModal.ErrorMessage);
    } else if (!!activityId) {
      this.loaderService.displayLoader(true);
      const updateOnboardingData: { [key: string]: string | number } = {
        activityName: onboardingData.activityName,
        domainId: onboardingData.domainId,
        description: onboardingData.description,
        ownerId: onboardingData.ownerId
      };
      this.activityService.updateActivity(updateOnboardingData, onboardingData.onboardingActivityId).pipe(
        takeUntil(this.destroy$)
      ).subscribe(() => {
        this.addOnboardingHideForm();
        this.activityService.setActivityInsert(true);
        this.modalHeading = ManageOverlayHeading.AddNewActivity;
      },
        (error: HttpErrorResponse) => {
          this.errorHandler(error);
        });
    } else {
      this.loaderService.displayLoader(true);
      const addNewOnboardingData: { [key: string]: string | number } = {
        activityName: onboardingData.activityName,
        domainId: onboardingData.domainId,
        description: onboardingData.description,
        ownerId: onboardingData.ownerId
      };
      this.activityService.createActivity(addNewOnboardingData).pipe(
        takeUntil(this.destroy$)
      ).subscribe(() => {
        this.onboardingForm.reset();
        this.addOnboardingHideForm();
        this.activityService.setActivityInsert(true);
      }, (error: HttpErrorResponse) => {
        this.errorHandler(error);
      });
    }
  }
  /**
   * Loads onboarding to edit
   * @param onboarding - upadet record using onboarding
   */
  public editOnboarding(): void {
    this.activityService.getOnboardingForUpdate().pipe(
      takeUntil(this.destroy$)
    ).subscribe((onboarding: Onboarding) => {
      if (onboarding != null) {
        this.modalHeading = ManageOverlayHeading.EditActivity;
        this.onboardingForm.controls.onboardingActivityId.setValue(onboarding.onboardingActivityId);
        this.onboardingForm.controls.activityName.setValue(onboarding.activityName);
        this.onboardingForm.controls.description.setValue(onboarding.description);
        this.onboardingForm.controls.domainId.setValue(onboarding.domainId);
        this.onboardingForm.controls.ownerId.setValue(onboarding.ownerId);
      }
    }, (error: HttpErrorResponse) => {
      this.errorHandler(error);
    });
  }
  /**
   * addOnboardingHideForm method use for hide form
   */
  public addOnboardingHideForm(): void {
    this.onboardingForm.reset();
    this.modalHeading = ManageOverlayHeading.AddNewActivity;
    this.isModalShow.emit(false);
  }
  /**
   * Avoids first blank space
   */
  public avoidFirstBlankSpace(event: any): void {
    if (event.keyCode === 32 && event.target.selectionStart === 0 && event.keyCode !== 9) {
      event.preventDefault();
    }
  }
  /**
   * errorHandler handle the server error
   * @param errorCode contains error code which is throw by server
   */
  public errorHandler(error: HttpErrorResponse): void {
    if (error.status === 404) {
      this.toastr.error(MaintainOnboardingModal.NotFound, MaintainOnboardingModal.ErrorMessage);
    } else if (error.status === 400) {
      this.toastr.error(error.error.errors[0].ActivityName, MaintainOnboardingModal.ErrorMessage);
    } else if (error.status === 500) {
      this.toastr.error(MaintainOnboardingModal.InternalServerError, MaintainOnboardingModal.ErrorMessage);
    } else if (error.status === 405) {
      this.toastr.error(MaintainOnboardingModal.MethodNotAllowed, MaintainOnboardingModal.ErrorMessage);
    }
    this.loaderService.displayLoader(false);
  }

  /**
   * ngOnDestroy for unsubscribe
   */
  public ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe();
  }
}
