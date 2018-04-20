import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../model/usuario';
import { LoginService } from '../../providers/login/login-service';
import { HomePage } from '../home/home';

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
    private alertCtrl: AlertController,
    private loginService: LoginService) {
  }

  createAccount() {
    if (this.form.form.valid) {

      this.loginService.createUser(this.usuario)
        .then((user: any) => {
          user.sendEmailVerification();

          this.msgAlert('Usuário criado com sucesso.');

          this.navCtrl.setRoot(HomePage);
        })
        .catch((error: any) => {
          if (error.code  == 'auth/email-already-in-use') {
            this.msgAlert('O e-mail digitado já está em uso.');
          } else if (error.code  == 'auth/invalid-email') {
            this.msgAlert('O e-mail digitado não é valido.');
          } else if (error.code  == 'auth/operation-not-allowed') {
            this.msgAlert('Não está habilitado criar usuários.');
          } else if (error.code  == 'auth/weak-password') {
            this.msgAlert('A senha digitada é muito fraca.');
          }
        });
    }
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
