import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AddMarketPage } from '../market/add-market';
//import { EditMarketPage } from '../market/edit-market';
// Native components
import { GoogleMaps, GoogleMapsEvent, LatLng} from '@ionic-native/google-maps';
import { DataBaseProvider } from '../../providers/database/database';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { MarketModel } from '../market/MarketModel';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private markets:Array<MarketModel> =[];
  constructor(public navCtrl: NavController, public platform: Platform,public dataBaseProvider: DataBaseProvider,public geoLocalisationProvide: GeolocationProvider) {
  //  this.location = new LatLng(42.346903, -71.135101);
    platform.ready().then(() => {
      this.loadMap();
		});
  }
  ionViewWillEnter() {
  }
  loadMap() {
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');
    this.geoLocalisationProvide.loadMap(GoogleMaps.create(element));
    /**this.dataBaseProvider.getAllMarkets().then(
      res => {
        this.geoLocalisationProvide.putMarketsOnMap(res);
      })
    this.addEventListners();*/
}

  addEventListners(){
    this.geoLocalisationProvide.map.on(GoogleMapsEvent.MAP_LONG_CLICK)
    .subscribe((latLng) => {
      this.navCtrl.push(AddMarketPage,{position:latLng[0]}); 
      });
  }

  updateMarketOnMap(){
    this.dataBaseProvider.getAllMarkets().then((markets)=>{
      if (markets.keys.length != this.markets.keys.length){
        this.geoLocalisationProvide.putMarketsOnMap(markets);      
      }
    });
  }

  addData(position:LatLng){
    this.navCtrl.push(AddMarketPage,{position:this.geoLocalisationProvide.getCurrentLocation()});
  }

  
  

}