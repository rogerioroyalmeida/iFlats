import { Flat } from './flat';

export class FlatGeral extends Flat { 

    private codigoFlatGeral: number;
    private nome: string;
    private codigoFlat: number;
    
    private dtCadastroFlatGeral: Date;
    private cdUsuarioCadastroFlatGeral: number;

    private dtAlteracaoFlatGeral: Date;
    private cdUsuarioAlteracaoFlatGeral: number;

    private snAtivoFlatGeral: string;

    public getCodigoFlatGeral() {
        return this.codigoFlatGeral;
    }

    public getNome() {
        return this.nome;
    }

    public setNome(nome: string) {
        this.nome = nome;
    }

    public getCodigoFlat() {
        return this.codigoFlat;
    }

    public getDtCadastroFlatGeral() {
        return this.dtCadastroFlatGeral;
    }

    public setDtCadastroFlatGeral(dtCadastroFlatGeral: Date) {
        this.dtCadastroFlatGeral = dtCadastroFlatGeral;
    }

    public getCdUsuarioCadastroFlatGeral() {
        return this.cdUsuarioCadastroFlatGeral;
    }

    public setCdUsuarioCadastroFlatGeral(cdUsuarioCadastroFlatGeral: number) {
        this.cdUsuarioCadastroFlatGeral = cdUsuarioCadastroFlatGeral;
    }

    public getDtAlteracaoFlatGeral() {
        return this.dtAlteracaoFlatGeral;
    }

    public setDtAlteracaoFlatGeral(dtAlteracaoFlatGeral: Date) {
        this.dtAlteracaoFlatGeral = dtAlteracaoFlatGeral;
    }

    public getCdUsuarioAlteracaoFlatGeral() {
        return this.cdUsuarioAlteracaoFlatGeral;
    }

    public setCdUsuarioAlteracaoFlatGeral(cdUsuarioAlteracaoFlatGeral: number) {
        this.cdUsuarioAlteracaoFlatGeral = cdUsuarioAlteracaoFlatGeral;
    }

    public getSnAtivoFlatGeral() {
        return this.snAtivoFlatGeral;
    }

    public setSnAtivoFlatGeral(snAtivoFlatGeral: string) {
        this.snAtivoFlatGeral = snAtivoFlatGeral;
    }
}