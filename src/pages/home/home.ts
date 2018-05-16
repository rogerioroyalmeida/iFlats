import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginService } from '../../providers/login/login-service';
import { LoginPage } from '../login/login';
import { Usuario } from '../../model/usuario';
import { BuscaFlatsPage } from '../busca-flats/busca-flats';
import { Util } from '../../util/utils';
import { Flat } from '../../model/flat';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuario: Usuario = new Usuario();
  dt_inicio: Date;
  dt_fim: Date;
  destino: string;
  public listFlats: Array<Flat>;

  constructor(public navCtrl: NavController, private loginService: LoginService, private navParams: NavParams, public http: Http, private util: Util) {

    this.listFlats = new Array<Flat>();

    this.dt_inicio = new Date();
    this.dt_fim = new Date();
    this.destino = '';

    if(navParams.get('usuario')) {
      this.usuario = navParams.get('usuario');
    }

  }

  buscarFlats() {
    if (this.destino) {

      // this.util.cadFlatsRotaGetByFiltros + this.destino + '/' + this.dt_inicio + '/' + this.dt_fim
      this.http.get(this.util.cadFlatsRotaPrincipal)
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

              this.listFlats.push(flat);
            });

            console.log('list flats: ', data);

          }
      });

      this.navCtrl.push(BuscaFlatsPage, {'listFlats': this.listFlats});
    } else {
      this.util.msgAlert('Favor informar ao menos o destino para buscar!');
    }
  }

  signOut() {
    this.loginService.signOut()
      .then(() => {
        this.navCtrl.setRoot(LoginPage);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
