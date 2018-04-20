import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../providers/login/login-service';

@IonicPage()
@Component({
  selector: 'page-resetsenha',
  templateUrl: 'resetsenha.html'
})
export class ResetsenhaPage {
  userEmail: string = '';
  @ViewChild('form') form: NgForm;

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private loginService: LoginService) {
  }

  resetPassword() {
    if (this.form.form.valid) {

      this.loginService.resetPassword(this.userEmail)
        .then(() => {
          this.msgAlert('Solicitação foi enviada para o seu e-mail.')

          this.navCtrl.pop();
        })
        .catch((error: any) => {
          if (error.code == 'auth/invalid-email') {
            this.msgAlert('O e-mail digitado não é valido.');
          } else if (error.code == 'auth/user-not-found') {
            this.msgAlert('O usuário não foi encontrado.');
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
