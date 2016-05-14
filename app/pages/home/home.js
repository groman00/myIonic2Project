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
    this.loadContacts();
  }

  loadContacts(contacts){
    this.httpFactory
      .get('contacts')
      .subscribe(function(response){
        this.contacts = response.contacts;
      }.bind(this)); 
  }

  openNewContact(e) {
    let modal = Modal.create(ContactPage, {homePage: this});
    this.nav.present(modal)
  }

  // onPageWillEnter(){
  //   console.log("page entered");
  //   console.log(this);
  // }

  contactTapped(e, contact){
    this.nav.push(ContactDetail, {
      "contact": contact,
      homePage: this
    });    
  }
}
