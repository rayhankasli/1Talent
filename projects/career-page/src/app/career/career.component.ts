/**
 * @author : Gaurang Valia
 * @class : CareerComponent
 * @description : its is parent component of career module
 * Created Date : 20-03-2019
 */
import { Component } from '@angular/core';

/**
 * Component is lazay loaded component
 */
@Component({
  selector: 'one-talent-career',
  styleUrls: ['./career.component.scss'],
  templateUrl: './career.component.html',
})
// careerComponent
export class CareerComponent {
  public jobTitle: string = "Imagine more at 1Rivet";
  public jobDescription="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, quidem? Beatae dolore quae ducimus tempore quas rerum voluptates delectus? Ipsum tempore illo quia eos commodi iste eligendi omnis dolorum aperiam";
}
