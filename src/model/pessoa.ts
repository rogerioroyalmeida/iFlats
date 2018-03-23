export abstract class Pessoa { 

    private codigo: number;
    private nome: string;
    private sobrenome: string;
    private cpf: number;
    private dtnascimento: Date;

    public getCodigo() {
        return this.codigo;
    }
  
    public setCodigo(codigo: number) {
        this.codigo = codigo;
    }

    public getNome() {
        return this.nome;
    }
  
    public setNome(nome: string) {
        this.nome = nome;
    }

    public getSobrenome() {
        return this.sobrenome;
    }
  
    public setSobrenome(sobrenome: string) {
        this.sobrenome = sobrenome;
    }

    public getCpf() {
        return this.cpf;
    }
  
    public setCpf(cpf: number) {
        this.cpf = cpf;
    }

    public getDtnascimento() {
        return this.dtnascimento;
    }
  
    public setDtnascimento(dtnascimento: Date) {
        this.dtnascimento = dtnascimento;
    }
}