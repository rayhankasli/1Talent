/**
 * @author: Bhumi Desai
 * @created date: 20/03/2019
 * @description: In this component file, the logic of getting all the records is done
 */

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/internal/Subscription';
import { LoaderService } from '../../core/loader/loader.service';
import { VacancyService } from '../services/vacancy.service';
import {
  ToastrErrorStatus204, ToastrErrorStatus400, ToastrErrorStatus401, ToastrErrorStatus404,
  ToastrErrorStatus500, Vacancy
} from '../vacancy.model';
import { MatDialogRef, MatDialog } from '@angular/material';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';
/**
 * This is the Component decorator.
 * Component selector, scss adn html files are declared here
 */
@Component({
  selector: 'one-talent-list',
  styleUrls: ['./list.component.scss'],
  templateUrl: './list.component.html'
})

/**
 * @author: Bhumi Desai
 * @created date: 22/03/2019
 * @description:ListComponent component to display, insert, update and delete vacancy
 */
export class ListComponent implements OnInit {

  /**
   * all the records will be stored in this variable.
   * this variable will be used to display the list of records.
   */
  public vacancies: Vacancy[] = [];
  /** this variable is used to show the modal or not  */
  public isShowModal: boolean;
  /** insertJob Flag Subscription  of list component */
  public insertJobFlagSub: Subscription;
  /** vacancies Subscription  of list component */
  public vacanciesSub: Subscription;
  /** delete vacancy Subscription  of list component */
  public deleteSub: Subscription;
  /** update vacancy Subscription  of list component */
  public updateSub: Subscription;
  
  constructor(
    private loaderService: LoaderService,
    private vacancyService: VacancyService,
    private toastr: ToastrService, public dialog: MatDialog) { }
  /**
   * on init, formcontrols are initialised and getAllVacancies method to display the list is called
   */
  public ngOnInit(): void {

    this.getAllVacancies();
    this.insertJobFlagSub = this.vacancyService.insertJob$.subscribe((value: boolean) => {
      if (value) {
        this.getAllVacancies();
      }
    });
  }

  /**
   * Gets all the vacancies for displaying the list
   * @author: Bhumi Desai
   * @created date: 22/03/2019
   */
  public getAllVacancies(): void {
    this.loaderService.displayLoader(true);
    this.vacanciesSub = this.vacancyService.getAllVacancies().subscribe((response: Vacancy[]) => {
      this.vacancies = response;
      this.loaderService.displayLoader(false);
    },                                                                  (error: HttpErrorResponse) => {
      this.errorHandler(error.status);
    });
  }

  /**
   * Opens vacancy modal
   * @author: Mayur Patel
   * @created date: 03/04/2019
   * @param eventData boolean value to open or close the modal
   */
  public openVacancyModal(eventData: boolean): void {
    this.isShowModal = eventData;
  }

  /**
   * Updates vacancy
   * @author: Bhumi Desai
   * @created date: 03/04/2019
   * @param eventUpdateVacancy updated records of the vacancy
   */
  public updateVacancy(eventUpdateVacancy: Vacancy): void {
    this.isShowModal = true;
    // this.openChangeStatusDialog(eventUpdateVacancy);
    this.vacancyService.sendData(eventUpdateVacancy);
  }
  /**
   * openDeleteDialog box for delete vacancy
   * @param vacancyId contain unique id for delete vacancy
   */
  public openDeleteDialog(vacancyId: number): void {
    const dialogRef: MatDialogRef<DeleteDialogComponent> = this.dialog.open(DeleteDialogComponent, {
      data: { data: 'Are you sure you want to delete?' }
    });
    dialogRef.afterClosed().subscribe((result: { [key: string]: string }) => {
      if (!!result) {
        if (result.data) {
          this.deleteSub = this.vacancyService.deleteVacancy(vacancyId).subscribe((response: Vacancy) => {
            this.getAllVacancies();
          });
        }
      }
    });
  }
  /**
   * openDeleteDialog box for status change vacancy
   * @param vacancyId contain unique id for delete vacancy
   */
  public openChangeStatusDialog(vacancyDetail: Vacancy): void {
    const dialogRef: MatDialogRef<DeleteDialogComponent> = this.dialog.open(DeleteDialogComponent, {
      data: { data: 'Are you sure you want cancel?' }
    });
    dialogRef.afterClosed().subscribe((result: { [key: string]: string }) => {
      if (!!result) {
        if (result.data) {
          vacancyDetail.jobStatusId = 2;
          vacancyDetail.publishDate = null;
          // this.changeStatusEvent.emit(vacancyDetail);
          // this.vacancyService.sendData(vacancyDetail);
          this.updateSub = this.vacancyService.updateVacancies(vacancyDetail, vacancyDetail.jobId).subscribe((response: Vacancy) => {
            this.getAllVacancies();
          });
        }
      }
    });
  }

  /**
   * Deletes vacancy
   * @author: Bhumi Desai
   * @created date: 03/04/2019
   * @param eventUpdateVacancy updated records of the vacancy
   */
  public deleteVacancy(deleteId: number): void {
    this.openDeleteDialog(deleteId);
  }
  /**
   * Deletes vacancy
   * @author: Mayur Patel
   * @created date: 10/04/2019
   * @param vacancyData updated records of the vacancy with status
   */
  public changeJobStatus(vacancyData: Vacancy): void {
    this.openChangeStatusDialog(vacancyData);
  }
  /**
   * Error handler method for error status
   */
  public errorHandler(errorCode: number): void {
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
  //   this.insertJobFlagSub.unsubscribe();
  //   this.vacanciesSub.unsubscribe();
  //   // this.deleteSub.unsubscribe();
  //   // this.updateSub.unsubscribe();
  // }

}
