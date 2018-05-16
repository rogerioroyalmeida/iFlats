export class Flat { 

    private codigo: number;
    private dsTituloAnuncio: string;
    private endereco: string;
    private numero: number;
    private complemento: string;
    private pais: string;
    private estado: string;
    private cidade: string;
    private bairro: string;
    private cep: string;
    private snCondominio: string;
    private nrQuartos: number;
    private nrBanheiros: number;
    private nrMaxPessoas: number;
    private vlBasicoDiaria: number;
    private nrAreaFlat: number;
    private dsFlat: string;
    private dsRegras: string;
    private snInternet: string;
    private snCriancas: string;
    private snMobilidadeReduzida: string;
    private snFumantes: string;
    private snAnimais: string;
    private snFestas: string;
    private snLongoPrazo: string;

    private dtCadastro: Date;
    private cdUsuarioCadastro: number;

    private dtAlteracao: Date;
    private cdUsuarioAlteracao: number;

    private snAtivo: string;

    public iconVisivel: boolean = false;
    public isFavorito: boolean = false;

    public setCodigo(codigo: number) {
        this.codigo = codigo;
    }

    public getCodigoFlat() {
        return this.codigo;
    }

    public setDsTituloAnuncio(dsTituloAnuncio: string) {
        this.dsTituloAnuncio = dsTituloAnuncio;
    }

    public getDsTituloAnuncio() {
        return this.dsTituloAnuncio;
    }

    public setEndereco(endereco: string) {
        this.endereco = endereco;
    }

    public getEndereco() {
        return this.endereco;
    }

    public setNumero(numero: number) {
        this.numero = numero;
    }

    public getNumero() {
        return this.numero;
    }

    public setComplemento(complemento: string) {
        this.complemento = complemento;
    }

    public getComplemento() {
        return this.complemento;
    }

    public setPais(pais: string) {
        this.pais = pais;
    }

    public getPais() {
        return this.pais;
    }

    public setEstado(estado: string) {
        this.estado = estado;
    }

    public getEstado() {
        return this.estado;
    }

    public setCidade(cidade: string) {
        this.cidade = cidade;
    }

    public getCidade() {
        return this.cidade;
    }

    public setBairro(bairro: string) {
        this.bairro = bairro;
    }

    public getBairro() {
        return this.bairro;
    }

    public setCep(cep: string) {
        this.cep = cep;
    }

    public getCep() {
        return this.cep;
    }

    public setSnCondominio(snCondominio: string) {
        this.snCondominio = snCondominio;
    }

    public getSnCondominio() {
        return this.snCondominio;
    }

    public setNrQuartos(nrQuartos: number) {
        this.nrQuartos = nrQuartos;
    }

    public getNrQuartos() {
        return this.nrQuartos;
    }

    public setNrBanheiros(nrBanheiros: number) {
        this.nrBanheiros = nrBanheiros;
    }

    public getNrBanheiros() {
        return this.nrBanheiros;
    }

    public setNrMaxPessoas(nrMaxPessoas: number) {
        this.nrMaxPessoas = nrMaxPessoas;
    }

    public getNrMaxPessoas() {
        return this.nrMaxPessoas;
    }

    public setVlBasicoDiaria(vlBasicoDiaria: number) {
        this.vlBasicoDiaria = vlBasicoDiaria;
    }

    public getVlBasicoDiaria() {
        return this.vlBasicoDiaria;
    }

    public setNrAreaFlat(nrAreaFlat: number) {
        this.nrAreaFlat = nrAreaFlat;
    }

    public getNrAreaFlat() {
        return this.nrAreaFlat;
    }

    public setDsFlat(dsFlat: string) {
        this.dsFlat = dsFlat;
    }

    public getDsFlat() {
        return this.dsFlat;
    }

    public setDsRegras(dsRegras: string) {
        this.dsRegras = dsRegras;
    }

    public getDsRegras() {
        return this.dsRegras;
    }

    public setSnInternet(snInternet: string) {
        this.snInternet = snInternet;
    }

    public getSnInternet() {
        return this.snInternet;
    }

    public setSnCriancas(snCriancas: string) {
        this.snCriancas = snCriancas;
    }

    public getSnCriancas() {
        return this.snCriancas;
    }

    public setSnMobilidadeReduzida(snMobilidadeReduzida: string) {
        this.snMobilidadeReduzida = snMobilidadeReduzida;
    }

    public getSnMobilidadeReduzida() {
        return this.snMobilidadeReduzida;
    }

    public setSnFumantes(snFumantes: string) {
        this.snFumantes = snFumantes;
    }

    public getSnFumantes() {
        return this.snFumantes;
    }

    public setSnAnimais(snAnimais: string) {
        this.snAnimais = snAnimais;
    }

    public getSnAnimais() {
        return this.snAnimais;
    }

    public setSnFestas(snFestas: string) {
        this.snFestas = snFestas;
    }

    public getSnFestas() {
        return this.snFestas;
    }

    public setSnLongoPrazo(snLongoPrazo: string) {
        this.snLongoPrazo = snLongoPrazo;
    }

    public getSnLongoPrazo() {
        return this.snLongoPrazo;
    }

    public setDtCadastro(dtCadastro: Date) {
        this.dtCadastro = dtCadastro;
    }

    public getDtCadastro() {
        return this.dtCadastro;
    }

    public setCdUsuarioCadastro(cdUsuarioCadastro: number) {
        this.cdUsuarioCadastro = cdUsuarioCadastro;
    }

    public getCdUsuarioCadastro() {
        return this.cdUsuarioCadastro;
    }

    public setDtAlteracao(dtAlteracao: Date) {
        this.dtAlteracao = dtAlteracao;
    }

    public getDtAlteracao() {
        return this.dtAlteracao;
    }

    public setCdUsuarioAlteracao(cdUsuarioAlteracao: number) {
        this.cdUsuarioAlteracao = cdUsuarioAlteracao;
    }

    public getCdUsuarioAlteracao() {
        return this.cdUsuarioAlteracao;
    }

    public setSnAtivo(snAtivo: string) {
        this.snAtivo = snAtivo;
    }

    public getSnAtivo() {
        return this.snAtivo;
    }
}