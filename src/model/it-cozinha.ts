export class ItCozinha { 

    private cd_itemcozinha: number;
    private ds_itemcozinha: string;
    private dt_mov: Date;
    
    private observacao: string;
    private valor: number;

    private campo01: string;
    private campo02: string;

    private campo03: string;
    private campo04: string;

    public iconVisivel: boolean = false;
    public checado: boolean = false;

    public getCdItemcozinha() {
        return this.cd_itemcozinha;
    }

    public setCdItemcozinha(cd_itemcozinha: number) {
        this.cd_itemcozinha = cd_itemcozinha;
    }

    public getDsItemcozinha() {
        return this.ds_itemcozinha;
    }

    public setDsItemcozinha(ds_itemcozinha: string) {
        this.ds_itemcozinha = ds_itemcozinha;
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