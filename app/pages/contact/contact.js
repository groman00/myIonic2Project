import { FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, AbstractControl } from 'angular2/common';
import {Page} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/contact/contact.html',
  directives: [FORM_DIRECTIVES]
})
export class ContactPage {
  static get parameters() {
    return [[FormBuilder]];
  }
  
  constructor(fb) {

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
      }
  }

  checkFirstCharacterValidator(control){  
      if (control.value.match(/^\d/)) {  
          return {checkFirstCharacterValidator: true};  
      }       
  }

}
