import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {
  description: string = "";
  items: string[] = [];
  addOrEdit: string = "Add";
  index: number = 0;


  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
              private viewCtrl: ViewController, private toastCtrl: ToastController) {
    //If the navParams contains "originalValue" it means that the modal was called from the Edit Button"
    if (this.navParams.get("originalValue")) {
      this.description = this.navParams.get("originalValue");
      this.index = this.navParams.get("index");
      this.addOrEdit = "Edit"
    }
    storage.get("items").then(value => {
      if (value != null) {
        this.items = value
      }
    })
  }

  /*
  * Check the current title of the Modal and based on that either creates a new item or modifies the current one*/
  addDescription() {
    const found = this.items.find(val => val == this.description);
    if (!found){
      if (this.addOrEdit == "Add") {
        this.items.push(this.description);
      } else {
        this.items.splice(this.index, 1, this.description)
      }
      this.storage.set("items", this.items);
      this.closeModal()
    } else {
      const toast = this.toastCtrl.create({
        message: 'This item already exist',
        position: 'top',
        duration: 3000
      });
      toast.present();
    }

  }


  /*
  * Closes the modal and notifies the caller*/
  closeModal() {
    this.viewCtrl.dismiss();
  }
}
