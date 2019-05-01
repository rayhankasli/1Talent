/**
 * @author : Bhumi Desai
 * @created date: 20/03/2019
 * @description :AppRouting is created to define route for root module, which is called when app is intialized.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { AuthGuard } from './core/guard/auth.guard';
import { MasterComponent } from './master/master.component';
const routes: Routes = [
  {
    path: 'auth-callback',
    component: AuthCallbackComponent
  },
  {
    path: '',
    component: MasterComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'manage-vacancy',
        loadChildren: './manage-vacancy/manage-vacancy.module#ManageVacancyModule'
      },
      {
        path: 'manage-leave',
        loadChildren: './manage-leave/manage-leave.module#ManageLeaveModule'
      }
    ]
  }
];
/**
 * imports the RouterModule and then export it
 */
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})

/**
 * This class is exported to provide routes to the application.
 */
export class AppRoutingModule { }
