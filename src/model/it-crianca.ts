import { Flat } from './flat';

export class ItCrianca { 

    private cd_itcrianca: number;
    private ds_itcrianca: string;
    private dt_movimentacao: Date;
    
    private observacao: string;
    private valor: number;

    private campo01: string;
    private campo02: string;
    private campo03: string;
    private campo04: string;


    private dt_cadastro: Date;

    public iconVisivel: boolean = false;
    public checado: boolean = false;

    public getCdItemcrianca() {
        return this.cd_itcrianca;
    }

    public setCdItemcrianca(cd_itcrianca: number) {
        this.cd_itcrianca = cd_itcrianca;
    }

    public getDsItemcrianca() {
        return this.ds_itcrianca;
    }

    public setDsItemcrianca(ds_itcrianca: string) {
        this.ds_itcrianca = ds_itcrianca;
    }

    public getDtMov() {
        return this.dt_movimentacao;
    }
   
    public setDtMov(dt_movimentacao: Date) {
        this.dt_movimentacao = dt_movimentacao;
    }


    public getDtCad() {
        return this.dt_cadastro;
    }

    public setDtCad(dt_cadastro: Date) {
        this.dt_cadastro = dt_cadastro;
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