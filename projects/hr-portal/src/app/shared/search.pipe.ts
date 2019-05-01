/**
 * @author - Bhumi Desai
 * @createdDate 08-04-2019
 * @description - This file is used for the search filter
 */
import { Pipe, PipeTransform } from '@angular/core';
import { Leave } from '../manage-leave/model/leave.model';
/** pipe for the search filter */
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  
  /**
   * Transforms search pipe
   * @param value : leaves records
   * @param searchText : searched value
   * @author: Bhumi Desai
   * @created date: 08/04/2019
   */
  public transform(value: Leave[], searchText: string): Leave[] {
    if (!value) { return []; }
    if (!searchText) { return value; }
    searchText = searchText.toLowerCase();
    for (const index of value) {
        return value.filter((it: Leave) => {
          return it.firstName.toLowerCase().includes(searchText);
        });
    }
  }

}
