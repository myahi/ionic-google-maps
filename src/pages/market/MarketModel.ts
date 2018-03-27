import { LatLng} from '@ionic-native/google-maps';
export class MarketModel {
    marketName: string;
    marketCategory: number;
    marketAddress: string;
    lat: string;
    lng: string;

    constructor(marketName: string,marketCategory: string,marketAddress: string,location:LatLng){
    }
}