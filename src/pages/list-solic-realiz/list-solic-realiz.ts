import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Util } from '../../util/utils';
import { SolicReserva } from '../../model/solic-reserva';


@IonicPage()
@Component({
  selector: 'page-list-solic-realiz',
  templateUrl: 'list-solic-realiz.html',
})
export class ListSolicRealizPage {

  public listSolicReserva: Array<SolicReserva>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private util: Util) {

    this.listSolicReserva = new Array<SolicReserva>();

    this.http.get(this.util.solicReservaRotaGetByUsuario + this.util.cdUsuarioLogado)
        .map(res => res.json())
        .subscribe(data => {

          if (data) {

            data.forEach(element => {
              let solicReserva: SolicReserva = new SolicReserva();
              solicReserva.setCdSolicReserva(element.cd_solic_reserva);
              solicReserva.setCdFlat(element.cd_flat);
              solicReserva.setCdUsuario(element.cd_usuario);
              solicReserva.setCdUsuarioResponsavel(element.cd_usuario_responsavel);
              solicReserva.setDtInicial(element.dt_inicial);
              solicReserva.setDtFinal(element.dt_final);
              solicReserva.setNrDias(element.nr_dias);
              solicReserva.setNrPessoas(element.nr_pessoas);
              solicReserva.setVlDiaria(element.vl_diaria);
              solicReserva.setVlEntrada(element.vl_entrada);
              solicReserva.setVlTotal(element.vl_total);
              
              this.listSolicReserva.push(solicReserva);
            });

            console.log('list solic_reserva: ', data);

          }
        });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListSolicRealizPage');
  }

}
