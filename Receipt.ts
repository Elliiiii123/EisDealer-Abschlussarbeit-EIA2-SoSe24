namespace EisDealer {
    export class Receipt extends Drawable{

        //private isClicked: boolean;

        constructor (_position: Vector){
            //console.log("Receipt Constructor")
            super(_position)
        }
        
        public handleClicked():void{

        }
    
        public draw():void{
            console.log("Receipt draw")

        }
    }
}