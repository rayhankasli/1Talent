/**
 * @author Naim Shaikh
 * @createdDate 05-04-2019
 * @description This component file is used for display onboarding data and perfoem some actions
 */
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
// --------------------------------------------------------------------
import { Onboarding } from '../../onboarding.model';
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

  /** Input contentData used for display onboarding data in table */
  @Input() public contentData: Onboarding;

  /** Output deleteEvent used for emit the activity id for delete onboarding activity */
  @Output() public deleteEvent: EventEmitter<number> = new EventEmitter<number>();

  /** Output updateEvent used for emit the onboarding data to overlay modal for update  */
  @Output() public updateEvent: EventEmitter<Onboarding> = new EventEmitter<Onboarding>();

  /**
   * deleteActivity get id for delete onboarding activity
   * @param activityId contain the unique id of onboarding for delete activity
   */
  public deleteActivity(activityId: number): void {
    this.deleteEvent.emit(activityId);
  }
  /**
   * updateOnboarding get the onboarding data and emit the data
   * @param onboardingData contain the onboarding for upadte
   */
  public updateOnboarding(onboardingData: Onboarding): void {
    this.updateEvent.emit(onboardingData);
  }
}
