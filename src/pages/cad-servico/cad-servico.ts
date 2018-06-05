import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Servico } from '../../model/servico';
import { Util } from '../../util/utils';

@IonicPage()
@Component({
  selector: 'page-cad-servico',
  templateUrl: 'cad-servico.html',
})
export class CadServicoPage {

  @ViewChild('inputDsServico') inputDsServico;

  public itensServico: Array<Servico>;
  itservico: Servico = new Servico();

  ds_servico: string;
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

    this.getServico();

  }

  salvarServico() {

    if (this.ds_servico) {

      this.ds_servico ? this.itservico.setDsServico(this.ds_servico) : this.itservico.setDsServico('');
      this.observacao ? this.itservico.setObservacao(this.observacao) : this.itservico.setObservacao('');
      this.valor ? this.itservico.setValor(this.valor) : this.itservico.setValor(NaN);
      this.campo01 ? this.itservico.setCampo01(this.campo01) : this.itservico.setCampo01('');
      this.campo02 ? this.itservico.setCampo02(this.campo02) : this.itservico.setCampo02('');
      this.campo03 ? this.itservico.setCampo03(this.campo03) : this.itservico.setCampo03('');
      this.campo04 ? this.itservico.setCampo04(this.campo04) : this.itservico.setCampo04('');

      let headers = new Headers(
      {
        'Content-Type' : 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
  
      if (this.itservico.getCdServico()) {
  
        this.http.patch(this.util.servicoRotaPrincipal + this.itservico.getCdServico(), 
                        this.itservico, 
                        options)
        .toPromise()
        .then(data => {
          console.log('API Response : ', data.json());
          this.util.msgAlert('Serviço atualizado com sucesso!');
          // this.navCtrl.push(CadServicoPage);
          this.getServico();
        }).catch(error => {
          console.error('API Error : ', error.status);
          console.error('API Error : ', JSON.stringify(error));
          this.util.msgAlert('Erro ao atualizar o serviço!');
        });
  
      } else {
      
        this.http.post(this.util.servicoRotaPrincipal, 
                      this.itservico, 
                      options)
        .toPromise()
        .then(data => {
          console.log('API Response : ', data.json());
          this.util.msgAlert('Serviço salvo com sucesso!');
          // this.navCtrl.push(CadServicoPage);
          this.getServico();
        }).catch(error => {
          console.error('API Error : ', error.status);
          console.error('API Error : ', JSON.stringify(error));
          this.util.msgAlert('Erro ao salvar serviço!');
        });
      }

    } else {

      this.inputDsServico.setFocus();
      this.util.msgAlert('Informe a descrição do serviço para salvar!');

    }

  }

  getServico() {
    this.itensServico = new Array<Servico>();

    this.http.get(this.util.servicoRotaPrincipal)
      .map(res => res.json())
      .subscribe(data => {

        if (data) {

          data.forEach(element => {
            let servico: Servico = new Servico();
            servico.setCdServico(element.cd_servico);
            servico.setDsServico(element.ds_servico);
            servico.setObservacao(element.observacao);
            servico.setValor(element.valor);
            servico.setCampo01(element.campo01);
            servico.setCampo02(element.campo02);
            servico.setCampo03(element.campo03);
            servico.setCampo04(element.campo04);
            
            this.itensServico.push(servico);
          });

          console.log('list servico: ', data);

        }
    });
  }

  removerServico(i: number, item: Servico) {

    let alert = this.alertCtrl.create({
      title: 'Confirmar exclusão',
      message: 'Tem certeza que deseja excluir este serviço?',
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
        
            this.http.delete(this.util.servicoRotaPrincipal + item.getCdServico(), 
                              options)
              .toPromise()
              .then(data => {
                this.itensServico.splice(i, 1);
                console.log('API Response : ', data.json());
                this.util.msgAlert('Serviço removido com sucesso!');
                // this.navCtrl.push(CadServicoPage);
              }).catch(error => {
                console.error('API Error : ', error.status);
                console.error('API Error : ', JSON.stringify(error));
                this.util.msgAlert('Erro ao remover o serviço!');
              });
          }
        }
      ]
    });
    alert.present();
    
  }

  itemSelected(item: Servico) {
    this.itservico = item;
    this.ds_servico = item.getDsServico();
    this.observacao = item.getObservacao();
    this.valor = item.getValor();
    this.campo01 = item.getCampo01();
    this.campo02 = item.getCampo02();
    this.campo03 = item.getCampo03();
    this.campo04 = item.getCampo04();

    this.inputDsServico.setFocus();
  }

  limpar() {
    this.itservico = new Servico();
    this.ds_servico = '';
    this.observacao = '';
    this.valor = NaN;
    this.campo01 = '';
    this.campo02 = '';
    this.campo03 = '';
    this.campo04 = '';
  }

  showIcon(item: Servico) {
    item.iconVisivel = true;
  }

  hideIcon(item: Servico) {
    item.iconVisivel = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadServicoPage');
  }

}
