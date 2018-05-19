import { Pessoa } from './pessoa';

export class Usuario extends Pessoa { 

  private cd_usuario: number;
  private senha: string;
  private email: string;
  private campo01: string;
  private campo02: string;
  private campo_real: Number;
  private observacao: string;
  private imagem: string;

  public getCdUsuario() {
    return this.cd_usuario;
  }

  public setCdUsuario(cd_usuario: number) {
      this.cd_usuario = cd_usuario;
  }

  public getEmail() {
    return this.email;
  }

  public setEmail(email: string) {
    this.email = email;
  }

  public getSenha() {
    return this.senha;
  }

  public setSenha(senha: string) {
    this.senha = senha;
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

  public getCampoReal() {
    return this.campo_real;
  }

  public setCampoReal(campo_real: Number) {
    this.campo_real = campo_real;
  }

  public getObservacao() {
    return this.observacao;
  }

  public setObservacao(observacao: string) {
    this.observacao = observacao;
  }

  public getImagem() {
    return this.imagem;
  }

  public setImagem(imagem: string) {
    this.imagem = imagem;
  }

}
  