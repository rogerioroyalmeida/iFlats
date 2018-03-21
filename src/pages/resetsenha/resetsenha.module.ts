import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResetsenhaPage } from './resetsenha';

@NgModule({
  declarations: [
    ResetsenhaPage,
  ],
  imports: [
    IonicPageModule.forChild(ResetsenhaPage),
  ],
  exports: [
    ResetsenhaPage
  ]
})
export class ResetsenhaPageModule {}
