import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginService } from '../providers/login/login-service';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ListFlatsPage } from '../pages/list-flats/list-flats';

import { AngularFireAuth } from 'angularfire2/auth';
import { CadastroUsuarioPage } from '../pages/cadastrousuario/cadastrousuario';
import { ActionSheetController } from 'ionic-angular';
import { ProfileUserPage } from '../pages/profile-user/profile-user';
import { Usuario } from '../model/usuario';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = HomePage;

  pages: Array<{title: string, component: any}>;

  usuariologado:any = false;
  email:String;
  authObserver;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public auth: AngularFireAuth, private loginService: LoginService, public actionSheetCtrl: ActionSheetController) {

    this.initializeApp();

    this.authObserver = auth.authState.subscribe(user => {
      if (user) {
        this.email = user.email;
        this.usuariologado = true;
      } else {
        this.usuariologado = false;
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  home() {
    this.nav.setRoot(HomePage);
  }

  login() {
    //if(!this.usuariologado) {
      this.nav.push(LoginPage);
    //}
  }

  cadastre() {
    //if(!this.usuariologado) {
      this.nav.push(CadastroUsuarioPage);
    //}
  }

  logout() {
    this.loginService.signOut()
      .then(() => {
        alert('Sessão encerrada com sucesso.');
        this.nav.setRoot(HomePage);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  exibirAcoesUsuario() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Ações do Usuario',
      buttons: [
        {
          text: 'Painel de Flats',
          role: 'destructive',
          handler: () => {
            this.nav.push(ListFlatsPage);
          }
        },{
          text: 'Meu perfil',
          role: 'destructive',
          handler: () => {
            this.nav.push(ProfileUserPage, {email: this.email});
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}

