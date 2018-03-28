import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListFlatsPage } from './list-flats';

@NgModule({
  declarations: [
    ListFlatsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListFlatsPage),
  ],
})
export class ListFlatsPageModule {}
