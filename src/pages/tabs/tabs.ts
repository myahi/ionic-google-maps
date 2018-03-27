import { Component } from '@angular/core';
import { NativeStoragePage } from '../native-storage/native-storage';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = NativeStoragePage;
  //tab2Root = SQLitePage;

  constructor() {

  }
}
