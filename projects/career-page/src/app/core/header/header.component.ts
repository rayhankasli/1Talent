/**
 * @author : Gaurang Valia
 * @class : HeaderComponent
 * Created Data : 20-03-2019
 * modifed Data : 04-04-2019
 */
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MenuItems } from './menu-items.model';
/**
 * This is the Component decorator.
 * Component selector, scss and html files are declared here
 */
@Component({
  selector: 'one-talent-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
// HeaderCompnent is use to display the menu items and routes
export class HeaderComponent {
   /** View child of header component */
   @ViewChild('remove') public remove: ElementRef;
   /** Determines whether show is */
   public isShow: boolean = false;
   /** Menu items Array of header component */
   public menuItems: MenuItems[];
   constructor (private renderer: Renderer2) {
    this.menuItems = [
      {
        name: 'ABOUT US',
        url: '',
      },
      {
        name: 'OUR DIVISION',
        url: '',
      },
      {
        name: 'OUR WORK',
        url: '',
      },
      {
        name: 'PRODUCT',
        url: '',
      },
      {
        name: 'INSIGHTS',
        url: '',
      },
      {
        name: 'NEWS',
        url: '',
      },
      {
        name: 'CAREER',
        url: '/careers',
      },
      {
        name: 'CONTACT US',
        url: '',
      }];
  }
  /** Shows menu */
   public showMenu (): void {
    this.renderer.removeClass(this.remove.nativeElement, 'show');
  }
    // TODO USE
  // public selectedMenuItem():void {
  //   console.log('hiii');
  //   this.renderer.addClass(this.isActive.nativeElement,'active');
  // }
}
