export class Mensagem {
    cd_mensagem: number;
    cd_flat: number;
    ds_mensagem: string;
    anexo_01: string;
    cd_usuario_emissario: number;
    nm_usuario_emissario: string;
    cd_usuario_destinatario: number;
    nm_usuario_destinatario: string;
    dt_mensagem: Date;
    time: number | string;
    anexo_02: string;
    status: string;
    status2: string;

    public getCdMensagem() {
        return this.cd_mensagem;
    }

    public getCdFlat() {
        return this.cd_flat;
    }

    public setCdFlat(cd_flat: number) {
        this.cd_flat = cd_flat;
    }

    public getDsMensagem() {
        return this.ds_mensagem;
    }

    public setDsMensagem(ds_mensagem: string) {
        this.ds_mensagem = ds_mensagem;
    }

    public getAnexo01() {
        return this.anexo_01;
    }

    public setAnexo01(anexo_01: string) {
        this.anexo_01 = anexo_01;
    }

    public getCdUsuarioEmissario() {
        return this.cd_usuario_emissario;
    }

    public setCdUsuarioEmissario(cd_usuario_emissario: number) {
        this.cd_usuario_emissario = cd_usuario_emissario;
    }

    public getNmUsuarioEmissario() {
        return this.nm_usuario_emissario;
    }

    public setNmUsuarioEmissario(nm_usuario_emissario: string) {
        this.nm_usuario_emissario = nm_usuario_emissario;
    }

    public getCdUsuarioDestinatario() {
        return this.cd_usuario_destinatario;
    }

    public setCdUsuarioDestinatario(cd_usuario_destinatario: number) {
        this.cd_usuario_destinatario = cd_usuario_destinatario;
    }

    public getNmUsuarioDestinatario() {
        return this.nm_usuario_destinatario;
    }

    public setNmUsuarioDestinatario(nm_usuario_destinatario: string) {
        this.nm_usuario_destinatario = nm_usuario_destinatario;
    }

    public getDtMensagem() {
        return this.dt_mensagem;
    }

    public setDtMensagem(dt_mensagem: Date) {
        this.dt_mensagem = dt_mensagem;
    }

    public getTime() {
        return this.time;
    }

    public setTime(time: number) {
        this.time = time;
    }

    public getAnexo02() {
        return this.anexo_02;
    }

    public setAnexo02(anexo_02: string) {
        this.anexo_02 = anexo_02;
    }

    public getStatus() {
        return this.status;
    }

    public setStatus(status: string) {
        this.status = status;
    }
}