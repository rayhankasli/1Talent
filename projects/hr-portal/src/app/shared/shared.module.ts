
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialDialogModule } from '../material-dialog/material-dialog.module';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { SearchPipe } from './search.pipe';
import { OnlyCharactersDirective } from './directives/only-characters.directive';

/** used for importing and exporting the modules */
@NgModule({
  declarations: [
    DeleteDialogComponent,
    SearchPipe,
    OnlyCharactersDirective
  ],
  entryComponents: [
    DeleteDialogComponent
  ],
  exports: [
    MaterialDialogModule,
    DeleteDialogComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SearchPipe,
    OnlyCharactersDirective
  ],
  imports: [
    MaterialDialogModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]

})

/** This module is used for using all the common properties in feature module */
export class SharedModule { }
