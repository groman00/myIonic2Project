import {Http, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';

//For more on http:
//https://angular.io/docs/js/latest/api/http/Http-class.html

function serializeObj(obj) {
    var result = [];
    for (var property in obj)
        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
    return result.join("&");
}

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
      .post(this.api + url, serializeObj(body))
      .map(res => res.json())    
  }
}
