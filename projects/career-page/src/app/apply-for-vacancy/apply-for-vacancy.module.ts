import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplyForVacancyRoutingModule } from './apply-for-vacancy-routing.module';
import { ApplyForVacancyComponent } from './apply-for-vacancy/apply-for-vacancy.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ApplyForVacancyComponent],
  imports: [
    CommonModule,
    ApplyForVacancyRoutingModule,
    SharedModule
  ]
})
export class ApplyForVacancyModule { }
