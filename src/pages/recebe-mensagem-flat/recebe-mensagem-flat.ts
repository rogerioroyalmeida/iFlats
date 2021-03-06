import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Events } from 'ionic-angular';
import { Flat } from '../../model/flat';
import { Usuario } from '../../model/usuario';
import { Util } from '../../util/utils';
import { Mensagem } from '../../model/mensagem';
import { Http, Headers, RequestOptions } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-recebe-mensagem-flat',
  templateUrl: 'recebe-mensagem-flat.html',
})
export class RecebeMensagemFlatPage {

  flat: Flat = new Flat();

  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: ElementRef;
  msgList: Array<Mensagem> = new Array<Mensagem>();
  user: Usuario = new Usuario();
  toUser: Usuario = new Usuario();
  editorMsg = '';
  showEmojiPicker = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private events: Events, 
              private util: Util,
              public http: Http) {

    if(navParams.get('flat')) {
      this.flat = navParams.get('flat');
    }

    var cdUsuarioMensagem = 0;

    this.http.get(this.util.mensagemRotaPrincipal + 'flat/usuario_dest/' + this.flat.getCodigoFlat() + '/' + this.util.cdUsuarioLogado)
      .map(res => res.json())
      .subscribe(data => {

        if (data[0])
          cdUsuarioMensagem = data[0].cd_usuario_emissario;

          this.http.get(this.util.usuarioRotaGetByCodigo + cdUsuarioMensagem.toString())
            .map(res => res.json())
            .subscribe(data => {

              if (data[0]) {
                this.toUser.setCdUsuario(data[0].cd_usuario);
                this.toUser.setEmail(data[0].email);
                this.toUser.setDsNome(data[0].ds_nome);
                this.toUser.setDsSobreNome(data[0].ds_sobrenome);
                this.toUser.setCampo01(data[0].campo01);
                this.toUser.setCampo02(data[0].campo02);
                this.toUser.setCampoReal(data[0].campo_real);
                this.toUser.setObservacao(data[0].observacao);
              } else {
                this.util.msgAlert('Você não possui mensagens de usuarios para seu flat.', 3000);
              }

              console.log('get usuario chat-service: ', data)
            });

      });

    this.http.get(this.util.usuarioRotaGetByCodigo + this.util.cdUsuarioLogado)
      .map(res => res.json())
      .subscribe(data => {

        if (data[0]) {
          this.user.setCdUsuario(data[0].cd_usuario);
          this.user.setEmail(data[0].email);
          this.user.setDsNome(data[0].ds_nome);
          this.user.setDsSobreNome(data[0].ds_sobrenome);
          this.user.setCampo01(data[0].campo01);
          this.user.setCampo02(data[0].campo02);
          this.user.setCampoReal(data[0].campo_real);
          this.user.setObservacao(data[0].observacao);
        }

        console.log('get usuario chat-service: ', data)
      });

    this.scrollToBottom();
  }

  getUserInfo(cdUsuario: string): Usuario {

    var userInfo: Usuario = new Usuario;

    this.http.get(this.util.usuarioRotaGetByCodigo + cdUsuario.toString())
      .map(res => res.json())
      .subscribe(data => {

        userInfo.setCdUsuario(data[0].cd_usuario);
        userInfo.setEmail(data[0].email);
        userInfo.setDsNome(data[0].ds_nome);
        userInfo.setDsSobreNome(data[0].ds_sobrenome);
        userInfo.setCampo01(data[0].campo01);
        userInfo.setCampo02(data[0].campo02);
        userInfo.setCampoReal(data[0].campo_real);
        userInfo.setObservacao(data[0].observacao);

        console.log('get usuario chat-service: ', data)
      });
    
    return userInfo;
  }

  ionViewWillLeave() {
    // unsubscribe
    this.events.unsubscribe('chat:received');
  }

  ionViewDidEnter() {
    //get message list
    this.getMsg();

    // Subscribe to received  new message events
    this.events.subscribe('chat:received', msg => {
      if (msg.getCdUsuarioEmissario() != this.user.getCdUsuario())
        this.pushNewMsg(msg);
    })
  }

  onFocus() {
    this.showEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }

  switchEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    if (!this.showEmojiPicker) {
      this.focus();
    } else {
      this.setTextareaScroll();
    }
    this.content.resize();
    this.scrollToBottom();
  }

  /**
   * @name getMsg
   * @returns {Promise<Mensagem[]>}
   */
  getMsg() {

    return this.http.get(this.util.mensagemRotaGetByFlat + this.flat.getCodigoFlat())
      .map(res => res.json())
      .subscribe(data => {

        this.msgList = data;

        console.log('get msg-list: ', data)
      });

    // Get mock message list
    // return this.chatService
    // .getMsgList(this.flat.getCodigoFlat(), this.util.cdUsuarioLogado)
    // .subscribe(res => {
    //   this.msgList = res;
    //   this.scrollToBottom();
    // });
  }

  /**
   * @name sendMsg
   */
  sendMsg() {
    if (!this.editorMsg.trim()) return;

    if (this.user.getCdUsuario() != this.toUser.getCdUsuario()) {

      let newMsg: Mensagem = new Mensagem();

      newMsg.setCdFlat(this.flat.getCodigoFlat());
      newMsg.setAnexo01('');
      newMsg.setAnexo02('');
      newMsg.setCdUsuarioEmissario(this.user.getCdUsuario());
      newMsg.setNmUsuarioEmissario(this.user.getDsNome());
      newMsg.setCdUsuarioDestinatario(this.toUser.getCdUsuario());
      newMsg.setNmUsuarioDestinatario(this.toUser.getDsNome());
      // newMsg.setDtMensagem(new Date());
      newMsg.setTime(Date.now());
      newMsg.setDsMensagem(this.editorMsg);
      newMsg.setStatus('N');
      newMsg.status2 = 'pending';

      this.pushNewMsg(newMsg);
      this.editorMsg = '';

      if (!this.showEmojiPicker) {
        this.focus();
      }

      this.enviarMsg(newMsg)
      .then(() => {
        let index = this.getMsgIndexById(newMsg.getCdFlat(), newMsg.getDsMensagem(), newMsg.getCdUsuarioEmissario(), newMsg.getCdUsuarioDestinatario());
        if (index !== -1) {
          this.msgList[index].status2 = 'success';
        }
      })
    } else {
      this.util.msgAlert('Não é possível enviar mensagens para você mesmo!');
    }
  }

  enviarMsg(msg: Mensagem) {
    return new Promise(resolve => setTimeout(() => resolve(msg), Math.random() * 1000))
    .then(() => this.mockNewMsg(msg));
  }

  mockNewMsg(msg) {

    let headers = new Headers(
    {
      'Content-Type' : 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(this.util.mensagemRotaPrincipal, 
          msg, 
          options)
    .toPromise()
    .then(data => {
      console.log('API Response : ', data.json());
      msg.setCdMensagem(data.json().insertId);
    }).catch(error => {
      console.error('API Error : ', error.status);
      console.error('API Error : ', JSON.stringify(error));
    });

    setTimeout(() => {
      this.events.publish('chat:received', msg, Date.now())
    }, Math.random() * 1800)
  }

  /**
   * @name pushNewMsg
   * @param msg
   */
  pushNewMsg(msg: Mensagem) {
    const userId = this.user.getCdUsuario(),
      toUserId = this.toUser.getCdUsuario();
    // Verify user relationships
    if (msg.getCdUsuarioEmissario() === userId && msg.getCdUsuarioDestinatario() === toUserId) {
      this.msgList.push(msg);
    } else if (msg.getCdUsuarioDestinatario() === userId && msg.getCdUsuarioEmissario() === toUserId) {
      this.msgList.push(msg);
    }
    this.scrollToBottom();
  }

  getMsgIndexById(cd_flat: number, ds_mensagem: string, cd_usuario_emi: number, cd_usuario_dest: number) {
    return this.msgList.findIndex(e => e.cd_flat === cd_flat && 
                                  e.ds_mensagem === ds_mensagem && 
                                  e.cd_usuario_emissario === cd_usuario_emi && 
                                  e.cd_usuario_destinatario === cd_usuario_dest)
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }

  private focus() {
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }

  private setTextareaScroll() {
    const textarea =this.messageInput.nativeElement;
    textarea.scrollTop = textarea.scrollHeight;
  }

}
