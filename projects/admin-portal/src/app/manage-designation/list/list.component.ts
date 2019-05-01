/**
 * @author Rayhan Kasli
 * @createdDate 22-03-2019
 * @description This component file is perform all oprations of designation
 */
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

// ------------------------------------------ //
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../core/loader/loader.service';
import { DeleteDailogComponent } from '../../shared/delete-dailog/delete-dailog.component';
import { Designation, ManageDesignationModal } from '../designation.model';
import { ManageDesignationService } from '../manage-designation.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
/**
 * This component file is used for dispaly designation list as well as add, update and delete designation
 */
@Component({
  selector: 'one-talent-list',
  styleUrls: ['./list.component.scss'],
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {

  /** designationList array contain all the designation data for dispaly in html */
  public designationList: Designation[];

  /** formShow define for open and close the modal for add or update designation */
  public isFormShow: boolean = false;

  /**
   * destroy$ are use for unsubscribe the subscribe observable
   */
  public destroy$: Subject<boolean> = new Subject<boolean>();

  /**
   * Creates an instance of list component.
   * @param manageDesignationService inject the ManageDesignationService
   * @param toastr inject ToastrService for display Toastr message
   * @param dialogBox It is used to open dialogbox for delete designation
   * @param loaderService inject the LoaderService for display loader untill the data is not renderd
   */
  constructor(
    private manageDesignationService: ManageDesignationService,
    private toastr: ToastrService, private dialogBox: MatDialog, private loaderService: LoaderService) {
  }

  public ngOnInit(): void {
    this.manageDesignationService.insertDesignation.pipe(
      takeUntil(this.destroy$)
    ).subscribe((value: boolean) => {
      if (value) {
        this.getAllDesignationList();
      }
    });
    this.getAllDesignationList();
  }

  /**
   * getAllDesignationList is used to gell all the designations from server
   * @author Rayhan Kasli
   * @craetedDate 22-03-2019
   */
  public getAllDesignationList(): void {
    this.loaderService.displayLoader(true);
    this.manageDesignationService.getAllDesignation().pipe(
      takeUntil(this.destroy$)
    ).subscribe((dataList: Designation[]) => {
      this.loaderService.displayLoader(false);
      this.designationList = dataList;
    },          (error: HttpErrorResponse) => {
      this.errorHandler(error);
    });
  }

  /**
   * Removes designation a per designation id
   * @param designationId it define unique id for delete designation
   * @author Rayhan Kasli
   * @createdDate 22-03-2019
   */
  public removeDesignation(designationId: number): void {
    this.loaderService.displayLoader(true);
    this.manageDesignationService.deleteDesignation(designationId)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(() => {
        this.getAllDesignationList();
      },          (error: HttpErrorResponse) => {
        this.errorHandler(error);
      });
  }
  /**
   * editDesignationData get the data from content component and pass to overlay modal to update designation
   * @author Rayhan Kasli
   * @createdDate 25-03-2019
   */
  public editDesignationData(event: Designation): void {
    this.isFormShow = true;
    this.manageDesignationService.setDesignationForUpdate(event);
  }
  /**
   * addDesignationFormShow method is use to dispaly the designation form for add new designation
   * @author Rayhan Kasli
   * @createdDate 25-03-2019
   */
  public addDesignationFormShow(event: boolean): void {
    this.isFormShow = event;
  }
  /**
   * openDeleteDialog is open dialog box for delete designation
   * @param designationId contain unique id of designation
   */
  public openDeleteDialog(designationId: number): void {
    const dialogRef: MatDialogRef<DeleteDailogComponent> = this.dialogBox.open(DeleteDailogComponent, {
      data: { data: Designation }
    });
    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$)
    ).subscribe((result: any) => {
      if (!!result) {
        if (result.data) {
          this.removeDesignation(designationId);
        }
      }
    });
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
   * ngOnDestroy for unsubscribe
   */
  public ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe();
  }
}
