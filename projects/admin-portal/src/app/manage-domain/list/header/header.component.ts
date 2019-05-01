/**
 * @author Naim Shaikh
 * @createdDate 22-03-2019
 * @description This  file is contain static headers
 */
import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
/**
 * Component - This component use for decorate the class
 */
@Component({
  selector: 'one-talent-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  /** isModalShow emit value for open overlay component to add or edit domain  */
  @Output() public isModalShow: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** addDomainFormShow stands for emit value for open overlay component to add or edit Domain */
  public addDomainFormShow(): void {
    this.isModalShow.emit(true);
  }

}
