import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CadFlatsPage } from '../cad-flats/cad-flats';

@IonicPage()
@Component({
  selector: 'page-flats',
  templateUrl: 'list-flats.html',
})
export class ListFlatsPage {

  url = 'http://192.168.15.6:3000/flats';

  public flats: Array<string>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.flats = new Array<string>();

    this.flats.push("teste 1");
    this.flats.push("teste 2");
    this.flats.push("teste 3");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListFlatsPage');
  }

  itemSelected(item) {

  }

  abrirCadastro() {
    this.navCtrl.push(CadFlatsPage);
  }

}
