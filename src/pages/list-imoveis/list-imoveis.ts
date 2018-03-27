import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CadImoveisPage } from '../cad-imoveis/cad-imoveis';

@IonicPage()
@Component({
  selector: 'page-imoveis',
  templateUrl: 'list-imoveis.html',
})
export class ListImoveisPage {

  url = 'http://192.168.15.6:3000/flats';

  public imoveis: Array<string>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.imoveis = new Array<string>();

    this.imoveis.push("teste 1");
    this.imoveis.push("teste 2");
    this.imoveis.push("teste 3");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImoveisPage');
  }

  itemSelected(item) {

  }

  abrirCadastro() {
    this.navCtrl.push(CadImoveisPage);
  }

}
