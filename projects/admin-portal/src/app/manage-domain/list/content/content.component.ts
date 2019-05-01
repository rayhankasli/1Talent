/**
 * @author Naim Shaikh
 * @createdDate 22-03-2019
 * @description This component file is used for display domain data and perfoem some actions
 */
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
// ----------------------------------------------------------------------
import { Domain } from '../../domain.model';

/**
 * Component - This component use for decorate the class
 */
@Component({
  selector: 'one-talent-content',
  styleUrls: ['./content.component.scss'],
  templateUrl: './content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent {

  /** Input contentData used for display domain data in table */
  @Input() public contentData: Domain;

  /** Output deleteEvent used for emit the domain id for delete domain */
  @Output() public deleteEvent: EventEmitter<number> = new EventEmitter<number>();

  /** Output updateEvent used for emit the domain data to overlay modal for update  */
  @Output() public updateEvent: EventEmitter<Domain> = new EventEmitter<Domain>();
  /**
   * deleteDomain get id for delete domain
   * @param deleteId contain the unique id of domain for delete
   */
  public deleteDomain(deleteId: number): void {
    this.deleteEvent.emit(deleteId);
  }
  /**
   * updateDomain get the domain data and emit the data
   * @param updateData contain the domain for upadte
   */
  public updateDomain(updateData: Domain): void {
    this.updateEvent.emit(updateData);
  }
}
