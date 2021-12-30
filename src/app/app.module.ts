import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EncryptedTextComponent } from './encrypted-text/encrypted-text.component';

import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';


@NgModule({
  declarations: [
    AppComponent,
    EncryptedTextComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HighlightModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDividerModule,
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import("highlight.js/lib/core"),
        languages: {
          typescript: () => import("highlight.js/lib/languages/typescript")
        },
        themePath: "assets/styles/atom-one-dark.css"
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
