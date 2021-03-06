import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Flat } from '../../model/flat';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Util } from '../../util/utils';
import { EnviaMensagemFlatPage } from '../envia-mensagem-flat/envia-mensagem-flat';
import { SolicReservaPage } from '../solic-reserva/solic-reserva';

@IonicPage()
@Component({
  selector: 'page-list-favoritos',
  templateUrl: 'list-favoritos.html',
})
export class ListFavoritosPage {

  public flatsFavoritos: Array<Flat>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private util: Util) {

    this.buscarFlatsFavoritos();

  }

  buscarFlatsFavoritos() {
    this.flatsFavoritos = new Array<Flat>();

    this.http.get(this.util.favoritosRotaGetFlatsByUsuario + this.util.cdUsuarioLogado)
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

            this.flatsFavoritos.push(flat);
          });

          this.setFlatsFavoritos();

          console.log('list flats favoritos: ', data);

        }
    });
  }

  setFlatsFavoritos() {
    if(this.util.cdUsuarioLogado) {
      this.http.get(this.util.favoritosRotaGetByUsuario + this.util.cdUsuarioLogado)
        .map(res => res.json())
        .subscribe(data => {

          if (data) {

            if (this.flatsFavoritos.length > 0) {
              data.forEach(element => {

                let f: Flat = this.flatsFavoritos.find(x => x.getCodigoFlat() == element.cd_flat);
                if (f)
                  f.isFavorito = true;
                
              });

              console.log('list flats_favoritos: ', data);
            }

          }
        });
    }
  }

  setFavorito(item: Flat) {

    let headers = new Headers(
    {
      'Content-Type' : 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    if(this.util.cdUsuarioLogado) {

      if (item.isFavorito) {

      // CHAMA O DELETE PARA APAGAR O FLAT FAVORITO DO USUARIO

      this.http.delete(this.util.favoritosRotaPrincipal + item.getCodigoFlat() + '/' + this.util.cdUsuarioLogado, 
                        options)
        .toPromise()
        .then(data => {
          console.log('API Response : ', data.json());
          this.buscarFlatsFavoritos();

          item.isFavorito = false;
          this.util.msgAlert('Flat removido da lista de favoritos!');
        }).catch(error => {
          console.error('API Error : ', error.status);
          console.error('API Error : ', JSON.stringify(error));
        });
        
      } else {

        this.http.post(this.util.favoritosRotaPrincipal, 
                {cd_flat: item.getCodigoFlat(), cd_usuario: this.util.cdUsuarioLogado}, 
                options)
        .toPromise()
        .then(data => {
          console.log('API Response : ', data.json());
          this.buscarFlatsFavoritos();
          this.util.msgAlert('Flat favorito salvo com sucesso!');
          item.isFavorito = true;
        }).catch(error => {
          console.error('API Error : ', error.status);
          console.error('API Error : ', JSON.stringify(error));
          this.util.msgAlert('Erro ao salvar o flat favorito!');
        });
        
      }
    } else {
      this.util.msgAlert('É necessário realizar login para selecionar favoritos!');
    }
    
  }

  chamarTelaMensagens(item: Flat) {

    if(this.util.cdUsuarioLogado) {
      if (item.getCdUsuarioCadastro().toString() != this.util.cdUsuarioLogado) {
        this.navCtrl.push(EnviaMensagemFlatPage, {'flat': item});
      } else {
        this.util.msgAlert('Não é possível enviar mensagens para você mesmo!');
      }
    } else {
      this.util.msgAlert('É necessário realizar login para enviar mensagens!');
    }

  }

  chamarTelaSolicReserva(item: Flat) {
    
    if(this.util.cdUsuarioLogado) {
      if (item.getCdUsuarioCadastro().toString() != this.util.cdUsuarioLogado) {
        this.navCtrl.push(SolicReservaPage, {'flat': item});
      } else {
        this.util.msgAlert('Este flat é seu, não é possível reservar!');
      }
    } else {
      this.util.msgAlert('É necessário realizar login para reservar!');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListFavoritosPage');
  }

}
