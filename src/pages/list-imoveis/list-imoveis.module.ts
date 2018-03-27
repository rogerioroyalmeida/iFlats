import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListImoveisPage } from './list-imoveis';

@NgModule({
  declarations: [
    ListImoveisPage,
  ],
  imports: [
    IonicPageModule.forChild(ListImoveisPage),
  ],
})
export class ListImoveisPageModule {}
