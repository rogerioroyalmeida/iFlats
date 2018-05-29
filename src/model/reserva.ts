export class Reserva { 

    private cd_reserva: number;
    private cd_solicitacao_reserva: number;
    private vl_restante: number;
    private observacao: string;

    public getCdReserva() {
        return this.cd_reserva;
    }

    public setCdReserva(cd_reserva: number) {
        this.cd_reserva = cd_reserva;
    }

    public getCdSolicitacaoReserva() {
        return this.cd_solicitacao_reserva;
    }

    public setCdSolicitacaoReserva(cd_solicitacao_reserva: number) {
        this.cd_solicitacao_reserva = cd_solicitacao_reserva;
    }

    public getVlRestante() {
        return this.vl_restante;
    }

    public setVlRestante(vl_restante: number) {
        this.vl_restante = vl_restante;
    }

    public getObservacao() {
        return this.observacao;
    }

    public setObservacao(observacao: string) {
        this.observacao = observacao;
    }
}