import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Equipamentos } from '../../model/equipamento';
import { Util } from '../../util/utils';

@IonicPage()
@Component({
  selector: 'page-cad-equipamento',
  templateUrl: 'cad-equipamento.html',
})
export class CadEquipamentoPage {

  @ViewChild('inputDsequipamento') inputDsequipamento;

  public equipamentos: Array<Equipamentos>;
  Equipamentos: Equipamentos = new Equipamentos();

  ds_equipamento: string;
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

    this.getEquipamento();

  }

  salvarequipamento() {

    if (this.ds_equipamento) {

      this.ds_equipamento ? this.Equipamentos.setDsEquipamento(this.ds_equipamento) : this.Equipamentos.setDsEquipamento('');
      this.observacao ? this.Equipamentos.setObservacao(this.observacao) : this.Equipamentos.setObservacao('');
      this.valor ? this.Equipamentos.setValor(this.valor) : this.Equipamentos.setValor(NaN);
      this.campo01 ? this.Equipamentos.setCampo01(this.campo01) : this.Equipamentos.setCampo01('');
      this.campo02 ? this.Equipamentos.setCampo02(this.campo02) : this.Equipamentos.setCampo02('');
      this.campo03 ? this.Equipamentos.setCampo03(this.campo03) : this.Equipamentos.setCampo03('');
      this.campo04 ? this.Equipamentos.setCampo04(this.campo04) : this.Equipamentos.setCampo04('');

      let headers = new Headers(
      {
        'Content-Type' : 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
  
      if (this.Equipamentos.getCdEquipamento()) {
  
        this.http.patch(this.util.equipamentoRotaPrincipal + this.Equipamentos.getCdEquipamento(), 
                        this.Equipamentos, 
                        options)
        .toPromise()
        .then(data => {
          console.log('API Response : ', data.json());
          this.util.msgAlert('Equipamento atualizado com sucesso!');
          // this.navCtrl.push(CadEquipamento);
          this.getEquipamento();
        }).catch(error => {
          console.error('API Error : ', error.status);
          console.error('API Error : ', JSON.stringify(error));
          this.util.msgAlert('Erro ao atualizar equipamento!');
        });
  
      } else {
      
        this.http.post(this.util.equipamentoRotaPrincipal, 
                      this.Equipamentos, 
                      options)
        .toPromise()
        .then(data => {
          console.log('API Response : ', data.json());
          this.util.msgAlert('Equipamento salvo com sucesso!');
          // this.navCtrl.push(CadEquipamento);
          this.getEquipamento();
        }).catch(error => {
          console.error('API Error : ', error.status);
          console.error('API Error : ', JSON.stringify(error));
          this.util.msgAlert('Erro ao salvar equipamento!');
        });
      }

    } else {

      this.inputDsequipamento.setFocus();
      this.util.msgAlert('Informe a descrição do equipamento para salvar!');

    }

  }

  getEquipamento() {
    this.equipamentos = new Array<Equipamentos>();

    this.http.get(this.util.equipamentoRotaPrincipal)
      .map(res => res.json())
      .subscribe(data => {

        if (data) {

          data.forEach(element => {
            let equipamento: Equipamentos = new Equipamentos();
            equipamento.setCdEquipamento(element.cd_equipamento);
            equipamento.setDsEquipamento(element.ds_equipamento);
            equipamento.setObservacao(element.observacao);
            equipamento.setValor(element.valor);
            equipamento.setCampo01(element.campo01);
            equipamento.setCampo02(element.campo02);
            equipamento.setCampo03(element.campo03);
            equipamento.setCampo04(element.campo04);
            
            this.equipamentos.push(equipamento);
          });

          console.log('list equipamento: ', data);

        }
    });
  }

  removerEquipamento(i: number, item: Equipamentos) {

    let alert = this.alertCtrl.create({
      title: 'Confirmar exclusão',
      message: 'Tem certeza que deseja excluir este equipamento?',
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
        
            this.http.delete(this.util.equipamentoRotaPrincipal + item.getCdEquipamento(), 
                              options)
              .toPromise()
              .then(data => {
                this.equipamentos.splice(i, 1);
                console.log('API Response : ', data.json());
                this.util.msgAlert('Equipamento removido com sucesso!');
                // this.navCtrl.push(CadEquipamento);
              }).catch(error => {
                console.error('API Error : ', error.status);
                console.error('API Error : ', JSON.stringify(error));
                this.util.msgAlert('Erro ao remover equipamento!');
              });
          }
        }
      ]
    });
    alert.present();
    
  }

  itemSelected(item: Equipamentos) {
    this.Equipamentos = item;
    this.ds_equipamento = item.getDsEquipamento();
    this.observacao = item.getObservacao();
    this.valor = item.getValor();
    this.campo01 = item.getCampo01();
    this.campo02 = item.getCampo02();
    this.campo03 = item.getCampo03();
    this.campo04 = item.getCampo04();

    this.inputDsequipamento.setFocus();
  }

  limpar() {
    this.Equipamentos = new Equipamentos();
    this.ds_equipamento = '';
    this.observacao = '';
    this.valor = NaN;
    this.campo01 = '';
    this.campo02 = '';
    this.campo03 = '';
    this.campo04 = '';
  }

  showIcon(item: Equipamentos) {
    item.iconVisivel = true;
  }

  hideIcon(item: Equipamentos) {
    item.iconVisivel = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadEquipamento');
  }

}
