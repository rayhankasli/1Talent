import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageConferenceAssetsRoutingModule } from './manage-conference-assets-routing.module';
import { ListComponent } from './list/list.component';
import { OverlayModalComponent } from './overlay-modal/overlay-modal.component';
import { ContentComponent } from './list/content/content.component';
import { HeaderComponent } from './list/header/header.component';
import { ManageConferenceAssetsService } from './manage-conference-assets.service';
import { SharedModule } from '../shared/shared.module';

/** Ng module */
@NgModule({
  declarations: [ListComponent, OverlayModalComponent, ContentComponent, HeaderComponent],
  imports: [
    CommonModule,
    ManageConferenceAssetsRoutingModule,
    SharedModule
  ],
  providers: [
    ManageConferenceAssetsService
  ]
})
export class ManageConferenceAssetsModule { }
