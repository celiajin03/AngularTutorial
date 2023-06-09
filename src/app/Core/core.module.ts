import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './Layouts/header.component';
import {FooterComponent} from './Layouts/footer.component';
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
    imports: [
        CommonModule,
        RouterLink
    ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule {
}
