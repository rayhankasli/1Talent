/**
 * @author Rayhan Kasli
 * @createdDate 22-03-2013
 * @description This component file is used for add new or edit existing designation
 */
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

// ----------------------------------- //
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs/';
import { LoaderService } from '../../core/loader/loader.service';
import { Designation, ManageDesignationModal, ManageOverlayHeading } from '../designation.model';
import { ManageDesignationService } from '../manage-designation.service';
import { validateName } from '../validation/form.validator';
import { takeUntil } from 'rxjs/operators';

/**
 * OverlayModalComponent it is use to add new or edit existing designation
 */
@Component({
  selector: 'one-talent-overlay-modal',
  styleUrls: ['./overlay-modal.component.scss'],
  templateUrl: './overlay-modal.component.html'
})
export class OverlayModalComponent implements OnInit, OnDestroy {

  /** addDesignationForm define the formgroup for add or update designation  */
  public addDesignationForm: FormGroup;

  /** modalHeading define the heading of model like add new designation or edit designation */
  public modalHeading: string = ManageOverlayHeading.AddNewDesignation;

  /** isModalShow it is used emitting value for open or close overlay modal */
  @Output() public isModalShow: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** destroy$ are use for unsubscribe the subscribe observable */
  public destroy$: Subject<boolean> = new Subject<boolean>();


  /**
   * Creates an instance of overlay modal component.
   * @param manageDesignationService inject ManageDesignationService service
   * @param formBuilder inject Form Builder for to create a form group
   * @param toastr inject ToastrService for display Toastr message
   * @param loaderService inject the LoaderService for display loader untill the data is not renderd
   */
  constructor(private manageDesignationService: ManageDesignationService, private formBuilder: FormBuilder,
              private toastr: ToastrService, private loaderService: LoaderService) { }

  public ngOnInit(): void {
    this.addDesignationForm = this.formBuilder.group({
      designationId: [''],
      designationTitle: ['', Validators.compose([Validators.required, Validators.maxLength(30), validateName])]
    });

    this.manageDesignationService.updateDesignationById.pipe(
      takeUntil(this.destroy$)
    ).subscribe((response: Designation) => {
      if (response) {
        this.editDesignation();
      }
    });
    this.manageDesignationService.setDesignationForUpdate(null);
  }

  /**
   * designationTitle is used to put validation on designationTitle filed
   * @author Rayhan Kasli
   * @createdDate 29-03-2019
   */
  public get designationTitle(): AbstractControl {
    return this.addDesignationForm.get('designationTitle');
  }

  /**
   * addDesignation method is used to add new or update existing designation
   * @author Rayhan Kasli
   * @craetedDate 25-03-2019
   */
  public addDesignation(): void {
    const designationData: Designation = this.addDesignationForm.value;
    const designationId: Designation = this.addDesignationForm.controls.designationId.value;
    if (this.addDesignationForm.invalid) {
      this.toastr.error(ManageDesignationModal.InvalidValue, ManageDesignationModal.ErrorMessage);
    } else if (designationId) {
      this.loaderService.displayLoader(true);
      const updateDesignationData: { [key: string]: number | string } = {
        designationId: designationData.designationId,
        designationTitle: designationData.designationTitle
      };
      this.manageDesignationService.updateDesignation(updateDesignationData)
        .pipe(
          takeUntil(this.destroy$)
        ).subscribe(() => {
          this.addDesignationFormHide();
          this.manageDesignationService.setDesignationInsert(true);
        },          (error: HttpErrorResponse) => {
          this.errorHandler(error);
        });
    } else {
      this.loaderService.displayLoader(true);
      const addNewDesignationData: { [key: string]: string } = {
        designationTitle: designationData.designationTitle
      };
      this.manageDesignationService.createDesignation(addNewDesignationData)
        .pipe(
          takeUntil(this.destroy$)
        ).subscribe(() => {
          this.addDesignationFormHide();
          this.manageDesignationService.setDesignationInsert(true);
        },          (error: HttpErrorResponse) => {
          this.errorHandler(error);
        });
    }
  }
  /**
   * editDesignation method is use to fill data into form for update
   * @author Rayhan Kasli
   * @createdDate 25-03-2019
   */
  public editDesignation(): void {
    this.manageDesignationService.getDesignationForUpdate()
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe((designation: Designation) => {
        if (designation != null) {
          this.modalHeading = ManageOverlayHeading.EditDesignation;
          this.addDesignationForm.controls.designationId.setValue(designation.designationId);
          this.addDesignationForm.controls.designationTitle.setValue(designation.designationTitle);
        }
      },          (error: HttpErrorResponse) => {

        this.errorHandler(error);
      });
  }

  /**
   * addDesignationFormHide method is use to hide the designation form
   * @author Rayhan Kasli
   * @createdDate 25-03-2019
   */
  public addDesignationFormHide(): void {
    this.addDesignationForm.reset();
    this.modalHeading = ManageOverlayHeading.AddNewDesignation;
    this.isModalShow.emit(false);
  }

  /**
   * errorHandler handle the server error
   * @param error contains error which is throw by server
   * @author Rayhan Kasli
   * @createdDate 28-03-2019
   */
  public errorHandler(error: HttpErrorResponse): void {
    if (error.status === 404) {
      this.toastr.error(ManageDesignationModal.NotFound, ManageDesignationModal.ErrorMessage);
    } else if (error.status === 400) {
      this.toastr.error(error.error.errors[0].DesignationTitle, ManageDesignationModal.ErrorMessage);
    } else if (error.status === 500) {
      this.toastr.error(ManageDesignationModal.InternalServerError, ManageDesignationModal.ErrorMessage);
    } else if (error.status === 405) {
      this.toastr.error(ManageDesignationModal.MethodNotAllowed, ManageDesignationModal.ErrorMessage);
    }
    this.loaderService.displayLoader(false);
  }

  /**
   * Validations overlay modal component
   * @param event
   */
  public validation (event: any): void {
    if (event.keyCode === 32 && event.target.selectionStart === 0 && event.keyCode !== 9) {
      event.preventDefault();
    }
  }
  /**
   * ngOnDestroy for unsubscribe
   */
  public ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe();
  }

}
