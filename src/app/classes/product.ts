export class Product {

                public name:string;
               public category:string;
               public description:string;
               public image:string;

    constructor(name:string=null,
                category:string=null,
               description:string=null,
               image:string=null){

                this.category=category;
                this.description=description;
                this.image=image;
                this.name=name;
               }
}
