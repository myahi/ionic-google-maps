import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Native components
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { LatLng } from '@ionic-native/google-maps';
import { NativeGeocoder, NativeGeocoderReverseResult} from '@ionic-native/native-geocoder';
import { Toast } from '@ionic-native/toast';

const DATABASE_FILE_NAME: string = 'data.db';

@Component({
  selector: 'page-sqlite',
  templateUrl: 'add-market.html'
})
export class AddMarketPage {

  private db: SQLiteObject;
  //private market:MarketModel;

  data = { marketName:"", marketCategory:"", marketAddress:"",marketPhone:""};
  private position :LatLng;
  private LatLng;
  markets: string[] = [];

  constructor(public navCtrl: NavController,public navParams: NavParams, private sqlite: SQLite,private nativeGeocoder: NativeGeocoder, private toast: Toast) {
    this.createDatabaseFile();
    this.position = navParams.get("position");
  }

  private createDatabaseFile(): void {
    this.sqlite.create({
      name: DATABASE_FILE_NAME,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        console.log('Bdd créée !');
        this.db = db;
        this.createTables();
      })
      .catch(e => console.log(e));
  }

  private createTables(): void {
      this.db.executeSql('CREATE TABLE IF NOT EXISTS `MARKETS` ( `idMarket` INTEGER NOT NULL, `marketName` TEXT NOT NULL, `marketCategory` TEXT NOT NULL, `marketAddress` TEXT NOT NULL, `lat` INTEGER TEXT NOT NULL, lng TEXT NOT NULL,marketPhone TEXT NOT NULL , PRIMARY KEY(`idMarket`))', {})
      .catch(e => console.log(e));
  }

  public saveMarket() {
    console.log('Market name -> ' + this.data.marketName);
    console.log('Market category -> ' + this.data.marketCategory + '/5');
    console.log('Addresse -> ' + this.data.marketAddress);
    console.log('Latitude -> ' + this.position.lat);
    console.log('Longitude -> ' + this.position.lng);
    console.log('Phone -> ' + this.position.lng);
        this.db.executeSql('INSERT INTO `MARKETS`(name, eval, desc, categoryId) VALUES (?, ?, ?)', [this.data.marketName,this.data.marketCategory,this.data.marketAddress,this.position.lat,this.position.lng,this.data.marketPhone])
        .then(res => {
          console.log(res);
          this.toast.show('Data saved', '5000', 'center').subscribe(
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
  }
  public retriveAddress(){
    let address="";
    this.nativeGeocoder.reverseGeocode(this.position.lat,this.position.lng)
    .then((result: NativeGeocoderReverseResult) => address=JSON.stringify(result))
    .catch((error: any) => console.log(error));
    return address;
  }
  public retrieveFilms() {

    this.markets = [];
    this.db.executeSql('SELECT name FROM `MARKETS`', {})
		.then((data) => {
			if(data == null) {
				return;
			}
			if(data.rows) {
				if(data.rows.length > 0) {
					for(var i = 0; i < data.rows.length; i++) {
            this.markets.push(data.rows.item(i).name);
          }
				}
			}
		});
    
	}

}