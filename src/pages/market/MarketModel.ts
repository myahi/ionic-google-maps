<<<<<<< HEAD
=======
import { LatLng} from '@ionic-native/google-maps';
>>>>>>> fist commit
export class MarketModel {
    marketName: string;
    marketCategory: number;
    marketAddress: string;
<<<<<<< HEAD
    lat: number;
    lng: number;
    marketPhone :string;

    constructor(marketName: string,marketCategory: string,marketAddress: string,lat:string,lng:string,marketPhone){
=======
    lat: string;
    lng: string;

    constructor(marketName: string,marketCategory: string,marketAddress: string,location:LatLng){
>>>>>>> fist commit
    }
}