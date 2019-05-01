/**
 * @author - Naim Shaikh
 * @createDate 22-03-2019
 * @description - This routing file are set the routes for all the module.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { AuthGuard } from './core/guards/auth.guard';
import { MasterComponent } from './master/master.component';

/**
 * This route of app module.
 */
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
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'designation',
                loadChildren: './manage-designation/manage-designation.module#ManageDesignationModule'
            },
            {
                path: 'domain',
                loadChildren: './manage-domain/manage-domain.module#ManageDomainModule'
            },
            {
                path: 'technology',
                loadChildren: './manage-technology/manage-technology.module#ManageTechnologyModule'
            },
            {
                path: 'onboarding',
                loadChildren: './maintain-onboarding/maintain-onboarding.module#MaintainOnboardingModule'
            },
            {
                path: 'exit-checklist',
                loadChildren: './manage-exit-checklist/manage-exit-checklist.module#ManageExitChecklistModule'
            },
            {
                path: 'conference-assets',
                loadChildren: './manage-conference-assets/manage-conference-assets.module#ManageConferenceAssetsModule'
            }

        ]
    }

];

/**
 * This is routing file is use to routing with feature module
 */
@NgModule({
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forRoot(routes)
    ]
})
export class AppRoutingModule { }
