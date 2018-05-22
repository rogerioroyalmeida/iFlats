import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class Util {

    cdUsuarioLogado: string = '';
    usuarioIsAdm = false;

    dominio = 'http://192.168.15.7:3000/iflats/';

    usuariosRotaPrincipal = this.dominio + 'usuarios/';
    usuariosRotaLogin = this.usuariosRotaPrincipal + 'login';
    usuarioRotaGetByCodigo = this.usuariosRotaPrincipal + 'codigo/';

    cadFlatsRotaPrincipal = this.dominio + 'flats/';
    cadFlatsRotaGetByUsuario = this.cadFlatsRotaPrincipal + 'usuario/';
    cadFlatsRotaGetByFiltros = this.cadFlatsRotaPrincipal + 'filtros/';

    itGeralRotaPrincipal = this.dominio + 'itens_geral/';
    itGeralRotaGetByUsuario = this.itGeralRotaPrincipal + 'usuario/';

    flatItGeralRotaPrincipal = this.dominio + 'flats_itgeral/';

    itCozinhaRotaPrincipal = this.dominio + 'itens_cozinha/';
    itCozinhaRotaGetByUsuario = this.itCozinhaRotaPrincipal + 'usuario/';

    flatItCozinhaRotaPrincipal = this.dominio + 'flats_itcozinha/';

    itEntretenimentoRotaPrincipal = this.dominio + 'itens_entretenimento/';
    itEntretenimentoRotaGetByUsuario = this.itEntretenimentoRotaPrincipal + 'usuario/';

    flatItEntretenimentoRotaPrincipal = this.dominio + 'flats_itentretenimento/';

    favoritosRotaPrincipal = this.dominio + 'favoritos/';
    favoritosRotaGetByUsuario = this.favoritosRotaPrincipal + 'usuario/';
    favoritosRotaGetFlatsByUsuario = this.favoritosRotaGetByUsuario + 'flats/';

    mensagemRotaPrincipal = this.dominio + 'mensagens/';
    mensagemRotaGetByFlatUsuario = this.mensagemRotaPrincipal + 'flat/usuario/';

    flatsMensagensRotaGetByUsuario = this.cadFlatsRotaPrincipal + 'mensagens/';

    constructor(public toastCtrl: ToastController) {

    }

    msgAlert(text: string, duration?: number) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: duration?duration:1500,
            position: 'middle'
        });
        
        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });
        
        toast.present();
    }

}