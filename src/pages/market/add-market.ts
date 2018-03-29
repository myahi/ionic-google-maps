import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Native components
import { LatLng } from '@ionic-native/google-maps';
//import { NativeGeocoder, NativeGeocoderReverseResult} from '@ionic-native/native-geocoder';
import { Toast } from '@ionic-native/toast';
import { DataBaseProvider } from '../../providers/database/database';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-sqlite',
  templateUrl: 'add-market.html'
})
export class AddMarketPage {
  market = { marketName:"", marketCategory:"", marketAddress:"",marketPhone:"",lat:42.346903,lng:-71.135101};
  private position :LatLng;
    constructor(public navCtrl: NavController,public navParams: NavParams, public dataBaseProvider: DataBaseProvider, private toast: Toast,private homePage:HomePage) {
    this.position = navParams.get("position");
  }

  addMarket(){
    this.dataBaseProvider.addMarket(this.market).then(
      res => {
        this.toast.show('Data saved', '5000', 'center').subscribe(
          toast => {
            this.homePage.markets = res;
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