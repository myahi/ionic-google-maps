import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Native components
<<<<<<< HEAD
import { Toast } from '@ionic-native/toast';
import { DataBaseProvider } from '../../providers/database/database';
import { MarketModel } from './MarketModel';
=======
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { LatLng } from '@ionic-native/google-maps';
import { NativeGeocoder, NativeGeocoderReverseResult} from '@ionic-native/native-geocoder';
import { Toast } from '@ionic-native/toast';

const DATABASE_FILE_NAME: string = 'data.db';
>>>>>>> fist commit

@Component({
  selector: 'page-sqlite',
  templateUrl: 'edit-market.html',
})
export class EditMarketPage {

  data = { rowid:0, date:"", type:"", description:"", amount:0 };
<<<<<<< HEAD
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
=======

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast) {
      this.getCurrentData(navParams.get("rowid"));
  }

  getCurrentData(rowid) {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM expense WHERE rowid=?', [rowid])
        .then(res => {
          if(res.rows.length > 0) {
            this.data.rowid = res.rows.item(0).rowid;
            this.data.date = res.rows.item(0).date;
            this.data.type = res.rows.item(0).type;
            this.data.description = res.rows.item(0).description;
            this.data.amount = res.rows.item(0).amount;
          }
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

  updateData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('UPDATE expense SET date=?,type=?,description=?,amount=? WHERE rowid=?',[this.data.date,this.data.type,this.data.description,this.data.amount,this.data.rowid])
        .then(res => {
          console.log(res);
          this.toast.show('Data updated', '5000', 'center').subscribe(
            toast => {
              this.navCtrl.popToRoot();
            }
          );
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
>>>>>>> fist commit
  }

}