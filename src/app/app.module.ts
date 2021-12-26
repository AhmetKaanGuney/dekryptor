import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoadingBarComponent } from './loading-bar/loading-bar.component';
import { EncryptedTextComponent } from './encrypted-text/encrypted-text.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingBarComponent,
    EncryptedTextComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
