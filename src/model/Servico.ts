import { Flat } from './flat';

export class Servico extends Flat { 

    private cd_Servico: number;
    private ds_Servico: string;
    private dt_mov: Date;
    
    private observacao: string;
    private valor: number;

    private campo01: string;
    private campo02: string;

    private campo03: string;
    private campo04: string;

    public iconVisivel: boolean = false;
    public checado: boolean = false;

    public getCdServico() {
        return this.cd_Servico;
    }

    public setCdServico(cd_Servico: number) {
        this.cd_Servico = cd_Servico;
    }

    public getDsServico() {
        return this.ds_Servico;
    }

    public setDsServico(ds_Servico: string) {
        this.ds_Servico = ds_Servico;
    }

    public getDtMov() {
        return this.dt_mov;
    }

    public setDtMov(dt_mov: Date) {
        this.dt_mov = dt_mov;
    }

    public getObservacao() {
        return this.observacao;
    }

    public setObservacao(observacao: string) {
        this.observacao = observacao;
    }

    public getValor() {
        return this.valor;
    }

    public setValor(valor: number) {
        this.valor = valor;
    }

    public getCampo01() {
        return this.campo01;
    }

    public setCampo01(campo01: string) {
        this.campo01 = campo01;
    }

    public getCampo02() {
        return this.campo02;
    }

    public setCampo02(campo02: string) {
        this.campo02 = campo02;
    }

    public getCampo03() {
        return this.campo03;
    }

    public setCampo03(campo03: string) {
        this.campo03 = campo03;
    }

    public getCampo04() {
        return this.campo04;
    }

    public setCampo04(campo04: string) {
        this.campo04 = campo04;
    }
}