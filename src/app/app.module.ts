import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CadastroUsuarioPage } from '../pages/cadastrousuario/cadastrousuario';
import { ResetsenhaPage } from '../pages/resetsenha/resetsenha';
import { ListFlatsPage } from '../pages/list-flats/list-flats';
import { CadFlatsPage } from '../pages/cad-flats/cad-flats';
import { LoginService } from '../providers/login/login-service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HttpModule } from '@angular/http';
import { ProfileUserPage } from '../pages/profile-user/profile-user';

const firebaseConfig = {
  apiKey: "AIzaSyCjVxmw5QdseWpzGFVuF4ZIPg6sIZagq0I",
  authDomain: "flats-mark1.firebaseapp.com",
  databaseURL: "https://flats-mark1.firebaseio.com",
  projectId: "flats-mark1",
  storageBucket: "flats-mark1.appspot.com",
  messagingSenderId: "680149944870"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroUsuarioPage,
    ResetsenhaPage,
    ListFlatsPage,
    CadFlatsPage,
    ProfileUserPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroUsuarioPage,
    ResetsenhaPage,
    ListFlatsPage,
    CadFlatsPage,
    ProfileUserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginService
  ]
})
export class AppModule {}
