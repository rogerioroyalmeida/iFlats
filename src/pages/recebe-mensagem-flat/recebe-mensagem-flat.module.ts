import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecebeMensagemFlatPage } from './recebe-mensagem-flat';

@NgModule({
  declarations: [
    RecebeMensagemFlatPage,
  ],
  imports: [
    IonicPageModule.forChild(RecebeMensagemFlatPage),
  ],
})
export class RecebeMensagemFlatPageModule {}
