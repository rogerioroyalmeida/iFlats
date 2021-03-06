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
import { ItInstalacao } from '../../model/it-instalacao';
import { Equipamento } from '../../model/equipamento';
import { Servico } from '../../model/servico';
import { ItCrianca } from '../../model/it-crianca';


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
  listInstalacao = new Array<ItInstalacao>();
  listEquipamento = new Array<Equipamento>();
  listServico = new Array<Servico>();
  listCrianca = new Array<ItCrianca>();
  //listInst = new Array<FlatInst>();
  //listEquip = new Array<FlatEquip>();
  //listServ = new Array<FlatServ>();

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
  marcaTodosInstalacao = false;
  marcaTodosEquipamento = false;
  marcaTodosServico = false;
  marcaTodosCrianca = false;
  labelMarcarTodosGerais = 'Marcar todos';
  labelMarcarTodosCozinha = 'Marcar todos';
  labelMarcarTodosEntretenimento = 'Marcar todos';
  labelMarcarTodosInstalacao = 'Marcar todos';
  labelMarcarTodosEquipamento = 'Marcar todos';
  labelMarcarTodosServico = 'Marcar todos';
  labelMarcarTodosCrianca = 'Marcar todos';

  exibeCaracteristica = false;
  textoInformacoes = 'Mostrar mais';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: Http,
              private util: Util) {

    this.getItensGeraisUsuario();
    this.getItensCozinhaUsuario();
    this.getItensEntretenimentoUsuario();
    this.getItensInstalacaoUsuario();
    this.getItensEquipamentoUsuario();
    this.getItensServicoUsuario();
    this.getItensCriancaUsuario();
    
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
      this.carregarItensInstalacaoFlat();
      this.carregarItensEquipamentoFlat();
      this.carregarItensServicoFlat();
      this.carregarItensCriancaFlat();
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

        this.http.patch(this.util.cadFlatsRotaPrincipal + 'usuario/' + this.util.cdUsuarioLogado + '/flat/' + this.flat.getCodigoFlat(), 
                        this.flat, 
                        options)
        .toPromise()
        .then(data => {
          console.log('API Response : ', data.json());
          this.salvarItensGeraisFlat();
          this.salvarItensCozinhaFlat();
          this.salvarItensEntretenimentoFlat();
          this.salvarItensInstalacaoFlat();
          this.salvarItensEquipamentoFlat();
          this.salvarItensServicoFlat();
          this.salvarItensCriancaFlat();
          this.util.msgAlert('Flat atualizado com sucesso!');
          this.navCtrl.push(ListFlatsPage);
        }).catch(error => {
          console.error('API Error : ', error.status);
          console.error('API Error : ', JSON.stringify(error));
          this.util.msgAlert('Erro ao atualizar o flat!');
        });

      } else {
        
        this.http.post(this.util.cadFlatsRotaPrincipal + this.util.cdUsuarioLogado, 
                      this.flat, 
                      options)
        .toPromise()
        .then(data => {
          console.log('API Response : ', data.json());
          this.salvarItensGeraisFlat();
          this.salvarItensCozinhaFlat();
          this.salvarItensEntretenimentoFlat();
          this.salvarItensInstalacaoFlat();
          this.salvarItensEquipamentoFlat();
          this.salvarItensServicoFlat();
          this.salvarItensCriancaFlat();
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

  ////////////////////////////////////////////////////////////////
  ////////////////////////////Itens Geral/////////////////////////
  ////////////////////////////////////////////////////////////////
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

            let itGeral: ItGeral = this.listGeral.find(x => x.getCdItgeral() == element.cd_itgeral);
            if (itGeral)
              itGeral.checado = true;
            
          });

          console.log('list flats_itgeral: ', data);

        }
    });

  }
  ////////////////////////////////////////////////////////////////
  ////////////////////////////Itens Cozinha///////////////////////
  ////////////////////////////////////////////////////////////////

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

            let itCozinha: ItCozinha = this.listCozinha.find(x => x.getCdItemcozinha() == flatitcozinha.cd_itemcozinha);
            if (itCozinha)
              itCozinha.checado = true;
            
          });

          console.log('list flats_itcozinha: ', data);

        }
    });

  }
  ///////////////////////////////////////////////////////////////////////
  ////////////////////////////Itens Entreterimento///////////////////////
  ///////////////////////////////////////////////////////////////////////
  getItensEntretenimentoUsuario() {
    
    this.http.get(this.util.itEntretenimentoRotaGetByUsuario + this.util.cdUsuarioLogado)
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

            let itEntretenimento: ItEntretenimento = this.listEntretenimento.find(x => x.getCdItemEntretenimento() == flatitentretenimento.cd_itentretenimento);
            if (itEntretenimento)
              itEntretenimento.checado = true;
            
          });

          console.log('list flats_itentretenimento: ', data);

        }
    });

  }

  ///////////////////////////////////////////////////////////////////////
  ////////////////////////////Itens Instalacao///////////////////////////
  ///////////////////////////////////////////////////////////////////////
  getItensInstalacaoUsuario() {
    
    this.http.get(this.util.itInstalacaoRotaGetByUsuario + this.util.cdUsuarioLogado)
      .map(res => res.json())
      .subscribe(data => {

        if (data) {

          data.forEach(element => {
            let itinstalacao: ItInstalacao = new ItInstalacao();
            itinstalacao.setCdIteminstalacao(element.cd_itinstalacao);
            itinstalacao.setDsIteminstalacao(element.ds_itinstalacao);
            itinstalacao.setObservacao(element.observacao);
            itinstalacao.setValor(element.valor);
            itinstalacao.setCampo01(element.campo01);
            itinstalacao.setCampo02(element.campo02);
            itinstalacao.setCampo03(element.campo03);
            itinstalacao.setCampo04(element.campo04);
            
            this.listInstalacao.push(itinstalacao);
          });

          console.log('list itens_instalacao usuario: ', data);

        }
    });

  }

  salvarItensInstalacaoFlat() {

    // CHAMA O DELETE PARA APAGAR TODOS OS ITEM_INSTALACAO DO FLAT
    let headers = new Headers(
    {
      'Content-Type' : 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    this.http.delete(this.util.flatItInstalacaoRotaPrincipal + this.codigo, 
                      options)
      .toPromise()
      .then(data => {
        console.log('API Response : ', data.json());

        // VARRE A LISTA DE TODOS OS ITEM_INSTALACAO PARA VERIFICAR SOMENTE OS MARCADOS E INSERIR NO BANCO
        this.listInstalacao.forEach(element => {
          if (element.checado) {

            //let flatInst: FlatInst = new FlatInst();
            //flatInst.setCdFlat(this.codigo);
            //flatInst.setCdItInstalacao(element.getCdIteminstalacao());
            let flatInst = {cd_flat: this.codigo, cd_itinstalacao: element.getCdIteminstalacao()};

            // CHAMA O POST PARA CADASTRAR OS NOVOS ITENS INSTALACAO SELECIONADOS
            this.http.post(this.util.flatItInstalacaoRotaPrincipal, 
                            flatInst, 
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

  marcarTodosItensInstalacao() {
    this.listInstalacao.forEach(element => {
      element.checado = this.marcaTodosInstalacao;
    });

    if (this.marcaTodosInstalacao) {
      this.labelMarcarTodosInstalacao = 'Desmarcar todos';
    } else {
      this.labelMarcarTodosInstalacao = 'Marcar todos';
    }
  }

  carregarItensInstalacaoFlat() {

    this.http.get(this.util.flatItInstalacaoRotaPrincipal + this.codigo)
      .map(res => res.json())
      .subscribe(data => {

        if (data) {

          data.forEach(element => {
            let flatItInstalacao: {cd_flat: number, cd_itinstalacao: number} = {cd_flat: element.cd_flat, cd_itinstalacao: element.cd_itinstalacao};

            let itInstalacao: ItInstalacao = this.listInstalacao.find(x => x.getCdIteminstalacao() == flatItInstalacao.cd_itinstalacao);
            if (itInstalacao)
              itInstalacao.checado = true;
            
          });

          console.log('list flats_itinstalacao: ', data);

        }
    });

  }

  ///////////////////////////////////////////////////////////////////////
  ////////////////////////////Itens Equipamento//////////////////////////
  ///////////////////////////////////////////////////////////////////////
  getItensEquipamentoUsuario() {
    
    this.http.get(this.util.equipamentoRotaGetByUsuario + this.util.cdUsuarioLogado)
      .map(res => res.json())
      .subscribe(data => {

        if (data) {

          data.forEach(element => {
            let equipamento: Equipamento = new Equipamento();
            equipamento.setCdEquipamento(element.cd_equipamento);
            equipamento.setDsEquipamento(element.ds_equipamento);
            equipamento.setObservacao(element.observacao);
            equipamento.setValor(element.valor);
            equipamento.setCampo01(element.campo01);
            equipamento.setCampo02(element.campo02);
            equipamento.setCampo03(element.campo03);
            equipamento.setCampo04(element.campo04);
            
            this.listEquipamento.push(equipamento);
          });

          console.log('list equipamentos usuario: ', data);

        }
    });

  }

  salvarItensEquipamentoFlat() {

    // CHAMA O DELETE PARA APAGAR TODOS OS ITEM_EQUIPAMENTO DO FLAT
    let headers = new Headers(
    {
      'Content-Type' : 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    this.http.delete(this.util.flatItEquipamentoRotaPrincipal + this.codigo, 
                      options)
      .toPromise()
      .then(data => {
        console.log('API Response : ', data.json());

        // VARRE A LISTA DE TODOS OS ITEM_EQUIPAMENTO PARA VERIFICAR SOMENTE OS MARCADOS E INSERIR NO BANCO
        this.listEquipamento.forEach(element => {
          if (element.checado) {

            let flatEquip = {cd_flat: this.codigo, cd_equipamento: element.getCdEquipamento()};

            // CHAMA O POST PARA CADASTRAR OS NOVOS ITENS EQUIPAMENTO SELECIONADOS
            this.http.post(this.util.flatItEquipamentoRotaPrincipal, 
                            flatEquip, 
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

  marcarTodosItensEquipamento() {
    this.listEquipamento.forEach(element => {
      element.checado = this.marcaTodosEquipamento;
    });

    if (this.marcaTodosEquipamento) {
      this.labelMarcarTodosEquipamento = 'Desmarcar todos';
    } else {
      this.labelMarcarTodosEquipamento = 'Marcar todos';
    }
  }

  carregarItensEquipamentoFlat() {

    this.http.get(this.util.flatItEquipamentoRotaPrincipal + this.codigo)
      .map(res => res.json())
      .subscribe(data => {

        if (data) {

          data.forEach(element => {
            let flatItEquipamento: {cd_flat: number, cd_equipamento: number} = {cd_flat: element.cd_flat, cd_equipamento: element.cd_equipamento};

            let itEquipamento: Equipamento = this.listEquipamento.find(x => x.getCdEquipamento() == flatItEquipamento.cd_equipamento);
            if (itEquipamento)
            itEquipamento.checado = true;
            
          });

          console.log('list flats_equipamento: ', data);

        }
    });

  }

  ///////////////////////////////////////////////////////////////////////
  ////////////////////////////Itens Servico//////////////////////////
  ///////////////////////////////////////////////////////////////////////
  getItensServicoUsuario() {
    
    this.http.get(this.util.servicoRotaGetByUsuario + this.util.cdUsuarioLogado)
      .map(res => res.json())
      .subscribe(data => {

        if (data) {

          data.forEach(element => {
            let servico: Servico = new Servico();
            servico.setCdServico(element.cd_servico);
            servico.setDsServico(element.ds_servico);
            servico.setObservacao(element.observacao);
            servico.setValor(element.valor);
            servico.setCampo01(element.campo01);
            servico.setCampo02(element.campo02);
            servico.setCampo03(element.campo03);
            servico.setCampo04(element.campo04);
            
            this.listServico.push(servico);
          });

          console.log('list servico usuario: ', data);

        }
    });

  }

  salvarItensServicoFlat() {

    // CHAMA O DELETE PARA APAGAR TODOS OS ITEM_SERVICO DO FLAT
    let headers = new Headers(
    {
      'Content-Type' : 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    this.http.delete(this.util.flatItServicoRotaPrincipal + this.codigo, 
                      options)
      .toPromise()
      .then(data => {
        console.log('API Response : ', data.json());

        // VARRE A LISTA DE TODOS OS ITEM_SERVICO PARA VERIFICAR SOMENTE OS MARCADOS E INSERIR NO BANCO
        this.listServico.forEach(element => {
          if (element.checado) {

            let flatServ = {cd_flat: this.codigo, cd_servico: element.getCdServico()};

            // CHAMA O POST PARA CADASTRAR OS NOVOS ITENS SERVICO SELECIONADOS
            this.http.post(this.util.flatItServicoRotaPrincipal, 
                            flatServ, 
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

  marcarTodosItensServico() {
    this.listServico.forEach(element => {
      element.checado = this.marcaTodosServico;
    });

    if (this.marcaTodosServico) {
      this.labelMarcarTodosServico = 'Desmarcar todos';
    } else {
      this.labelMarcarTodosServico = 'Marcar todos';
    }
  }

  carregarItensServicoFlat() {

    this.http.get(this.util.flatItServicoRotaPrincipal + this.codigo)
      .map(res => res.json())
      .subscribe(data => {

        if (data) {

          data.forEach(element => {
            let flatItServico: {cd_flat: number, cd_servico: number} = {cd_flat: element.cd_flat, cd_servico: element.cd_servico};

            let itServico: Servico = this.listServico.find(x => x.getCdServico() == flatItServico.cd_servico);
            if (itServico)
            itServico.checado = true;
            
          });

          console.log('list flats_servico: ', data);

        }
    });

  }

  ///////////////////////////////////////////////////////////////////////
  ////////////////////////////Itens Crianca//////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  getItensCriancaUsuario() {
    
    this.http.get(this.util.itCriancaRotaGetByUsuario + this.util.cdUsuarioLogado)
      .map(res => res.json())
      .subscribe(data => {

        if (data) {

          data.forEach(element => {
            let itcrianca: ItCrianca = new ItCrianca();
            itcrianca.setCdItemcrianca(element.cd_itcrianca);
            itcrianca.setDsItemcrianca(element.ds_itcrianca);
            itcrianca.setObservacao(element.observacao);
            itcrianca.setValor(element.valor);
            itcrianca.setCampo01(element.campo01);
            itcrianca.setCampo02(element.campo02);
            itcrianca.setCampo03(element.campo03);
            itcrianca.setCampo04(element.campo04);
            
            this.listCrianca.push(itcrianca);
          });

          console.log('list itens_crianca usuario: ', data);

        }
    });

  }

  salvarItensCriancaFlat() {

    // CHAMA O DELETE PARA APAGAR TODOS OS ITEM_CRIANCA DO FLAT
    let headers = new Headers(
    {
      'Content-Type' : 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    this.http.delete(this.util.flatItCriancaRotaPrincipal + this.codigo, 
                      options)
      .toPromise()
      .then(data => {
        console.log('API Response : ', data.json());

        // VARRE A LISTA DE TODOS OS ITEM_CRIANCA PARA VERIFICAR SOMENTE OS MARCADOS E INSERIR NO BANCO
        this.listCrianca.forEach(element => {
          if (element.checado) {

            let flatCri = {cd_flat: this.codigo, cd_itcrianca: element.getCdItemcrianca()};

            // CHAMA O POST PARA CADASTRAR OS NOVOS ITENS CRIANCA SELECIONADOS
            this.http.post(this.util.flatItCriancaRotaPrincipal, 
                            flatCri, 
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

  marcarTodosItensCrianca() {
    this.listCrianca.forEach(element => {
      element.checado = this.marcaTodosCrianca;
    });

    if (this.marcaTodosCrianca) {
      this.labelMarcarTodosCrianca = 'Desmarcar todos';
    } else {
      this.labelMarcarTodosCrianca = 'Marcar todos';
    }
  }

  carregarItensCriancaFlat() {

    this.http.get(this.util.flatItCriancaRotaPrincipal + this.codigo)
      .map(res => res.json())
      .subscribe(data => {

        if (data) {

          data.forEach(element => {
            let flatItCrianca: {cd_flat: number, cd_itcrianca: number} = {cd_flat: element.cd_flat, cd_itcrianca: element.cd_itcrianca};

            let itCrianca: ItCrianca = this.listCrianca.find(x => x.getCdItemcrianca() == flatItCrianca.cd_itcrianca);
            if (itCrianca)
            itCrianca.checado = true;
            
          });

          console.log('list flats_itcrianca: ', data);

        }
    });

  }

  ////////////////////////////
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
