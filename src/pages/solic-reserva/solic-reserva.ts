import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Flat } from '../../model/flat';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Util } from '../../util/utils';
import { SolicReserva } from '../../model/solic-reserva';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-solic-reserva',
  templateUrl: 'solic-reserva.html',
})
export class SolicReservaPage {

  flat: Flat = new Flat();
  habilitaReserva: boolean = false;
  dt_inicio: any;
  dt_final: any;
  nrPessoas: number;
  nrPessoasValido: boolean = false;
  vlEntrada: number;
  vlEntradaValido: boolean = false;
  vlTotal: number;
  qtDias: number;
  qtDiasValido: boolean = false;

  dtInicial: Date;
  dtFinal: Date;

  solicReserva: SolicReserva;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private util: Util) {

    if(navParams.get('flat')) {
      this.flat = navParams.get('flat');
    }
  }

  confirmarReserva() {

    this.solicReserva = new SolicReserva();
    this.solicReserva.setCdFlat(this.flat.getCodigoFlat());
    this.solicReserva.setCdUsuario(+this.util.cdUsuarioLogado);
    this.solicReserva.setCdUsuarioResponsavel(this.flat.getCdUsuarioCadastro());
    this.solicReserva.setDtInicial(this.util.dateToDMY(this.dtInicial));
    this.solicReserva.setDtFinal(this.util.dateToDMY(this.dtFinal));
    this.solicReserva.setNrDias(this.qtDias);
    this.solicReserva.setNrPessoas(this.nrPessoas);
    this.solicReserva.setVlDiaria(this.flat.getVlBasicoDiaria());
    this.solicReserva.setVlEntrada(parseFloat(this.vlEntrada.toString()));
    this.solicReserva.setVlTotal(this.flat.getVlBasicoDiaria() * this.qtDias);
    this.solicReserva.setStatus('A');
    
    let headers = new Headers(
    {
      'Content-Type' : 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(this.util.solicReservaRotaPrincipal, 
                    this.solicReserva, 
                    options)
              .toPromise()
              .then(data => {
                console.log('API Response : ', data.json());
                this.util.msgAlert('Solicitação enviada ao dono do flat!');
                this.navCtrl.setRoot(HomePage);
              }).catch(error => {
                console.error('API Error : ', error.status);
                console.error('API Error : ', JSON.stringify(error));
                this.util.msgAlert('Erro ao enviar solicitação!');
              });

  }

  dtInicialChange(newObj) {

    var dataArray = newObj.split('-');
    this.dtInicial = new Date();
    this.dtInicial.setFullYear(dataArray[0], dataArray[1], dataArray[2]);
    console.log(this.dtInicial);

    if (this.dtFinal && this.dtInicial) 
      if (new Date(this.dtFinal.getFullYear(), this.dtFinal.getMonth(), this.dtFinal.getDay()).getTime() < this.dtInicial.getTime()) {
        this.dt_inicio = new String();
        this.util.msgAlert('A data final não pode ser menor que a inicial');
      } else if (new Date(this.dtFinal.getFullYear(), this.dtFinal.getMonth(), this.dtFinal.getDay()).getTime() === this.dtInicial.getTime())  { 
        this.dt_final = new String();
        this.util.msgAlert('O período deve ter pelo menos 1 dia');
      }

    console.log('dt_ini_change');
  }

  dtFinalChange(newObj) {

    var dataArray = newObj.split('-');
    this.dtFinal = new Date();
    this.dtFinal.setFullYear(dataArray[0], dataArray[1], dataArray[2]);
    console.log(this.dtFinal);

    if (this.dtFinal && this.dtInicial) 
      if (this.dtFinal.getTime() < new Date(this.dtInicial).getTime())  {
        this.dt_final = new String();
        this.util.msgAlert('A data final não pode ser menor que a inicial');
      } else if (new Date(this.dtFinal.getFullYear(), this.dtFinal.getMonth(), this.dtFinal.getDay()).getTime() === this.dtInicial.getTime())  { 
        this.dt_final = new String();
        this.util.msgAlert('O período deve ter pelo menos 1 dia');
      } else {
        var timeDiff = Math.abs(this.dtFinal.getTime() - this.dtInicial.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

        this.qtDias = diffDays -1;

        if (this.qtDias > 0) {
          this.vlTotal = this.qtDias * this.flat.getVlBasicoDiaria();
          this.qtDiasValido = true;
        }

        if (this.qtDiasValido && this.vlEntradaValido && this.nrPessoasValido) {
          this.habilitaReserva = true;
        } else {
          this.habilitaReserva = false;
        }
      }

    console.log('dt_fim_change');
  }

  onBlurEntrada() {
    console.log('vlEntrada', this.vlEntrada);

    if (this.vlEntrada) {
      if (this.vlTotal)
        if (parseFloat(this.vlEntrada.toString()) >= (20 * this.vlTotal / 100) && parseFloat(this.vlEntrada.toString()) <= this.vlTotal) {
          this.vlEntradaValido = true;
        } else {
          this.vlEntradaValido = false;
          this.util.msgAlert('O valor informado não é permitido. Deve ser no mínimo 20% do valor total R$ ' + this.vlTotal, 3000);
        }

      if (this.qtDiasValido && this.vlEntradaValido && this.nrPessoasValido) {
        this.habilitaReserva = true;
      } else {
        this.habilitaReserva = false;
      }
    }
  }

  onChangeNrPessoas() {
    console.log('nrPessoas', this.nrPessoas);

    if (this.nrPessoas > this.flat.getNrMaxPessoas()) {
      this.nrPessoasValido = false;
      this.util.msgAlert('O número de pessoas não deve ultrapassar o limite do flat: ' + this.flat.getNrMaxPessoas());
    } else {
      this.nrPessoasValido = true;
    }

    if (this.qtDiasValido && this.vlEntradaValido && this.nrPessoasValido) {
      this.habilitaReserva = true;
    } else {
      this.habilitaReserva = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SolicReservaPage');
  }

}
