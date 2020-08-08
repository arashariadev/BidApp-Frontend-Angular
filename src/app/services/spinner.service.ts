import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SpinnerService {

  public spinner=new BehaviorSubject<Boolean>(false);

  constructor() { }

  add(){

    this.spinner.next(true);
}
get(){
  return this.spinner.asObservable();
}

remove(){
  this.spinner.next(false);
}

}