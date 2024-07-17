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
            //console.log("Receipt draw")
            crc2.fillStyle = "white";
            crc2.fillRect(this.position.x, this.position.y, 20, 10);
            crc2.fillStyle = "white";
            crc2.fillText("Receipt", this.position.x, this.position.y + 10);

        }
    }
}