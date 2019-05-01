/**
 * @author : Bhumi Desai
 * @created date: 20/03/2019
 * @class : AppModule
 * @description : All the modules of the application are imported here.
 */

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { CoreModule } from './core/core.module';
import { MasterComponent } from './master/master.component';
import { Interceptor } from './core/interceptor';
/**
 * used for declarations, import, export, provide service and also bootstrap
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    AuthCallbackComponent,
    MasterComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    HttpClientModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      timeOut: 3000
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi:true
    }
  ]
})
/**
 * All the modules of the application are imported here
 */
export class AppModule { }
