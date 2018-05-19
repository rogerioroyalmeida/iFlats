import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { ItCozinha } from '../../model/it-cozinha';
import { Util } from '../../util/utils';

@IonicPage()
@Component({
  selector: 'page-cad-it-cozinha',
  templateUrl: 'cad-it-cozinha.html',
})
export class CadItCozinhaPage {

  @ViewChild('inputDsItCozinha') inputDsItCozinha;

  public itensCozinha: Array<ItCozinha>;
  itcozinha: ItCozinha = new ItCozinha();

  ds_itemcozinha: string;
  observacao: string;
  valor: number;
  campo01: string;
  campo02: string;
  campo03: string;
  campo04: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private alertCtrl: AlertController, 
              public http: Http, 
              private util: Util) {

    this.getItensCozinha();

  }

  salvarItCozinha() {

    if (this.ds_itemcozinha) {

      this.ds_itemcozinha ? this.itcozinha.setDsItemcozinha(this.ds_itemcozinha) : this.itcozinha.setDsItemcozinha('');
      this.observacao ? this.itcozinha.setObservacao(this.observacao) : this.itcozinha.setObservacao('');
      this.valor ? this.itcozinha.setValor(this.valor) : this.itcozinha.setValor(NaN);
      this.campo01 ? this.itcozinha.setCampo01(this.campo01) : this.itcozinha.setCampo01('');
      this.campo02 ? this.itcozinha.setCampo02(this.campo02) : this.itcozinha.setCampo02('');
      this.campo03 ? this.itcozinha.setCampo03(this.campo03) : this.itcozinha.setCampo03('');
      this.campo04 ? this.itcozinha.setCampo04(this.campo04) : this.itcozinha.setCampo04('');

      let headers = new Headers(
      {
        'Content-Type' : 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
  
      if (this.itcozinha.getCdItemcozinha()) {
  
        this.http.patch(this.util.itCozinhaRotaPrincipal + this.itcozinha.getCdItemcozinha(), 
                        this.itcozinha, 
                        options)
        .toPromise()
        .then(data => {
          console.log('API Response : ', data.json());
          this.util.msgAlert('Item cozinha atualizado com sucesso!');
          // this.navCtrl.push(CadItCozinhaPage);
          this.getItensCozinha();
        }).catch(error => {
          console.error('API Error : ', error.status);
          console.error('API Error : ', JSON.stringify(error));
          this.util.msgAlert('Erro ao atualizar o item cozinha!');
        });
  
      } else {
      
        this.http.post(this.util.itCozinhaRotaPrincipal, 
                      this.itcozinha, 
                      options)
        .toPromise()
        .then(data => {
          console.log('API Response : ', data.json());
          this.util.msgAlert('Item cozinha salvo com sucesso!');
          // this.navCtrl.push(CadItCozinhaPage);
          this.getItensCozinha();
        }).catch(error => {
          console.error('API Error : ', error.status);
          console.error('API Error : ', JSON.stringify(error));
          this.util.msgAlert('Erro ao salvar o item cozinha!');
        });
      }

    } else {

      this.inputDsItCozinha.setFocus();
      this.util.msgAlert('Informe a descrição do item de cozinha para salvar!');

    }

  }

  getItensCozinha() {
    this.itensCozinha = new Array<ItCozinha>();

    this.http.get(this.util.itCozinhaRotaPrincipal)
      .map(res => res.json())
      .subscribe(data => {

        if (data) {

          data.forEach(element => {
            let itcozinha: ItCozinha = new ItCozinha();
            itcozinha.setCdItemcozinha(element.cd_itemcozinha);
            itcozinha.setDsItemcozinha(element.ds_itemcozinha);
            itcozinha.setObservacao(element.observacao);
            itcozinha.setValor(element.valor);
            itcozinha.setCampo01(element.campo01);
            itcozinha.setCampo02(element.campo02);
            itcozinha.setCampo03(element.campo03);
            itcozinha.setCampo04(element.campo04);
            
            this.itensCozinha.push(itcozinha);
          });

          console.log('list it_cozinha: ', data);

        }
    });
  }

  removerItCozinha(i: number, item: ItCozinha) {

    let alert = this.alertCtrl.create({
      title: 'Confirmar exclusão',
      message: 'Tem certeza que deseja excluir este item de cozinha?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Excluir',
          handler: () => {
            let headers = new Headers(
            {
              'Content-Type' : 'application/json'
            });
            let options = new RequestOptions({ headers: headers });
        
            this.http.delete(this.util.itCozinhaRotaPrincipal + item.getCdItemcozinha(), 
                              options)
              .toPromise()
              .then(data => {
                this.itensCozinha.splice(i, 1);
                console.log('API Response : ', data.json());
                this.util.msgAlert('Item cozinha removido com sucesso!');
                // this.navCtrl.push(CadItCozinhaPage);
              }).catch(error => {
                console.error('API Error : ', error.status);
                console.error('API Error : ', JSON.stringify(error));
                this.util.msgAlert('Erro ao remover o item cozinha!');
              });
          }
        }
      ]
    });
    alert.present();
    
  }

  itemSelected(item: ItCozinha) {
    this.itcozinha = item;
    this.ds_itemcozinha = item.getDsItemcozinha();
    this.observacao = item.getObservacao();
    this.valor = item.getValor();
    this.campo01 = item.getCampo01();
    this.campo02 = item.getCampo02();
    this.campo03 = item.getCampo03();
    this.campo04 = item.getCampo04();

    this.inputDsItCozinha.setFocus();
  }

  limpar() {
    this.itcozinha = new ItCozinha();
    this.ds_itemcozinha = '';
    this.observacao = '';
    this.valor = NaN;
    this.campo01 = '';
    this.campo02 = '';
    this.campo03 = '';
    this.campo04 = '';
  }

  showIcon(item: ItCozinha) {
    item.iconVisivel = true;
  }

  hideIcon(item: ItCozinha) {
    item.iconVisivel = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadItCozinhaPage');
  }

}
