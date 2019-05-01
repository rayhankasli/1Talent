/**
 * @author - Naim Shaikh
 * @createdDate 27-03-2019
 * @description - This file is use to declare all the feature.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialDialogModule } from '../material-dialog/material-dialog.module';
import { DeleteDailogComponent } from './delete-dailog/delete-dailog.component';
import { RemoveSpaceDirective } from './directives/remove-space.directive';
/**
 * NgModule - This module is use to declare all the feature.
 */
@NgModule({
  declarations: [
    DeleteDailogComponent,
    RemoveSpaceDirective
  ],
  entryComponents: [
    DeleteDailogComponent
  ],
  exports: [
    MaterialDialogModule,
    DeleteDailogComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RemoveSpaceDirective
  ],
  imports: [
    MaterialDialogModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
