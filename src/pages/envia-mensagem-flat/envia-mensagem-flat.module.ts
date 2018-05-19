import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnviaMensagemFlatPage } from './envia-mensagem-flat';
import { RelativeTime } from '../../pipes/relative-time';
import { EmojiProvider } from '../../providers/emoji';

@NgModule({
  declarations: [
    EnviaMensagemFlatPage,
    RelativeTime
  ],
  imports: [
    IonicPageModule.forChild(EnviaMensagemFlatPage),
  ],
  providers: [
    EmojiProvider
  ]
})
export class EnviaMensagemFlatPageModule {}
