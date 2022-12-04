import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';               // Pour se connecter à firebase
import { AngularFireAuthModule } from '@angular/fire/compat/auth';      // Pour l'authentification
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';  // Pour les bases des données firestore
import { AngularFireDatabaseModule} from '@angular/fire/compat/database'; // Pour manupiler les bases des données firebase
import { AngularFireStorageModule } from '@angular/fire/compat/storage'; // Pour les stockages des données 


const firebaseConfig = {
  apiKey: "AIzaSyArhY1wWeXTXh6hYPtwJhA8xM3ih-hl0Js",
  authDomain: "premier-projet-38964.firebaseapp.com",
  databaseURL: "https://premier-projet-38964-default-rtdb.firebaseio.com",
  projectId: "premier-projet-38964",
  storageBucket: "premier-projet-38964.appspot.com",
  messagingSenderId: "272563609060",
  appId: "1:272563609060:web:4cf4d7f0881ae5541dbbf1"
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(),
     AppRoutingModule,
     AngularFireModule.initializeApp(firebaseConfig),
     AngularFireAuthModule,
     AngularFirestoreModule,
     AngularFireDatabaseModule,
     AngularFireStorageModule
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
