namespace EisDealer {
    export class Topping extends Drawable{
        flavor: ToppingFlavour;
        public price: number;
        //private isClicked: boolean;

        constructor (_position: Vector, _flavour: ToppingFlavour, _price: number){
            //console.log("Toppings Constructor")
            super(_position);
            this.flavor = _flavour;
            this.price = _price;
        }
        
        public handleClicked():void{

        }
    
        protected draw():void{
            //console.log("Toppings draw")
            switch (this.flavor) {
                case ToppingFlavour.Sprinkles:
                    this.drawSprinkle();
                    break;
                case ToppingFlavour.Cookie:
                    this.drawCookie();
                    break;
                case ToppingFlavour.Strawberry:
                    this.drawStrawberry();
                    break;
                default:
                    console.error("Unknown flavor: " + this.flavor);
            }
        }

        private drawSprinkle():void{

            const x = this.position.x;
            const y = this.position.y;
            let random = this.pseudoRandom(100);

                // Zeichne den viereckigen Behälter
                crc2.save();
                crc2.beginPath();
                crc2.rect(x - 50, y - 50, 30, 30); // Viereckiger Behälter
                crc2.fillStyle = "#D2B48C"; // Beige Farbe für den Behälter
                crc2.fill();
                crc2.strokeStyle = "black";
                crc2.lineWidth = 2;
                crc2.stroke();
                crc2.closePath();
                crc2.restore();

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
            const x = this.position.x;
            const y = this.position.y;
            let random = this.pseudoRandom(100);

            // Zeichne den viereckigen Behälter
            crc2.save();
            crc2.beginPath();
            crc2.rect(x - 50, y - 50, 30, 30); // Viereckiger Behälter
            crc2.fillStyle = "#D2B48C"; // Beige Farbe für den Behälter
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.lineWidth = 2;
            crc2.stroke();
            crc2.closePath();
            crc2.restore();

            // Zeichne Cookie-Stückchen im Behälter
            for (let i = 0; i < 30; i++) { // Weniger Stückchen als bei den Schokostreuseln
                const cookieX = x - 50 + random() * 25;
                const cookieY = y - 50 + random() * 25;
                const cookieSize = 3 + random() * 4; // Größere und variablere Größe für die Stückchen

                crc2.save();
                crc2.translate(cookieX, cookieY);

                crc2.beginPath();
                crc2.rect(0, 0, cookieSize, cookieSize); // Quadrate für Cookie-Stückchen
                crc2.fillStyle = "#8B451F"; // Cookie Farbe (dunkelbraun)
                crc2.fill();
                crc2.closePath();

                crc2.restore();
            }
        }


        private drawStrawberry():void{
            const x = this.position.x;
            const y = this.position.y;
            let random = this.pseudoRandom(100);

            // Zeichne den viereckigen Behälter
            crc2.save();
            crc2.beginPath();
            crc2.rect(x - 50, y - 50, 30, 30); // Viereckiger Behälter
            crc2.fillStyle = "#D2B48C"; // Beige Farbe für den Behälter
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.lineWidth = 2;
            crc2.stroke();
            crc2.closePath();
            crc2.restore();

            // Zeichne kleine Erdbeeren im Behälter
            for (let i = 0; i < 20; i++) { // Weniger Stückchen als bei den Schokostreuseln
                const strawberryX = x - 47 + random() * 23;
                const strawberryY = y - 47 + random() * 23;
                const strawberryWidth = 3 + random() * 2; // Breite der Erdbeerstückchen
                const strawberryHeight = 5 + random() * 2; // Höhe der Erdbeerstückchen
                const strawberryAngle = random() * 2 * Math.PI; // Zufälliger Winkel für die Drehung
            
                crc2.save();
                crc2.translate(strawberryX, strawberryY);
                crc2.rotate(strawberryAngle);
            
                crc2.beginPath();
                crc2.ellipse(0, 0, strawberryWidth, strawberryHeight, 0, 0, 2 * Math.PI); // Ellipsenform für Erdbeerstückchen
                crc2.fillStyle = "red"; // Erdbeerfarbe 
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