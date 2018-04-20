import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../model/usuario';
import { LoginService } from '../../providers/login/login-service';
import { HomePage } from '../home/home';
import { ResetsenhaPage } from '../resetsenha/resetsenha';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  usuario: Usuario = new Usuario();
  email: any;
  senha: any;
  urlLogin = 'http://192.168.15.4:3000/iflats/usuarios/login';
  @ViewChild('form') form: NgForm;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private loginService: LoginService,
    public http: Http,
    private alertCtrl: AlertController) {
  }

  resetPassword() {
    this.navCtrl.push(ResetsenhaPage);
  }

  signIn() {
    if (this.form.form.valid) {
      this.loginService.signIn(this.usuario)
        .then(() => {
          this.email = this.usuario.getEmail();
          this.senha = this.usuario.getSenha();

          this.loginBanco(this.email, this.senha);

          this.navCtrl.setRoot(HomePage, {usuario: this.usuario});
        })
        .catch((error: any) => {
          let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
          if (error.code == 'auth/invalid-email') {
            toast.setMessage('O e-mail digitado não é valido.');
          } else if (error.code == 'auth/user-disabled') {
            toast.setMessage('O usuário está desativado.');
          } else if (error.code == 'auth/user-not-found') {
            toast.setMessage('O usuário não foi encontrado.');
          } else if (error.code == 'auth/wrong-password') {
            toast.setMessage('A senha digitada não é valida.');
          }
          toast.present();
        });
    }
  }

  loginBanco(email: string, senha: string) {

    let headers = new Headers(
      {
        'Content-Type' : 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
  
      this.http.post(this.urlLogin, 
                    {email: email,
                     senha: senha
                    }, 
                     options)
      .toPromise()
      .then(data => {
        console.log('API Response : ', data.json());
        this.msgAlert('Usuário logado com sucesso!');
      }).catch(error => {
        console.error('API Error : ', error.status);
        console.error('API Error : ', JSON.stringify(error));
        this.msgAlert('Não foi possível realizar o login!');
      });

  }

  msgAlert(text: string, title?: string, buttons?: string[]) {
    !buttons ? buttons = ['Ok']: buttons;
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: buttons
    });
    alert.present();
  }
}
