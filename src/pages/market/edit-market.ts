import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Native components

import { Toast } from '@ionic-native/toast';
import { DataBaseProvider } from '../../providers/database/database';
import { MarketModel } from './MarketModel';


@Component({
  selector: 'page-sqlite',
  templateUrl: 'edit-market.html',
})
export class EditMarketPage {

  data = { rowid:0, date:"", type:"", description:"", amount:0 };

  market :MarketModel;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dataBaseProvider: DataBaseProvider,
    private toast: Toast) {
      this.getMarket(navParams.get("rowid"));
  }

  saveMarket(){
    this.dataBaseProvider.addMarket(this.data).then(
      res => {
        console.log(res);
        this.toast.show('Data saved', '5000', 'center').subscribe(
          toast => {
            this.navCtrl.popToRoot();
          }
        );
      })
  }
  getMarket(rowid) {
    this.dataBaseProvider.getMarket(this.data).then(
      res => {
        console.log(res);
        this.toast.show('Data saved', '5000', 'center').subscribe(
          toast => {
            this.navCtrl.popToRoot();
          }
        );
      })
  }
  updateMarket() {
    this.dataBaseProvider.updateMarket(this.data).then(
      res => {
        console.log(res);
        this.toast.show('Market updated', '5000', 'center').subscribe(
          toast => {
            this.navCtrl.popToRoot();
          }
        );
      })

  }

}