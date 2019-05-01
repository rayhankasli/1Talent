import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'list',
    component: ListComponent
  }
];

/**
 * Ng module
 */
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class ManageTechnologyRoutingModule { }
