/**
 * @author - Bhumi Desai
 * @createdDate 03-04-2019
 * @description - This module file is the module for material dialog.
 */

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatInputModule,
   MatNativeDateModule } from '@angular/material';

/**
 * used for declarations of components and import the modules
 */
@NgModule({
  exports: [FormsModule, MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatNativeDateModule, MatDatepickerModule]
})
export class MaterialDialogModule { }
