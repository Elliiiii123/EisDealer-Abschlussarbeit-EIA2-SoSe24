namespace EisDealer {
    
    export class Door extends Moveable {
        state: DoorState;

        constructor(_position: Vector, _speed: Vector, _direction: Vector){
            super(_position,_speed,_direction);
            this.position=_position;
            this.speed=_speed;
            this.direction=_direction;
           
        }

        protected move():void{

        }

        protected draw():void{
            this.drawOpen();
            this.drawClose();
        }

        private drawOpen():void{

        }

        private drawClose():void{
            //console.log("draw closed door")
            crc2.save();
            crc2.translate(this.position.x,this.position.y);
            crc2.beginPath();
            crc2.moveTo(0,0);
            crc2.lineTo(0,50);
            crc2.fillStyle = "brown";
            crc2.stroke();
            crc2.restore();
        }
    }
}