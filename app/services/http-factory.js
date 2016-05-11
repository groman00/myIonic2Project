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
    return this.http
      .get(this.api + url)
      .map(res => res.json())    
  }

  post(url, body) {
    return this.http
      .post(this.api + url, JSON.stringify(body))
      .map(res => res.json())    
  }
}
