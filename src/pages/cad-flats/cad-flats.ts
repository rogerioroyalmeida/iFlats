import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Flat } from '../../model/flat';

@IonicPage()
@Component({
  selector: 'page-cad-flats',
  templateUrl: 'cad-flats.html',
})
export class CadFlatsPage {

  flat: Flat = new Flat();
  listGeral: string[];
  newItem: string = "";
  toggleNew: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  // Saving function
  saveNew( newItem: string ): void {
    this.newItem = "Teste";
    this.listGeral.push(newItem);
    this.toggleNew = false;
    this.newItem = "";
  }

  // Cancel function
  cancelNew(): void {
    this.toggleNew = false;
    this.newItem = "";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadFlatsPage');
  }

}
