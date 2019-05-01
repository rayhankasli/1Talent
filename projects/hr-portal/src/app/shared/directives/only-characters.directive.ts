/**
 * @author: Bhumi Desai
 * @created date: 18/04/2019
 * @description: In this file, the directive for allowing only characters is performed
 */
import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

/**
 * directive decorator
 */
@Directive({
  selector: '[oneTalentOnlyCharacters]'
})
export class OnlyCharactersDirective {
  /** this variable is used sent boolean value true or false to the header component */
  @Output() public isValidTextEvent:EventEmitter<boolean> =new EventEmitter<boolean>();
  constructor(private el: ElementRef) { }
  
  /**
   * Host listener to allow only characters
   * @param event the input type event
   */
  @HostListener('input', ['$event']) public onInputChange(event: Event): void {
    const initalValue: string  = this.el.nativeElement.value;
    this.el.nativeElement.value = initalValue.replace(/[^a-zA-Z]*/g, '');
    if ( initalValue !== this.el.nativeElement.value) {
      this.isValidTextEvent.emit(true);
      event.stopPropagation();
    }else{
      this.isValidTextEvent.emit(false);
    }
  }
}
