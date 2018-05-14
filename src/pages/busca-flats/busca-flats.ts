import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Util } from '../../util/utils';
import { Flat } from '../../model/flat';

@IonicPage()
@Component({
  selector: 'page-busca-flats',
  templateUrl: 'busca-flats.html',
})
export class BuscaFlatsPage {

  public listFlats: Array<Flat>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private util: Util) {

    this.listFlats = new Array<Flat>();

    this.http.get(this.util.cadFlatsRotaGetByUsuario)
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

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscaFlatsPage');
  }

}
