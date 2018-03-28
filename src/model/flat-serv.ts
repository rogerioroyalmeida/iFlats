import { Flat } from './flat';

export class FlatServ extends Flat { 

    private codigoFlatServ: number;
    private nome: string;
    private codigoFlat: number;
    
    private dtCadastroFlatServ: Date;
    private cdUsuarioCadastroFlatServ: number;

    private dtAlteracaoFlatServ: Date;
    private cdUsuarioAlteracaoFlatServ: number;

    private snAtivoFlatServ: string;

    public getCodigoFlatServ() {
        return this.codigoFlatServ;
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

    public getDtCadastroFlatServ() {
        return this.dtCadastroFlatServ;
    }

    public setDtCadastroFlatServ(dtCadastroFlatServ: Date) {
        this.dtCadastroFlatServ = dtCadastroFlatServ;
    }

    public getCdUsuarioCadastroFlatServ() {
        return this.cdUsuarioCadastroFlatServ;
    }

    public setCdUsuarioCadastroFlatServ(cdUsuarioCadastroFlatServ: number) {
        this.cdUsuarioCadastroFlatServ = cdUsuarioCadastroFlatServ;
    }

    public getDtAlteracaoFlatServ() {
        return this.dtAlteracaoFlatServ;
    }

    public setDtAlteracaoFlatServ(dtAlteracaoFlatServ: Date) {
        this.dtAlteracaoFlatServ = dtAlteracaoFlatServ;
    }

    public getCdUsuarioAlteracaoFlatServ() {
        return this.cdUsuarioAlteracaoFlatServ;
    }

    public setCdUsuarioAlteracaoFlatServ(cdUsuarioAlteracaoFlatServ: number) {
        this.cdUsuarioAlteracaoFlatServ = cdUsuarioAlteracaoFlatServ;
    }

    public getSnAtivoFlatServ() {
        return this.snAtivoFlatServ;
    }

    public setSnAtivoFlatServ(snAtivoFlatServ: string) {
        this.snAtivoFlatServ = snAtivoFlatServ;
    }
}