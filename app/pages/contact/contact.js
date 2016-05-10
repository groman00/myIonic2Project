import {FORM_DIRECTIVES, FormBuilder, Validators, Control, ControlGroup} from 'angular2/common';
import {Page} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/contact/contact.html',
  providers: [FormBuilder]
})
export class ContactPage {
  constructor() {

  }
}
