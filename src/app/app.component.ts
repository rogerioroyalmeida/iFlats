import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginService } from '../providers/login/login-service';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ImoveisPage } from '../pages/imoveis/imoveis';

import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private auth: AngularFireAuth, private loginService: LoginService) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Principal', component: HomePage },
      { title: 'Meus Imóveis', component: ImoveisPage},
      { title: 'Sair', component: null }
    ];

    const authObserver = auth.authState.subscribe(user => {
      if (user) {
        this.rootPage = HomePage;
        authObserver.unsubscribe();
      } else {
        //this.rootPage = LoginPage;
        //authObserver.unsubscribe();
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

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.component) {
      this.nav.setRoot(page.component);
    } else {
      this.signOut();
    }
  }

  signOut() {
    this.loginService.signOut()
      .then(() => {
        this.nav.setRoot(LoginPage);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

