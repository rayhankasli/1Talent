import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth/auth.service';

/**
 * Component
 */
@Component({
  selector: 'one-talent-auth-callback',
  styleUrls: ['./auth-callback.component.scss'],
  templateUrl: './auth-callback.component.html'
})
export class AuthCallbackComponent implements OnInit {

  constructor(private authservice: AuthService) { }

  public ngOnInit(): void {
    this.authservice.complateAuthentication();
  }

}
