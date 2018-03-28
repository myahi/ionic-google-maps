import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { MarketModel } from '../../pages/market/MarketModel';

const DATABASE_FILE_NAME: string = 'data.db';
@Injectable()
export class DataBaseProvider {
  private db: SQLiteObject;
  constructor(public sqlite: SQLite) {
    console.log('Hello SqLiteProvider Provider');
    this.createDatabaseFile();
  }

  private createDatabaseFile(): void {
    this.sqlite.create({
      name: DATABASE_FILE_NAME,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        console.log('database created !');
        this.db = db;
        this.createTables();
      })
      .catch(e => console.log(e));
  }
  private createTables(): void {
    this.db.executeSql('CREATE TABLE IF NOT EXISTS `MARKETS` ( `idMarket` INTEGER NOT NULL, `marketName` TEXT NOT NULL, `marketCategory` TEXT NOT NULL, `marketAddress` TEXT NOT NULL, `lat` INTEGER TEXT NOT NULL, lng TEXT NOT NULL,marketPhone TEXT NOT NULL , PRIMARY KEY(`idMarket`))', {})
    .catch(e => console.log(e));
}

  public addMarket(market): Promise<any> {
    console.log('Market name -> ' + market.marketName);
    console.log('Market category -> ' + market.marketCategory + '/5');
    console.log('Addresse -> ' + market.marketAddress);
    console.log('Latitude -> ' + market.lat);
    console.log('Longitude -> ' + market.lng);
    console.log('Phone -> ' + market.phone);
        return this.db.executeSql('INSERT INTO `MARKETS`(name, eval, desc, categoryId) VALUES (?, ?, ?)', [market.marketName,market.marketCategory,market.marketAddress,market.lat,market.lng,market.marketPhone])
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
  }

  getAllMarkets(): Promise<MarketModel[]> {
    let markets: Array<MarketModel> =[];
    this.db.executeSql('SELECT * FROM `MARKETS`', {})
		.then((data) => {
			if(data == null) {
        console.log("data is null")
      }
			if(data.rows) {
				if(data.rows.length > 0) {
					for(var i = 0; i < data.rows.length; i++) {
            markets.push(data.rows.item(i).marketName,data.rows.item(i).marketCategory,data.rows.item(i).marketAddress,data.rows.item(i).lat
            ,data.rows.item(i).lng,data.rows.item(i).marketPhone);
          }
        }
      }
    });
    return Promise.resolve(markets);
  }
  getMarket(marketId): Promise<MarketModel> {
    return this.db.executeSql('SELECT * FROM `MARKETS` WHERE idMarket=?', [marketId])
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
      db.executeSql('UPDATE `MARKETS` SET marketName=?,marketCategory=?,marketAddress=?,lat=?,lng=?,marketPhone=? WHERE idMarket=?',[market.marketName,market.marketCategory,market.marketAddress,market.lat,market.lng,market.marketPhone,market.idMarket])
        .then(res => {
          console.log(res);
            }
          );
        })
        .catch(e => {
          console.log(e);
        });
  }
}
