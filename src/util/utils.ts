import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class Util {

    cdUsuarioLogado: string = '';

    dominio = 'http://192.168.15.8:3000/iflats/';

    usuariosRotaPrincipal = this.dominio + 'usuarios/';
    usuariosRotaLogin = this.usuariosRotaPrincipal + 'login';

    cadFlatsRotaPrincipal = this.dominio + 'flats/';
    cadFlatsRotaGetByUsuario = this.cadFlatsRotaPrincipal + 'usuario/';
    cadFlatsRotaGetByFiltros = this.cadFlatsRotaPrincipal + 'filtros/';

    itGeralRotaPrincipal = this.dominio + 'itens_geral/';
    itGeralRotaGetByUsuario = this.itGeralRotaPrincipal + 'usuario/';

    flatItGeralRotaPrincipal = this.dominio + 'flats_itgeral/';

    itCozinhaRotaPrincipal = this.dominio + 'itens_cozinha/';
    itCozinhaRotaGetByUsuario = this.itCozinhaRotaPrincipal + 'usuario/';

    flatItCozinhaRotaPrincipal = this.dominio + 'flats_itcozinha/';

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