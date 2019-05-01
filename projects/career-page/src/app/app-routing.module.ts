/**
 * @author : Gaurang Valia
 * @class : AppRoutingModule
 * @description : This file used for routing of career module
 * Created Date : 20-03-2019
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: 'careers',
    loadChildren: './career/career.module#CareerModule',
  },
  {
    path: 'vacancy-details/:id',
    loadChildren: './vacancy-details/vacancy-details.module#VacancyDetailsModule',
  },
  {
    path:'apply-for-vacancy/:id',
    loadChildren: './apply-for-vacancy/apply-for-vacancy.module#ApplyForVacancyModule'
  }
];
/** Ng module is use to difine the exports -> routerModule and imports */
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
// This module is provide the routing in app level
export class AppRoutingModule { }
