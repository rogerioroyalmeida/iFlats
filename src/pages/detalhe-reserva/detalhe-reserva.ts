import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Util } from '../../util/utils';
import { Reserva } from '../../model/reserva';
import { SolicReserva } from '../../model/solic-reserva';
import { Flat } from '../../model/flat';
import { Usuario } from '../../model/usuario';
import * as moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-detalhe-reserva',
  templateUrl: 'detalhe-reserva.html',
})
export class DetalheReservaPage {

  reserva: Reserva;
  solicReserva: SolicReserva;
  flat: Flat;

  usuarioSolicitante: Usuario;
  dt_inicial_reserva: string = '';
  dt_final_reserva: string = '';
  nmUsuario: string = '';

  ds_titulo_anuncio: string = '';
  ds_endereco: string = '';
  nr_endereco: number = NaN;
  ds_complemento: string = '';
  ds_pais: string = '';
  ds_estado: string = '';
  ds_cidade: string = '';
  ds_bairro: string = '';
  nr_cep: string = '';
  sn_condominio: string = '';
  nr_quartos: number = NaN;
  nr_banheiros: number = NaN;
  nr_max_pessoas: number = NaN;
  vl_basico_diaria: number = NaN;
  nr_area_flat: number = NaN;
  ds_flat: string = '';
  ds_regras: string = '';
  sn_internet: string = '';
  sn_criancas: string = '';
  sn_mobilidade_reduzida: string = '';
  sn_fumantes: string = '';
  sn_animais: string = '';
  sn_festas: string = '';
  sn_longo_prazo: string = '';
  cd_usuario_cadastro: number = NaN;
  observacao: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private util: Util) {
    if(navParams.get('reserva')) {
      this.reserva = navParams.get('reserva');
    }

    if (this.reserva) {
      this.solicReserva = new SolicReserva();

      this.http.get(this.util.solicReservaRotaPrincipal + this.reserva.getCdSolicitacaoReserva())
        .map(res => res.json())
        .subscribe(data => {

          if (data[0]) {

            this.solicReserva.setCdSolicReserva(data[0].cd_solic_reserva);
            this.solicReserva.setCdFlat(data[0].cd_flat);
            this.solicReserva.setCdUsuario(data[0].cd_usuario);
            this.solicReserva.setCdUsuarioResponsavel(data[0].cd_usuario_responsavel);
            this.solicReserva.setDtInicial(data[0].dt_inicial);
            this.solicReserva.setDtFinal(data[0].dt_final);
            this.solicReserva.setNrDias(data[0].nr_dias);
            this.solicReserva.setNrPessoas(data[0].nr_pessoas);
            this.solicReserva.setVlDiaria(data[0].vl_diaria);
            this.solicReserva.setVlEntrada(data[0].vl_entrada);
            this.solicReserva.setVlTotal(data[0].vl_total);
            this.solicReserva.setStatus(data[0].status);

            this.dt_inicial_reserva = moment(data[0].dt_inicial).format('DD/MM/YYYY');
            this.dt_final_reserva = moment(data[0].dt_final).format('DD/MM/YYYY');

            console.log('get solic_reserva: ', data);


            if (this.solicReserva) {
              
              this.flat = new Flat();

              this.http.get(this.util.cadFlatsRotaPrincipal + this.solicReserva.getCdFlat())
                .map(res => res.json())
                .subscribe(data => {

                  if (data[0]) {

                    this.flat.setCodigo(data[0].cd_flat);
                    this.flat.setDsTituloAnuncio(data[0].ds_titulo_anuncio);
                    this.flat.setEndereco(data[0].ds_endereco);
                    this.flat.setNumero(data[0].nr_endereco);
                    this.flat.setComplemento(data[0].ds_complemento);
                    this.flat.setPais(data[0].ds_pais);
                    this.flat.setEstado(data[0].ds_estado);
                    this.flat.setCidade(data[0].ds_cidade);
                    this.flat.setBairro(data[0].ds_bairro);
                    this.flat.setCep(data[0].nr_cep);
                    this.flat.setSnCondominio(data[0].sn_condominio);
                    this.flat.setNrQuartos(data[0].nr_quartos);
                    this.flat.setNrBanheiros(data[0].nr_banheiros);
                    this.flat.setNrMaxPessoas(data[0].nr_max_pessoas);
                    this.flat.setVlBasicoDiaria(data[0].vl_basico_diaria);
                    this.flat.setNrAreaFlat(data[0].nr_area_flat);
                    this.flat.setDsFlat(data[0].ds_flat);
                    this.flat.setDsRegras(data[0].ds_regras);
                    this.flat.setSnInternet(data[0].sn_internet);
                    this.flat.setSnCriancas(data[0].sn_criancas);
                    this.flat.setSnMobilidadeReduzida(data[0].sn_mobilidade_reduzida);
                    this.flat.setSnFumantes(data[0].sn_fumantes);
                    this.flat.setSnAnimais(data[0].sn_animais);
                    this.flat.setSnFestas(data[0].sn_festas);
                    this.flat.setSnLongoPrazo(data[0].sn_longo_prazo);
                    this.flat.setDtCadastro(data[0].dt_cadastro);
                    this.flat.setCdUsuarioCadastro(data[0].cd_usuario_cadastro);
                    this.flat.setDtAlteracao(data[0].dt_alteracao);
                    this.flat.setCdUsuarioAlteracao(data[0].cd_usuario_alteracao);
                    this.flat.setSnAtivo(data[0].sn_ativo);
                    this.flat.setCdUsuarioGerenResponsavel(data[0].cd_usuario_geren_responsavel);
                    this.flat.setObservacao(data[0].observacao);
                    this.flat.setStatus(data[0].status);
                    
                    this.ds_titulo_anuncio = this.flat.getDsTituloAnuncio();
                    this.ds_endereco = this.flat.getEndereco();
                    this.nr_endereco = this.flat.getNumero();
                    this.ds_complemento = this.flat.getComplemento();
                    this.ds_pais = this.flat.getPais();
                    this.ds_estado = this.flat.getEstado();
                    this.ds_cidade = this.flat.getCidade();
                    this.ds_bairro = this.flat.getBairro();
                    this.nr_cep = this.flat.getCep();
                    this.sn_condominio = this.flat.getSnCondominio();
                    this.nr_quartos = this.flat.getNrQuartos();
                    this.nr_banheiros = this.flat.getNrBanheiros();
                    this.nr_max_pessoas = this.flat.getNrMaxPessoas();
                    this.vl_basico_diaria = this.flat.getVlBasicoDiaria();
                    this.nr_area_flat = this.flat.getNrAreaFlat();
                    this.ds_flat = this.flat.getDsFlat();
                    this.ds_regras = this.flat.getDsRegras();
                    this.sn_internet = this.flat.getSnInternet();
                    this.sn_criancas = this.flat.getSnCriancas();
                    this.sn_mobilidade_reduzida = this.flat.getSnMobilidadeReduzida();
                    this.sn_fumantes = this.flat.getSnFumantes();
                    this.sn_animais = this.flat.getSnAnimais();
                    this.sn_festas = this.flat.getSnFestas();
                    this.sn_longo_prazo = this.flat.getSnLongoPrazo();
                    this.cd_usuario_cadastro = this.flat.getCdUsuarioCadastro();
                    this.observacao = this.flat.getObservacao();
                    
                    
                    console.log('get flat: ', data);
                    
                    
                    this.usuarioSolicitante = new Usuario();

                    this.http.get(this.util.usuarioRotaGetByCodigo + this.solicReserva.getCdUsuario())
                      .map(res => res.json())
                      .subscribe(data => {

                        if (data[0]) {
                          this.usuarioSolicitante.setCdUsuario(data[0].cd_usuario);
                          this.usuarioSolicitante.setEmail(data[0].email);
                          this.usuarioSolicitante.setDsNome(data[0].ds_nome);
                          this.nmUsuario = data[0].ds_nome
                          this.usuarioSolicitante.setDsSobreNome(data[0].ds_sobrenome);
                          this.usuarioSolicitante.setCampo01(data[0].campo01);
                          this.usuarioSolicitante.setCampo02(data[0].campo02);
                          this.usuarioSolicitante.setCampoReal(data[0].campo_real);
                          this.usuarioSolicitante.setObservacao(data[0].observacao);
                        }

                        console.log('get usuario: ', data)
                      });

                  }
              });

            }

          }
      });
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalheReservaPage');
  }

}
