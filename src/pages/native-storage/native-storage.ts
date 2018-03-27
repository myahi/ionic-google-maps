import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//Native component
import {NativeStorage} from '@ionic-native/native-storage'


@Component({
  selector: 'page-native-storage',
  templateUrl: 'native-storage.html'
})
export class NativeStoragePage {

  name: string;
  surname: string;
  years: number;
  constructor(public navCtrl: NavController, private nativeStorage: NativeStorage) {
  }
  public storeIdentity() :void{
    this.nativeStorage.setItem('myIdCard', {
      name: this.name, 
      subnam: this.surname,
      years:this.years
    })
    .then(
    () => console.log('Stored item!'),
    error => console.error('Error storing item', error)
    );
  }

  public getMyName() :void{
    this.nativeStorage.getItem('myIdCard')
    .then(
      data=> {
        this.name = data.name;
        this.surname = data.surname;
        this.years = data.years;
      },
      error => console.error(error)
    );
  }
}
