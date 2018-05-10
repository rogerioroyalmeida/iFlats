import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { ItGeral } from '../../model/it-geral';
import { Util } from '../../util/utils';

@IonicPage()
@Component({
  selector: 'page-cad-it-geral',
  templateUrl: 'cad-it-geral.html',
})
export class CadItGeralPage {

  @ViewChild('inputDsItGeral') inputDsItGeral;

  public itensGerais: Array<ItGeral>;
  itgeral: ItGeral = new ItGeral();

  ds_itgeral: string;
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

    this.getItensGerais();

  }

  salvarItGeral() {

    if (this.ds_itgeral) {

      this.ds_itgeral ? this.itgeral.setDsItgeral(this.ds_itgeral) : this.itgeral.setDsItgeral('');
      this.observacao ? this.itgeral.setObservacao(this.observacao) : this.itgeral.setObservacao('');
      this.valor ? this.itgeral.setValor(this.valor) : this.itgeral.setValor(NaN);
      this.campo01 ? this.itgeral.setCampo01(this.campo01) : this.itgeral.setCampo01('');
      this.campo02 ? this.itgeral.setCampo02(this.campo02) : this.itgeral.setCampo02('');
      this.campo03 ? this.itgeral.setCampo03(this.campo03) : this.itgeral.setCampo03('');
      this.campo04 ? this.itgeral.setCampo04(this.campo04) : this.itgeral.setCampo04('');

      let headers = new Headers(
      {
        'Content-Type' : 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
  
      if (this.itgeral.getCdItgeral()) {
  
        this.http.patch(this.util.itGeralRotaPrincipal + this.itgeral.getCdItgeral(), 
                        this.itgeral, 
                        options)
        .toPromise()
        .then(data => {
          console.log('API Response : ', data.json());
          this.util.msgAlert('Item geral atualizado com sucesso!');
          this.navCtrl.push(CadItGeralPage);
          this.getItensGerais();
        }).catch(error => {
          console.error('API Error : ', error.status);
          console.error('API Error : ', JSON.stringify(error));
          this.util.msgAlert('Erro ao atualizar o item geral!');
        });
  
      } else {
      
        this.http.post(this.util.itGeralRotaPrincipal, 
                      this.itgeral, 
                      options)
        .toPromise()
        .then(data => {
          console.log('API Response : ', data.json());
          this.util.msgAlert('Item geral salvo com sucesso!');
          this.navCtrl.push(CadItGeralPage);
          this.getItensGerais();
        }).catch(error => {
          console.error('API Error : ', error.status);
          console.error('API Error : ', JSON.stringify(error));
          this.util.msgAlert('Erro ao salvar o item geral!');
        });
      }

    } else {

      this.inputDsItGeral.setFocus();
      this.util.msgAlert('Informe a descrição do item geral para salvar!');

    }

  }

  getItensGerais() {
    this.itensGerais = new Array<ItGeral>();

    this.http.get(this.util.itGeralRotaPrincipal)
      .map(res => res.json())
      .subscribe(data => {

        if (data) {

          data.forEach(element => {
            let itgeral: ItGeral = new ItGeral();
            itgeral.setCdItgeral(element.cd_itgeral);
            itgeral.setDsItgeral(element.ds_itgeral);
            itgeral.setObservacao(element.observacao);
            itgeral.setValor(element.valor);
            itgeral.setCampo01(element.campo01);
            itgeral.setCampo02(element.campo02);
            itgeral.setCampo03(element.campo03);
            itgeral.setCampo04(element.campo04);
            
            this.itensGerais.push(itgeral);
          });

          console.log('list itens_gerais: ', data);

        }
    });
  }

  removerItGeral(i: number, item: ItGeral) {

    let alert = this.alertCtrl.create({
      title: 'Confirmar exclusão',
      message: 'Tem certeza que deseja excluir este item geral?',
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
        
            this.http.delete(this.util.itGeralRotaPrincipal + item.getCdItgeral(), 
                              options)
              .toPromise()
              .then(data => {
                this.itensGerais.splice(i, 1);
                console.log('API Response : ', data.json());
                this.util.msgAlert('Item geral removido com sucesso!');
                this.navCtrl.push(CadItGeralPage);
              }).catch(error => {
                console.error('API Error : ', error.status);
                console.error('API Error : ', JSON.stringify(error));
                this.util.msgAlert('Erro ao remover o item geral!');
              });
          }
        }
      ]
    });
    alert.present();
    
  }

  itemSelected(item: ItGeral) {
    this.itgeral = item;
    this.ds_itgeral = item.getDsItgeral();
    this.observacao = item.getObservacao();
    this.valor = item.getValor();
    this.campo01 = item.getCampo01();
    this.campo02 = item.getCampo02();
    this.campo03 = item.getCampo03();
    this.campo04 = item.getCampo04();

    this.inputDsItGeral.setFocus();
  }

  limpar() {
    this.itgeral = new ItGeral();
    this.ds_itgeral = '';
    this.observacao = '';
    this.valor = NaN;
    this.campo01 = '';
    this.campo02 = '';
    this.campo03 = '';
    this.campo04 = '';
  }

  showIcon(item: ItGeral) {
    item.iconVisivel = true;
  }

  hideIcon(item: ItGeral) {
    item.iconVisivel = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadItGeralPage');
  }

}
