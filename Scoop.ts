namespace EisDealer {
    export class Scoop extends Drawable{
        public price: number;
        public name: string;
        public color: string;

        constructor (_position: Vector,  _name: string, _price: number, _color: string){
            //console.log("Scoop Constructor")
            super(_position)
            this.price = _price;
            this.name = _name;
            //this.color = this.getColor(_flavor);
            this.color = _color;
        }
        
        //Scoop nach Klick im Selection screen anzeigen
        public handleClicked(selectionScreen: SelectionScreen): void {
            selectionScreen.addItem(this);
        }

        //Zeichen Scoop im Screen
        public drawSymbol(position: Vector): void {
            crc2.save();
            crc2.fillStyle = this.color;
            crc2.beginPath();
            crc2.arc(position.x, position.y, 20, 0, 2 * Math.PI); // Draw a circle with radius 20
            crc2.fill();
            crc2.restore();
        }

        //Zeichne Eis an Theke
        public draw():void{

            const x = this.position.x;
            const y = this.position.y;

            crc2.save();
            crc2.beginPath();
            crc2.rect(x, y,50, 50); 
            crc2.fillStyle = this.color; 
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.lineWidth = 1;
            crc2.stroke();
            crc2.closePath();
            crc2.restore();
        }
    }    
}