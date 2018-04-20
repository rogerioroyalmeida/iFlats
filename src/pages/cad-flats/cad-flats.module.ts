import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadFlatsPage } from './cad-flats';

@NgModule({
  declarations: [
    CadFlatsPage,
  ],
  imports: [
    IonicPageModule.forChild(CadFlatsPage),
  ],
})
export class CadFlatsPageModule {}
