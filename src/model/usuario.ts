import { Pessoa } from './pessoa';

export class Usuario extends Pessoa { 

  private cd_usuario: number;

  public getCdUsuario() {
    return this.cd_usuario;
  }

  public setCdUsuario(cd_usuario: number) {
      this.cd_usuario = cd_usuario;
  }

}
  