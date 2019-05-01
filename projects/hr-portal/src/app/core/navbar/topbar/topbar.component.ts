/**
 * @author: Bhumi Desai
 * @created date: 20/03/2019
 * @description: This is the topbar component file
 */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'oidc-client';

/**
 * This is the Component decorator.
 * Component selector, scss adn html files are declared here
 */
@Component({
  selector: 'one-talent-topbar',
  styleUrls: ['./topbar.component.scss'],
  templateUrl: './topbar.component.html'
})

/** Topbar component for the Topbar */
export class TopbarComponent {

  /**
   * Full name of topbar component
   */
  public fullName: string = '';
  constructor (private authSerive: AuthService) {

    const sub: Subscription = authSerive.currentUserData
      .subscribe((user: User['profile']) => {
        this.fullName = user.FullName;
      },         null, () => {
        sub.unsubscribe();
      });
  }
  /**
   * Users logout
   */
  public userLogout (): void {
    this.authSerive.logout();
  }
}
