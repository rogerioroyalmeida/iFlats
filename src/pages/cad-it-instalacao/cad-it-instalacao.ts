import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { ItInstalacao } from '../../model/it-instalacao';
import { Util } from '../../util/utils';

@IonicPage()
@Component({
  selector: 'page-cad-it-instalacao',
  templateUrl: 'cad-it-instalacao.html',
})
export class CadItInstalacaoPage {

  @ViewChild('inputDsItInstalacao') inputDsItInstalacao;

  public itensInstalacao: Array<ItInstalacao>;
  ItInstalacao: ItInstalacao = new ItInstalacao();

  ds_itinstalacao: string;
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

    this.getitensInstalacao();

  }

  salvarItInstalacao() {

    if (this.ds_itinstalacao) {

      this.ds_itinstalacao ? this.ItInstalacao.setDsIteminstalacao(this.ds_itinstalacao) : this.ItInstalacao.setDsIteminstalacao('');
      this.observacao ? this.ItInstalacao.setObservacao(this.observacao) : this.ItInstalacao.setObservacao('');
      this.valor ? this.ItInstalacao.setValor(this.valor) : this.ItInstalacao.setValor(NaN);
      this.campo01 ? this.ItInstalacao.setCampo01(this.campo01) : this.ItInstalacao.setCampo01('');
      this.campo02 ? this.ItInstalacao.setCampo02(this.campo02) : this.ItInstalacao.setCampo02('');
      this.campo03 ? this.ItInstalacao.setCampo03(this.campo03) : this.ItInstalacao.setCampo03('');
      this.campo04 ? this.ItInstalacao.setCampo04(this.campo04) : this.ItInstalacao.setCampo04('');

      let headers = new Headers(
      {
        'Content-Type' : 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
  
      if (this.ItInstalacao.getCdIteminstalacao()) {
  
        this.http.patch(this.util.itInstalacaoRotaPrincipal + this.ItInstalacao.getCdIteminstalacao(), 
                        this.ItInstalacao, 
                        options)
        .toPromise()
        .then(data => {
          console.log('API Response : ', data.json());
          this.util.msgAlert('Item instalação atualizado com sucesso!');
          // this.navCtrl.push(CadItInstalacaoPage);
          this.getitensInstalacao();
        }).catch(error => {
          console.error('API Error : ', error.status);
          console.error('API Error : ', JSON.stringify(error));
          this.util.msgAlert('Erro ao atualizar o item instalação!');
        });
  
      } else {
      
        this.http.post(this.util.itInstalacaoRotaPrincipal, 
                      this.ItInstalacao, 
                      options)
        .toPromise()
        .then(data => {
          console.log('API Response : ', data.json());
          this.util.msgAlert('Item instalação salvo com sucesso!');
          // this.navCtrl.push(CadItInstalacaoPage);
          this.getitensInstalacao();
        }).catch(error => {
          console.error('API Error : ', error.status);
          console.error('API Error : ', JSON.stringify(error));
          this.util.msgAlert('Erro ao salvar o item instalação!');
        });
      }

    } else {

      this.inputDsItInstalacao.setFocus();
      this.util.msgAlert('Informe a descrição do item de instalação para salvar!');

    }

  }

  getitensInstalacao() {
    this.itensInstalacao = new Array<ItInstalacao>();

    this.http.get(this.util.itInstalacaoRotaPrincipal)
      .map(res => res.json())
      .subscribe(data => {

        if (data) {

          data.forEach(element => {
            let itInstalacao: ItInstalacao = new ItInstalacao();
            itInstalacao.setCdIteminstalacao(element.cd_itinstalacao);
            itInstalacao.setDsIteminstalacao(element.ds_itinstalacao);
            itInstalacao.setObservacao(element.observacao);
            itInstalacao.setValor(element.valor);
            itInstalacao.setCampo01(element.campo01);
            itInstalacao.setCampo02(element.campo02);
            itInstalacao.setCampo03(element.campo03);
            itInstalacao.setCampo04(element.campo04);
            
            this.itensInstalacao.push(itInstalacao);
          });

          console.log('list it_instalacao: ', data);

        }
    });
  }

  removerItInstalacao(i: number, item: ItInstalacao) {

    let alert = this.alertCtrl.create({
      title: 'Confirmar exclusão',
      message: 'Tem certeza que deseja excluir este item de instalação?',
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
        
            this.http.delete(this.util.itInstalacaoRotaPrincipal + item.getCdIteminstalacao(), 
                              options)
              .toPromise()
              .then(data => {
                this.itensInstalacao.splice(i, 1);
                console.log('API Response : ', data.json());
                this.util.msgAlert('Item instalação removido com sucesso!');
                // this.navCtrl.push(CadItInstalacaoPage);
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

  itemSelected(item: ItInstalacao) {
    this.ItInstalacao = item;
    this.ds_itinstalacao = item.getDsIteminstalacao();
    this.observacao = item.getObservacao();
    this.valor = item.getValor();
    this.campo01 = item.getCampo01();
    this.campo02 = item.getCampo02();
    this.campo03 = item.getCampo03();
    this.campo04 = item.getCampo04();

    this.inputDsItInstalacao.setFocus();
  }

  limpar() {
    this.ItInstalacao = new ItInstalacao();
    this.ds_itinstalacao = '';
    this.observacao = '';
    this.valor = NaN;
    this.campo01 = '';
    this.campo02 = '';
    this.campo03 = '';
    this.campo04 = '';
  }

  showIcon(item: ItInstalacao) {
    item.iconVisivel = true;
  }

  hideIcon(item: ItInstalacao) {
    item.iconVisivel = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadItInstalacaoPage');
  }

}
