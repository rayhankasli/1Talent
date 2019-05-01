/**
 * @author Naim Shaikh
 * @createdDate 22-03-2019
 * @description This file is use to handle sidebar activity
 */
import { Component } from '@angular/core';
import { User } from 'oidc-client';
import { Subscription } from 'rxjs/';
// ------------------------------------------------------------
import { AuthService } from '../../services/auth/auth.service';

/**
 * Component - This component use for decorate the class
 */
@Component({
  selector: 'one-talent-sidebar',
  styleUrls: ['./sidebar.component.scss'],
  templateUrl: './sidebar.component.html'

})
export class SidebarComponent {
  /**
   * FullName of User
   */
  public fullName: string = '';
  constructor(private authSerive: AuthService) {

    const sub: Subscription = authSerive.currentUserData
      .subscribe((user: User['profile']) => {
        this.fullName = user.FullName;
      },         null, () => {
        sub.unsubscribe();
      });
  }
}
