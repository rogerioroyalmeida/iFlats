import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Flat } from '../../model/flat';
import { ItGeral } from '../../model/it-geral';
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
  listGeral = new Array<ItGeral>();
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
  marcaTodos = false;
  labelMarcarTodos = 'Marcar todos';

  exibeCaracteristica = false;
  textoInformacoes = 'Mostrar mais';

  urlFlat = 'http://192.168.15.8:3000/iflats/flats/';
  urlItensGerais = 'http://192.168.15.8:3000/iflats/itens_geral/usuario/1';
  urlFlatItGeral = 'http://192.168.15.8:3000/iflats/flats_itgeral/';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: Http,
              private alertCtrl: AlertController) {

    this.getItensGeraisUsuario();
    
    let f: Flat = this.navParams.get('item');

    if (f) {
      this.codigo = f.getCodigoFlat();
      this.dsTituloAnuncio = f.getDsTituloAnuncio();
      this.endereco = f.getEndereco();
      this.numero = f.getNumero();
      this.complemento = f.getComplemento();
      this.pais = f.getPais();
      this.estado = f.getEstado();
      this.cidade = f.getCidade();
      this.bairro = f.getBairro();
      this.cep = f.getCep();
      this.snCondominio = f.getSnCondominio();
      this.nrQuartos = f.getNrQuartos();
      this.nrBanheiros = f.getNrBanheiros();
      this.nrMaxPessoas = f.getNrMaxPessoas();
      this.vlBasicoDiaria = f.getVlBasicoDiaria();
      this.nrAreaFlat = f.getNrAreaFlat();
      this.dsFlat = f.getDsFlat();
      this.dsRegras = f.getDsRegras();
      this.snInternet = f.getSnInternet();
      this.snCriancas = f.getSnCriancas();
      this.snMobilidadeReduzida = f.getSnMobilidadeReduzida();
      this.snFumantes = f.getSnFumantes();
      this.snAnimais = f.getSnAnimais();
      this.snFestas = f.getSnFestas();
      this.snLongoPrazo = f.getSnLongoPrazo();

      this.carregarItensGeraisFlat();
    }

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

      this.http.patch(this.urlFlat + this.flat.getCodigoFlat(), 
                      this.flat, 
                      options)
      .toPromise()
      .then(data => {
        console.log('API Response : ', data.json());
        this.salvarItensGeraisFlat();
        this.msgAlert('Flat atualizado com sucesso!');
        this.navCtrl.push(ListFlatsPage);
      }).catch(error => {
        console.error('API Error : ', error.status);
        console.error('API Error : ', JSON.stringify(error));
        this.msgAlert('Erro ao atualizar o flat!');
      });

    } else {
      
      this.http.post(this.urlFlat, 
                     this.flat, 
                     options)
      .toPromise()
      .then(data => {
        console.log('API Response : ', data.json());
        this.salvarItensGeraisFlat();
        this.msgAlert('Flat salvo com sucesso!');
        this.navCtrl.push(ListFlatsPage);
      }).catch(error => {
        console.error('API Error : ', error.status);
        console.error('API Error : ', JSON.stringify(error));
        this.msgAlert('Erro ao salvar o flat!');
      });
    }
  }

  getItensGeraisUsuario() {
    
    this.http.get(this.urlItensGerais)
      .map(res => res.json())
      .subscribe(data => {

        if (data) {

          data.forEach(element => {
            let itgeral: ItGeral = new ItGeral();
            itgeral.setCdItgeral(element.cd_itgeral);
            itgeral.setDsItgeral(element.ds_itgeral);
            itgeral.setObservacao(element.observacao);
            itgeral.setValor(element.valor);
            itgeral.setCampo01(element.campo01);
            itgeral.setCampo02(element.campo02);
            itgeral.setCampo03(element.campo03);
            itgeral.setCampo04(element.campo04);
            
            this.listGeral.push(itgeral);
          });

          console.log('list itens_gerais usuario: ', data);

        }
    });

  }

  salvarItensGeraisFlat() {

    // CHAMA O DELETE PARA APAGAR TODOS OS ITENS_GERAIS DO FLAT
    let headers = new Headers(
    {
      'Content-Type' : 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    this.http.delete(this.urlFlatItGeral + this.codigo, 
                      options)
      .toPromise()
      .then(data => {
        console.log('API Response : ', data.json());

        // VARRE A LISTA DE TODOS OS ITENS_GERAIS PARA VERIFICAR SOMENTE OS MARCADOS E INSERIR NO BANCO
        this.listGeral.forEach(element => {
          if (element.checado) {

            let item = {cd_flat: this.codigo, cd_itgeral: element.getCdItgeral()};

            // CHAMA O POST PARA CADASTRAR OS NOVOS ITENS GERAIS SELECIONADOS
            this.http.post(this.urlFlatItGeral, 
                            item, 
                            options)
                      .toPromise()
                      .then(data => {
                        console.log('API Response : ', data.json());
                      }).catch(error => {
                        console.error('API Error : ', error.status);
                        console.error('API Error : ', JSON.stringify(error));
                      });

          }
        });

      }).catch(error => {
        console.error('API Error : ', error.status);
        console.error('API Error : ', JSON.stringify(error));
      });

  }

  marcarTodosItensGerais() {
    this.listGeral.forEach(element => {
      element.checado = this.marcaTodos;
    });

    if (this.marcaTodos) {
      this.labelMarcarTodos = 'Desmarcar todos';
    } else {
      this.labelMarcarTodos = 'Marcar todos';
    }
  }

  carregarItensGeraisFlat() {

    this.http.get(this.urlFlatItGeral + this.codigo)
      .map(res => res.json())
      .subscribe(data => {

        if (data) {

          data.forEach(element => {
            let flatitgeral: {cd_flat: number, cd_itgeral: number} = {cd_flat: element.cd_flat, cd_itgeral: element.cd_itgeral};
            // flatitgeral.cd_flat = element.cd_flat;
            // flatitgeral.cd_itgeral = element.cd_itgeral;

            this.listGeral.find(x => x.getCdItgeral() == flatitgeral.cd_itgeral).checado = true;
            
          });

          console.log('list flats_itgeral: ', data);

        }
    });

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

  msgAlert(text: string, title?: string, buttons?: string[]) {
    !buttons ? buttons = ['Ok']: buttons;
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: buttons
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadFlatsPage');
  }

}
