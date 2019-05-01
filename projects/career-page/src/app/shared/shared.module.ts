/**
 * @author : Gaurang Valia
 * @class : SharedModule
 * @description : is shared the all the feature module and core module
 * Created Data : 20-03-2019
 */
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BannerComponent } from './banner/banner.component';
/** Ng module used to declarations, import , export, provide service of VacancyService */
@NgModule({
  declarations: [BannerComponent],
  exports: [
    BannerComponent,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
// Export SharedModule
export class SharedModule { }
