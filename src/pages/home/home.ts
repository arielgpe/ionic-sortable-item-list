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
  staticItems: string[] = [];
  showSearchBar: boolean = false;
  searchTerm: string = "";

  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private storage: Storage) {
    this.getItems()
  }

  /*
  * This method opens a new instance of AddItemPage, and from there we create a new Item.
  * Once the AddItemPage modal is closed we query the data from IndexedDB (if indexedDB is not available, it will use webSQL)
  * */
  addListItem(){
    const modal = this.modalCtrl.create(AddItemPage);
    modal.onDidDismiss(data => {
      this.getItems();
    });
    modal.present();
  }

  /*
  * Removes an Item from the Database
  * */
  removeItem(value: string){
    let index = this.items.indexOf(value);
    this.items.splice(index, 1);
    this.storage.set("items", this.items)
  }

  /*
  * Gets the current item, open a new instance of AddItemPage and pass the values that it is going to change.
  * */
  editItem(value: string){
    let index = this.items.indexOf(value);
    const modal = this.modalCtrl.create(AddItemPage, {originalValue: value, index: index});
    modal.onDidDismiss(data => {
      this.getItems();
    });
    modal.present();
  }

  /*
  * Uses the method that comes with Ionic Item Reorder and overrides the items saved on the database*/
  reorderItems(event){
    event.applyTo(this.items);
    this.storage.set("items", this.items)
  }

  /*
  * Queries IndexedDB and set the values for the local items array
  * */
  getItems(){
    this.storage.get("items").then(value => {
      this.items = value;
      this.staticItems = value;
    })
  }

  /*
  * Uses a staticItems variable that is never tampered with, and finds any item that match with the searchTerm
  * */
  onSearch(event){
    this.items = this.staticItems.filter(desc => desc.includes(this.searchTerm));
  }

  /*
  * When the onCancel method is called (method provided by the IonSearchBar) it will either show or hide the searchbar,
   * it will also change the value of the items to the default if is currently being shown */
  onCancel(event){
    if (this.showSearchBar){
      this.showSearchBar = false;
      this.items = Object.assign([], this.staticItems)
    } else {
      this.showSearchBar = true
    }
  }

  /*
  * Removes all values
  * */
  clearAll(){
    this.items = [];
    this.staticItems = [];
    this.storage.set("items", []);
  }

}
