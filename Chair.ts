namespace EisDealer {
    export class Chair extends Drawable{
        public rotation: number;
        public occupied: boolean = false;
        public id: number;

        constructor (_position: Vector, _rotation: number,_id: number){
            //console.log("Chair Constructor")
            super(_position)
            this.rotation = _rotation;
            this.id = _id;
        }

        public isOccupied(): boolean {
            return this.occupied;
        }

        public occupy(): void {
            this.occupied = true;
        }

        public free():void{
            this.occupied = false;
        }
    
        public draw():void{
            //console.log("Chair draw")
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.rotate(this.rotation * Math.PI / 180);
            
            // Zeichne Sitzfläche
            crc2.beginPath();
            crc2.rect(0, 0, 50, 50); // Ein Rechteck für die Sitzfläche
            crc2.fillStyle = "brown";
            crc2.strokeStyle = "black";
            crc2.lineWidth = 2;
            crc2.stroke();
            crc2.fill();
            crc2.closePath();

            crc2.beginPath();
            crc2.rect(-5, 40, 60, 10); // Ein Rechteck für die Lehne
            crc2.fillStyle = "brown";
            crc2.strokeStyle = "black";
            crc2.lineWidth = 2;
            crc2.stroke();
            crc2.fill();
            crc2.closePath();
            
            // Zeichne Beine
            crc2.beginPath();
            crc2.moveTo(5, 50);
            crc2.lineTo(7, 55);
            crc2.moveTo(45, 50);
            crc2.lineTo(47, 55);
            crc2.moveTo(50, 2);
            crc2.lineTo(52, 7);
            crc2.strokeStyle = "black";
            crc2.lineWidth = 2;
            crc2.stroke();
            crc2.closePath();
            
            crc2.restore();

        }
    }
}