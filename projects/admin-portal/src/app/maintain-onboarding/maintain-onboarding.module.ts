/**
 * @author - Naim Shaikh
 * @createdDate 03-04-2019
 * @description - This module file are fetures module for maintain-onboarding
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// ------------------------------------------------------------------------------------
import { SharedModule } from '../shared/shared.module';
import { ContentComponent } from './list/content/content.component';
import { HeaderComponent } from './list/header/header.component';
import { ListComponent } from './list/list.component';
import { MaintainOnboardingRoutingModule } from './maintain-onboarding-routing.module';
import { OverlayModalComponent } from './overlay-modal/overlay-modal.component';

/**
 * NgModule - This module use for declare all the features
 */
@NgModule({
  declarations: [
    ListComponent,
    OverlayModalComponent,
    HeaderComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    MaintainOnboardingRoutingModule,
    SharedModule
  ]
})
export class MaintainOnboardingModule { }
