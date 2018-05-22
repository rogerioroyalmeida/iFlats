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
import { Util } from '../util/utils';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ListFavoritosPage } from '../pages/list-favoritos/list-favoritos';
import { BuscaFlatsPage } from '../pages/busca-flats/busca-flats';
import { Flat } from '../model/flat';

@Component({
  templateUrl: 'app.html',
  providers: [Util]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = HomePage;

  pages: Array<{title: string, component: any, visivel: boolean, ordem: number}>;

  usuariologado:any = false;
  email:String;
  authObserver;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen, 
              public auth: AngularFireAuth, 
              private loginService: LoginService, 
              public actionSheetCtrl: ActionSheetController, 
              private util: Util, 
              public http: Http) {

    this.initializeApp();

    this.authObserver = auth.authState.subscribe(user => {
      if (user) {

        this.http.get(this.util.usuariosRotaPrincipal + user.email)
          .map(res => res.json())
          .subscribe(data => {

            this.util.cdUsuarioLogado = data[0].cd_usuario;

            data[0].sn_adm == 'S' ? this.util.usuarioIsAdm = true : this.util.usuarioIsAdm = false;

            console.log('get usuario: ', data);
        });

        this.email = user.email;
        this.usuariologado = true;
        this.montarPaginasMenu();
      } else {
        this.usuariologado = false;
        this.montarPaginasMenu();
      }
    });

  }

  montarPaginasMenu() {
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Buscar flat', component: HomePage, visivel: true, ordem: 1 },
      { title: 'Meu perfil', component:  ProfileUserPage, visivel: this.usuariologado, ordem: 2 },
      { title: 'Login', component:  LoginPage, visivel: !this.usuariologado, ordem: 3 },
      { title: 'Cadastre-se', component:  CadastroUsuarioPage, visivel: !this.usuariologado, ordem: 4 },
      { title: 'Logout', component:  null, visivel: this.usuariologado, ordem: 5 }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.component) {
      if (page.ordem == 2) {
        this.exibirAcoesUsuario();
      } else {
        this.nav.setRoot(page.component);
      }
    } else {
      this.logout();

      this.montarPaginasMenu();
    }
  }

  logout() {
    this.loginService.signOut()
      .then(() => {
        this.util.msgAlert('Sessão encerrada com sucesso.');
        this.util.cdUsuarioLogado = '';
        this.util.usuarioIsAdm = false;
        this.nav.setRoot(HomePage);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  exibirAcoesUsuario() {

    let actions: Array<any> = new Array<any>();

    this.util.usuarioIsAdm ? actions.push(
      {
        text: 'Painel de Flats',
        role: 'destructive',
        handler: () => {
          this.nav.setRoot(ListFlatsPage);
        }
      }
    ) : null;

    actions.push(
      {
        text: 'Favoritos',
        role: 'destructive',
        handler: () => {
          this.nav.setRoot(ListFavoritosPage);
        }
      }
    );

    actions.push(
      {
        text: 'Meu perfil',
        role: 'destructive',
        handler: () => {
          this.nav.setRoot(ProfileUserPage, {email: this.email});
        }
      }
    );

    actions.push(
      {
        text: 'Mensagens',
        role: 'destructive',
        handler: () => {

          let listFlats: Array<Flat> = new Array<Flat>();

          this.http.get(this.util.flatsMensagensRotaGetByUsuario + this.util.cdUsuarioLogado)
          .map(res => res.json())
          .subscribe(data => {

            if (data) {

              listFlats = data;

              console.log('list flats_mensagens: ', data);

            }
          });

          if (listFlats)
            this.nav.setRoot(BuscaFlatsPage, {'listFlats': listFlats, 'tituloTela': 'Flats com mensagens'});
        }
      }
    );

    actions.push(
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    );

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Ações do usuário',
      buttons: actions
    });
    actionSheet.present();
  }
}

