import { Flat } from './flat';

export class FlatEnt extends Flat { 

    private codigoFlatEnt: number;
    private nome: string;
    
    private dtCadastroFlatEnt: Date;
    private cdUsuarioCadastroFlatEnt: number;

    private dtAlteracaoFlatEnt: Date;
    private cdUsuarioAlteracaoFlatEnt: number;

    private snAtivoFlatEnt: string;

    public getCodigoFlatEnt() {
        return this.codigoFlatEnt;
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

    public getDtCadastroFlatEnt() {
        return this.dtCadastroFlatEnt;
    }

    public setDtCadastroFlatEnt(dtCadastroFlatEnt: Date) {
        this.dtCadastroFlatEnt = dtCadastroFlatEnt;
    }

    public getCdUsuarioCadastroFlatEnt() {
        return this.cdUsuarioCadastroFlatEnt;
    }

    public setCdUsuarioCadastroFlatEnt(cdUsuarioCadastroFlatEnt: number) {
        this.cdUsuarioCadastroFlatEnt = cdUsuarioCadastroFlatEnt;
    }

    public getDtAlteracaoFlatEnt() {
        return this.dtAlteracaoFlatEnt;
    }

    public setDtAlteracaoFlatEnt(dtAlteracaoFlatEnt: Date) {
        this.dtAlteracaoFlatEnt = dtAlteracaoFlatEnt;
    }

    public getCdUsuarioAlteracaoFlatEnt() {
        return this.cdUsuarioAlteracaoFlatEnt;
    }

    public setCdUsuarioAlteracaoFlatEnt(cdUsuarioAlteracaoFlatEnt: number) {
        this.cdUsuarioAlteracaoFlatEnt = cdUsuarioAlteracaoFlatEnt;
    }

    public getSnAtivoFlatEnt() {
        return this.snAtivoFlatEnt;
    }

    public setSnAtivoFlatEnt(snAtivoFlatEnt: string) {
        this.snAtivoFlatEnt = snAtivoFlatEnt;
    }
}