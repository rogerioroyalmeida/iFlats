export abstract class Pessoa { 

    private ds_nome: string;
    private ds_sobrenome: string;
    private email: string;
    private senha: string;
    private campo01: string;
    private campo02: string;
    private campo_real: Number;
    private observacao: string;

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
}