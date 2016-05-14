import {Page, ViewController, NavParams} from 'ionic-angular';
import {HttpFactory} from '../../services/http-factory'

@Page({
  templateUrl: 'build/pages/contactDetail/contactDetail.html'
})
export class ContactDetail {
  
  static get parameters() {
    return [[ViewController], [NavParams], [HttpFactory]];
  }
  
  constructor(viewCtrl, navParams, httpFactory) {
    this.viewCtrl = viewCtrl;
    this.navParams = navParams;
    this.contact = this.navParams.get("contact");
    this.httpFactory = httpFactory;
  }

  close(e){
    this.viewCtrl.dismiss();
  }

  delete(e){
    this.httpFactory
      .delete('contacts/' + this.contact._id)
      .subscribe(function(response){
        this.navParams.get("homePage").contacts = response.contacts;
        this.viewCtrl.dismiss();
      }.bind(this)); 
  }

}
