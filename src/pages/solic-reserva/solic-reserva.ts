import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Flat } from '../../model/flat';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Util } from '../../util/utils';

@IonicPage()
@Component({
  selector: 'page-solic-reserva',
  templateUrl: 'solic-reserva.html',
})
export class SolicReservaPage {

  flat: Flat = new Flat();
  habilitaReserva: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private util: Util) {

    if(navParams.get('flat')) {
      this.flat = navParams.get('flat');
    }
  }

  confirmarReserva() {
    console.log('confi');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SolicReservaPage');
  }

}
