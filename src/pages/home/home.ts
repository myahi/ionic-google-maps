import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AddMarketPage } from '../market/add-market';
import { EditMarketPage } from '../market/edit-market';
// Native components
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng} from '@ionic-native/google-maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private map:GoogleMap;
  private location:LatLng;
  private locations:Array<any> =[];
  
  constructor(public navCtrl: NavController, public platform: Platform) {
    this.location = new LatLng(42.346903, -71.135101);
    platform.ready().then(() => {
      this.loadMap();
		});
  }
  loadMap() {
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');
    this.map = GoogleMaps.create(element);
    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    this.map.one(GoogleMapsEvent.MAP_READY).then(
      () => {
        console.log('maps  is reay');
        // Now you can add elements to the map like the marker
            let options = {
              target: this.location,
              zoom: 8
            };
            this.map.moveCamera(options);
            setTimeout(() => {this.addMarker(this.location)}, 2000);
      }
    );
    this.addEventListners();
}

  addEventListners(){
    this.map.on(GoogleMapsEvent.MAP_LONG_CLICK)
    .subscribe((latLng) => {
      this.navCtrl.push(AddMarketPage,{position:latLng[0]}); 
      //this.addMarker(latLng[0]);
      });
  }
  
  public addMarker(position:LatLng) {
    this.map.addMarker({
      //title: this.getAddress(position),
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
  addData(position:LatLng){
    this.navCtrl.push(AddMarketPage,{position:this.location});
  }
}