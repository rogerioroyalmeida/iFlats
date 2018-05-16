import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListFavoritosPage } from './list-favoritos';

@NgModule({
  declarations: [
    ListFavoritosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListFavoritosPage),
  ],
})
export class ListFavoritosPageModule {}
