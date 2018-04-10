import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Flat } from '../../model/flat';
import { FlatGeral } from '../../model/flat-geral';
import { FlatCoz } from '../../model/flat-coz';
import { FlatEnt } from '../../model/flat-ent';
import { FlatInst } from '../../model/flat-inst';
import { FlatEquip } from '../../model/flat-equip';
import { FlatServ } from '../../model/flat-serv';

@IonicPage()
@Component({
  selector: 'page-cad-flats',
  templateUrl: 'cad-flats.html',
})
export class CadFlatsPage {

  flat: Flat = new Flat();
  listGeral = new Array<FlatGeral>();
  listCozinha = new Array<FlatCoz>();
  listEnt = new Array<FlatEnt>();
  listInst = new Array<FlatInst>();
  listEquip = new Array<FlatEquip>();
  listServ = new Array<FlatServ>();
  newItem: string = "";
  focNomeGeral = false;
  focNomeCozinha = false;
  focNomeEnt = false;
  focNomeInst = false;
  focNomeEquip = false;
  focNomeServ = false;

  exibeCaracteristica = false;
  textoInformacoes = 'Mais informações';

  urlPost = 'http://192.168.15.5:3000/iflats/flats';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: Http) {
    
  }

  // Saving function
  saveNewGeral(): void {
    this.newItem = "";
    let flatGeral = new FlatGeral();
    this.listGeral.push(flatGeral);
    this.newItem = "";
  }

  saveNewCozinha(): void {
    this.newItem = "";
    let flatCozinha = new FlatCoz();
    this.listCozinha.push(flatCozinha);
  }

  saveNewEnt(): void {
    this.newItem = "";
    let flatEnt = new FlatEnt();
    this.listEnt.push(flatEnt);
  }

  saveNewInst(): void {
    this.newItem = "";
    let flatInst = new FlatInst();
    this.listInst.push(flatInst);
  }

  saveNewEquip(): void {
    this.newItem = "";
    let flatEquip = new FlatEquip();
    this.listEquip.push(flatEquip);
  }

  saveNewServ(): void {
    this.newItem = "";
    let flatServ = new FlatServ();
    this.listServ.push(flatServ);
  }

  // Cancel function
  cancelNew(): void {
    this.newItem = "";
  }

  salvarFlat() {

    // todo terminar
    let headers = new Headers(
    {
      'Content-Type' : 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(this.urlPost, 
                   this.flat, 
                   options)
    .toPromise()
    .then(data => {
      console.log('API Response : ', data.json());
    }).catch(error => {
      console.error('API Error : ', error.status);
      console.error('API Error : ', JSON.stringify(error));
    });
  }

  exibCarac() {
    if(this.exibeCaracteristica) {
      this.exibeCaracteristica = false;
      this.textoInformacoes = 'Mais informações';
    } else {
      this.exibeCaracteristica = true;
      this.textoInformacoes = 'Menos informações';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadFlatsPage');
  }

}
