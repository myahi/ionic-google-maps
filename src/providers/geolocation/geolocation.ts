import { Injectable } from '@angular/core';
import { LatLng, GoogleMap, GoogleMapsEvent } from '@ionic-native/google-maps';
import { MarketModel } from '../../pages/market/MarketModel';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform, NavController } from 'ionic-angular';
import { AddMarketPage } from '../../pages/market/add-market';

@Injectable()
export class GeolocationProvider {
  public map:GoogleMap;
  constructor(private geolocation:Geolocation,private platform:Platform) {
  }

  getCurrentPosition(): LatLng{
    let currentLocation:LatLng;
    this.geolocation.getCurrentPosition().then(resp => {
      currentLocation.lat=resp.coords.latitude;
      currentLocation.lng=resp.coords.longitude;
    })
     return currentLocation;
  };
  
  loadMap(map:GoogleMap,markets:Array<MarketModel>):any{
    this.map = map;
    this.map.setMyLocationButtonEnabled(true);
    this.map.setMyLocationEnabled(true);
    this.map.one(GoogleMapsEvent.MAP_READY).then(
      () => {
        console.log('maps  is reday');
        // Now you can add elements to the map like the marker
            let options = {
              target: new LatLng(42.346903, -71.135101),
              zoom: 8
            };
            this.map.moveCamera(options);
            for(var i = 0; i < markets.length; i++) {
              this.addMarker(markets[i]);
              }
      }
    )
  }


  public getCurrentLocation():Promise<LatLng>{
      return Promise.resolve(new LatLng(42.346903, -71.135101));
  }

  private addMarker(market:MarketModel) {    
    this.map.addMarker({
      animation: 'DROP',
      color:'blue',
      title:market.marketName,
      position: {
        lat: Number(market.lat),
        lng: Number(market.lng)
      }
    }).then(marker => {
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      });
    }).catch(e=>alert(e.message));
  }
}
