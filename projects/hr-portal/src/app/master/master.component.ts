import { Component } from '@angular/core';
import { LoaderService } from '../core/loader/loader.service';
/**
 * This is the Component decorator.
 * Component selector, scss adn html files are declared here
 */
@Component({
  selector: 'one-talent-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent {

 /** Loader status of app component */
  public loaderStatus: boolean;

  constructor (private loaderService: LoaderService) {
    /** Subscribe observable method to get loader status  */
    this.loaderService.loaderStatus.subscribe((value: boolean) => {
      this.loaderStatus = value;
    });
   
  }
  

}
