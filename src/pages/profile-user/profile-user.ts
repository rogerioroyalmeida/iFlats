import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Usuario } from '../../model/usuario';
import { HomePage } from '../home/home';
import { Util } from '../../util/utils';

@IonicPage()
@Component({
  selector: 'page-profile-user',
  templateUrl: 'profile-user.html',
})
export class ProfileUserPage {

  nome: string;
  email: string;
  sobrenome: string;
  campo01: string;
  campo02: string;
  campo_real: Number;
  observacao: string;

  usuario: Usuario = new Usuario();

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public http: Http,
              private util: Util) {

    if(navParams.get('email')) {
      this.email = navParams.get('email');

      this.http.get(this.util.usuariosRotaPrincipal + this.email)
        .map(res => res.json())
        .subscribe(data => {

          this.usuario.setCdUsuario(data[0].cd_usuario);
          this.usuario.setEmail(data[0].email);
          this.usuario.setDsNome(data[0].ds_nome);
          this.usuario.setDsSobreNome(data[0].ds_sobrenome);

          data[0].ds_nome ? this.nome = data[0].ds_nome : this.nome = '';
          data[0].ds_sobrenome ? this.sobrenome = data[0].ds_sobrenome : this.sobrenome = '';
          data[0].campo01 ? this.campo01 = data[0].campo01 : this.campo01 = '';
          data[0].campo02 ? this.campo02 = data[0].campo02 : this.campo02 = '';
          data[0].campo_real ? this.campo_real = new Number(data[0].campo_real) : this.campo_real = NaN;
          data[0].observacao ? this.observacao = data[0].observacao : this.observacao = '';

          console.log('get usuario: ', data);
      });

    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileUserPage');
  }

  salvarUsuario() {

    this.usuario.setDsNome(this.nome);
    this.usuario.setDsSobreNome(this.sobrenome);
    this.usuario.setEmail(this.email);
    this.usuario.setCampo01(this.campo01);
    this.usuario.setCampo02(this.campo02);
    this.usuario.setCampoReal(this.campo_real);
    this.usuario.setObservacao(this.observacao);

    let headers = new Headers(
      {
        'Content-Type' : 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
  
      if (this.usuario.getCdUsuario()) {
  
        this.http.patch(this.util.usuariosRotaPrincipal + this.usuario.getCdUsuario(), 
                        this.usuario, 
                        options)
        .toPromise()
        .then(data => {
          console.log('API Response : ', data.json());
          this.util.msgAlert('Usuario atualizado com sucesso!');
          this.navCtrl.setRoot(HomePage);
        }).catch(error => {
          console.error('API Error : ', error.status);
          console.error('API Error : ', JSON.stringify(error));
          this.util.msgAlert('Erro ao atualizar o usuario!');
        });
  
      }

  }

}
