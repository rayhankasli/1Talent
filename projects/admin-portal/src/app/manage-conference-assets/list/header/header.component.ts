/**
 * @author Rayhan Kasli
 * @createdDate 29-04-2013
 * @description This  file is contain static headers of table
 */
import { Component, Output, EventEmitter } from '@angular/core';

/**
 * HeaderComonent it is use to show header portion of assets and button for add or edit asset
 * as well as contain table heder
 */
@Component({
  selector: 'one-talent-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent {

 /** isModalShow emit value for open overlay component to add or edit asset  */
 @Output() public isModalShow: EventEmitter<boolean> = new EventEmitter<boolean>();

 /** addAssetsShowForm stands for emit value for open overlay component to add or edit asset */
 public addAssetsShowForm (): void {
   this.isModalShow.emit(true);
 }

}
