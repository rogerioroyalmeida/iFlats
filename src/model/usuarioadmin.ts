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

    // Gets e Sets referentes à classe pai: Pessoa
    public getCodigo() {
        return super.getCodigo();
    }

    public getNome() {
        return super.getNome();
    }

    public setNome(nome: string) {
        super.setNome(nome);
    }

    public getSobrenome() {
        return super.getSobrenome();
    }

    public setSobrenome(sobrenome: string) {
        super.setSobrenome(sobrenome);
    }

    public getCpf() {
        return super.getCpf();
    }

    public setCpf(cpf: number) {
        super.setCpf(cpf);
    }

    public getDtnascimento() {
        return super.getDtnascimento();
    }

    public setDtnascimento(dtnascimento: Date) {
        super.setDtnascimento(dtnascimento);
    }

}