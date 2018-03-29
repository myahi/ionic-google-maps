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
  public markets:Array<MarketModel>=[];
  constructor(public navCtrl: NavController, public platform: Platform,public dataBaseProvider: DataBaseProvider,public geoLocalisationProvide: GeolocationProvider) {
    platform.ready().then(() => {
      this.loadMap();
		});
  }
  ionViewWillEnter() {
      this.loadMap();
    }
  loadMap() {
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');
    let market = new MarketModel("Test","","","42.346903","-71.135101","");
    this.markets.push(market);
/**    this.dataBaseProvider.getAllMarkets().then((res) => {
      if(res!=null && res.length >0) {
        this.markets = res;
      }
      });*/
    this.geoLocalisationProvide.loadMap(GoogleMaps.create(element),this.markets)
    .then(()=>{this.addEventListener()});;
    
}

private addEventListener(){
  this.geoLocalisationProvide.map.on(GoogleMapsEvent.MAP_LONG_CLICK)
  .subscribe((latLng) => {
  this.navCtrl.push(AddMarketPage,{position:latLng[0]}); 
});
}

addData(position:LatLng){
    this.navCtrl.push(AddMarketPage,{position:this.geoLocalisationProvide.getCurrentLocation()});
  }

}