import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageExitChecklistRoutingModule } from './manage-exit-checklist-routing.module';
import { ListComponent } from './list/list.component';
import { OverlayModalComponent } from './overlay-modal/overlay-modal.component';
import { ContentComponent } from './list/content/content.component';
import { HeaderComponent } from './list/header/header.component';

@NgModule({
  declarations: [ListComponent, OverlayModalComponent, ContentComponent, HeaderComponent],
  imports: [
    CommonModule,
    ManageExitChecklistRoutingModule
  ]
})
export class ManageExitChecklistModule { }
