import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Native components
import { LatLng } from '@ionic-native/google-maps';
//import { NativeGeocoder, NativeGeocoderReverseResult} from '@ionic-native/native-geocoder';
import { Toast } from '@ionic-native/toast';
import { DataBaseProvider } from '../../providers/database/database';


@Component({
  selector: 'page-sqlite',
  templateUrl: 'add-market.html'
})
export class AddMarketPage {
  market = { marketName:"", marketCategory:"", marketAddress:"",marketPhone:"",lat:0,lng:0};
  private position :LatLng;
  markets: string[] = [];
  
  //constructor(public navCtrl: NavController,public navParams: NavParams, public dataBaseProvider: DataBaseProvider,private nativeGeocoder: NativeGeocoder, private toast: Toast) {
    constructor(public navCtrl: NavController,public navParams: NavParams, public dataBaseProvider: DataBaseProvider, private toast: Toast) {
    this.position = navParams.get("position");
  }

  addMarket(){
    this.market.lat=this.position.lat;
    this.market.lng=this.position.lng;
    
    alert(this.market);
    this.dataBaseProvider.addMarket(this.market).then(
      res => {
        console.log(res);
        this.toast.show('Data saved', '5000', 'center').subscribe(
          toast => {
            this.navCtrl.popToRoot();
          }
        );
      })
  }
/**  private reverseGeocode(){

    let address="";
    this.nativeGeocoder.reverseGeocode(this.position.lat,this.position.lng)
    .then((result: NativeGeocoderReverseResult) => address=JSON.stringify(result))
    .catch((error: any) => console.log(error));
    return address;
}*/

}