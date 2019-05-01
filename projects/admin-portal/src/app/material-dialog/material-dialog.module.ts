/**
 * @author - Naim Shaikh
 * @createdDate 27-03-2019
 * @description - This module file are fetures module for material.
 */

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatChipsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule
} from '@angular/material';

/**
 * NgModule - This module use for declare all the features
 */
@NgModule({
  exports: [FormsModule,
            MatDialogModule,
            MatFormFieldModule,
            MatButtonModule,
            MatInputModule,
            MatChipsModule,
            MatIconModule]
})
export class MaterialDialogModule { }
