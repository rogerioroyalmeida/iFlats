import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../model/usuario';
import { LoginService } from '../../providers/login/login-service';
import { HomePage } from '../home/home';
import { ResetsenhaPage } from '../resetsenha/resetsenha';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Util } from '../../util/utils';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usuario: Usuario = new Usuario();
  
  @ViewChild('form') form: NgForm;

  constructor(
    public navCtrl: NavController,
    private util: Util,
    private loginService: LoginService,
    public http: Http) {
  }

  resetPassword() {
    this.navCtrl.push(ResetsenhaPage);
  }

  signIn() {
    if (this.form.form.valid) {

      this.loginService.signIn(this.usuario)
        .then(() => {

          this.loginBanco(this.usuario.getEmail());

          this.navCtrl.setRoot(HomePage);
        })
        .catch((error: any) => {
          if (error.code == 'auth/invalid-email') {
            this.util.msgAlert('O e-mail digitado não é valido.');
          } else if (error.code == 'auth/user-disabled') {
            this.util.msgAlert('O usuário está desativado.');
          } else if (error.code == 'auth/user-not-found') {
            this.util.msgAlert('O usuário não foi encontrado.');
          } else if (error.code == 'auth/wrong-password') {
            this.util.msgAlert('A senha digitada não é valida.');
          }
        });
    }
  }

  loginBanco(email: string) {

    let headers = new Headers(
    {
      'Content-Type' : 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(this.util.usuariosRotaLogin, 
                  {email: email}, 
                    options)
    .toPromise()
    .then(data => {
      console.log('API Response : ', data.json()[0].cd_usuario);
      this.util.cdUsuarioLogado = data.json()[0].cd_usuario;
      this.util.msgAlert('Usuário logado com sucesso!');
    }).catch(error => {
      console.error('API Error : ', error.status);
      console.error('API Error : ', JSON.stringify(error));
      this.util.msgAlert('Não foi possível realizar o login!');
    });

  }
}
