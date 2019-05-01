/**
 * @author Rayhan Kasli
 * @craetedDate 21-03-2019
 * @description This module file is used for create single instance
 */
import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
// --------------------------------------------------------
import { EnvironmentConfigService } from './environment-config/environment-config.service';
import { getEnvironment } from './get-environment';
import { AuthGuard } from './guards/auth.guard';
import { LoaderService } from './loader/loader.service';
import { NavbarModule } from './navbar/navbar.module';
import { AuthService } from './services/auth/auth.service';

/**
 * NgModule - This module use for declare all the features
 */
@NgModule({
  declarations: [
  ],
  exports: [
    NavbarModule
  ],
  imports: [
    CommonModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    EnvironmentConfigService,
    {
      deps: [EnvironmentConfigService],
      multi: true,
      provide: APP_INITIALIZER,
      useFactory: getEnvironment
    },
    LoaderService
  ]
})
export class CoreModule { }
