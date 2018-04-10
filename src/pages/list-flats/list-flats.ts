import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CadFlatsPage } from '../cad-flats/cad-flats';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Flat } from '../../model/flat';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-flats',
  templateUrl: 'list-flats.html',
})
export class ListFlatsPage {

  urlGet = 'http://192.168.15.5:3000/iflats/flats/usuarios/1';

  public flats: Array<Flat>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public http: Http) {

    this.flats = new Array<Flat>();

    this.http.get(this.urlGet)
      .map(res => res.json())
      .subscribe(data => {
        this.flats = data;
        console.log(data);
    });
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
