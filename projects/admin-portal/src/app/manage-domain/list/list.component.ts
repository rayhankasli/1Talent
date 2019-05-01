/**
 * @author - Naim Shaikh
 * @createDate 22-03-2019
 * @description - This component file are list out the domain and delete domain .
 */
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
// -------------------------------------------------
import { LoaderService } from '../../core/loader/loader.service';
import { Domain, ManageDomainModal } from '../domain.model';
import { ManageDomainService } from '../manage-domain.service';
import { DeleteDailogComponent } from './../../shared/delete-dailog/delete-dailog.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
/**
 * Component - This compo nent use for decorate the class
 */
@Component({
  selector: 'one-talent-list',
  styleUrls: ['./list.component.scss'],
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit,OnDestroy {
  /** domainlist use for Domain */
  public domainList: Domain[];
  /** Determines whether show is */
  public isShow: boolean = false;

  /**
   * destroy$ are use for unsubscribe the subscribe observable
   */
  public destroy$: Subject<boolean> = new Subject<boolean>();
  
  /**
   *  inject the service.
   * @param domainService - for domain service
   * @param toastr - for using tostr message
   * @param dialog - for using dialog box
   * @param loaderService - for display loader
   */
  constructor(
    private domainService: ManageDomainService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private loaderService: LoaderService
  ) { }
  /**
   *  load the Domian using ngOnInit method
   */
  public ngOnInit(): void {
    this.domainService.insertDomain.pipe(
      takeUntil(this.destroy$)
    ).subscribe((value: boolean) => {
      if (value) {
        this.getAllDomainList();
      }
    });
    this.getAllDomainList();
  }
  /**
   * Get all the Domain
   * @param  - Get domain form get getAllDomainList method
   */
  public getAllDomainList(): void {
    this.loaderService.displayLoader(true);
    this.domainService.getAllDomainList().pipe(
      takeUntil(this.destroy$)
    ).subscribe((data: Domain[]) => {
      this.loaderService.displayLoader(false);
      this.domainList = data;
    },
                                                    (error: HttpErrorResponse) => {
        this.errorHandler(error);
      });
  }
  /**
   * editDomainData get the data from content component and pass to overlay modal to update Domain
   */
  public editDomainData(event: Domain): void {
    this.isShow = true;
    this.domainService.setDomainForUpdate(event);
  }
  /**
   * Deletes Domain
   * @param deleteId - Delete record using delete id
   */
  public deleteDomainById(domainId: number): void {
    this.loaderService.displayLoader(true);
    this.domainService.deleteDomainById(domainId).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.getAllDomainList();
    },
                                                            (error: HttpErrorResponse) => {
        this.errorHandler(error);
      });
  }
  /** addDomainFormShow method is use to dispaly the domain form for add new domain */
  public addDomainFormShow(event: boolean): void {
    this.isShow = event;
  }
  /**
   * openDeleteDialog box for delete domain
   * @param domainId contain unique id for delete domain
   */
  public openDeleteDialog(domainId: number): void {
    const dialogRef: MatDialogRef<DeleteDailogComponent> = this.dialog.open(DeleteDailogComponent, {
      data: { data: Domain }
    });
    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$)
    ).subscribe((result: any) => {
      if (!!result) {
        if (result.data) {
          this.deleteDomainById(domainId);
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
   * ngOnDestroy for unsubscribe
   */
  public ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe();
  }
}
