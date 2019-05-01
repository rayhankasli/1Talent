/**
 * @author Rayhan Kasli
 * @createdDate 05-04-2019
 * @description This component file is used to dispaly technology data
 */
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Technology } from 'projects/hr-portal/src/app/manage-vacancy/vacancy.model';

/** ContentComponent used to display technology data as well as passing technologyId for update and delete technology  */
@Component({
  selector: 'one-talent-content',
  styleUrls: ['./content.component.scss'],
  templateUrl: './content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent {

  /** Input contentData used for display technology data in table */
  @Input() public contentData: Technology;

  /** Output deleteEvent used for emit the technology id for delete technology */
  @Output() public deleteEvent: EventEmitter<number> = new EventEmitter<number>();

  /** Output updateEvent used for emit the technology data to overlay modal for update  */
  @Output() public updateEvent: EventEmitter<Technology> = new EventEmitter<Technology>();

  /**
   * deleteTechnology get id for delete technology
   * @param deleteId contain the unique id of technology for delete
   * @author Rayhan Kasli
   * @createdDate 05-04-2019
   */
  public deleteTechnology (deleteId: number): void {
    this.deleteEvent.emit(deleteId);
  }

  /**
   * updateTechnology get the technology data and emit the data
   * @param updateData contain the technology data for upadte
   * @author Rayhan Kasli
   * @createdDate 05-04-2019
   */
  public editTechnology (updateData: Technology): void {
    this.updateEvent.emit(updateData);
  }

}
