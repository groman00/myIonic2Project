import {Http, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';

//For more on http:
//https://angular.io/docs/js/latest/api/http/Http-class.html

export class HttpFactory {
  
  static get parameters() {
    return [[Http]];
  } 

  constructor(http) {
    this.api = 'http://localhost:8200/';
    this.http = http;
  }

  get(url) {
    return this.sendRequest(url, 'get');
  }

  post(url) {
    return this.sendRequest(url, 'post');
  }

  sendRequest(url, method){
    return this.http
      [method](this.api + url)
      .map(res => res.json())
  }
}
