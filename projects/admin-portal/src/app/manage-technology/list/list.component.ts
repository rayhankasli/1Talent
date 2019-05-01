/**
 * @author Rayhan Kasli
 * @createdDate 05-04-2019
 * @description This component file is perform all oprations of technology
 */
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../core/loader/loader.service';
import { DeleteDailogComponent } from '../../shared/delete-dailog/delete-dailog.component';
import { ManageTechnologyService } from '../manage-technology.service';
import { ManageTechnologyModal, Technology } from '../technology.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * This component file is used for dispaly technology list as well as add, update and delete technology
 */
@Component({
  selector: 'one-talent-list',
  styleUrls: ['./list.component.scss'],
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit,OnDestroy {

  /** formShow define for open and close the modal for add or update technology */
  public isFormShow: boolean = false;

   /** technologyList array contain all the technology data for dispaly in html */
  public technologyList: Technology[];

  /** destroy$ are use for unsubscribe the subscribe observable */
  public destroy$: Subject<boolean> = new Subject<boolean>();

  /**
   * Creates an instance of list component.
   * @param manageTechnologyService inject the ManageTechnologyService
   * @param toastr inject ToastrService for display Toastr message
   * @param dialogBox It is used to open dialogbox for delete technology
   * @param loaderService inject the LoaderService for display loader untill the data is not renderd
   */
  constructor (
    private manageTechnologyService: ManageTechnologyService,
    private toastr: ToastrService, private dialogBox: MatDialog, private loaderService: LoaderService) {
  }
  public ngOnInit(): void {
    this.manageTechnologyService.insertTechnology.pipe(
      takeUntil(this.destroy$)
    ).subscribe((value: boolean) => {
      if (value) {
        this.getAllTechnoloyList();
      }
    });
    this.getAllTechnoloyList();
  }

  /**
   * getAllTechnoloyList method is use to dispaly the all the technology data
   * @author Rayhan Kasli
   * @createdDate 05-04-2019
   */
  public getAllTechnoloyList(): void {
    this.loaderService.displayLoader(true);
    this.manageTechnologyService.getAllTechnology().
    pipe(takeUntil(this.destroy$)).subscribe((dataList: Technology[]) => {
      this.technologyList = dataList;
      this.loaderService.displayLoader(false);
    },                                       (error: HttpErrorResponse) => {
      this.errorHandler(error);
    });
  }

  /**
   * editTechnologyData get the data from content component and pass to overlay modal to update Technology
   * @author Rayhan Kasli
   * @createdDate 25-03-2019
   */
  public editTechnologyData (event: Technology): void {
    this.isFormShow = true;
    this.manageTechnologyService.setTechnologyForUpdate(event);
  }

  /**
   * Removes technology a per technology id
   * @param technologyId it define unique id for delete technology
   * @author Rayhan Kasli
   * @createdDate 05-04-2019
   */
  public deleteTechnology (technologyId: number): void {
    this.loaderService.displayLoader(true);
    this.manageTechnologyService.deleteTechnology(technologyId)
    .pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.getAllTechnoloyList();
    },                                        (error: HttpErrorResponse) => {
        this.errorHandler(error);
      });
  }

  /**
   * openDeleteDialog is open dialog box for delete technology
   * @param technologyId contain unique id of technology
   */
  public openDeleteDialog (technologyId: number): void {
    const dialogRef: MatDialogRef<DeleteDailogComponent> = this.dialogBox.open(DeleteDailogComponent, {
      data: { data: Technology }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe((result: any) => {
      if (!!result) {
        if (result.data) {
          this.deleteTechnology(technologyId);
        }
      }
    });
  }

  /**
   * addTechnologyFormShow method is use to dispaly the technology form for add new technology
   * @author Rayhan Kasli
   * @createdDate 05-04-2019
   */
  public addTechnologyFormShow (event: boolean): void {
    this.isFormShow = event;
  }

  /**
   * errorHandler handle the server error
   * @param error contains error which is throw by server
   * @author Rayhan Kasli
   * @createdDate 05-04-2019
   */
  public errorHandler (error: HttpErrorResponse): void {
    if (error.status === 404) {
      this.toastr.error(ManageTechnologyModal.NotFound, ManageTechnologyModal.ErrorMessage);
    } else if (error.status === 400) {
      this.toastr.error(ManageTechnologyModal.BadRequest, ManageTechnologyModal.ErrorMessage);
    } else if (error.status === 500) {
      this.toastr.error(ManageTechnologyModal.InternalServerError, ManageTechnologyModal.ErrorMessage);
    } else if (error.status === 405) {
      this.toastr.error(ManageTechnologyModal.MethodNotAllowed, ManageTechnologyModal.ErrorMessage);
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
