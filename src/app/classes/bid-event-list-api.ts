import { BidEvent } from '@app/classes/bid-event';
//represents the way bid events are received from django-rest-api
export interface BidEventListAPI {
    
        count:number;
        next: number;
        previous: null;
        results: BidEvent[];
        
}
