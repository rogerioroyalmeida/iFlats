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
import { CadItGeralPage } from '../pages/cad-it-geral/cad-it-geral';
import { CadItCozinhaPage } from '../pages/cad-it-cozinha/cad-it-cozinha';
import { Util } from '../util/utils';
import { BuscaFlatsPage } from '../pages/busca-flats/busca-flats';
import { ListFavoritosPage } from '../pages/list-favoritos/list-favoritos';
import { EnviaMensagemFlatPage } from '../pages/envia-mensagem-flat/envia-mensagem-flat';
import { RecebeMensagemFlatPage } from '../pages/recebe-mensagem-flat/recebe-mensagem-flat';
import { EmojiProvider } from '../providers/emoji';
import { HttpClientModule } from '@angular/common/http';
import { EmojiPickerComponentModule } from '../components/emoji-picker/emoji-picker.module';
import { RelativeTime } from '../pipes/relative-time';
import { CadItEntretenimentoPage } from '../pages/cad-it-entretenimento/cad-it-entretenimento';
import { SolicReservaPage } from '../pages/solic-reserva/solic-reserva';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { ListSolicRealizPage } from '../pages/list-solic-realiz/list-solic-realiz';
import { DetalheReservaPage } from '../pages/detalhe-reserva/detalhe-reserva';
import { CadItCriancaPage } from '../pages/cad-it-crianca/cad-it-crianca';
import { CadItInstalacaoPage } from '../pages/cad-it-instalacao/cad-it-instalacao';
import { CadServicoPage } from '../pages/cad-servico/cad-servico';
import { CadEquipamentoPage } from '../pages/cad-equipamento/cad-equipamento';

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
    ProfileUserPage,
    CadItGeralPage,
    CadItCozinhaPage,
    BuscaFlatsPage,
    ListFavoritosPage,
    EnviaMensagemFlatPage,
    RecebeMensagemFlatPage,
    RelativeTime,
    CadItEntretenimentoPage,
    SolicReservaPage,
    ListSolicRealizPage,
    DetalheReservaPage,
    CadItCriancaPage,
    CadServicoPage,
    CadItInstalacaoPage,
    CadEquipamentoPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    EmojiPickerComponentModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    BrMaskerModule
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
    ProfileUserPage,
    CadItGeralPage,
    CadItCozinhaPage,
    BuscaFlatsPage,
    ListFavoritosPage,
    EnviaMensagemFlatPage,
    RecebeMensagemFlatPage,
    CadItEntretenimentoPage,
    SolicReservaPage,
    ListSolicRealizPage,
    DetalheReservaPage,
    CadItCriancaPage,
    CadServicoPage,
    CadItInstalacaoPage,
    CadEquipamentoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginService,
    Util,
    EmojiProvider
  ]
})
export class AppModule {}
