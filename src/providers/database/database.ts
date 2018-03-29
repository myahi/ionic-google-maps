import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { MarketModel } from '../../pages/market/MarketModel';
import { Platform } from 'ionic-angular';

const DATABASE_FILE_NAME: string = 'data.db';
@Injectable()
export class DataBaseProvider {
  private db: SQLiteObject;
  
  constructor(private sqlite: SQLite,private platform:Platform) {
    platform.ready().then(() => {
      this.createDatabase();
		});
    
  }
  private getDataBase() : Promise<SQLiteObject>{
    return this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default',
      createFromLocation: 1
    });
  };
  

  public createDatabase() {
    this.getDataBase().then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS MARKETS (rowid INTEGER PRIMARY KEY, marketName TEXT NOT NULL, marketCategory TEXT NOT NULL, marketAddress TEXT NOT NULL, lat TEXT , lng TEXT,marketPhone TEXT)', {})
      .then(res => {
      console.log('data base created');
      this.db = db})
      .catch(e => console.log('data base creation exception ' + e.message));
  }).catch(e => console.log('data base creation exception ' + e.message));
  }

  public addMarket(market): Promise<any> {
    let result:any;
    this.getDataBase().then((db: SQLiteObject) => {
    db.executeSql('INSERT INTO MARKETS VALUES (NULL,?,?,?,?,?,?)', [market.marketName,market.marketCategory,market.marketAddress,market.lat,market.lng,market.marketPhone])
        .then(res => {
          result =res;
          console.log("market created");
        })
        .catch(e => {
          console.log("market creation exception " + e.message);
        });
  }).catch(e => console.log("market creation exception " + e.message));
  return Promise.resolve(result);
}

getAllMarkets() :Promise<MarketModel[]>{
  let markets: Array<MarketModel> =[];
  this.getDataBase().then((db: SQLiteObject) => {
    db.executeSql('SELECT * FROM MARKETS', {})
    .then(data => {
      if(data != null && data.rows.length > 0) {
        for(var i = 0; i < data.rows.length; i++) {
          let market = new MarketModel(data.rows.item(i).marketName,data.rows.item(i).marketCategory,data.rows.item(i).marketAddress,data.rows.item(i).lat
          ,data.rows.item(i).lng,data.rows.item(i).marketPhone);
          markets.push(market);
        }
        console.log("getAllMarkets=" + markets.length);
    }
    })
    .catch(e => console.log(e));
  }).catch(e => console.log(e));
  return Promise.resolve(markets); 
}

  getMarket(marketId): Promise<MarketModel> {
    let db: SQLiteObject
    return db.executeSql('SELECT * FROM MARKETS WHERE idMarket=?', [marketId])
		.then((data) => {
			if(data == null) {
				return;
      }
      let market:MarketModel;
			if(data.rows) {
				if(data.rows.length > 0) {
					for(var i = 0; i < data.rows.length; i++) {
            market = new MarketModel(
              data.rows.item(0).marketName,data.rows.item(0).marketCategory,data.rows.item(0).marketAddress,data.rows.item(0).lat
              ,data.rows.item(0).lng,data.rows.item(0).marketPhone);
          }
        }
      }
      return Promise.resolve(market);
		});
  }
  updateMarket(market): Promise<any> {
    return this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('UPDATE MARKETS SET marketName=?,marketCategory=?,marketAddress=?,lat=?,lng=?,marketPhone=? WHERE idMarket=?',[market.marketName,market.marketCategory,market.marketAddress,market.lat,market.lng,market.marketPhone,market.idMarket])
        .then(res => {
          console.log(res);
            }
          );
        })
        .catch(e => {
          alert(e);
        });
  }
}
