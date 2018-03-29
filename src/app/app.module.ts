import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { NativeStoragePage } from '../pages/native-storage/native-storage';
import { AddMarketPage } from '../pages/market/add-market';
import { EditMarketPage } from '../pages/market/edit-market';


import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Native components
import { NativeStorage }  from '@ionic-native/native-storage';
import { SQLite }         from '@ionic-native/sqlite';
import { HomePage } from '../pages/home/home';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { Toast } from '@ionic-native/toast';
import { DataBaseProvider } from '../providers/database/database';
import { GeolocationProvider } from '../providers/geolocation/geolocation';
import { Geolocation } from '@ionic-native/geolocation';


@NgModule({
  declarations: [
    MyApp,
    NativeStoragePage,
    AddMarketPage,
    EditMarketPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrMaskerModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NativeStoragePage,
    AddMarketPage,
    EditMarketPage,
    TabsPage,
    HomePage
  ],
  providers: [
    SQLite,
    DataBaseProvider,
    StatusBar,
    SplashScreen,
    NativeStorage,
    Geolocation,
    //{provide: SQLite, useClass: SQLiteMock},
    Toast,
    NativeGeocoder,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GeolocationProvider
  ]
})
export class AppModule {}