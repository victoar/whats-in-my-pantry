import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {firebaseConfig} from "./environment";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {SQLitePorter} from "@awesome-cordova-plugins/sqlite-porter/ngx";
import {SQLite} from "@awesome-cordova-plugins/sqlite/ngx";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp(firebaseConfig), AngularFirestoreModule, HttpClientModule],
  providers: [SQLite, SQLitePorter, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
