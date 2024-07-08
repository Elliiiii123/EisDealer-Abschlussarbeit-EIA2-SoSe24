namespace EisDealer {
    export class Topping extends Drawable{

        //private isClicked: boolean;

        constructor (_position: Vector){
            //console.log("Toppings Constructor")
            super(_position)
        }
        
        public handleClicked():void{

        }
    
        protected draw():void{
            console.log("Toppings draw")
            this.drawSprinkle();
            this.drawStrawberry();
            this.drawCookie();
        }

        private drawSprinkle():void{

            const x = this.position.x;
            const y = this.position.y;
            let random = this.pseudoRandom(100);

                // Zeichne den viereckigen Behälter
                crc2.beginPath();
                crc2.rect(x - 50, y - 50, 30, 30); // Viereckiger Behälter
                crc2.fillStyle = "#D2B48C"; // Beige Farbe für den Behälter
                crc2.fill();
                crc2.strokeStyle = "black";
                crc2.lineWidth = 2;
                crc2.stroke();
                crc2.closePath();

                // Zeichne Schokostreusel im Behälter
                for (let i = 0; i < 90; i++) {
                    const sprinkleX = x - 47 + random() * 25;
                    const sprinkleY = y - 47 + random() * 25;
                    const sprinkleAngle = random() * 2 * Math.PI;

                    crc2.save();
                    crc2.translate(sprinkleX, sprinkleY);
                    crc2.rotate(sprinkleAngle);

                    crc2.beginPath();
                    crc2.rect(0, 0, 2, 4); // Kleine Rechtecke für Schokostreusel
                    crc2.fillStyle = "#8B4513"; // Schokoladenfarbe
                    crc2.fill();
                    crc2.closePath();

                    crc2.restore();
                }        
        }


        private drawCookie():void{
            
        }


        private drawStrawberry():void{
            
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