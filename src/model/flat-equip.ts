import { Flat } from './flat';

export class FlatEquip extends Flat { 

    private codigoFlatEquip: number;
    private nome: string;
    
    private dtCadastroFlatEquip: Date;
    private cdUsuarioCadastroFlatEquip: number;

    private dtAlteracaoFlatEquip: Date;
    private cdUsuarioAlteracaoFlatEquip: number;

    private snAtivoFlatEquip: string;

    public getCodigoFlatEquip() {
        return this.codigoFlatEquip;
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

    public getDtCadastroFlatEquip() {
        return this.dtCadastroFlatEquip;
    }

    public setDtCadastroFlatEquip(dtCadastroFlatEquip: Date) {
        this.dtCadastroFlatEquip = dtCadastroFlatEquip;
    }

    public getCdUsuarioCadastroFlatEquip() {
        return this.cdUsuarioCadastroFlatEquip;
    }

    public setCdUsuarioCadastroFlatEquip(cdUsuarioCadastroFlatEquip: number) {
        this.cdUsuarioCadastroFlatEquip = cdUsuarioCadastroFlatEquip;
    }

    public getDtAlteracaoFlatEquip() {
        return this.dtAlteracaoFlatEquip;
    }

    public setDtAlteracaoFlatEquip(dtAlteracaoFlatEquip: Date) {
        this.dtAlteracaoFlatEquip = dtAlteracaoFlatEquip;
    }

    public getCdUsuarioAlteracaoFlatEquip() {
        return this.cdUsuarioAlteracaoFlatEquip;
    }

    public setCdUsuarioAlteracaoFlatEquip(cdUsuarioAlteracaoFlatEquip: number) {
        this.cdUsuarioAlteracaoFlatEquip = cdUsuarioAlteracaoFlatEquip;
    }

    public getSnAtivoFlatEquip() {
        return this.snAtivoFlatEquip;
    }

    public setSnAtivoFlatEquip(snAtivoFlatEquip: string) {
        this.snAtivoFlatEquip = snAtivoFlatEquip;
    }
}