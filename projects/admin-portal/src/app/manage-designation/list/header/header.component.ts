/**
 * @author Rayhan Kasli
 * @createdDate 22-03-2013
 * @description This  file is contain static headers
 *
 */
import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';

/**
 * HeaderComonent it is use to show header portion of designation and button for add or edit designation
 * as well as contain table heder
 */
@Component({
  selector: 'one-talent-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  /** isModalShow emit value for open overlay component to add or edit designation  */
  @Output() public isModalShow: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** addDesignationFormShow stands for emit value for open overlay component to add or edit designation */
  public addDesignationFormShow (): void {
   this.isModalShow.emit(true);
  }
}
