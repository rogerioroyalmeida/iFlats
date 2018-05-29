export class SolicReserva { 

    private cd_solic_reserva: number;
    private cd_flat: number;
    private cd_usuario: number;
    private cd_usuario_responsavel: number;
    private dt_inicial: string;
    private dt_final: string;
    private nr_dias: number;
    private nr_pessoas: number;
    private vl_diaria: number;
    private vl_entrada: number;
    private vl_total: number;
    private status: string;

    public getCdSolicReserva() {
        return this.cd_solic_reserva;
    }

    public setCdSolicReserva(cd_solic_reserva: number) {
        this.cd_solic_reserva = cd_solic_reserva;
    }

    public getCdFlat() {
        return this.cd_flat;
    }

    public setCdFlat(cd_flat: number) {
        this.cd_flat = cd_flat;
    }

    public getCdUsuario() {
        return this.cd_usuario;
    }

    public setCdUsuario(cd_usuario: number) {
        this.cd_usuario = cd_usuario;
    }

    public getCdUsuarioResponsavel() {
        return this.cd_usuario_responsavel;
    }

    public setCdUsuarioResponsavel(cd_usuario_responsavel: number) {
        this.cd_usuario_responsavel = cd_usuario_responsavel;
    }

    public getDtInicial() {
        return this.dt_inicial;
    }

    public setDtInicial(dt_inicial: string) {
        this.dt_inicial = dt_inicial;
    }

    public getDtFinal() {
        return this.dt_final;
    }

    public setDtFinal(dt_final: string) {
        this.dt_final = dt_final;
    }

    public getNrDias() {
        return this.nr_dias;
    }

    public setNrDias(nr_dias: number) {
        this.nr_dias = nr_dias;
    }

    public getNrPessoas() {
        return this.nr_pessoas;
    }

    public setNrPessoas(nr_pessoas: number) {
        this.nr_pessoas = nr_pessoas;
    }

    public getVlDiaria() {
        return this.vl_diaria;
    }

    public setVlDiaria(vl_diaria: number) {
        this.vl_diaria = vl_diaria;
    }

    public getVlEntrada() {
        return this.vl_entrada;
    }

    public setVlEntrada(vl_entrada: number) {
        this.vl_entrada = vl_entrada;
    }

    public getVlTotal() {
        return this.vl_total;
    }

    public setVlTotal(vl_total: number) {
        this.vl_total = vl_total;
    }

    public getStatus() {
        return this.status;
    }

    public setStatus(status: string) {
        this.status = status;
    }
}