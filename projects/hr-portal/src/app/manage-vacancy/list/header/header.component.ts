import { Component, EventEmitter, Output } from '@angular/core';

/**
 * This is the Component decorator.
 * Component selector, scss adn html files are declared here
 */
@Component({
  selector: 'one-talent-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  /** it will emit the boolean value to the list component using output emitter */
  @Output() public showEvent: EventEmitter<boolean> = new EventEmitter<boolean>() ;

  /**
   * on click of delete button this method will be called, and it will emit value true.
   * @author: Bhumi Desai
   * @created date: 25/03/2019
   */
  public openModalForm (): void {
    this.showEvent.emit(true);
  }

}
