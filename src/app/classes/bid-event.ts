import { Product } from './product';

export class BidEvent {
            public product:Product;
            public id:number;
            public date_added:Date;
            public start_date:Date;
            public deadline:Date;
            public base_price:number;
            public current_date?:Date;
    constructor(
            product:Product,
            id:number=null,
            date_added:Date=null,
            start_date:Date=null,
            deadline:Date=null,
            base_price:number=null,
            current_date?:Date
               ){
                   this.product=product;
                   this.id=id;
                   this.date_added=date_added;
                   this.start_date=start_date;
                   this.deadline=deadline;
                   this.base_price=base_price;
                   this.current_date=current_date;
               }
               
}
