import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './Core/core.module';
import {SharedModule} from './Shared/shared.module';
import {HomeComponent} from './Public/home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from "@angular/forms";
import {JwtAdderInterceptor} from "./Core/Interceptors/jwt-adder.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
      {provide:HTTP_INTERCEPTORS, useClass:JwtAdderInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
