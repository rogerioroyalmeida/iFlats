import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecebeMensagemFlatPage } from './recebe-mensagem-flat';
import { RelativeTime } from '../../pipes/relative-time';
import { EmojiProvider } from '../../providers/emoji';

@NgModule({
  declarations: [
    RecebeMensagemFlatPage,
    RelativeTime
  ],
  imports: [
    IonicPageModule.forChild(RecebeMensagemFlatPage),
  ],
  providers: [
    EmojiProvider
  ]
})
export class RecebeMensagemFlatPageModule {}
