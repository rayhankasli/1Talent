/**
 * @author - Naim Shaikh
 * @createDate 22-03-2019
 * @description - This component file are use for add and edit Domain.
 */
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription, Subject } from 'rxjs/';
// ------------------------------------------------------------------------------
import { LoaderService } from '../../core/loader/loader.service';
import { Domain, ManageDomainModal, ManageOverlayHeading } from '../domain.model';
import { ManageDomainService } from '../manage-domain.service';
import { takeLast, takeUntil } from 'rxjs/operators';
/**
 * Component - This component use for decorate the class
 */
@Component({
  selector: 'one-talent-overlay-modal',
  styleUrls: ['./overlay-modal.component.scss'],
  templateUrl: './overlay-modal.component.html'
})
export class OverlayModalComponent implements OnInit, OnDestroy {

  /** domainListForm use for Formgroup  */
  public domainListForm: FormGroup;

  /** modalHeading define the heading of model like and new domain or edit domain */
  public modalHeading: string = ManageOverlayHeading.AddNewDomain;


  /** isModalShow it is used emitting value for open or close overlay modal */
  @Output() public isModalShow: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * destroy$ are use for unsubscribe the subscribe observable
   */
  public destroy$: Subject<boolean> = new Subject<boolean>();


  /**
   * inject the service.
   * @param domainService - for domain service
   * @param formBuilder - for usnig form builder in reactive forms
   * @param toastr - for using tostr message
   * @param loaderService - for display loader
   */
  constructor(
    private domainService: ManageDomainService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private loaderService: LoaderService
  ) { }
  /**
   *  load the Domian using ngOnInit method
   */
  public ngOnInit(): void {
    this.domainListForm = this.formBuilder.group({
      description: ['', Validators.maxLength(200)],
      domainId: [],
      domainName: ['', Validators.compose([Validators.required, Validators.maxLength(30)])]
    });
    this.domainService.updateDomainById.pipe(
      takeUntil(this.destroy$)
    ).subscribe((response: Domain) => {
      if (response) {
        this.editDomainById();
      }
    });
    this.domainService.setDomainForUpdate(null);
  }

  /**
   * domainValidation is used to put validation on domain form
   */
  // tslint:disable-next-line:typedef
  public get domainValidation() {
    return this.domainListForm.controls;
  }
  /**
   * First of fall check the form is valid after then perform create or update
   * when user submit the create buttton then add new record on server
   * when user submit the upadte  button then upadte existing record on the server
   */
  public addDomain(): void {
    const domainData: Domain = this.domainListForm.value;
    const domainId: Domain = this.domainListForm.controls.domainId.value;

    if (this.domainListForm.invalid) {
      this.toastr.error(ManageDomainModal.InvalidValue, ManageDomainModal.ErrorMessage);
    } else if (!!domainId) {
      this.loaderService.displayLoader(true);
      const updateDomainData: { [key: string]: string } = {
        description: domainData.description,
        domainName: domainData.domainName
      };
      this.domainService.updateDomain(updateDomainData, domainData.domainId).pipe(
        takeUntil(this.destroy$)
      ).subscribe(() => {
        this.addDomainHideForm();
        this.domainService.setDomainInsert(true);
        this.modalHeading = ManageOverlayHeading.AddNewDomain;
      },
        (error: HttpErrorResponse) => {
          this.errorHandler(error);
        });
    } else {
      this.loaderService.displayLoader(true);
      const addNewDomainData: { [key: string]: string } = {
        description: domainData.description,
        domainName: domainData.domainName
      };
      this.domainService.createDomain(addNewDomainData).pipe(
        takeUntil(this.destroy$)
      ).subscribe(() => {
        this.domainListForm.reset();
        this.addDomainHideForm();
        this.domainService.setDomainInsert(true);
      }, (error: HttpErrorResponse) => {
        this.errorHandler(error);
      });
    }
  }
  /**
   * Loads domain to edit
   * @param domain - upadet record using domain
   */
  public editDomainById(): void {
    this.domainService.getDomainUpdateForUpdate().pipe(
      takeUntil(this.destroy$)
    ).subscribe((doamin: Domain) => {
      if (doamin != null) {
        this.modalHeading = ManageOverlayHeading.EditDomain;
        this.domainListForm.controls.domainId.setValue(doamin.domainId);
        this.domainListForm.controls.domainName.setValue(doamin.domainName);
        this.domainListForm.controls.description.setValue(doamin.description);
      }
    }, (error: HttpErrorResponse) => {
      this.errorHandler(error);
    });
  }
  /**
   * AddDomainHideForm method use for hide form
   */
  public addDomainHideForm(): void {
    this.domainListForm.reset();
    this.modalHeading = ManageOverlayHeading.AddNewDomain;
    this.isModalShow.emit(false);
  }
  /**
   * errorHandler handle the server error
   * @param errorCode contains error code which is throw by server
   */
  public errorHandler(error: HttpErrorResponse): void {
    if (error.status === 404) {
      this.toastr.error(ManageDomainModal.NotFound, ManageDomainModal.ErrorMessage);
    } else if (error.status === 400) {
      this.toastr.error(error.error.errors[0].DomainName, ManageDomainModal.ErrorMessage);
    } else if (error.status === 500) {
      this.toastr.error(ManageDomainModal.InternalServerError, ManageDomainModal.ErrorMessage);
    } else if (error.status === 405) {
      this.toastr.error(ManageDomainModal.MethodNotAllowed, ManageDomainModal.ErrorMessage);
    }
    this.loaderService.displayLoader(false);
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
   * ngOnDestroy for unsubscribe
   */
  public ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe();
  }
}
