/**
 * @author Rayhan Kasli
 * @createdDate 05-04-2013
 * @description This  file is contain static headers
 */
import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

/**
 * HeaderComonent it is use to show header portion of technology and button for add or edit technology
 * as well as contain table heder
 */
@Component({
  selector: 'one-talent-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent  {

  /** isModalShow emit value for open overlay component to add or edit technology  */
  @Output() public isModalShow: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** addTechnologyShowForm stands for emit value for open overlay component to add or edit technology */
  public addTechnologyShowForm (): void {
    this.isModalShow.emit(true);
  }

}
