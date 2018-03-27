import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadImoveisPage } from './cad-imoveis';

@NgModule({
  declarations: [
    CadImoveisPage,
  ],
  imports: [
    IonicPageModule.forChild(CadImoveisPage),
  ],
})
export class CadImoveisPageModule {}
