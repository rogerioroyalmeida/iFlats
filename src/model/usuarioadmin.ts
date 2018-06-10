import { Pessoa } from './pessoa';

export class UsuarioAdmin extends Pessoa { 

    private qtdflats: number;
    private cd_usuario: number;

    public getCdUsuario() {
        return this.cd_usuario;
    }

    public setCdUsuario(cd_usuario: number) {
        this.cd_usuario = cd_usuario;
    }

    public setQtdflats(qtdflats: number) {
        this.qtdflats = qtdflats;
    }

    public getQtdflats() {
        return this.qtdflats;
    }

}