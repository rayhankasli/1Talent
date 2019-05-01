/**
 *  @author Rayhan Kasli
 *  @createdDate 02-04-2019
 *  @discription  Here directive use for remove white space
 */

import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * Directive - This directive use for remove white space
 */
@Directive({
  selector: '[oneTalentRemoveSpace]'
})
export class RemoveSpaceDirective {

  /**
   * Element use for store value
   */
  public element: string;

  /**
   * Creates an instance of remove space directive.
   * @param elementRef inject element ElementRef class
   * @param ngControl inject NgControl abstarct class
   */
  constructor(private elementRef: ElementRef, private ngControl: NgControl) { }

  /**
   * It is used to trim the string when blur event is fire
   */
  @HostListener('blur') public onblur (): void {
    this.element = this.elementRef.nativeElement.value;
    const value: string = this.element.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
    this.ngControl.control.setValue(value);
  }
}
