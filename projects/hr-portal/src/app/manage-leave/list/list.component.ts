import { Component, OnInit, OnDestroy } from '@angular/core';
import { LeaveService } from '../services/leave.service';
import { Leave, LeaveStatus } from '../model/leave.model';
import { LoaderService } from '../../core/loader/loader.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { MatDialogRef, MatDialog } from '@angular/material';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';
import { Subscription } from 'rxjs/internal/Subscription';

/**
 * This is the Component decorator.
 * Component selector, scss and html files are declared here
 */
@Component({
  selector: 'one-talent-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
 
  /**
   * all the records will be stored in this variable.
   * this variable will be used to display the list of records.
   */
  public leaves: Leave[];
  /** from-date for filtering the leaves */
  public fromDate: string;
  /** to-date for filtering the leaves */
  public toDate: string;
  /** search value of the component */
  public searchText: string;
  /** store selected status of the component */
  public selectedStatus: number;
  /** leave status of list component */
  public leaveStatus: LeaveStatus[];
  /** leaves Subscription of list component */
  public leavesSub: Subscription;
  /** leave status Subscription of list component */
  public leaveStatusSub: Subscription;
  /** update leave Subscription of list component */
  public updateSub: Subscription;
  /** from-date to to-date filter Subscription of list component */
  public filterDateSub: Subscription;
  /** leaves by name Subscription of list component */
  public leavesByNameSub: Subscription;
  /** leave status Subscription of list component */
  public statusSub: Subscription;

  constructor (private leaveService: LeaveService,
               private loaderService: LoaderService,
               private toastr: ToastrService,public dialog: MatDialog) { 
                this.searchText = '';
                this.selectedStatus=0;
               }

  public ngOnInit (): void {
    this.getAllLeaves();
    this.getStatus();
  }


  /**
   * Gets all the leaves
   * @author: Mayur Patel
   * @created date: 06/04/2019
   */
  public getAllLeaves (): void {
     this.loaderService.displayLoader(true);
     this.leavesSub = this.leaveService.getAllLeaves().subscribe((response: Leave[]) => {
      this.leaves = response;
      this.loaderService.displayLoader(false);
    },                                                           (error: HttpErrorResponse) => {
       this.errorHandler(error.status);
    });
  }
  
  /**
   * Gets leaves by search text
   * @param firstName 
   */
  public getLeavesBySearchText (firstName: string): void {
    if(firstName.length > 0) {
      this.leavesByNameSub = this.leaveService.getLeavesByName(firstName).subscribe((response: Leave[]) => {
        this.leaves = response;
       //  this.loaderService.displayLoader(false);
      },                                                                            (error: HttpErrorResponse) => {
         this.errorHandler(error.status);
      });
    }
    else {
      this.getAllLeaves();
    }
 }

  /**
   * Gets the selected status data
   * @param selectedStatusId : selected status id of the component
   * @author: Mayur Patel
   * @created date: 06/04/2019
   */
  public getselectedStatusData (selectedStatusId: number): void {
    if (selectedStatusId === 0) {
      this.getAllLeaves();
    } else {
      this.getLeavesByStatus(selectedStatusId);
    }
    this.selectedStatus = selectedStatusId;
  }
  
  /**
   * Gets status
   * @author: Bhumi Desai
   * @created date: 19/04/2019
   */
  public getStatus (): void {
    this.loaderService.displayLoader(true);
    this.statusSub = this.leaveService.getStatus().subscribe((response: LeaveStatus[]) => {
      this.leaveStatus = response;
      this.loaderService.displayLoader(false);
    },                                                       (error: HttpErrorResponse) => {
      this.errorHandler(error.status);
    });
  }

  /**
   * Gets the leaves according to the status selected
   * @param statusId : status id of the leaves
   * @author: Mayur Patel
   * @created date: 06/04/2019
   */
  public getLeavesByStatus (statusId: number): void {
    this.loaderService.displayLoader(true);
    this.leaveStatusSub = this.leaveService.getLeavesByStatus(statusId).subscribe((response: Leave[]) => {
      this.leaves = response;
      this.loaderService.displayLoader(false);
    },                                                                            (error: HttpErrorResponse) => {
      this.errorHandler(error.status);
   });
  }
  
  /**
   * Approves leave using leave id and approve value
   * @param leaveId : leave id of the list of leaves
   * @author: Mayur Patel
   * @created date: 06/04/2019
   */
  public approveLeave (leaveId: number): void {
    this.approveRejectLeave(leaveId,2);
  }

  /**
   * Rejects leave using leave id and reject value
   * @param leaveId : leave id of the list of leaves
   * @author: Mayur Patel
   * @created date: 06/04/2019
   */
  public rejectLeave (leaveId: number): void {
    this.openDeleteDialog(leaveId);
  }
  /**
   * approves the cancelled leave request using leave id
   * @param leaveId : leave id of the list of leaves
   * @author: Bhumi Desai
   * @created date: 19/04/2019
   */
  public approveCancelRequestedLeave (leaveId: number): void {
    // this.approveRejectLeave(leaveId,2);
    this.openCancelationApproveDialog(leaveId);
  }

  /**
   * Rejects leave request using leave id and reject value
   * @param leaveId : leave id of the list of leaves
   * @author: Bhumi Desai
   * @created date: 19/04/2019
   */
  public rejectCancelRequestedLeave (leaveId: number): void {
    this.approveRejectLeave(leaveId,2);
  }
  /**
   * openDeleteDialog box for reject leave
   * @param leaveId contain unique id for reject leave
   * @author: Bhumi Desai
   * @created date: 06/04/2019
   */
  public openDeleteDialog (leaveId: number): void {
    const dialogRef: MatDialogRef<DeleteDialogComponent> = this.dialog.open(DeleteDialogComponent, {
      data: { data: 'Are you sure you want to reject?' }
    });
    dialogRef.afterClosed().subscribe((result: { [key: string]: string }) => {
      if (!!result) {
        if (result.data) {
          this.approveRejectLeave(leaveId,4);
        }
      }
    });
  }
  /**
   * openCancelationApproveDialog box for approve the cancel leave request
   * @param leaveId contain unique id of the cancel leave request
   * @author: Bhumi Desai
   * @created date: 19/04/2019
   */
  public openCancelationApproveDialog (leaveId: number): void {
    const dialogRef: MatDialogRef<DeleteDialogComponent> = this.dialog.open(DeleteDialogComponent, {
      data: { data: 'Are you sure you want to approve the cancellation?' }
    });
    dialogRef.afterClosed().subscribe((result: { [key: string]: string }) => {
      if (!!result) {
        if (result.data) {
          this.approveRejectLeave(leaveId,3);
        }
      }
    });
  }
  /**
   * Reject and approve leave using leaveid and action status
   * @author: Bhumi Desai
   * @created date: 06/04/2019
   */
  public approveRejectLeave (leaveId: number, actionStatus: number): void {
    this.updateSub = this.leaveService.updateLeaveById(leaveId,actionStatus).subscribe(() => {
      this.getselectedStatusData(this.selectedStatus);
    });
  }
  
  /**
   * filters from-date to yyyy/MM/dd
   * @param fromDate : date from the header component 
   * @author: Bhumi Desai
   * @created date: 08/04/2019
   */
  public fromDateFilter(fromDate: Date):void{
    let datePipe: DatePipe = new DatePipe('en-US');
    this.fromDate = datePipe.transform(fromDate, 'yyyy/MM/dd');
  }
  
  /**
   * filters to-date to yyyy/MM/dd and get the records between from-date and to-date
   * @param toDate : date to the header component 
   * @author: Bhumi Desai
   * @created date: 08/04/2019
   */
  public toDateFilter(toDate: Date):void{
    let datePipe: DatePipe = new DatePipe('en-US');
    this.toDate = datePipe.transform(toDate, 'yyyy/MM/dd');
    this.loaderService.displayLoader(true);
    this.filterDateSub = this.leaveService.getLeavesFromDateToDate(this.fromDate,this.toDate).subscribe((response: Leave[])=>{
      this.leaves = response;
      this.loaderService.displayLoader(false);
    });
  }

  /**
   * Error handler method for error status
   */
  public errorHandler (errorCode: number): void {
    this.loaderService.displayLoader(false);
  }

  // public ngOnDestroy(): void {
    // this.leavesSub.unsubscribe();
    // this.leaveStatusSub.unsubscribe();
    // this.updateSub.unsubscribe();
    // this.filterDateSub.unsubscribe();
    // this.leavesByNameSub.unsubscribe();
    // this.statusSub.unsubscribe();
  // }

}
