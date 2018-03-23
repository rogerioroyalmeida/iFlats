import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-imoveis',
  templateUrl: 'imoveis.html',
})
export class ImoveisPage {

  url = 'http://192.168.15.6:3000/flats';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImoveisPage');
  }

}
