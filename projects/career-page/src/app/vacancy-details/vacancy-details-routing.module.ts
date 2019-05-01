import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VacancyDetailsComponent } from './vacancy-details/vacancy-details.component';

const routes: Routes = [
  {
    path: '',
    component: VacancyDetailsComponent,
  },
];

/**
 * Ng module
 */
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class VacancyDetailsRoutingModule { }
