/**
 * @author : Gaurang Valia
 * @class : CoreModule
 * @description : it is use to comman for all the module
 * Created Data : 20-03-2019
 */
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EnvironmentConfigService } from './environment-config/environment-config.service';
import { FooterComponent } from './footer/footer.component';
import { getEnvironment } from './get-environment';
import { HeaderComponent } from './header/header.component';
/** Ng module used for declarations, import SharedModule, export FooterComponent HeaderComponent, provider is EnvironmentConfigService */
@NgModule({
  declarations: [HeaderComponent,
                 FooterComponent],
  exports: [FooterComponent,
            HeaderComponent],
  imports: [
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    EnvironmentConfigService,
    {
      deps: [EnvironmentConfigService],
      multi: true,
      provide: APP_INITIALIZER,
      useFactory: getEnvironment,
    }],
})
// Export the Core module
export class CoreModule { }
