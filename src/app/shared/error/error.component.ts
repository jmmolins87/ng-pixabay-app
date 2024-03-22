import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImgService } from '../../services/img-service.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styles: [
  ]
})
export class ErrorComponent implements OnDestroy {

  text: string = ' ';
  show: boolean = false;
  deleteSbuscription: Subscription;

  constructor( private _imgService: ImgService ) {
    this.deleteSbuscription = this._imgService.getError().subscribe( ( message: string ) => {
      this.showMessage();
      this.text = message;
    })
  }
  
  showMessage() {
    this.show = true;
    setTimeout(() => {
      this.show = false;
    }, 2000)
  }

  ngOnDestroy() {
    this.deleteSbuscription.unsubscribe();
  }

}
