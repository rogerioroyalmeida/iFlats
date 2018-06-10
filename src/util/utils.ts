import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Usuario } from '../model/usuario';
import { UsuarioAdmin } from '../model/usuarioadmin';

@Injectable()
export class Util {

    cdUsuarioLogado: string = '';
    usuarioIsAdm = false;
    usuarioLogado: Usuario;
    usuarioAdmLogado: UsuarioAdmin;

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

    itCriancaRotaPrincipal = this.dominio + 'itens_crianca/';
    itCriancaRotaGetByUsuario = this.itCriancaRotaPrincipal + 'usuario/';

    flatItCriancaRotaPrincipal = this.dominio + 'flats_itcrianca/';

    itInstalacaoRotaPrincipal = this.dominio + 'itens_instalacao/';
    itInstalacaoRotaGetByUsuario = this.itInstalacaoRotaPrincipal + 'usuario/';

    flatItInstalacaoRotaPrincipal = this.dominio + 'flats_itinstalacao/';

    servicoRotaPrincipal = this.dominio + 'servico/';
    servicoRotaGetByUsuario = this.servicoRotaPrincipal + 'usuario/';

    flatItServicoRotaPrincipal = this.dominio + 'flats_itservico/';
    
    equipamentoRotaPrincipal = this.dominio + 'equipamento/';
    equipamentoRotaGetByUsuario = this.equipamentoRotaPrincipal + 'usuario/';

    flatItEquipamentoRotaPrincipal = this.dominio + 'flats_itequipamento/';

    flatItCozinhaRotaPrincipal = this.dominio + 'flats_itcozinha/';

    itEntretenimentoRotaPrincipal = this.dominio + 'itens_entretenimento/';
    itEntretenimentoRotaGetByUsuario = this.itEntretenimentoRotaPrincipal + 'usuario/';

    flatItEntretenimentoRotaPrincipal = this.dominio + 'flats_itentretenimento/';

    favoritosRotaPrincipal = this.dominio + 'favoritos/';
    favoritosRotaGetByUsuario = this.favoritosRotaPrincipal + 'usuario/';
    favoritosRotaGetFlatsByUsuario = this.favoritosRotaGetByUsuario + 'flats/';

    mensagemRotaPrincipal = this.dominio + 'mensagens/';
    mensagemRotaGetByFlat = this.mensagemRotaPrincipal + 'flat/';
    mensagemRotaGetByFlatUsuario = this.mensagemRotaGetByFlat + 'usuario/';

    flatsMensagensRotaGetByUsuarioEmissario = this.cadFlatsRotaPrincipal + 'mensagens/';

    solicReservaRotaPrincipal = this.dominio + 'solicitacao_reserva/';
    solicReservaRotaGetByUsuario = this.solicReservaRotaPrincipal + 'usuario/';
    solicReservaRotaGetByUsuarioResp = this.solicReservaRotaPrincipal + 'usuario_resp/';

    reservaRotaPrincipal = this.dominio + 'reserva/';
    reservaRotaGetByUser = this.reservaRotaPrincipal + 'usuario/';

    constructor(public toastCtrl: ToastController) {

    }

    msgAlert(text: string, duration?: number) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: duration?duration:3000,
            position: 'middle'
        });
        
        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });
        
        toast.present();
    }

    dateToDMY(dt: Date): string {
        var year, month, day;
        year = String(dt.getFullYear());
        month = String(dt.getMonth() + 1);
        if (month.length == 1) {
            month = "0" + month;
        }
        day = String(dt.getDate());
        if (day.length == 1) {
            day = "0" + day;
        }
        return year + "-" + month + "-" + day;
    }

}