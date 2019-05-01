import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Leave } from '../../model/leave.model';

/**
 * This is the Component decorator.
 * Component selector, scss and html files are declared here
 */
@Component({
  selector: 'one-talent-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent {
 
  /**
   * all the records from the list component will be stored in this variable using input decorator.
   * this variable will be used in template to display the records.
   */
  @Input() public contentData: Leave[];
    /** emits the approve value to the list component using output decorator */
  @Output() public approveEvent: EventEmitter<number> = new EventEmitter<number>();
  /** emits the rejected value to the list component using output decorator */
  @Output() public rejectEvent: EventEmitter<number> = new EventEmitter<number>();
  /** emits the cancelled request value to the list component using output decorator */
  @Output() public cancelRequestEvent: EventEmitter<number> = new EventEmitter<number>();
  /** emits the rejected request value to the list component using output decorator */
  @Output() public rejectRequestEvent: EventEmitter<number> = new EventEmitter<number>();
  
  /**
   * Approves the leave request
   * this method emits the leave id.
   * @param leaveId : unique leave id of the content
   * @author: Bhumi Desai
   * @created date: 06/04/2019
   */
  public approve(leaveId: number): void {
    this.approveEvent.emit(leaveId);
  }
  
  /**
   * on click of delete button this method will be called
   * @param leaveId: get the particular id on which it is clicked
   * @author: Bhumi Desai
   * @created date: 06/04/2019
   */
  public deleteClick (leaveId: number): void {
    this.rejectEvent.emit(leaveId);
   }

  /**
   * approve the cancelled leave request
   * @param leaveId: get the particular id on which it is clicked
   * @author: Bhumi Desai
   * @created date: 19/04/2019
   */
  public approveCancelRequest(leaveId: number): void {
    this.cancelRequestEvent.emit(leaveId);
  }
  /**
   * reject the cancelled leave request
   * @param leaveId: get the particular id on which it is clicked
   * @author: Bhumi Desai
   * @created date: 19/04/2019
   */
  public rejectCancelRequest(leaveId: number): void {
    this.rejectRequestEvent.emit(leaveId);
  }

}
