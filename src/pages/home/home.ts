import {Component} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {AddItemPage} from "../add-item/add-item";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: string[] = [];

  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private storage: Storage) {
    this.getItems()
  }

  addListItem(){
    const modal = this.modalCtrl.create(AddItemPage);
    modal.present();
  }

  removeItem(value: string){
    let index = this.items.indexOf(value);
    this.items.splice(index, 1);
    this.storage.set("items", this.items)
  }

  editItem(value: string){
    let index = this.items.indexOf(value);
    const modal = this.modalCtrl.create(AddItemPage, {originalValue: value, index: index});
    modal.onDidDismiss(data => {
      this.getItems();
    });
    modal.present();
  }

  reorderItems(event){
    event.applyTo(this.items);
    this.storage.set("items", this.items)
  }

  getItems(){
    this.storage.get("items").then(value => {
      this.items = value
    })
  }

}
