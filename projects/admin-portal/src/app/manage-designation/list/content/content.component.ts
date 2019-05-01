/**
 * @author Rayhan Kasli
 * @createdDate 22-03-2013
 * @description This component file is used for display designation data and perfoem some actions
 */
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Designation } from 'projects/hr-portal/src/app/manage-vacancy/vacancy.model';

/**
 * ContentComponent file is used for display designation data and perfoem some actions like update
 * and delete designation
 */
@Component({
  selector: 'one-talent-content',
  styleUrls: ['./content.component.scss'],
  templateUrl: './content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent {

  /** Input contentData used for display designation data in table */
  @Input() public contentData: Designation;

  /** Output deleteEvent used for emit the designation id for delete designation */
  @Output() public deleteEvent: EventEmitter<number> = new EventEmitter<number>();

  /** Output updateEvent used for emit the designation data to overlay modal for update  */
  @Output() public updateEvent: EventEmitter<Designation> = new EventEmitter<Designation>();

  /**
   * deleteDesignation get id for delete designation
   * @param deleteId contain the unique id of designation for delete
   * @author Rayhan Kasli
   * @createdDate 22-03-2019
   */
  public deleteDesignation (deleteId: number): void {
    this.deleteEvent.emit(deleteId);
  }

  /**
   * updateDesignation get the designation data and emit the data
   * @param updateId contain the unique id of designation for upadte
   * @author Rayhan Kasli
   * @createdDate 25-03-2019
   */
  public updateDesignation (updateData: Designation): void {
    this.updateEvent.emit(updateData);
  }

}
