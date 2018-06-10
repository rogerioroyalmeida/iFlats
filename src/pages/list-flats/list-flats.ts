import { Component  } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CadFlatsPage } from '../cad-flats/cad-flats';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Flat } from '../../model/flat';
import { CadItGeralPage } from '../cad-it-geral/cad-it-geral';
import { CadItCozinhaPage } from '../cad-it-cozinha/cad-it-cozinha';
import { Util } from '../../util/utils';
import { CadItEntretenimentoPage } from '../cad-it-entretenimento/cad-it-entretenimento';
import { RecebeMensagemFlatPage } from '../recebe-mensagem-flat/recebe-mensagem-flat';
import { SolicReserva } from '../../model/solic-reserva';
import { Reserva } from '../../model/reserva';
import { DetalheReservaPage } from '../detalhe-reserva/detalhe-reserva';
import * as moment from 'moment';
import { CadItCriancaPage } from '../cad-it-crianca/cad-it-crianca';
import { CadItInstalacaoPage } from '../cad-it-instalacao/cad-it-instalacao';
import { CadServicoPage } from '../cad-servico/cad-servico';
import { CadEquipamentoPage } from '../cad-equipamento/cad-equipamento';
import { Mensagem } from '../../model/mensagem';

@IonicPage()
@Component({
  selector: 'page-flats',
  templateUrl: 'list-flats.html',
})
export class ListFlatsPage {

  public flats: Array<Flat>;
  public listSolicitacoes: Array<SolicReserva>;
  public listFlatsReservados: Array<Reserva>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public http: Http,
              private alertCtrl: AlertController,
              private util: Util) {

    this.flats = new Array<Flat>();

    this.http.get(this.util.cadFlatsRotaGetByUsuario + this.util.cdUsuarioLogado)
      .map(res => res.json())
      .subscribe(data => {

        if (data) {

          data.forEach(element => {
            let flat: Flat = new Flat();
            flat.setCodigo(element.cd_flat);
            flat.setDsTituloAnuncio(element.ds_titulo_anuncio);
            flat.setEndereco(element.ds_endereco);
            flat.setNumero(element.nr_endereco);
            flat.setComplemento(element.ds_complemento);
            flat.setPais(element.ds_pais);
            flat.setEstado(element.ds_estado);
            flat.setCidade(element.ds_cidade);
            flat.setBairro(element.ds_bairro);
            flat.setCep(element.nr_cep);
            flat.setSnCondominio(element.sn_condominio);
            flat.setNrQuartos(element.nr_quartos);
            flat.setNrBanheiros(element.nr_banheiros);
            flat.setNrMaxPessoas(element.nr_max_pessoas);
            flat.setVlBasicoDiaria(element.vl_basico_diaria);
            flat.setNrAreaFlat(element.nr_area_flat);
            flat.setDsFlat(element.ds_flat);
            flat.setDsRegras(element.ds_regras);
            flat.setSnInternet(element.sn_internet);
            flat.setSnCriancas(element.sn_criancas);
            flat.setSnMobilidadeReduzida(element.sn_mobilidade_reduzida);
            flat.setSnFumantes(element.sn_fumantes);
            flat.setSnAnimais(element.sn_animais);
            flat.setSnFestas(element.sn_festas);
            flat.setSnLongoPrazo(element.sn_longo_prazo);
            flat.setDtAlteracao(element.dt_alteracao);
            flat.setCdUsuarioAlteracao(element.cd_usuario_alteracao);
            flat.setDtCadastro(element.dt_cadastro);
            flat.setCdUsuarioCadastro(element.cd_usuario_cadastro);
            flat.setSnAtivo(element.sn_ativo);

            this.flats.push(flat);
          });

          this.util.usuarioAdmLogado.setQtdflats(this.flats.length);

          console.log('list flats: ', data);

        }
    });

    this.buscarSolicitacoesReserva();
    this.buscarFlatsReservados();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListFlatsPage');
  }

  itemSelected(item: Flat) {
    this.navCtrl.push(CadFlatsPage, {item: item});
  }

  abrirCadastro() {
    this.navCtrl.push(CadFlatsPage);
  }

  removerFlat(i: number, item: Flat) {

    let alert = this.alertCtrl.create({
      title: 'Confirmar exclusão',
      message: 'Tem certeza que deseja excluir este flat?',
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
        
            this.http.delete(this.util.cadFlatsRotaPrincipal + item.getCodigoFlat(), 
                              options)
              .toPromise()
              .then(data => {
                this.flats.splice(i, 1);
                console.log('API Response : ', data.json());
                this.util.msgAlert('Flat removido com sucesso!');
                this.navCtrl.push(ListFlatsPage);
              }).catch(error => {
                console.error('API Error : ', error.status);
                console.error('API Error : ', JSON.stringify(error));
                this.util.msgAlert('Erro ao remover o flat!');
              });
          }
        }
      ]
    });
    alert.present();
    
  }

  showIcon(item: Flat) {
    item.iconVisivel = true;
  }

  hideIcon(item: Flat) {
    item.iconVisivel = false;
  }

  abrirItGeral() {
    this.navCtrl.push(CadItGeralPage);
  }

  abrirItCozinha() {
    this.navCtrl.push(CadItCozinhaPage);
  }

  abrirItEntretenimento() {
    this.navCtrl.push(CadItEntretenimentoPage);
  }

  abrirListMensagens(i: number, item: Flat) {
    this.navCtrl.push(RecebeMensagemFlatPage, {'flat': item});
  }

  aceitarSolicReserva(solicReserva: SolicReserva, i: number) {

    let alert = this.alertCtrl.create({
      title: 'Aceitar solicitação',
      message: 'Tem certeza que deseja reservar este flat no período solicitado?',
      inputs: [
        {
          type: 'string',
          name: 'obs',
          placeholder: 'Digite a observação',
          label: 'Observação',
          id: 'obs',
          max: 4000
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Reservar',
          handler: data => {
            let headers = new Headers(
            {
              'Content-Type' : 'application/json'
            });
            let options = new RequestOptions({ headers: headers });

            let reserva: Reserva = new Reserva();

            reserva.setCdSolicitacaoReserva(solicReserva.getCdSolicReserva());
            reserva.setVlRestante(solicReserva.getVlTotal() - solicReserva.getVlEntrada());
            reserva.setObservacao(data.obs);

            this.http.post(this.util.reservaRotaPrincipal,
                              reserva, 
                              options)
              .toPromise()
              .then(data => {

                var dtIni = solicReserva.getDtInicial();
                var dtFim = solicReserva.getDtFinal();
                solicReserva.setStatus('R');

                var datePartsIni = dtIni.split("/");
                var jsDateIni = new Date(parseInt(datePartsIni[2]), parseInt(datePartsIni[1]) - 1, parseInt(datePartsIni[0]));
                solicReserva.setDtInicial(datePartsIni[2] + '-' + (parseInt(datePartsIni[1]) - 1).toString() + '-' + datePartsIni[0]);
                var datePartsFim = dtFim.split("/");
                var jsDateFim = new Date(parseInt(datePartsFim[2]), parseInt(datePartsFim[1]) - 1, parseInt(datePartsFim[0]));
                solicReserva.setDtFinal(datePartsFim[2] + '-' + (parseInt(datePartsFim[1]) - 1).toString() + '-' + datePartsFim[0]);

                this.http.patch(this.util.solicReservaRotaPrincipal + solicReserva.getCdSolicReserva(),
                                  solicReserva, 
                                  options)
                    .toPromise()
                    .then(data => {
                      this.listSolicitacoes.splice(i, 1);
                      console.log('API Response : ', data.json());
                      this.buscarSolicitacoesReserva();
                      this.enviarMsgLocatario('A', solicReserva);
                      // this.navCtrl.push(CadItCozinhaPage);
                    }).catch(error => {
                      console.error('API Error : ', error.status);
                      console.error('API Error : ', JSON.stringify(error));
                    });

                console.log('API Response : ', data.json());
                this.util.msgAlert('Flat reservado!');
                this.buscarFlatsReservados();
                // this.navCtrl.push(CadItCozinhaPage);
              }).catch(error => {
                console.error('API Error : ', error.status);
                console.error('API Error : ', JSON.stringify(error));
                this.util.msgAlert('Erro ao reservar o flat!');
              });
          }
        }
      ]
    });
    alert.present();

  }

  negarSolicReserva(solicReserva: SolicReserva, i: number) {

    let alert = this.alertCtrl.create({
      title: 'Negar solicitação',
      message: 'Tem certeza que deseja negar esta solicitação de reserva?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Negar',
          handler: () => {
            let headers = new Headers(
            {
              'Content-Type' : 'application/json'
            });
            let options = new RequestOptions({ headers: headers });

            var dtIni = solicReserva.getDtInicial();
            var dtFim = solicReserva.getDtFinal();
            solicReserva.setStatus('C');

            solicReserva.setDtInicial(dtIni.substr(0, 10));
            solicReserva.setDtFinal(dtFim.substr(0, 10));

            this.http.patch(this.util.solicReservaRotaPrincipal + solicReserva.getCdSolicReserva(),
                              solicReserva, 
                              options)
                .toPromise()
                .then(data => {
                  this.listSolicitacoes.splice(i, 1);
                  console.log('API Response : ', data.json());
                  this.util.msgAlert('Solicitação negada!');
                  this.buscarSolicitacoesReserva();
                  this.enviarMsgLocatario('N', solicReserva);
                  // this.navCtrl.push(CadItCozinhaPage);
                }).catch(error => {
                  console.error('API Error : ', error.status);
                  console.error('API Error : ', JSON.stringify(error));
                  this.util.msgAlert('Não foi possível negar a solicitação!');
                });
          }
        }
      ]
    });
    alert.present();

  }

  buscarSolicitacoesReserva() {

    this.listSolicitacoes = new Array<SolicReserva>();

    this.http.get(this.util.solicReservaRotaGetByUsuarioResp + this.util.cdUsuarioLogado)
      .map(res => res.json())
      .subscribe(data => {

        if (data) {

          data.forEach(element => {
            let solicReserva: SolicReserva = new SolicReserva();
            solicReserva.setCdSolicReserva(element.cd_solic_reserva);
            solicReserva.setCdFlat(element.cd_flat);
            solicReserva.setCdUsuario(element.cd_usuario);
            solicReserva.setCdUsuarioResponsavel(element.cd_usuario_responsavel);
            solicReserva.setDtInicial(moment(data[0].dt_inicial).format('DD/MM/YYYY'));
            solicReserva.setDtFinal(moment(data[0].dt_final).format('DD/MM/YYYY'));
            solicReserva.setNrDias(element.nr_dias);
            solicReserva.setNrPessoas(element.nr_pessoas);
            solicReserva.setVlDiaria(element.vl_diaria);
            solicReserva.setVlEntrada(element.vl_entrada);
            solicReserva.setVlTotal(element.vl_total);

            this.listSolicitacoes.push(solicReserva);
          });

          console.log('list solicReserva: ', data);

        }
    });
  }

  buscarFlatsReservados() {

    this.listFlatsReservados = new Array<Reserva>();

    this.http.get(this.util.reservaRotaGetByUser + this.util.cdUsuarioLogado)
      .map(res => res.json())
      .subscribe(data => {

        if (data) {

          data.forEach(element => {
            let reserva: Reserva = new Reserva();
            reserva.setCdReserva(element.cd_reserva);
            reserva.setCdSolicitacaoReserva(element.cd_solicitacao_reserva);
            reserva.setVlRestante(element.vl_restante);
            reserva.setObservacao(element.observacao);

            this.listFlatsReservados.push(reserva);
          });

          console.log('list reserva: ', data);

        }
    });

  }

  chamarTelaDetalheReserva(item: Reserva) {
    this.navCtrl.push(DetalheReservaPage, {'reserva': item});
  }
  abrirItCrianca( ) {
    this.navCtrl.push(CadItCriancaPage);
  }

  abrirItInstalacao( ) {
    this.navCtrl.push(CadItInstalacaoPage);
  }

  abrirServico( ) {
    this.navCtrl.push(CadServicoPage);
  }
  
  abrirEquipamento( ) {
    this.navCtrl.push(CadEquipamentoPage);
  }
  
  enviarMsgLocatario(tpMsg: string, solicReserva: SolicReserva) {

    let newMsg: Mensagem = new Mensagem();
    let nmUsuarioDestinatario = '';

    this.http.get(this.util.usuarioRotaGetByCodigo + solicReserva.getCdUsuario())
          .map(res => res.json())
          .subscribe(data => {

            nmUsuarioDestinatario = data[0].ds_nome;

        });

    newMsg.setCdFlat(solicReserva.getCdFlat());
    newMsg.setAnexo01('');
    newMsg.setAnexo02('');
    newMsg.setCdUsuarioEmissario(solicReserva.getCdUsuarioResponsavel());
    newMsg.setNmUsuarioEmissario(this.util.usuarioAdmLogado.getDsNome());
    newMsg.setCdUsuarioDestinatario(solicReserva.getCdUsuario());
    newMsg.setNmUsuarioDestinatario(nmUsuarioDestinatario);
    newMsg.setStatus('N');
    newMsg.status2 = 'pending';
    newMsg.setTime(Date.now());

    if (tpMsg === 'A') {

      newMsg.setDsMensagem('Olá, sou o dono do flat ' + solicReserva.getCdFlat() + ' e acabei de aceitar sua solicitação de reserva de número ' + solicReserva.getCdSolicReserva() + '. A reserva encontra-se confirmada no período de ' + solicReserva.getDtInicial() + ' e ' + solicReserva.getDtFinal() + '.Boa viagem!');

      let headers = new Headers(
      {
        'Content-Type' : 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
  
      this.http.post(this.util.mensagemRotaPrincipal, 
                    newMsg, 
                    options)
      .toPromise()
      .then(data => {
        console.log('API Response : ', data.json());
        newMsg.setCdMensagem(data.json().insertId);
      }).catch(error => {
        console.error('API Error : ', error.status);
        console.error('API Error : ', JSON.stringify(error));
      });

    } else if (tpMsg === 'N') {

      newMsg.setDsMensagem('Olá, sou o dono do flat ' + solicReserva.getCdFlat() + ' e não foi possível aceitar sua solicitação de reserva e foi cancelada. Por favor tente novamente.');

      let headers = new Headers(
      {
        'Content-Type' : 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
  
      this.http.post(this.util.mensagemRotaPrincipal, 
                    newMsg, 
                    options)
      .toPromise()
      .then(data => {
        console.log('API Response : ', data.json());
        newMsg.setCdMensagem(data.json().insertId);
      }).catch(error => {
        console.error('API Error : ', error.status);
        console.error('API Error : ', JSON.stringify(error));
      });

    }

  }

  cancelarReserva(item: Reserva, i: number) {

    let headers = new Headers(
    {
      'Content-Type' : 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    this.http.delete(this.util.reservaRotaPrincipal + item.getCdReserva(), 
                      options)
      .toPromise()
      .then(data => {
        this.listFlatsReservados.splice(i, 1);
        console.log('API Response : ', data.json());

        this.http.get(this.util.solicReservaRotaPrincipal + item.getCdSolicitacaoReserva())
          .map(res => res.json())
          .subscribe(data => {

            if (data) {

              let solicReserva: SolicReserva = new SolicReserva();
              solicReserva.setCdSolicReserva(data[0].cd_solic_reserva);
              solicReserva.setCdFlat(data[0].cd_flat);
              solicReserva.setCdUsuario(data[0].cd_usuario);
              solicReserva.setCdUsuarioResponsavel(data[0].cd_usuario_responsavel);
              solicReserva.setDtInicial(moment(data[0].dt_inicial).format('DD/MM/YYYY'));
              solicReserva.setDtFinal(moment(data[0].dt_final).format('DD/MM/YYYY'));
              solicReserva.setNrDias(data[0].nr_dias);
              solicReserva.setNrPessoas(data[0].nr_pessoas);
              solicReserva.setVlDiaria(data[0].vl_diaria);
              solicReserva.setVlEntrada(data[0].vl_entrada);
              solicReserva.setVlTotal(data[0].vl_total);

              let headers = new Headers(
              {
                'Content-Type' : 'application/json'
              });
              let options = new RequestOptions({ headers: headers });
  
              var dtIni = solicReserva.getDtInicial();
              var dtFim = solicReserva.getDtFinal();
              solicReserva.setStatus('C');
  
              solicReserva.setDtInicial(dtIni.substr(0, 10));
              solicReserva.setDtFinal(dtFim.substr(0, 10));
  
              this.http.patch(this.util.solicReservaRotaPrincipal + solicReserva.getCdSolicReserva(),
                                solicReserva, 
                                options)
                  .toPromise()
                  .then(data => {
                    this.listSolicitacoes.splice(i, 1);
                    console.log('API Response : ', data.json());
                    this.util.msgAlert('Reserva cancelada!');
                    this.buscarSolicitacoesReserva();
                    this.enviarMsgLocatario('N', solicReserva);
                    // this.navCtrl.push(CadItCozinhaPage);
                  }).catch(error => {
                    console.error('API Error : ', error.status);
                    console.error('API Error : ', JSON.stringify(error));
                    this.util.msgAlert('Não foi possível cancelar a reserva!');
                  });

            }
        });

      });
  }

}
