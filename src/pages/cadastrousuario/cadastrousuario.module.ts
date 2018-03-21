import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroUsuarioPage } from './cadastrousuario';

@NgModule({
  declarations: [
    CadastroUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroUsuarioPage),
  ],
  exports: [
    CadastroUsuarioPage
  ]
})
export class CadastroUsuarioPageModule {}
