/**
 * @author - Naim Shaikh
 * @createDate 05-04-2019
 * @description - This component file are list out the activity and delete activity .
 */
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
// ---------------------------------------------------------------------------------------
import { LoaderService } from '../../core/loader/loader.service';
import { DeleteDailogComponent } from '../../shared/delete-dailog/delete-dailog.component';
import { MaintainOnboardingService } from '../maintain-onboarding.service';
import { MaintainOnboardingModal, Onboarding } from '../onboarding.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
/**
 * Component - This component use for decorate the class
 */
@Component({
  selector: 'one-talent-list',
  styleUrls: ['./list.component.scss'],
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {

  /** onboardingList use for activity */
  public onboardingList: Onboarding[];

  /**
   * destroy$ are use for unsubscribe the subscribe observable
   */
  public destroy$: Subject<boolean> = new Subject<boolean>();

  /** Determines whether show is */
  public isShow: boolean = false;
  /**
   * inject the service.
   * @param activityService - for maintain onboarding service
   * @param toastr - for using tostr message
   * @param dialog - for using dialog box
   * @param loaderService - for display loader
   */
  constructor(
    private activityService: MaintainOnboardingService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private loaderService: LoaderService,
  ) { }
  /**
   *  load the Activity using ngOnInit method
   */
  public ngOnInit(): void {
    this.activityService.insertActivity.pipe(
      takeUntil(this.destroy$)
    ).subscribe((value: boolean) => {
      if (value) {
        this.getAllActivityList();
      }
    });
    this.getAllActivityList();
  }

  /**
   * Get all the Activity
   * @param  - Get activity form get getAllActivityList method
   */
  public getAllActivityList(): void {
    this.loaderService.displayLoader(true);
    this.activityService.getAllActivityList().pipe(
      takeUntil(this.destroy$)
    ).subscribe((data: Onboarding[]) => {
      this.loaderService.displayLoader(false);
      this.onboardingList = data;
    },
                (error: HttpErrorResponse) => {
        this.errorHandler(error);
      });
  }

  /** addOnboardingFormShow method is use to dispaly the onboarding form for add new activity */
  public addOnboardingFormShow(event: boolean): void {
    this.isShow = event;
  }
  /**
   * editOnboardingData get the data from content component and pass to overlay modal to update Onboarding
   */
  public editOnboardingData(event: Onboarding): void {
    this.isShow = true;
    this.activityService.setOnboardingForUpdate(event);
  }

  /**
   * Delete Avtivity
   * @param activityId - Delete record using activity id
   */
  public deleteActivityById(activityId: number): void {
    this.loaderService.displayLoader(true);
    this.activityService.deleteActivityById(activityId).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.getAllActivityList();
    },
                (error: HttpErrorResponse) => {
        this.errorHandler(error);
      });
  }
  /**
   * openDeleteDialog box for delete activity
   * @param activityId contain unique id for delete activity
   */
  public openDeleteDialog(activityId: number): void {
    const dialogRef: MatDialogRef<DeleteDailogComponent> = this.dialog.open(DeleteDailogComponent, {
      data: { data: Onboarding }
    });
    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$)
    ).subscribe((result: any) => {
      if (!!result) {
        if (result.data) {
          this.deleteActivityById(activityId);
        }
      }
    });
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
