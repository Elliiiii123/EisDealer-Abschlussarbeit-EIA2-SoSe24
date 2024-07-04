namespace EisDealer {
    export class Chair extends Drawable{

        //private isClicked: boolean;

        constructor (_position: Vector){
            //console.log("Chair Constructor")
            super(_position)
        }
        
        public handleClicked():void{

        }
    
        protected draw():void{
            console.log("Chair draw")

        }
    }
}