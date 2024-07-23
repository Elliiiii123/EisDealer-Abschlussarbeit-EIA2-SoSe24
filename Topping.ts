namespace EisDealer {
    export class Topping extends Drawable{
        public name: string;
        public price: number;
        public color: string;
        //private isClicked: boolean;

        constructor (_position: Vector, _name: string, _price: number, _color: string){
            //console.log("Toppings Constructor")
            super(_position);
            this.name = _name;
            this.price = _price;
            this.color = _color;
        }
        
        //Topping zu selection screen hinzufügen
        public handleClicked(selectionScreen: SelectionScreen):void{
            selectionScreen.addItem(this);
        }

        //Topping im Screen zeichnen
        public drawSymbol(_position: Vector): void {
            const centerX = _position.x; 
            const centerY = _position.y;
            let random = this.pseudoRandom(100);

            crc2.save();
            crc2.beginPath();

            for (let i = 0; i < 50; i++) { 
               
                const offsetX = random() * 30 - 15; 
                const offsetY = -(random() * 14); 
                const sprinkleAngle = random() * 2 * Math.PI;

                crc2.save();
                crc2.translate(centerX + offsetX, centerY + offsetY);
                crc2.rotate(sprinkleAngle);

                crc2.beginPath();
                crc2.rect(1, -2, 2, 4); 
                crc2.fillStyle = this.color;
                crc2.fill();
                crc2.closePath();

                crc2.restore();
            }  

            crc2.restore();
        }
    
        //Zeichne Toppings in Theke
        public draw():void{
            //console.log("Toppings draw")
            const x = this.position.x;
            const y = this.position.y;
            let random = this.pseudoRandom(100);

            // Zeichne den viereckigen Behälter
            crc2.save();
            crc2.beginPath();
            crc2.rect(x - 15, y - 15, 30, 30); // Viereckiger Behälter
            crc2.fillStyle = "#D2B48C"; // Beige Farbe für den Behälter
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.lineWidth = 2;
            crc2.stroke();
            crc2.closePath();
            crc2.restore();

            // Zeichne Topping-Stückchen im Behälter
            for (let i = 0; i < 30; i++) { 
                const cookieX = x - 15 + random() * 25;
                const cookieY = y - 15 + random() * 25;
                const cookieSize = 3 + random() * 4;

                crc2.save();
                crc2.translate(cookieX, cookieY);

                crc2.beginPath();
                crc2.rect(0, 0, cookieSize, cookieSize); 
                crc2.fillStyle = this.color; 
                crc2.fill();
                crc2.closePath();

                crc2.restore();
            }
        }

        private pseudoRandom(seed: number): () => number {
            let value = seed;
            return function () {
              value = (value * 9301 + 49297) % 233280;
              return value / 233280;
            };
        }

    }
    
}