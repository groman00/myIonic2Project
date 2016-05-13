import {HttpFactory} from '../../services/http-factory'
import {NavController, Page, Modal} from 'ionic-angular';
import {ContactPage} from '../contact/contact';

@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  static get parameters() {
    return [[NavController], [HttpFactory]];
  }

  constructor(nav, httpFactory) {
    this.nav = nav;
    this.httpFactory = httpFactory;
    this.refreshContacts();
  }

  refreshContacts(){
    this.httpFactory
      .get('contacts')
      .subscribe(function(response){
        this.contacts = response.contacts;
      }.bind(this)); 
  }

  openNewContact(e) {
    console.log(this)
      let modal = Modal.create(ContactPage);
      modal.onDismiss(function(data){
        if(data){
          this.refreshContacts();
        }
      }.bind(this));
      this.nav.present(modal)

  }   
}
