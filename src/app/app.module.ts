import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import {AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';
import {HotelModule} from "./hotel/hotel.module";
import { AuthComponent } from './shared/auth/auth.component';
import { DistanceLiteralPipe } from './shared/pipes/distance-literal.pipe';
import {SideNavComponent} from "./shared/side-nav/side-nav.component";

export const firebaseConfig =  {
  apiKey: "XXXX",
  authDomain: "XXXX",
  databaseURL: "XXXX",
  storageBucket: "XXXX",
  messagingSenderId: "XXXX"
};
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig,{
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    }),
    MaterialModule.forRoot(),
    HotelModule,
  ],
  declarations: [
    AppComponent,
    AuthComponent,
    SideNavComponent
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
