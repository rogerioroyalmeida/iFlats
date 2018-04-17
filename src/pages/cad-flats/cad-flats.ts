import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Flat } from '../../model/flat';
import { FlatGeral } from '../../model/flat-geral';
import { FlatCoz } from '../../model/flat-coz';
import { FlatEnt } from '../../model/flat-ent';
import { FlatInst } from '../../model/flat-inst';
import { FlatEquip } from '../../model/flat-equip';
import { FlatServ } from '../../model/flat-serv';
import { ListFlatsPage } from '../list-flats/list-flats';

@IonicPage()
@Component({
  selector: 'page-cad-flats',
  templateUrl: 'cad-flats.html',
})
export class CadFlatsPage {

  codigo: number;
  dsTituloAnuncio: string;
  endereco: string;
  numero: number;
  complemento: string;
  pais: string;
  estado: string;
  cidade: string;
  bairro: string;
  cep: string;
  snCondominio: string;
  nrQuartos: number;
  nrBanheiros: number;
  nrMaxPessoas: number;
  vlBasicoDiaria: number;
  nrAreaFlat: number;
  dsFlat: string;
  dsRegras: string;
  snInternet: string;
  snCriancas: string;
  snMobilidadeReduzida: string;
  snFumantes: string;
  snAnimais: string;
  snFestas: string;
  snLongoPrazo: string;

  /*

  */



  flat: Flat = new Flat();
  listGeral = new Array<FlatGeral>();
  listCozinha = new Array<FlatCoz>();
  listEnt = new Array<FlatEnt>();
  listInst = new Array<FlatInst>();
  listEquip = new Array<FlatEquip>();
  listServ = new Array<FlatServ>();
  newItem: string = "";
  focNomeGeral = false;
  focNomeCozinha = false;
  focNomeEnt = false;
  focNomeInst = false;
  focNomeEquip = false;
  focNomeServ = false;

  exibeCaracteristica = false;
  textoInformacoes = 'Mostrar mais';

  urlPost = 'http://192.168.15.3:3000/iflats/flats';
  urlPatch = 'http://192.168.15.3:3000/iflats/flats/';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: Http) {
    
    let f = this.navParams.get('item');

    if (f) {
      this.codigo = f.cd_flat;
      this.dsTituloAnuncio = f.ds_titulo_anuncio;
      this.endereco = f.ds_endereco;
      this.numero = f.nr_endereco;
      this.complemento = f.ds_complemento;
      this.pais = f.ds_pais;
      this.estado = f.ds_estado;
      this.cidade = f.ds_cidade;
      this.bairro = f.ds_bairro;
      this.cep = f.nr_cep;
      this.snCondominio = f.sn_condominio;
      this.nrQuartos = f.nr_quartos;
      this.nrBanheiros = f.nr_banheiros;
      this.nrMaxPessoas = f.nr_max_pessoas;
      this.vlBasicoDiaria = f.vl_basico_diaria;
      this.nrAreaFlat = f.nr_area_flat;
      this.dsFlat = f.ds_flat;
      this.dsRegras = f.ds_regras;
      this.snInternet = f.sn_internet;
      this.snCriancas = f.sn_criancas;
      this.snMobilidadeReduzida = f.sn_mobilidade_reduzida;
      this.snFumantes = f.sn_fumantes;
      this.snAnimais = f.sn_animais;
      this.snFestas = f.sn_festas;
      this.snLongoPrazo = f.sn_longo_prazo;
    }

  }

  // Saving function
  saveNewGeral(): void {
    this.newItem = "";
    let flatGeral = new FlatGeral();
    this.listGeral.push(flatGeral);
    this.newItem = "";
  }

  saveNewCozinha(): void {
    this.newItem = "";
    let flatCozinha = new FlatCoz();
    this.listCozinha.push(flatCozinha);
  }

  saveNewEnt(): void {
    this.newItem = "";
    let flatEnt = new FlatEnt();
    this.listEnt.push(flatEnt);
  }

  saveNewInst(): void {
    this.newItem = "";
    let flatInst = new FlatInst();
    this.listInst.push(flatInst);
  }

  saveNewEquip(): void {
    this.newItem = "";
    let flatEquip = new FlatEquip();
    this.listEquip.push(flatEquip);
  }

  saveNewServ(): void {
    this.newItem = "";
    let flatServ = new FlatServ();
    this.listServ.push(flatServ);
  }

  // Cancel function
  cancelNew(): void {
    this.newItem = "";
  }

  salvarFlat() {

    this.flat.setCodigo(this.codigo);
    this.flat.setDsTituloAnuncio(this.dsTituloAnuncio);
    this.flat.setEndereco(this.endereco);
    this.flat.setNumero(this.numero);
    this.flat.setComplemento(this.complemento);
    this.flat.setPais(this.pais);
    this.flat.setEstado(this.estado);
    this.flat.setCidade(this.cidade);
    this.flat.setBairro(this.bairro);
    this.flat.setCep(this.cep);
    this.flat.setSnCondominio(this.snCondominio);
    this.flat.setNrQuartos(this.nrQuartos);
    this.flat.setNrBanheiros(this.nrBanheiros);
    this.flat.setNrMaxPessoas(this.nrMaxPessoas);
    this.flat.setVlBasicoDiaria(this.vlBasicoDiaria);
    this.flat.setNrAreaFlat(this.nrAreaFlat);
    this.flat.setDsFlat(this.dsFlat);
    this.flat.setDsRegras(this.dsRegras);
    this.flat.setSnInternet(this.snInternet);
    this.flat.setSnCriancas(this.snCriancas);
    this.flat.setSnMobilidadeReduzida(this.snMobilidadeReduzida);
    this.flat.setSnFumantes(this.snFumantes);
    this.flat.setSnAnimais(this.snAnimais);
    this.flat.setSnFestas(this.snFestas);
    this.flat.setSnLongoPrazo(this.snLongoPrazo);

    let headers = new Headers(
    {
      'Content-Type' : 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    if (this.flat.getCodigoFlat()) {

      this.http.patch(this.urlPatch + this.flat.getCodigoFlat(), 
                      this.flat, 
                      options)
      .toPromise()
      .then(data => {
        console.log('API Response : ', data.json());
        alert('Flat atualizado com sucesso!');
        this.navCtrl.push(ListFlatsPage);
      }).catch(error => {
        console.error('API Error : ', error.status);
        console.error('API Error : ', JSON.stringify(error));
        alert('Erro ao atualizar o flat!');
      });

    } else {
      
      this.http.post(this.urlPost, 
                     this.flat, 
                     options)
      .toPromise()
      .then(data => {
        console.log('API Response : ', data.json());
        alert('Flat salvo com sucesso!');
        this.navCtrl.push(ListFlatsPage);
      }).catch(error => {
        console.error('API Error : ', error.status);
        console.error('API Error : ', JSON.stringify(error));
        alert('Erro ao salvar o flat!');
      });
    }
  }

  exibCarac() {
    if(this.exibeCaracteristica) {
      this.exibeCaracteristica = false;
      this.textoInformacoes = 'Mostrar mais';
    } else {
      this.exibeCaracteristica = true;
      this.textoInformacoes = 'Mostrar menos';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadFlatsPage');
  }

}
