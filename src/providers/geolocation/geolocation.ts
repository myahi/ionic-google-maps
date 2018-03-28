import { Injectable } from '@angular/core';
import { LatLng, GoogleMap, GoogleMapsEvent } from '@ionic-native/google-maps';
import { MarketModel } from '../../pages/market/MarketModel';

@Injectable()
export class GeolocationProvider {
  private currentLocation:LatLng;
  public map:GoogleMap;
  constructor() {
  }

/*  getCurrentPosition(): LatLng{
    let currentLocation:LatLng;
    this.geolocation.getCurrentPosition((resp) => {
      currentLocation.lat=resp.coords.latitude;
      currentLocation.lng=resp.coords.longitude;
      
    })
     return currentLocation;
  };**/
  
  loadMap(map:GoogleMap){
    this.map = map;
    this.map.one(GoogleMapsEvent.MAP_READY).then(
      () => {
        console.log('maps  is reay');
        this.map.getMyLocation().then(res=>{
          this.currentLocation = res.latLng
        });
        // Now you can add elements to the map like the marker
            let options = {
              target: this.currentLocation,
              zoom: 8
            };
            this.map.moveCamera(options);
      }
    );
  }
  public getCurrentLocation():Promise<LatLng>{
    return this.map.getMyLocation().then(res=>{
      return res.latLng
    });
  }
  public addMarker(position:LatLng,title:String) {
    this.map.addMarker({
      animation: 'DROP',
      position: {
        lat: position.lat,
        lng: position.lng
      }
    })
    .then(marker => {
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      });
    });
  }
  putMarketsOnMap(markets:MarketModel[]){
    for(var i = 0; i < markets.keys.length; i++) {
      let location = new LatLng(markets[i].lat,markets[i].lng)
      this.addMarker(location,markets[i].marketName);
}
}
}
