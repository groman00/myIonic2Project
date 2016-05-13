import {HttpFactory} from '../../services/http-factory'
import {NavController, Page, Modal} from 'ionic-angular';
import {ContactPage} from '../contact/contact';
import {ContactDetail} from '../contactDetail/contactDetail';

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

  refreshContacts(contacts){
    if(contacts){
      this.contacts = contacts;
      return false;
    }
    this.httpFactory
      .get('contacts')
      .subscribe(function(response){
        this.contacts = response.contacts;
      }.bind(this)); 
  }

  openNewContact(e) {
    let modal = Modal.create(ContactPage);
    modal.onDismiss(this.refreshContacts.bind(this));
    this.nav.present(modal)
  }

  contactTapped(e, contact){
    let modal = Modal.create(ContactDetail, contact);
    modal.onDismiss(this.refreshContacts.bind(this));
    this.nav.present(modal)
  }
}
