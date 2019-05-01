import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Vacancy } from '../../vacancy.model';
/**
 * This is the Component decorator.
 * Component selector, scss adn html files are declared here
 */
@Component({
  selector: 'one-talent-content',
  styleUrls: ['./content.component.scss'],
  templateUrl: './content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent {

/**
 * all the records from the list component will be stored in this variable using input decorator.
 * this variable will be used in template to display the records.
 */
  @Input() public contentData: Vacancy[];
  /** this will emit the particular record to be updated to the list component using output decorator */
  @Output() public updateDataEvent: EventEmitter<Vacancy> = new EventEmitter<Vacancy>();
  /** this will emit the particular id to be deleted to the list component using output decorator */
  @Output() public deleteDataEvent: EventEmitter<number> = new EventEmitter<number>();
  /** this will emit the particular record to be updated to the list component using output decorator */
  @Output() public changeStatusEvent: EventEmitter<Vacancy> = new EventEmitter<Vacancy>();

  /**
   * on click of update button this method will be called
   * @param vacancy: get the particular record on which it is clicked
   */
  public updateClick (vacancy: Vacancy): void {
   this.updateDataEvent.emit(vacancy);
  }
  /**
   * on click of delete button this method will be called
   * @param vacancyId: get the particular id on which it is clicked
   */
  public deleteClick (vacancyId: number): void {
   this.deleteDataEvent.emit(vacancyId);
  }
  /**
   * on click of cancel button this method will be called
   * @param vacancy: get the particular record on which it is clicked
   */
  public changeStatusClick (vacancy: Vacancy): void {
   this.changeStatusEvent.emit(vacancy);
  }

 
}
