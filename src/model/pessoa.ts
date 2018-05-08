export abstract class Pessoa { 

    private ds_nome: string;
    private ds_sobrenome: string;
    private cpf: number;
    private dtnascimento: Date;

    public getDsNome() {
        return this.ds_nome;
    }
  
    public setDsNome(ds_nome: string) {
        this.ds_nome = ds_nome;
    }

    public getDsSobreNome() {
        return this.ds_sobrenome;
    }
  
    public setDsSobreNome(ds_sobrenome: string) {
        this.ds_sobrenome = ds_sobrenome;
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