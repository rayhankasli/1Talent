import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TagInputModule } from 'ngx-chips';

import { SharedModule } from '../shared/shared.module';
import { ContentComponent } from './list/content/content.component';
import { HeaderComponent } from './list/header/header.component';
import { ListComponent } from './list/list.component';
import { ManageTechnologyRoutingModule } from './manage-technology-routing.module';
import { ManageTechnologyService } from './manage-technology.service';
import { OverlayModalComponent } from './overlay-modal/overlay-modal.component';

/**
 * Ng module
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
    ManageTechnologyRoutingModule,
    SharedModule,
    TagInputModule

  ],
  providers: [
    ManageTechnologyService
  ]
})
export class ManageTechnologyModule { }
