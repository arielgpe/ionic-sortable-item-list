import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
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
              private viewCtrl: ViewController) {
    if (this.navParams.get("originalValue")) {
      this.description = this.navParams.get("originalValue");
      this.index = this.navParams.get("index");
      this.addOrEdit = "Edit"
    }
    this.navCtrl.swipeBackEnabled = true;
    storage.get("items").then(value => {
      if (value != null) {
        this.items = value
      }
    })
  }

  addDescription() {
    if (this.addOrEdit == "Add") {
      this.items.push(this.description);
    } else {
      this.items.splice(this.index, 1, this.description)
    }
    this.storage.set("items", this.items)
    this.closeModal()
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
