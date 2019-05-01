/**
 * @author Naim Shaikh
 * @craetedDate 28-03-2019
 * @description This file is used to display loader
 */
import { Component } from '@angular/core';
import { LoaderService } from '../core/loader/loader.service';

/**
 * This component class is use to display loader until the server is not response to the user
 */
@Component({
  selector: 'one-talent-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent {

  /** loaderStatus  */
  public loaderStatus: boolean;

  /**
   * Creates an instance of app component.
   * @param loaderService inject LoaderService for display loader
   */
  constructor(private loaderService: LoaderService) {
    /**  Subscribe observable method for get loader status */
    this.loaderService.loaderStatus.subscribe((value: boolean) => {
      this.loaderStatus = value;
    });
  }

}
