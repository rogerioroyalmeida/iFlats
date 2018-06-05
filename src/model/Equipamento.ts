
export class Equipamentos { 

    private cd_Equipamento: number;
    private ds_Equipamento: string;
    private dt_movimentacao: Date;
    
    private observacao: string;
    private valor: number;

    private campo01: string;
    private campo02: string;

    private campo03: string;
    private campo04: string;

    public iconVisivel: boolean = false;
    public checado: boolean = false;

    public getCdEquipamento() {
        return this.cd_Equipamento;
    }

    public setCdEquipamento(cd_Equipamento: number) {
        this.cd_Equipamento = cd_Equipamento;
    }

    public getDsEquipamento() {
        return this.ds_Equipamento;
    }

    public setDsEquipamento(ds_Equipamento: string) {
        this.ds_Equipamento = ds_Equipamento;
    }

    public getDtMovimentacao() {
        return this.dt_movimentacao;
    }

    public setDtMovimentacao(dt_movimentacao: Date) {
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