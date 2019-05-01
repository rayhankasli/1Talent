import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth/auth.service';
/**
 * This is the Component decorator.
 * Component selector, scss and html files are declared here
 */
@Component({
  selector: 'one-talent-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit {

  constructor (private authservice: AuthService) { }

  public ngOnInit (): void {
    this.authservice.complateAuthentication();
  }

}
