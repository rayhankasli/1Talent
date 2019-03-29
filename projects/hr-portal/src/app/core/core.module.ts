/**
 * @author : Bhumi Desai
 * @created date: 20/03/2019
 * @description : Core Module for the environment-config, Header and Sidebar
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavbarModule } from './navbar/navbar.module';

/** used for import and export modules */
@NgModule({
  exports: [NavbarModule],
  imports: [CommonModule, NavbarModule],
})

/** Core Module for the environment-config, Header and Sidebar */
export class CoreModule { }
