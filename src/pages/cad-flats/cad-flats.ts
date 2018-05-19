import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Flat } from '../../model/flat';
import { ItGeral } from '../../model/it-geral';
import { ItCozinha } from '../../model/it-cozinha';
import { ItEntretenimento } from '../../model/it-entretenimento';
import { FlatInst } from '../../model/flat-inst';
import { FlatEquip } from '../../model/flat-equip';
import { FlatServ } from '../../model/flat-serv';
import { ListFlatsPage } from '../list-flats/list-flats';
import { Util } from '../../util/utils';

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
  listCozinha = new Array<ItCozinha>();
  listEntretenimento = new Array<ItEntretenimento>();
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
  marcaTodosGerais = false;
  marcaTodosCozinha = false;
  marcaTodosEntretenimento = false;
  labelMarcarTodosGerais = 'Marcar todos';
  labelMarcarTodosCozinha = 'Marcar todos';
  labelMarcarTodosEntretenimento = 'Marcar todos';

  exibeCaracteristica = false;
  textoInformacoes = 'Mostrar mais';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: Http,
              private util: Util) {

    this.getItensGeraisUsuario();
    this.getItensCozinhaUsuario();
    this.getItensEntretenimentoUsuario();
    
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
      this.carregarItensCozinhaFlat();
      this.carregarItensEntretenimentoFlat();
    }

  }

  salvarFlat() {

    if (!this.dsTituloAnuncio ||
        (!this.vlBasicoDiaria || this.vlBasicoDiaria == 0) ||
        (!this.nrQuartos || this.nrQuartos == 0) ||
        (!this.nrMaxPessoas || this.nrMaxPessoas == 0) ||
        (!this.nrAreaFlat || this.nrAreaFlat == 0)) {
      this.util.msgAlert('Os seguintes campos são obrigatórios: Título do anúncio, Valor da diária, Número de quartos, Número máximo de pessoas, Área do flat', 5000);
    } else {

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

        this.http.patch(this.util.cadFlatsRotaPrincipal + this.flat.getCodigoFlat(), 
                        this.flat, 
                        options)
        .toPromise()
        .then(data => {
          console.log('API Response : ', data.json());
          this.salvarItensGeraisFlat();
          this.salvarItensCozinhaFlat();
          this.salvarItensEntretenimentoFlat();
          this.util.msgAlert('Flat atualizado com sucesso!');
          this.navCtrl.push(ListFlatsPage);
        }).catch(error => {
          console.error('API Error : ', error.status);
          console.error('API Error : ', JSON.stringify(error));
          this.util.msgAlert('Erro ao atualizar o flat!');
        });

      } else {
        
        this.http.post(this.util.cadFlatsRotaPrincipal, 
                      this.flat, 
                      options)
        .toPromise()
        .then(data => {
          console.log('API Response : ', data.json());
          this.salvarItensGeraisFlat();
          this.salvarItensCozinhaFlat();
          this.salvarItensEntretenimentoFlat();
          this.util.msgAlert('Flat salvo com sucesso!');
          this.navCtrl.push(ListFlatsPage);
        }).catch(error => {
          console.error('API Error : ', error.status);
          console.error('API Error : ', JSON.stringify(error));
          this.util.msgAlert('Erro ao salvar o flat!');
        });
      }
    }
  }

  getItensGeraisUsuario() {
    
    this.http.get(this.util.itGeralRotaGetByUsuario + this.util.cdUsuarioLogado)
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

    this.http.delete(this.util.flatItGeralRotaPrincipal + this.codigo, 
                      options)
      .toPromise()
      .then(data => {
        console.log('API Response : ', data.json());

        // VARRE A LISTA DE TODOS OS ITENS_GERAIS PARA VERIFICAR SOMENTE OS MARCADOS E INSERIR NO BANCO
        this.listGeral.forEach(element => {
          if (element.checado) {

            let item = {cd_flat: this.codigo, cd_itgeral: element.getCdItgeral()};

            // CHAMA O POST PARA CADASTRAR OS NOVOS ITENS GERAIS SELECIONADOS
            this.http.post(this.util.flatItGeralRotaPrincipal, 
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
      element.checado = this.marcaTodosGerais;
    });

    if (this.marcaTodosGerais) {
      this.labelMarcarTodosGerais = 'Desmarcar todos';
    } else {
      this.labelMarcarTodosGerais = 'Marcar todos';
    }
  }

  carregarItensGeraisFlat() {

    this.http.get(this.util.flatItGeralRotaPrincipal + this.codigo)
      .map(res => res.json())
      .subscribe(data => {

        if (data) {

          data.forEach(element => {

            this.listGeral.find(x => x.getCdItgeral() == element.cd_itgeral).checado = true;
            
          });

          console.log('list flats_itgeral: ', data);

        }
    });

  }

  getItensCozinhaUsuario() {
    
    this.http.get(this.util.itCozinhaRotaGetByUsuario + this.util.cdUsuarioLogado)
      .map(res => res.json())
      .subscribe(data => {

        if (data) {

          data.forEach(element => {
            let itcozinha: ItCozinha = new ItCozinha();
            itcozinha.setCdItemcozinha(element.cd_itemcozinha);
            itcozinha.setDsItemcozinha(element.ds_itemcozinha);
            itcozinha.setObservacao(element.observacao);
            itcozinha.setValor(element.valor);
            itcozinha.setCampo01(element.campo01);
            itcozinha.setCampo02(element.campo02);
            itcozinha.setCampo03(element.campo03);
            itcozinha.setCampo04(element.campo04);
            
            this.listCozinha.push(itcozinha);
          });

          console.log('list itens_cozinha usuario: ', data);

        }
    });

  }

  salvarItensCozinhaFlat() {

    // CHAMA O DELETE PARA APAGAR TODOS OS ITENS_COZINHA DO FLAT
    let headers = new Headers(
    {
      'Content-Type' : 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    this.http.delete(this.util.flatItCozinhaRotaPrincipal + this.codigo, 
                      options)
      .toPromise()
      .then(data => {
        console.log('API Response : ', data.json());

        // VARRE A LISTA DE TODOS OS ITENS_COZINHA PARA VERIFICAR SOMENTE OS MARCADOS E INSERIR NO BANCO
        this.listCozinha.forEach(element => {
          if (element.checado) {

            let item = {cd_flat: this.codigo, cd_itemcozinha: element.getCdItemcozinha()};

            // CHAMA O POST PARA CADASTRAR OS NOVOS ITENS COZINHA SELECIONADOS
            this.http.post(this.util.flatItCozinhaRotaPrincipal, 
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

  marcarTodosItensCozinha() {
    this.listCozinha.forEach(element => {
      element.checado = this.marcaTodosCozinha;
    });

    if (this.marcaTodosCozinha) {
      this.labelMarcarTodosCozinha = 'Desmarcar todos';
    } else {
      this.labelMarcarTodosCozinha = 'Marcar todos';
    }
  }

  carregarItensCozinhaFlat() {

    this.http.get(this.util.flatItCozinhaRotaPrincipal + this.codigo)
      .map(res => res.json())
      .subscribe(data => {

        if (data) {

          data.forEach(element => {
            let flatitcozinha: {cd_flat: number, cd_itemcozinha: number} = {cd_flat: element.cd_flat, cd_itemcozinha: element.cd_itemcozinha};
            // flatitgeral.cd_flat = element.cd_flat;
            // flatitgeral.cd_itgeral = element.cd_itgeral;

            this.listCozinha.find(x => x.getCdItemcozinha() == flatitcozinha.cd_itemcozinha).checado = true;
            
          });

          console.log('list flats_itcozinha: ', data);

        }
    });

  }

  getItensEntretenimentoUsuario() {
    
    this.http.get(this.util.itEntretenimentoRotaPrincipal + this.util.cdUsuarioLogado)
      .map(res => res.json())
      .subscribe(data => {

        if (data) {

          data.forEach(element => {
            let itentretenimento: ItEntretenimento = new ItEntretenimento();
            itentretenimento.setCdItemEntretenimento(element.cd_itentretenimento);
            itentretenimento.setDsItemEntretenimento(element.ds_itentretenimento);
            itentretenimento.setObservacao(element.observacao);
            itentretenimento.setValor(element.valor);
            itentretenimento.setCampo01(element.campo01);
            itentretenimento.setCampo02(element.campo02);
            itentretenimento.setCampo03(element.campo03);
            itentretenimento.setCampo04(element.campo04);
            
            this.listEntretenimento.push(itentretenimento);
          });

          console.log('list itens_entretenimento usuario: ', data);

        }
    });

  }

  salvarItensEntretenimentoFlat() {

    // CHAMA O DELETE PARA APAGAR TODOS OS ITEM_ENTRETENIMENTO DO FLAT
    let headers = new Headers(
    {
      'Content-Type' : 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    this.http.delete(this.util.flatItEntretenimentoRotaPrincipal + this.codigo, 
                      options)
      .toPromise()
      .then(data => {
        console.log('API Response : ', data.json());

        // VARRE A LISTA DE TODOS OS ITEM_ENTRETENIMENTO PARA VERIFICAR SOMENTE OS MARCADOS E INSERIR NO BANCO
        this.listEntretenimento.forEach(element => {
          if (element.checado) {

            let item = {cd_flat: this.codigo, cd_itentretenimento: element.getCdItemEntretenimento()};

            // CHAMA O POST PARA CADASTRAR OS NOVOS ITENS ENTRETENIMENTO SELECIONADOS
            this.http.post(this.util.flatItEntretenimentoRotaPrincipal, 
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

  marcarTodosItensEntretenimento() {
    this.listEntretenimento.forEach(element => {
      element.checado = this.marcaTodosEntretenimento;
    });

    if (this.marcaTodosEntretenimento) {
      this.labelMarcarTodosEntretenimento = 'Desmarcar todos';
    } else {
      this.labelMarcarTodosEntretenimento = 'Marcar todos';
    }
  }

  carregarItensEntretenimentoFlat() {

    this.http.get(this.util.flatItEntretenimentoRotaPrincipal + this.codigo)
      .map(res => res.json())
      .subscribe(data => {

        if (data) {

          data.forEach(element => {
            let flatitentretenimento: {cd_flat: number, cd_itentretenimento: number} = {cd_flat: element.cd_flat, cd_itentretenimento: element.cd_itentretenimento};
            // flatitgeral.cd_flat = element.cd_flat;
            // flatitgeral.cd_itgeral = element.cd_itgeral;

            this.listEntretenimento.find(x => x.getCdItemEntretenimento() == flatitentretenimento.cd_itentretenimento).checado = true;
            
          });

          console.log('list flats_itentretenimento: ', data);

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadFlatsPage');
  }

}
