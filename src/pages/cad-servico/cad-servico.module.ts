import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadServicoPage } from './cad-servico';

@NgModule({
  declarations: [
    CadServicoPage,
  ],
  imports: [
    IonicPageModule.forChild(CadServicoPage),
  ],
})
export class CadServicoPageModule {}
