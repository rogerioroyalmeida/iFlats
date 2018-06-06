import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { ItCrianca } from '../../model/it-crianca';
import { Util } from '../../util/utils';
/**
 * Generated class for the CadItCriancaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cad-it-crianca',
  templateUrl: 'cad-it-crianca.html',
})
export class CadItCriancaPage {

  @ViewChild('inputDsItCrianca') inputDsItCrianca;

  public itensCrianca: Array<ItCrianca>;
  itCrianca: ItCrianca = new ItCrianca();

  ds_itemCrianca: string;
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

    this.getItensCrianca();

  }

  salvarItCrianca() {

    if (this.ds_itemCrianca) {

      this.ds_itemCrianca ? this.itCrianca.setDsItemcrianca(this.ds_itemCrianca) : this.itCrianca.setDsItemcrianca('');
      this.observacao ? this.itCrianca.setObservacao(this.observacao) : this.itCrianca.setObservacao('');
      this.valor ? this.itCrianca.setValor(this.valor) : this.itCrianca.setValor(NaN);
      this.campo01 ? this.itCrianca.setCampo01(this.campo01) : this.itCrianca.setCampo01('');
      this.campo02 ? this.itCrianca.setCampo02(this.campo02) : this.itCrianca.setCampo02('');
      this.campo03 ? this.itCrianca.setCampo03(this.campo03) : this.itCrianca.setCampo03('');
      this.campo04 ? this.itCrianca.setCampo04(this.campo04) : this.itCrianca.setCampo04('');

      let headers = new Headers(
      {
        'Content-Type' : 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
  
      if (this.itCrianca.getCdItemcrianca()) {
  
        this.http.patch(this.util.itCriancaRotaPrincipal + this.itCrianca.getCdItemcrianca(), 
                        this.itCrianca, 
                        options)
        .toPromise()
        .then(data => {
          console.log('API Response : ', data.json());
          this.util.msgAlert('Item criança atualizado com sucesso!');
          // this.navCtrl.push(CadItCriancaPage);
          this.getItensCrianca();
        }).catch(error => {
          console.error('API Error : ', error.status);
          console.error('API Error : ', JSON.stringify(error));
          this.util.msgAlert('Erro ao atualizar o item crianca!');
        });
  
      } else {
      
        this.http.post(this.util.itCriancaRotaPrincipal + this.util.cdUsuarioLogado, 
                      this.itCrianca, 
                      options)
        .toPromise()
        .then(data => {
          console.log('API Response : ', data.json());
          this.util.msgAlert('Item criança salvo com sucesso!');

          this.ds_itemCrianca = '';
          this.observacao = '';
          this.valor = NaN;
          this.campo01 = '';
          this.campo02 = '';
          this.campo03 = '';
          this.campo04 = '';

          // this.navCtrl.push(CadItCriancaPage);
          this.getItensCrianca();
        }).catch(error => {
          console.error('API Error : ', error.status);
          console.error('API Error : ', JSON.stringify(error));
          this.util.msgAlert('Erro ao salvar o item criança!');
        });
      }

    } else {

      this.inputDsItCrianca.setFocus();
      this.util.msgAlert('Informe a descrição do item de criança para salvar!');

    }

  }

  getItensCrianca() {
    this.itensCrianca = new Array<ItCrianca>();

    this.http.get(this.util.itCriancaRotaPrincipal)
      .map(res => res.json())
      .subscribe(data => {

        if (data) {

          data.forEach(element => {
            let itCrianca: ItCrianca = new ItCrianca();
            itCrianca.setCdItemcrianca(element.cd_itcrianca);
            itCrianca.setDsItemcrianca(element.ds_itcrianca);
            itCrianca.setObservacao(element.observacao);
            itCrianca.setValor(element.valor);
            itCrianca.setCampo01(element.campo01);
            itCrianca.setCampo02(element.campo02);
            itCrianca.setCampo03(element.campo03);
            itCrianca.setCampo04(element.campo04);
            
            this.itensCrianca.push(itCrianca);
          });

          console.log('list it_crianca: ', data);

        }
    });
  }

  removerItCrianca(i: number, item: ItCrianca) {

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
        
            this.http.delete(this.util.itCriancaRotaPrincipal + item.getCdItemcrianca, 
                              options)
              .toPromise()
              .then(data => {
                this.itensCrianca.splice(i, 1);
                console.log('API Response : ', data.json());
                this.util.msgAlert('Item cozinha removido com sucesso!');
                // this.navCtrl.push(CadItCriancaPage);
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

  itemSelected(item: ItCrianca) {
    this.itCrianca = item;
    this.ds_itemCrianca = item.getDsItemcrianca();
    this.observacao = item.getObservacao();
    this.valor = item.getValor();
    this.campo01 = item.getCampo01();
    this.campo02 = item.getCampo02();
    this.campo03 = item.getCampo03();
    this.campo04 = item.getCampo04();

    this.inputDsItCrianca.setFocus();
  }

  limpar() {
    this.itCrianca = new ItCrianca();
    this.ds_itemCrianca = '';
    this.observacao = '';
    this.valor = NaN;
    this.campo01 = '';
    this.campo02 = '';
    this.campo03 = '';
    this.campo04 = '';
  }

  showIcon(item: ItCrianca) {
    item.iconVisivel = true;
  }

  hideIcon(item: ItCrianca) {
    item.iconVisivel = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadItCriancaPage');
  }

}
