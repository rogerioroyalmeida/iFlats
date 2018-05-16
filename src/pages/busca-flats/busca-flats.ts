import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Util } from '../../util/utils';
import { Flat } from '../../model/flat';

@IonicPage()
@Component({
  selector: 'page-busca-flats',
  templateUrl: 'busca-flats.html',
})
export class BuscaFlatsPage {

  public listFlats: Array<Flat>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private util: Util) {

    this.listFlats = new Array<Flat>();

    if(navParams.get('listFlats')) {
      this.listFlats = navParams.get('listFlats');
    }

  }

  setFavorito(item: Flat) {
    if (item.isFavorito) {
      item.isFavorito = false;
    } else {
      item.isFavorito = true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscaFlatsPage');
  }

}
