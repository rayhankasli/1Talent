/**
 * @author Rayhan Kasli
 * @createdDate 29-04-2019
 * @description This component file is perform all oprations of asset
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConferenceAssets, ManageAssetModal } from '../conference-assets.model';
import { Subject } from 'rxjs/';
import { ManageConferenceAssetsService } from '../manage-conference-assets.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoaderService } from '../../core/loader/loader.service';
import { takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { DeleteDailogComponent } from '../../shared/delete-dailog/delete-dailog.component';

/**
 * This component file is used for dispaly assets list as well as add, update and delete asset
 */
@Component({
  selector: 'one-talent-list',
  styleUrls: ['./list.component.scss'],
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {

  /** formShow define for open and close the modal for add or update assets */
  public isFormShow: boolean = false;

   /** assetsList array contain all the assets data for dispaly in html */
  public assetsList: ConferenceAssets[];

   /** destroy$ are use for unsubscribe the subscribe observable */
  public destroy$: Subject<boolean> = new Subject<boolean>();

  /**
   * Creates an instance of list component.
   * @param manageConferenceAssetsService inject the ManageConferenceAssetsService
   * @param toastr inject ToastrService for display Toastr message
   * @param dialogBox It is used to open dialogbox for delete asset
   * @param loaderService inject the LoaderService for display loader untill the data is not renderd
   */
  constructor (
    private manageConferenceAssetsService: ManageConferenceAssetsService,
    private toastr: ToastrService, private dialogBox: MatDialog, private loaderService: LoaderService) {
  }

  public ngOnInit(): void {
    this.manageConferenceAssetsService.insertAsset.pipe(
      takeUntil(this.destroy$)
    ).subscribe((value: boolean) => {
      if (value) {
        this.getAllAssetsList();
      }
    });
    this.getAllAssetsList();
  }

  /**
   * getAllAssetsList method is use to dispaly the all the assets data
   * @author Rayhan Kasli
   * @createdDate 29-04-2019
   */
  public getAllAssetsList(): void {
    this.loaderService.displayLoader(true);
    this.manageConferenceAssetsService.getAllAssets().
    pipe(takeUntil(this.destroy$)).subscribe((dataList: ConferenceAssets[]) => {
      this.assetsList = dataList;
      this.loaderService.displayLoader(false);
    },                                       (error: HttpErrorResponse) => {
      this.errorHandler(error);
    });
  }

  /**
   * editAssetData get the data from content component and pass to overlay modal to update asset
   * @author Rayhan Kasli
   * @createdDate 29-04-2019
   */
  public editAssetData (event: ConferenceAssets): void {
    this.isFormShow = true;
    this.manageConferenceAssetsService.setAssetForUpdate(event);
  }

  /**
   * Removes asset as per asset id
   * @param assetId it define unique id for delete asset
   * @author Rayhan Kasli
   * @createdDate 29-04-2019
   */
  public deleteAsset (assetId: number): void {
    this.loaderService.displayLoader(true);
    this.manageConferenceAssetsService.deleteAsset(assetId)
    .pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.getAllAssetsList();
    },                                        (error: HttpErrorResponse) => {
        this.errorHandler(error);
      });
  }

  /**
   * openDeleteDialog is open dialog box for delete asset
   * @param assetId contain unique id of asset
   */
  public openDeleteDialog (assetId: number): void {
    const dialogRef: MatDialogRef<DeleteDailogComponent> = this.dialogBox.open(DeleteDailogComponent, {
      data: { data: ConferenceAssets }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe((result: any) => {
      if (!!result) {
        if (result.data) {
          this.deleteAsset(assetId);
        }
      }
    });
  }

  /**
   * addAssetsFormShow method is use to dispaly the asset form for add new asset
   * @author Rayhan Kasli
   * @createdDate 29-04-2019
   */
  public addAssetsFormShow (event: boolean): void {
    this.isFormShow = event;
  }

  /**
   * errorHandler handle the server error
   * @param error contains error which is throw by server
   * @author Rayhan Kasli
   * @createdDate 29-04-2019
   */
  public errorHandler (error: HttpErrorResponse): void {
    if (error.status === 404) {
      this.toastr.error(ManageAssetModal.NotFound, ManageAssetModal.ErrorMessage);
    } else if (error.status === 400) {
      this.toastr.error(ManageAssetModal.BadRequest, ManageAssetModal.ErrorMessage);
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
   * ngOnDestroy for unsubscribe
   */
  public ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe();
  }


}
