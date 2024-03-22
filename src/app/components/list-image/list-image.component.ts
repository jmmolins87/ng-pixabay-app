import { Component } from '@angular/core';
import { ImgService } from '../../services/img-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-image',
  templateUrl: './list-image.component.html',
  styles: [
  ]
})
export class ListImageComponent {

  public term: string = '';
  public subscription: Subscription;
  public listImgs: any[] = [];

  constructor( private _imgService: ImgService ) {

    this.subscription = this._imgService.getTerm().subscribe(( term: string ) => {
      this.term = term;
      this.obtainImgs( this.term );
    })
  }

  obtainImgs( term: string ) {

    this._imgService.getImages( term ).subscribe(( data: any ) => {

      if( data.hits.length === 0 ) {
        this._imgService.setError( 'Opss... no encontramos ningún resultado' );
        return;
      }
      this.listImgs = data.hits;
    }, error => {
      this._imgService.setError( 'Opss... ocurrió un error' );
    })
  }

}
