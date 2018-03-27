import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Flat } from '../../model/flat';

/**
 * Generated class for the CadImoveisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cad-imoveis',
  templateUrl: 'cad-imoveis.html',
})
export class CadImoveisPage {

  flat: Flat = new Flat();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadImoveisPage');
  }

}
