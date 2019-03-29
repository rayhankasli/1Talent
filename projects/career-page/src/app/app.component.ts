/**
 * @author : Gaurang Valia
 * @class : AppComponent
 * @description :Component is main component in this application.
 * Created Date : 20-03-2019
 */
import { Component } from '@angular/core';
/**
 * This is the Component decorator.
 * Component selector, scss, animation and html files are declared here
 */
@Component({
  selector: 'one-talent-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
// main component of the application.
export class AppComponent {
  // Title  of Career page
  public title: string = 'career-page';
}
