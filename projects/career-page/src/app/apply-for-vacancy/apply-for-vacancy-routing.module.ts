import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplyForVacancyComponent } from './apply-for-vacancy/apply-for-vacancy.component';

const routes: Routes = [
  {
    path:'',
    component: ApplyForVacancyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplyForVacancyRoutingModule {
  public jobTitle:string= 'hii';
 }
