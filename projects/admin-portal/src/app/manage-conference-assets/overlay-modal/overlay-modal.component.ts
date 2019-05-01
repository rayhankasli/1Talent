/**
 * @author Rayhan Kasli
 * @createdDate 29-04-2019
 * @description This component file is perform add and edit asset
 */
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ManageOverlayHeading, ConferenceAssets, ManageAssetModal } from '../conference-assets.model';
import { Subject } from 'rxjs/';
import { ManageConferenceAssetsService } from '../manage-conference-assets.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../core/loader/loader.service';
import { takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

/** OverlayModalComponent used for create new or update existing new asset */
@Component({
  selector: 'one-talent-overlay-modal',
  styleUrls: ['./overlay-modal.component.scss'],
  templateUrl: './overlay-modal.component.html'
})

export class OverlayModalComponent implements OnInit, OnDestroy {


  /** addAssetForm define the formgroup for add or update asset  */
  public addAssetForm: FormGroup;

  /** modalHeading define the heading of model like add new asset or edit asset */
  public modalHeading: string = ManageOverlayHeading.AddNewAsset;

  /** isModalShow it is used emitting value for open or close overlay modal */
  @Output() public isModalShow: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** destroy$ are use for unsubscribe the subscribe observable */
  public destroy$: Subject<boolean> = new Subject<boolean>();


  /**
   * Creates an instance of overlay modal component.
   * @param manageConferenceAssetsService inject ManageConferenceAssetsService service
   * @param formBuilder inject Form Builder for to create a form group
   * @param toastr inject ToastrService for display Toastr message
   * @param loaderService inject the LoaderService for display loader untill the data is not renderd
   */
  constructor(private manageConferenceAssetsService: ManageConferenceAssetsService, private formBuilder: FormBuilder,
              private toastr: ToastrService, private loaderService: LoaderService) { }

  public ngOnInit(): void {
    this.addAssetForm = this.formBuilder.group({
      assetTypeId: [''],
      assetType: ['', Validators.compose([Validators.required, Validators.maxLength(30)])]
    });
            
    this.manageConferenceAssetsService.updateAssetById.pipe(
        takeUntil(this.destroy$)
      ).subscribe((response: ConferenceAssets) => {
        if (response) {
          this.editAsset();
         }
      });
    this.manageConferenceAssetsService.setAssetForUpdate(null);
  }

  /**
   * assetType is used to put validation on asset name filed
   * @author Rayhan Kasli
   * @createdDate 29-04-2019
   */
  public get assetType(): AbstractControl {
    return this.addAssetForm.get('assetType');
  }

  /**
   * addAsset method is used to add new or update existing asset
   * @author Rayhan Kasli
   * @craetedDate 29-04-2019
   */
  public addAsset(): void {
    const assetData: ConferenceAssets = this.addAssetForm.value;
    const assetId: ConferenceAssets = this.addAssetForm.controls.assetTypeId.value;
    if (this.addAssetForm.invalid) {
      this.toastr.error(ManageAssetModal.InvalidValue, ManageAssetModal.ErrorMessage);
    } else if (assetId) {
      this.loaderService.displayLoader(true);
      const updateAssetData: { [key: string]: number | string } = {
        assetTypeId: assetData.assetTypeId,
        assetType: assetData.assetType
      };
      this.manageConferenceAssetsService.updateAsset(updateAssetData)
        .pipe(
          takeUntil(this.destroy$)
        ).subscribe(() => {
          this.addAssetsFormHide();
          this.manageConferenceAssetsService.setAssetInsert(true);
        },          (error: HttpErrorResponse) => {
          this.errorHandler(error);
        });
    } else {
      this.loaderService.displayLoader(true);
      const addNewAssetData: { [key: string]: string } = {
        assetType: assetData.assetType
      };
      this.manageConferenceAssetsService.addNewAsset(addNewAssetData)
        .pipe(
          takeUntil(this.destroy$)
        ).subscribe(() => {
          this.addAssetsFormHide();
          this.manageConferenceAssetsService.setAssetInsert(true);
        },          (error: HttpErrorResponse) => {
          this.errorHandler(error);
        });
    }
  }


  /**
   * editAsset method is use to fill data into form for update
   * @author Rayhan Kasli
   * @createdDate 29-04-2019
   */
  public editAsset(): void {
    this.manageConferenceAssetsService.getAssetForUpdate()
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe((asset: ConferenceAssets) => {
        if (asset != null) {
          this.modalHeading = ManageOverlayHeading.EditAsset;
          this.addAssetForm.controls.assetTypeId.setValue(asset.assetTypeId);
          this.addAssetForm.controls.assetType.setValue(asset.assetType);
        }
      },          (error: HttpErrorResponse) => {

        this.errorHandler(error);
      });
  }


  /**
   * addAssetsFormHide method is use to hide the asset form
   * @author Rayhan Kasli
   * @createdDate 29-04-2019
   */
  public addAssetsFormHide(): void {
    this.addAssetForm.reset();
    this.modalHeading = ManageOverlayHeading.AddNewAsset;
    this.isModalShow.emit(false);
  }

  /**
   * errorHandler handle the server error
   * @param error contains error which is throw by server
   * @author Rayhan Kasli
   * @createdDate 29-04-2019
   */
  public errorHandler(error: HttpErrorResponse): void {
    if (error.status === 404) {
      this.toastr.error(ManageAssetModal.NotFound, ManageAssetModal.ErrorMessage);
    } else if (error.status === 400) {
      this.toastr.error(error.error.errors[0].AssetType , ManageAssetModal.ErrorMessage);
    } else if (error.status === 500) {
      this.toastr.error(ManageAssetModal.InternalServerError, ManageAssetModal.ErrorMessage);
    } else if (error.status === 405) {
      this.toastr.error(ManageAssetModal.MethodNotAllowed, ManageAssetModal.ErrorMessage);
    } else if (error.status === 401) {
      this.toastr.error(ManageAssetModal.UnauthorizedAccess, ManageAssetModal.ErrorMessage);
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
  /** ngOnDestroy for unsubscribe */
  public ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe();
  }

}
