import { Flat } from './flat';

export class FlatCoz extends Flat { 

    private codigoFlatCoz: number;
    private nome: string;
    private codigoFlat: number;
    
    private dtCadastroFlatCoz: Date;
    private cdUsuarioCadastroFlatCoz: number;

    private dtAlteracaoFlatCoz: Date;
    private cdUsuarioAlteracaoFlatCoz: number;

    private snAtivoFlatCoz: string;

    public getCodigoFlatCoz() {
        return this.codigoFlatCoz;
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

    public getDtCadastroFlatCoz() {
        return this.dtCadastroFlatCoz;
    }

    public setDtCadastroFlatCoz(dtCadastroFlatCoz: Date) {
        this.dtCadastroFlatCoz = dtCadastroFlatCoz;
    }

    public getCdUsuarioCadastroFlatCoz() {
        return this.cdUsuarioCadastroFlatCoz;
    }

    public setCdUsuarioCadastroFlatCoz(cdUsuarioCadastroFlatCoz: number) {
        this.cdUsuarioCadastroFlatCoz = cdUsuarioCadastroFlatCoz;
    }

    public getDtAlteracaoFlatCoz() {
        return this.dtAlteracaoFlatCoz;
    }

    public setDtAlteracaoFlatCoz(dtAlteracaoFlatCoz: Date) {
        this.dtAlteracaoFlatCoz = dtAlteracaoFlatCoz;
    }

    public getCdUsuarioAlteracaoFlatCoz() {
        return this.cdUsuarioAlteracaoFlatCoz;
    }

    public setCdUsuarioAlteracaoFlatCoz(cdUsuarioAlteracaoFlatCoz: number) {
        this.cdUsuarioAlteracaoFlatCoz = cdUsuarioAlteracaoFlatCoz;
    }

    public getSnAtivoFlatCoz() {
        return this.snAtivoFlatCoz;
    }

    public setSnAtivoFlatCoz(snAtivoFlatCoz: string) {
        this.snAtivoFlatCoz = snAtivoFlatCoz;
    }
}