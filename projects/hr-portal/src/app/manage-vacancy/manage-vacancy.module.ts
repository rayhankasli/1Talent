import { NgModule } from '@angular/core';

import { MaterialDialogModule } from '../material-dialog/material-dialog.module';
import { SharedModule } from '../shared/shared.module';
import { ContentComponent } from './list/content/content.component';
import { HeaderComponent } from './list/header/header.component';
import { ListComponent } from './list/list.component';
import { ManageVacancyRoutingModule } from './manage-vacancy-routing.module';
import { OverlayModalComponent } from './overlay-modal/overlay-modal.component';

/**
 * used for declarations of components and import the modules
 */
@NgModule({
  declarations: [ListComponent, HeaderComponent, ContentComponent, OverlayModalComponent],
  imports: [SharedModule, ManageVacancyRoutingModule, MaterialDialogModule]

})

/**
 *  ManageVacancy Module is used for managing the vacancies
 */
export class ManageVacancyModule { }
