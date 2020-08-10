import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SpinnerService {

  /* shows spinner on navigation bar whenever a new request is processed */
  public spinner=new BehaviorSubject<Boolean>(false);

  constructor() { }

  /* these methods turn spinner on/off */
  add(){

    this.spinner.next(true);
}

/* this returns latest value to each component */
get(){
  return this.spinner.asObservable();
}

remove(){
  this.spinner.next(false);
}

}