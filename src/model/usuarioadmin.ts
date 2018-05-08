import { Pessoa } from './pessoa';

export class UsuarioAdmin extends Pessoa { 

    private qtdflats: number;
    private cnpj: number;

    public setQtdflats(qtdflats: number) {
        this.qtdflats = qtdflats;
    }

    public getQtdflats() {
        return this.qtdflats;
    }

    public setCnpj(cnpj: number) {
        this.cnpj = cnpj;
    }

    public getCnpj() {
        return this.cnpj;
    }

}