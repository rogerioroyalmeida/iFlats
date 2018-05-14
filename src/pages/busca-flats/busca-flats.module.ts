import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuscaFlatsPage } from './busca-flats';

@NgModule({
  declarations: [
    BuscaFlatsPage,
  ],
  imports: [
    IonicPageModule.forChild(BuscaFlatsPage),
  ],
})
export class BuscaFlatsPageModule {}
