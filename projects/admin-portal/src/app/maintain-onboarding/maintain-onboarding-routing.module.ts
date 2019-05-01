/**
 * @author - Naim Shaikh
 * @createDate 03-04-2019
 * @description - This routing file are set the routes for maintain-onboarding module.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// ----------------------------------------------------
import { ListComponent } from './list/list.component';
/**
 * This route of maintain-onboarding child Routes.
 */
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
 * NgModule - This module use for set the routes
 */
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class MaintainOnboardingRoutingModule { }
