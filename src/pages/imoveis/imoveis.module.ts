import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImoveisPage } from './imoveis';

@NgModule({
  declarations: [
    ImoveisPage,
  ],
  imports: [
    IonicPageModule.forChild(ImoveisPage),
  ],
})
export class ImoveisPageModule {}
