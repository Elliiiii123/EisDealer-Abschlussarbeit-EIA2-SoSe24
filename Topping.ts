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
        
        public handleClicked(selectionScreen: SelectionScreen):void{
            selectionScreen.addItem(this);
        }

        public drawSymbol(_position: Vector): void {
            const centerX = _position.x; // Center of the scoop
            const centerY = _position.y;
            let random = this.pseudoRandom(100);

            crc2.save();
            crc2.beginPath();

            // Draw sprinkles on the scoop
            for (let i = 0; i < 50; i++) { // Reduce the number of sprinkles for a looser distribution
                // Randomize the position within a larger range and ensure offsetY is negative
                const offsetX = random() * 30 - 15; // Randomize the position within a larger range
                const offsetY = -(random() * 14); // Ensure offsetY is negative for upper half
                const sprinkleAngle = random() * 2 * Math.PI;

                crc2.save();
                crc2.translate(centerX + offsetX, centerY + offsetY);
                crc2.rotate(sprinkleAngle);

                crc2.beginPath();
                crc2.rect(1, -2, 2, 4); // Small rectangles for sprinkles
                crc2.fillStyle = this.color; // Chocolate color
                crc2.fill();
                crc2.closePath();

                crc2.restore();
            }  

            crc2.restore();
        }
    
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

            // Zeichne Cookie-Stückchen im Behälter
            for (let i = 0; i < 30; i++) { // Weniger Stückchen als bei den Schokostreuseln
                const cookieX = x - 15 + random() * 25;
                const cookieY = y - 15 + random() * 25;
                const cookieSize = 3 + random() * 4;

                crc2.save();
                crc2.translate(cookieX, cookieY);

                crc2.beginPath();
                crc2.rect(0, 0, cookieSize, cookieSize); // Quadrate für Cookie-Stückchen
                crc2.fillStyle = this.color; // Cookie Farbe (dunkelbraun)
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