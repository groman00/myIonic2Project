import { FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, AbstractControl } from 'angular2/common';
import {Page} from 'ionic-angular';
import {HttpFactory} from '../../services/http-factory'

@Page({
  templateUrl: 'build/pages/contact/contact.html',
  directives: [FORM_DIRECTIVES]
})
export class ContactPage {
  
  static get parameters() {
    return [[FormBuilder], [HttpFactory]];
  }
  
  constructor(fb, httpFactory) {

    this.contactForm = ControlGroup;  

    this.contactForm = fb.group({  
      'name': ['', Validators.compose([Validators.required, Validators.minLength(2), this.checkFirstCharacterValidator])],
      'email': ['', Validators.compose([Validators.required, this.checkFirstCharacterValidator])]
    });
 
    this.name = this.contactForm.controls['name'];
    this.email = this.contactForm.controls['email'];
    
    httpFactory
      .get('echo/fooooo')
      .subscribe(function(response){
        console.log('cool response:')
        console.log(response)
      });

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
