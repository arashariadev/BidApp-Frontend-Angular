export class Bid {

    bid_price:number;
    current_datetime:Date;
    
    constructor(bid_price:number=null,current_datetime:Date=null)
    {
        this.bid_price=bid_price;
        this.current_datetime=current_datetime;
    }
}
