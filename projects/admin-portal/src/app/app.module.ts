/**
 *  @author Naim Shaikh
 *  @createdDate 22-03-2019
 *  @description This app module file is used for declare all the features
 */
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// ---------------------------------------------------------
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { CoreModule } from './core/core.module';
import { MasterComponent } from './master/master.component';
import { Interceptor } from './core/interceptor';

/**
 * NgModule - This module use for declare all the features
 */
@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent,
    AuthCallbackComponent,
    MasterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(
      {
        preventDuplicates: true,
        timeOut: 3000
      }
    )

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ]

})
export class AppModule { }
