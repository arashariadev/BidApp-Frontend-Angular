import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';    // add this
import { FormsModule } from '@angular/forms';    // add this
import { AppRoutingModule,RoutingComponent } from './app-routing.module';
import { AppComponent } from '@app/app.component';

/* adding rest-api-server-service here so that it is instantiated before any other service as it wil provide rest-api-server path*/
import {RestApiServerService} from '@app/services/rest-api-server.service';

//need to be injected-->add in providers array
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthTokenInterceptor } from '@app/services/auth-interceptor';
import { SpinnerService } from './services/spinner.service';
import { ShareUserService } from './services/share-user.service';

@NgModule({
  declarations: [//all the modules the application has
    AppComponent,
    RoutingComponent,
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, HttpClientModule,
  ],
  providers: [
    RestApiServerService,
    SpinnerService,
    ShareUserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
