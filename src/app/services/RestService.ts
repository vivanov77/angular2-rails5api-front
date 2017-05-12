import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {HelperService} from './HelperService';


@Injectable()
export class RestService {

  constructor(private http: Http
    , private helper: HelperService
    )  {
  }

  index(): Observable<any> { 
    let queryURL: string = `${HelperService.BASE_URL}`;

    return this.http.request(queryURL);
  }  

  show(id: string): Observable<any> {	
    let queryURL: string = `${HelperService.BASE_URL}/${id}`;

    return this.http.request(queryURL);
  }

  create(obj: any): Observable<any> {
    let headers = HelperService.HEADERS;

    let queryURL: string = `${HelperService.BASE_URL}`;
    return this.http.post(queryURL, this.helper.model2jsonapi(obj), { headers: headers });
  }

  destroy(id: string): Observable<any> {  
    let queryURL: string = `${HelperService.BASE_URL}/${id}`;
    return this.http.delete(queryURL);
  }

  update(id: string, obj: any): Observable<any> {

    let headers = HelperService.HEADERS;    

    let queryURL: string = `${HelperService.BASE_URL}/${id}`;
    return this.http.patch(queryURL, this.helper.model2jsonapi(obj), { headers: headers });
  } 

}