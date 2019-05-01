/**
 * @author : Bhumi Desai
 * @created date: 20/03/2019
 * @description : Core Module for the environment-config, Header and Sidebar
 */
import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { EnvironmentConfigService } from './environment-config/environment-config.service';
import { getEnvironment } from './get-environment';
import { LoaderService } from './loader/loader.service';
import { NavbarModule } from './navbar/navbar.module';

/** used for import and export modules */
@NgModule({
  exports: [NavbarModule],
  imports: [CommonModule, NavbarModule],
  providers: [
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

/** Core Module for the environment-config, Header and Sidebar */
export class CoreModule { }
