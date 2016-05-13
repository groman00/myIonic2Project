import {Page, ViewController, NavParams} from 'ionic-angular';
import {HttpFactory} from '../../services/http-factory'

@Page({
  templateUrl: 'build/pages/contactDetail/contactDetail.html'
})
export class ContactDetail {
  
  static get parameters() {
    return [[ViewController], [NavParams], [HttpFactory]];
  }
  
  constructor(viewCtrl, params, httpFactory) {
    this.viewCtrl = viewCtrl;
    this.contact = params.data;
    this.httpFactory = httpFactory;
  }

  close(e){
    this.viewCtrl.dismiss();
  }

  delete(e){
    this.httpFactory
      .delete('contacts/' + this.contact._id)
      .subscribe(function(response){
        this.viewCtrl.dismiss(response.contacts);
      }.bind(this)); 
  }

}
