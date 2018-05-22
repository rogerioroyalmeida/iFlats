import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Util } from '../../util/utils';
import { Flat } from '../../model/flat';
import { EnviaMensagemFlatPage } from '../envia-mensagem-flat/envia-mensagem-flat';

@IonicPage()
@Component({
  selector: 'page-busca-flats',
  templateUrl: 'busca-flats.html',
})
export class BuscaFlatsPage {

  public listFlats: Array<Flat>;
  public tituloTelaBuscaFlats = 'Busca de flats';

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private util: Util) {

    this.listFlats = new Array<Flat>();

    if(navParams.get('listFlats')) {
      this.listFlats = navParams.get('listFlats');

      this.setFlatsFavoritos();
    }

    navParams.get('tituloTela') ? this.tituloTelaBuscaFlats = navParams.get('tituloTela') : false;

  }

  setFlatsFavoritos() {
    this.http.get(this.util.favoritosRotaGetByUsuario + this.util.cdUsuarioLogado)
      .map(res => res.json())
      .subscribe(data => {

        if (data) {

          if (this.listFlats.length > 0) {
            data.forEach(element => {

              this.listFlats.find(x => x.getCodigoFlat() == element.cd_flat).isFavorito = true;
              
            });

            console.log('list flats_favoritos: ', data);
          }

        }
      });
  }

  setFavorito(item: Flat) {

    // CHAMA O DELETE PARA APAGAR O FLAT FAVORITO DO USUARIO
    let headers = new Headers(
    {
      'Content-Type' : 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    this.http.delete(this.util.favoritosRotaPrincipal + item.getCodigoFlat() + '/' + this.util.cdUsuarioLogado, 
                      options)
      .toPromise()
      .then(data => {
        console.log('API Response : ', data.json());
      }).catch(error => {
        console.error('API Error : ', error.status);
        console.error('API Error : ', JSON.stringify(error));
      });

    if (item.isFavorito) {
      item.isFavorito = false;
      this.util.msgAlert('Flat removido da lista de favoritos!');
    } else {

      this.http.post(this.util.favoritosRotaPrincipal, 
              {cd_flat: item.getCodigoFlat(), cd_usuario: this.util.cdUsuarioLogado}, 
              options)
      .toPromise()
      .then(data => {
        console.log('API Response : ', data.json());
        this.util.msgAlert('Flat favorito salvo com sucesso!');
        item.isFavorito = true;
      }).catch(error => {
        console.error('API Error : ', error.status);
        console.error('API Error : ', JSON.stringify(error));
        this.util.msgAlert('Erro ao salvar o flat favorito!');
      });
      
    }
  }

  chamarTelaMensagens(item: Flat) {

    if (item.getCdUsuarioCadastro().toString() != this.util.cdUsuarioLogado) {
      this.navCtrl.push(EnviaMensagemFlatPage, {'flat': item});
    } else {
      this.util.msgAlert('Não é possível enviar mensagens para você mesmo!');
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscaFlatsPage');
  }

}
