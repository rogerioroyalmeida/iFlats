import { Flat } from './flat';

export class FlatInst extends Flat { 

    private codigoFlatInst: number;
    private nome: string;
    private codigoFlat: number;
    
    private dtCadastroFlatInst: Date;
    private cdUsuarioCadastroFlatInst: number;

    private dtAlteracaoFlatInst: Date;
    private cdUsuarioAlteracaoFlatInst: number;

    private snAtivoFlatInst: string;

    public getCodigoFlatInst() {
        return this.codigoFlatInst;
    }

    public getNome() {
        return this.nome;
    }

    public setNome(nome: string) {
        this.nome = nome;
    }

    public getCodigoFlat() {
        return super.getCodigoFlat();
    }

    public getDtCadastroFlatInst() {
        return this.dtCadastroFlatInst;
    }

    public setDtCadastroFlatInst(dtCadastroFlatInst: Date) {
        this.dtCadastroFlatInst = dtCadastroFlatInst;
    }

    public getCdUsuarioCadastroFlatInst() {
        return this.cdUsuarioCadastroFlatInst;
    }

    public setCdUsuarioCadastroFlatInst(cdUsuarioCadastroFlatInst: number) {
        this.cdUsuarioCadastroFlatInst = cdUsuarioCadastroFlatInst;
    }

    public getDtAlteracaoFlatInst() {
        return this.dtAlteracaoFlatInst;
    }

    public setDtAlteracaoFlatInst(dtAlteracaoFlatInst: Date) {
        this.dtAlteracaoFlatInst = dtAlteracaoFlatInst;
    }

    public getCdUsuarioAlteracaoFlatInst() {
        return this.cdUsuarioAlteracaoFlatInst;
    }

    public setCdUsuarioAlteracaoFlatInst(cdUsuarioAlteracaoFlatInst: number) {
        this.cdUsuarioAlteracaoFlatInst = cdUsuarioAlteracaoFlatInst;
    }

    public getSnAtivoFlatInst() {
        return this.snAtivoFlatInst;
    }

    public setSnAtivoFlatInst(snAtivoFlatInst: string) {
        this.snAtivoFlatInst = snAtivoFlatInst;
    }
}