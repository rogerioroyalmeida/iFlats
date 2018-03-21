import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../providers/login/usuario';
import { LoginService } from '../../providers/login/login-service';
import { HomePage } from '../home/home';
import { CadastroUsuarioPage } from '../cadastrousuario/cadastrousuario';
import { ResetsenhaPage } from '../resetsenha/resetsenha';

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
    private toastCtrl: ToastController,
    private loginService: LoginService) {
  }

  createAccount() {
    this.navCtrl.push(CadastroUsuarioPage);
  }

  resetPassword() {
    this.navCtrl.push(ResetsenhaPage);
  }

  signIn() {
    if (this.form.form.valid) {
      this.loginService.signIn(this.usuario)
        .then(() => {
          this.navCtrl.setRoot(HomePage);
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
}
