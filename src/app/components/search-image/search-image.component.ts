import { Component } from '@angular/core';
import { ImgService } from '../../services/img-service.service';

@Component({
  selector: 'app-search-image',
  templateUrl: './search-image.component.html',
  styleUrls: ['./search-image.component.css']
})
export class SearchImageComponent {

  nameImg: string = '';

  constructor( private _imgService: ImgService ) {}

  searchImg() {
    
    if( this.nameImg === '' ) {
      this._imgService.setError( 'Agregar un texto de busqueda' );
      return;
    }

    this._imgService.sendTerm( this.nameImg );
  }

}
