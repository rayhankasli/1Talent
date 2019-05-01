/**
 * @author Naim Shaikh
 * @createdDate 06-04-2019
 * @description This  file is contain static headers
 *
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
export class HeaderComponent  {

   /** isModalShow emit value for open overlay component to add or edit onboarding  */
   @Output() public isModalShow: EventEmitter<boolean> = new EventEmitter<boolean>();

   /** addOnboardingFormShow stands for emit value for open overlay component to add or edit onboarding */
   public addOnboardingFormShow(): void {
     this.isModalShow.emit(true);
   }
}
