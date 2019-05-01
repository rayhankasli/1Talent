import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ContentComponent } from './list/content/content.component';
import { HeaderComponent } from './list/header/header.component';
import { ListComponent } from './list/list.component';
import { ManageLeaveRoutingModule } from './manage-leave-routing.module';
/** used for declarations of components and import the module */
@NgModule({
  declarations: [ListComponent, HeaderComponent, ContentComponent],
  imports: [
    SharedModule,
    ManageLeaveRoutingModule
  ]
})
export class ManageLeaveModule { }
