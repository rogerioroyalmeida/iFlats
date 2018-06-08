export class FlatInst { 

    private cd_flat: number;
    private cd_itinstalacao: number;
  
    public getCdFlat() {
        return this.cd_flat;
    }

    public setCdFlat(cd_flat : number) {
        this.cd_flat = cd_flat;
    }

    public getCdItInstalacao() {
        return this.cd_itinstalacao;
    }

    public setCdItInstalacao(cd_itinstalacao: number) {
        this.cd_itinstalacao = cd_itinstalacao;
    }

}