import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginService } from '../../providers/login/login-service';
import { LoginPage } from '../login/login';
import { Usuario } from '../../model/usuario';
import { BuscaFlatsPage } from '../busca-flats/busca-flats';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuario: Usuario = new Usuario();
  dt_inicio: Date;
  dt_fim: Date;

  constructor(public navCtrl: NavController, private loginService: LoginService, private navParams: NavParams) {

    this.dt_inicio = new Date();
    this.dt_fim = new Date();

    if(navParams.get('usuario')) {
      this.usuario = navParams.get('usuario');
    }

  }

  buscarFlats() {
    this.navCtrl.push(BuscaFlatsPage);
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
