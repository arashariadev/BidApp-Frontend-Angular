
export class Profile {
    public bio:string;
    public contact_no:string;
    public address:string;
    public pincode:string;
    public is_auctioneer:boolean;
    public is_bidder:boolean;
    
    constructor(
        bio:string=null,
        contact_no:string=null,
        address:string=null,
        pincode:string=null,
        is_auctioneer:boolean=false,
        is_bidder:boolean=false)  
    
        {
            this.bio=bio;
            this.contact_no=contact_no;
            this.address=address;
            this.pincode=pincode;
            this.is_auctioneer=is_auctioneer;
            this.is_bidder=is_bidder;

    }
}
