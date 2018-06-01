export class ItEntretenimento { 

    private cd_itentretenimento: number;
    private ds_itentretenimento: string;
    private dt_movimentacao: Date;
    
    private observacao: string;
    private valor: number;

    private campo01: string;
    private campo02: string;

    private campo03: string;
    private campo04: string;

    public iconVisivel: boolean = false;
    public checado: boolean = false;

    public getCdItemEntretenimento() {
        return this.cd_itentretenimento;
    }

    public setCdItemEntretenimento(cd_itentretenimento: number) {
        this.cd_itentretenimento = cd_itentretenimento;
    }

    public getDsItemEntretenimento() {
        return this.ds_itentretenimento;
    }

    public setDsItemEntretenimento(ds_itentretenimento: string) {
        this.ds_itentretenimento = ds_itentretenimento;
    }

    public getDtMov() {
        return this.dt_movimentacao;
    }

    public setDtMov(dt_movimentacao: Date) {
        this.dt_movimentacao = dt_movimentacao;
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