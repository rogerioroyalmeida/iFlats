import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../model/usuario';
import { LoginService } from '../../providers/login/login-service';
import { HomePage } from '../home/home';
import { Util } from '../../util/utils';

@IonicPage()
@Component({
  selector: 'page-cadastrousuario',
  templateUrl: 'cadastrousuario.html',
})
export class CadastroUsuarioPage {
  usuario: Usuario = new Usuario();
  @ViewChild('form') form: NgForm;

  constructor(
    public navCtrl: NavController,
    private loginService: LoginService,
    public http: Http,
    private util: Util) {
  }

  createAccount() {
    if (this.form.form.valid) {

      this.loginService.createUser(this.usuario)
        .then((user: any) => {
          user.sendEmailVerification();

          this.postUsuario();

          this.util.msgAlert('Usuário criado com sucesso.');

          this.navCtrl.setRoot(HomePage);
        })
        .catch((error: any) => {
          if (error.code  == 'auth/email-already-in-use') {
            this.util.msgAlert('O e-mail digitado já está em uso.');
          } else if (error.code  == 'auth/invalid-email') {
            this.util.msgAlert('O e-mail digitado não é valido.');
          } else if (error.code  == 'auth/operation-not-allowed') {
            this.util.msgAlert('Não está habilitado criar usuários.');
          } else if (error.code  == 'auth/weak-password') {
            this.util.msgAlert('A senha digitada é muito fraca.');
          }
        });
    }
  }

  postUsuario() {

    let headers = new Headers(
    {
      'Content-Type' : 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(this.util.usuariosRotaPrincipal, 
                    this.usuario, 
                    options)
              .toPromise()
              .then(data => {
              console.log('API Response : ', data.json());
              }).catch(error => {
              console.error('API Error : ', error.status);
              console.error('API Error : ', JSON.stringify(error));
              });

  }

}
