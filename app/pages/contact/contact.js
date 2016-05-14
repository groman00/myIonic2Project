import { FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, AbstractControl } from 'angular2/common';
import {Page, ViewController, NavParams} from 'ionic-angular';
import {HttpFactory} from '../../services/http-factory'

@Page({
  templateUrl: 'build/pages/contact/contact.html',
  directives: [FORM_DIRECTIVES]
})
export class ContactPage {
  static get parameters() {
    return [[FormBuilder], [HttpFactory], [ViewController], [NavParams]];
  }
  
  constructor(fb, httpFactory, viewCtrl, navParams) {

    this.httpFactory = httpFactory;
    this.viewCtrl = viewCtrl;
    this.navParams = navParams;
    this.contactForm = ControlGroup;  

    this.contactForm = fb.group({  
      'name': ['', Validators.compose([Validators.required, Validators.minLength(2), this.checkFirstCharacterValidator])],
      'email': ['', Validators.compose([Validators.required, this.checkFirstCharacterValidator])]
    });
 
    this.name = this.contactForm.controls['name'];
    this.email = this.contactForm.controls['email'];
  }

  onSubmit(value){ 
      if(this.contactForm.valid) {
        console.log('Submitted value: ', value);

        this.httpFactory
          .post('contacts/new', value)
          .subscribe(function(response){
            this.navParams.get("homePage").contacts = response.contacts;
            this.viewCtrl.dismiss();
          }.bind(this));          
      }
  }

  checkFirstCharacterValidator(control){  
      if (control.value.match(/^\d/)) {  
          return {checkFirstCharacterValidator: true};  
      }       
  }

  close(e){
    this.viewCtrl.dismiss();
  }

}
