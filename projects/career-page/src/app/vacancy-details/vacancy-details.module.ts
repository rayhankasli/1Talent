
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { VacancyDetailsRoutingModule } from './vacancy-details-routing.module';
import { VacancyDetailsComponent } from './vacancy-details/vacancy-details.component';

/**
 * Ng module
 */
@NgModule({
  declarations: [VacancyDetailsComponent],
  imports: [
    CommonModule,
    VacancyDetailsRoutingModule,
    SharedModule,
  ],
})
export class VacancyDetailsModule { }
