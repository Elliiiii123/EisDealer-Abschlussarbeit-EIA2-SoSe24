namespace EisDealer {
    export class Trash extends Drawable{

        //private isClicked: boolean;

        constructor (_position: Vector){
            //console.log("Trash Constructor")
            super(_position)
        }
        
        public handleClicked():void{

        }
    
        protected draw():void{
            console.log("Trash draw")

        }
    }
}