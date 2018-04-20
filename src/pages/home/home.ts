import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginService } from '../../providers/login/login-service';
import { LoginPage } from '../login/login';
import { Usuario } from '../../model/usuario';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuario: Usuario = new Usuario();

  constructor(public navCtrl: NavController, private loginService: LoginService, private navParams: NavParams) {

    if(navParams.get('usuario')) {
      this.usuario = navParams.get('usuario');
    }

  }

  signOut() {
    this.loginService.signOut()
      .then(() => {
        this.navCtrl.setRoot(LoginPage);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
