import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImgService {

  public url : string = 'https://pixabay.com/api/?';
  public token: string = '43012346-1196ac9eb2cb975c88fa5bac6';

  private error = new Subject<string>();
  private term = new Subject<string>();

  constructor( private _http: HttpClient ) { }

  setError( message: string ) {
    this.error.next( message );
  }

  getError(): Observable<string> {
    return this.error.asObservable();
  }

  sendTerm( term: string ) {
    this.term.next( term );
  }

  getTerm(): Observable<string> {
    return this.term.asObservable();
  }

  getImages( term: string ): Observable<any> {
    return this._http.get(`${ this.url }key=${ this.token }&q=${ term }`);
  }
}
