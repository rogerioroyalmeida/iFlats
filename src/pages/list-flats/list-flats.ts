import { Component  } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CadFlatsPage } from '../cad-flats/cad-flats';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Flat } from '../../model/flat';
import { CadItGeralPage } from '../cad-it-geral/cad-it-geral';
import { CadItCozinhaPage } from '../cad-it-cozinha/cad-it-cozinha';
import { Util } from '../../util/utils';

@IonicPage()
@Component({
  selector: 'page-flats',
  templateUrl: 'list-flats.html',
})
export class ListFlatsPage {

  public flats: Array<Flat>;

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

          console.log('list flats: ', data);

        }
    });
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

}
