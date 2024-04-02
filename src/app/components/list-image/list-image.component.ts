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
  public showSpinner: boolean = false;
  public imgPage: number = 30;
  public currentPage: number = 1;
  public totalPages: number = 0;

  constructor( private _imgService: ImgService ) {

    this.subscription = this._imgService.getTerm().subscribe(( term: string ) => {

      this.term = term;

      // Reseteamos el paginador
      this.currentPage = 1;

      this.showSpinner = true;
      this.obtainImgs( this.term );
    })
  }

  obtainImgs( term: string ) {

    this._imgService.getImages( term, this.imgPage, this.currentPage ).subscribe(( data: any ) => {

      this.showSpinner = false;
      
      if( data.hits.length === 0 ) {
        this._imgService.setError( 'Opss... no encontramos ningún resultado' );
        return;
      }

      this.totalPages = Math.ceil( data.totalHits / this.imgPage );
      
      this.listImgs = data.hits;
    }, error => {
      this._imgService.setError( 'Opss... ocurrió un error' );
      this.showSpinner = false;
    })
  }

  movePage( value: number ) { 

    this.currentPage += value; 
    this.showSpinner = true;
    this.listImgs = [];
    this.obtainImgs( this.term );
  }

  showPreviousPage() {

    if( this.currentPage === 1 ) {
      return false;
    } else {
      return true;
    }
  }

  showNextPage() {

    if( this.currentPage === this.totalPages ) {
      return false;
    } else {
      return true;
    }
  }

}
