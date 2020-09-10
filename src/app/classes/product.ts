export class Product {

            public name:string;
            public category:string;
            public description:string;

            constructor(
                name:string=null,
                category:string=null,
                description:string=null,
               )
               {

                this.category=category;
                this.description=description;
                this.name=name;
               }
}
