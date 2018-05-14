import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../providers/login/login-service';
import { Util } from '../../util/utils';

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
    private loginService: LoginService,
    private util: Util) {
  }

  resetPassword() {
    if (this.form.form.valid) {

      this.loginService.resetPassword(this.userEmail)
        .then(() => {
          this.util.msgAlert('Solicitação foi enviada para o seu e-mail.')

          this.navCtrl.pop();
        })
        .catch((error: any) => {
          if (error.code == 'auth/invalid-email') {
            this.util.msgAlert('O e-mail digitado não é valido.');
          } else if (error.code == 'auth/user-not-found') {
            this.util.msgAlert('O usuário não foi encontrado.');
          }
        });
    }
  }

}
