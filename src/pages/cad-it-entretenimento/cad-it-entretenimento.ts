import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ItEntretenimento } from '../../model/it-entretenimento';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Util } from '../../util/utils';

@IonicPage()
@Component({
  selector: 'page-cad-it-entretenimento',
  templateUrl: 'cad-it-entretenimento.html',
})
export class CadItEntretenimentoPage {

  @ViewChild('inputDsItEntretenimento') inputDsItEntretenimento;

  public itensEntretenimento: Array<ItEntretenimento>;
  itentretenimento: ItEntretenimento = new ItEntretenimento();

  ds_itentretenimento: string;
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

    this.getItensEntretenimento();

  }

  salvarItEntretenimento() {

    if (this.ds_itentretenimento) {

      this.ds_itentretenimento ? this.itentretenimento.setDsItemEntretenimento(this.ds_itentretenimento) : this.itentretenimento.setDsItemEntretenimento('');
      this.observacao ? this.itentretenimento.setObservacao(this.observacao) : this.itentretenimento.setObservacao('');
      this.valor ? this.itentretenimento.setValor(this.valor) : this.itentretenimento.setValor(NaN);
      this.campo01 ? this.itentretenimento.setCampo01(this.campo01) : this.itentretenimento.setCampo01('');
      this.campo02 ? this.itentretenimento.setCampo02(this.campo02) : this.itentretenimento.setCampo02('');
      this.campo03 ? this.itentretenimento.setCampo03(this.campo03) : this.itentretenimento.setCampo03('');
      this.campo04 ? this.itentretenimento.setCampo04(this.campo04) : this.itentretenimento.setCampo04('');

      let headers = new Headers(
      {
        'Content-Type' : 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
  
      if (this.itentretenimento.getCdItemEntretenimento()) {
  
        this.http.patch(this.util.itEntretenimentoRotaPrincipal + this.itentretenimento.getCdItemEntretenimento(), 
                        this.itentretenimento, 
                        options)
        .toPromise()
        .then(data => {
          console.log('API Response : ', data.json());
          this.util.msgAlert('Item entretenimento atualizado com sucesso!');
          // this.navCtrl.push(CadItEntretenimentoPage);
          this.getItensEntretenimento();
        }).catch(error => {
          console.error('API Error : ', error.status);
          console.error('API Error : ', JSON.stringify(error));
          this.util.msgAlert('Erro ao atualizar o item entretenimento!');
        });
  
      } else {
      
        this.http.post(this.util.itEntretenimentoRotaPrincipal, 
                      this.itentretenimento, 
                      options)
        .toPromise()
        .then(data => {
          console.log('API Response : ', data.json());
          this.util.msgAlert('Item entretenimento salvo com sucesso!');
          // this.navCtrl.push(CadItEntretenimentoPage);
          this.getItensEntretenimento();
        }).catch(error => {
          console.error('API Error : ', error.status);
          console.error('API Error : ', JSON.stringify(error));
          this.util.msgAlert('Erro ao salvar o item entretenimento!');
        });
      }

    } else {

      this.inputDsItEntretenimento.setFocus();
      this.util.msgAlert('Informe a descrição do item de entretenimento para salvar!');

    }

  }

  getItensEntretenimento() {
    this.itensEntretenimento = new Array<ItEntretenimento>();

    this.http.get(this.util.itEntretenimentoRotaPrincipal)
      .map(res => res.json())
      .subscribe(data => {

        if (data) {

          data.forEach(element => {
            let itentretenimento: ItEntretenimento = new ItEntretenimento();
            itentretenimento.setCdItemEntretenimento(element.cd_itentretenimento);
            itentretenimento.setDsItemEntretenimento(element.ds_itentretenimento);
            itentretenimento.setObservacao(element.observacao);
            itentretenimento.setValor(element.valor);
            itentretenimento.setCampo01(element.campo01);
            itentretenimento.setCampo02(element.campo02);
            itentretenimento.setCampo03(element.campo03);
            itentretenimento.setCampo04(element.campo04);
            
            this.itensEntretenimento.push(itentretenimento);
          });

          console.log('list itens_entretenimento: ', data);

        }
    });
  }

  removerItEntretenimento(i: number, item: ItEntretenimento) {

    let alert = this.alertCtrl.create({
      title: 'Confirmar exclusão',
      message: 'Tem certeza que deseja excluir este item de entretenimento?',
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
        
            this.http.delete(this.util.itEntretenimentoRotaPrincipal + item.getCdItemEntretenimento(), 
                              options)
              .toPromise()
              .then(data => {
                this.itensEntretenimento.splice(i, 1);
                console.log('API Response : ', data.json());
                this.util.msgAlert('Item entretenimento removido com sucesso!');
                // this.navCtrl.push(CadItEntretenimentoPage);
              }).catch(error => {
                console.error('API Error : ', error.status);
                console.error('API Error : ', JSON.stringify(error));
                this.util.msgAlert('Erro ao remover o item entretenimento!');
              });
          }
        }
      ]
    });
    alert.present();
    
  }

  itemSelected(item: ItEntretenimento) {
    this.itentretenimento = item;
    this.ds_itentretenimento = item.getDsItemEntretenimento();
    this.observacao = item.getObservacao();
    this.valor = item.getValor();
    this.campo01 = item.getCampo01();
    this.campo02 = item.getCampo02();
    this.campo03 = item.getCampo03();
    this.campo04 = item.getCampo04();

    this.inputDsItEntretenimento.setFocus();
  }

  limpar() {
    this.itentretenimento = new ItEntretenimento();
    this.ds_itentretenimento = '';
    this.observacao = '';
    this.valor = NaN;
    this.campo01 = '';
    this.campo02 = '';
    this.campo03 = '';
    this.campo04 = '';
  }

  showIcon(item: ItEntretenimento) {
    item.iconVisivel = true;
  }

  hideIcon(item: ItEntretenimento) {
    item.iconVisivel = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadItEntretenimentoPage');
  }

}
