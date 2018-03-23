import { Pessoa } from './pessoa';

export class Usuario extends Pessoa { 

    private email: string;
    private senha: string;

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


    // Gets e Sets referentes à classe pai: Pessoa
    public getCodigo() {
      return super.getCodigo();
    }

    public getNome() {
      return super.getNome();
    }

    public setNome(nome: string) {
      super.setNome(nome);
    }

    public getSobrenome() {
      return super.getSobrenome();
    }

    public setSobrenome(sobrenome: string) {
      super.setSobrenome(sobrenome);
    }

    public getCpf() {
      return super.getCpf();
    }

    public setCpf(cpf: number) {
      super.setCpf(cpf);
    }

    public getDtnascimento() {
      return super.getDtnascimento();
    }

    public setDtnascimento(dtnascimento: Date) {
      super.setDtnascimento(dtnascimento);
    }

  }
  