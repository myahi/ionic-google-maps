export class MarketModel {
     marketName: string;
     marketCategory: string;
     marketAddress: string;
     lat: string;
     lng: string;
     marketPhone :string;

    constructor(marketName: string,marketCategory: string,marketAddress: string,lat:string,lng:string,marketPhone){
        this.marketName=marketName;
        this.marketCategory=marketCategory;
        this.marketAddress=marketAddress;
        this.lat = lat;
        this.lng = lng;
        this.marketPhone = marketPhone;
    }
}