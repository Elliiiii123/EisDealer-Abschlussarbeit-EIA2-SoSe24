namespace EisDealer {
    export class Scoop extends Drawable{
        public price: number;
        private flavor: ScoopFlavour;
        //private isClicked: boolean;

        constructor (_position: Vector, _flavor: ScoopFlavour, _price: number){
            //console.log("Scoop Constructor")
            super(_position)
            this.flavor = _flavor;
            this.price = _price;
        }
        
        public handleClicked():void{

        }
    
        protected draw():void{
            //console.log("Scoop draw")
            switch (this.flavor) {
                case ScoopFlavour.Chocolate:
                    this.drawChocolate();
                    break;
                case ScoopFlavour.Strawberry:
                    this.drawStrawberry();
                    break;
                case ScoopFlavour.Mint:
                    this.drawMint();
                    break;
                case ScoopFlavour.Straciatella:
                    this.drawStraciatella();
                    break;
                case ScoopFlavour.Pistaccio:
                    this.drawPistachio();
                    break;
                case ScoopFlavour.Lemon:
                    this.drawLemon();
                    break;
                default:
                    console.error("Unknown flavor: " + this.flavor);
            }

        }

        private drawChocolate():void{

            const x = this.position.x;
            const y = this.position.y;

            // Draw the square ice cream (chocolate)
            crc2.save();
            crc2.beginPath();
            crc2.rect(x, y,50, 50); // Square shape
            crc2.fillStyle = "#8B4513"; // Chocolate color
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.lineWidth = 1;
            crc2.stroke();
            crc2.closePath();
            crc2.restore();
        }


        private drawMint():void{
            const x = this.position.x;
            const y = this.position.y;

            // Draw the square ice cream (chocolate)
            crc2.save();
            crc2.beginPath();
            crc2.rect(x, y,50, 50); // Square shape
            crc2.fillStyle = "#99f09b"; // Chocolate color
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.lineWidth = 1;
            crc2.stroke();
            crc2.closePath();
            crc2.restore();
        }


        private drawStrawberry():void{
            const x = this.position.x;
            const y = this.position.y;

            // Draw the square ice cream (chocolate)
            crc2.save();
            crc2.beginPath();
            crc2.rect(x, y,50, 50); // Square shape
            crc2.fillStyle = "#ffc0cb"; // Chocolate color
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.lineWidth = 1;
            crc2.stroke();
            crc2.closePath();
            crc2.restore();
        }


        private drawStraciatella():void{
            
            const x = this.position.x;
            const y = this.position.y;
            let random = this.pseudoRandom(100);

            // Draw the square ice cream (chocolate)
            crc2.save();
            crc2.beginPath();
            crc2.rect(x, y,50, 50); // Square shape
            crc2.fillStyle = " #ffffff"; // Chocolate color
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.lineWidth = 1;
            crc2.stroke();
            crc2.closePath();
            crc2.restore();

            for (let i = 0; i < 90; i++) {
                const sprinkleX = x + 4 + random() * 45;
                const sprinkleY = y + 4 + random() * 45;
                const sprinkleAngle = random() * 2 * Math.PI;

                crc2.save();
                crc2.translate(sprinkleX, sprinkleY);
                crc2.rotate(sprinkleAngle);

                crc2.beginPath();
                crc2.rect(0, 0, 2, 4); // Kleine Rechtecke für Schokostreusel
                crc2.fillStyle = "black"; // Schokoladenfarbe
                crc2.fill();
                crc2.closePath();

                crc2.restore();
            }    
        }

        private drawPistachio():void{
            const x = this.position.x;
            const y = this.position.y;
            let random = this.pseudoRandom(100);

            // Draw the square ice cream (chocolate)
            crc2.save();
            crc2.beginPath();
            crc2.rect(x, y,50, 50); // Square shape
            crc2.fillStyle = "#98ff98"; // Chocolate color
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.lineWidth = 1;
            crc2.stroke();
            crc2.closePath();
            crc2.restore();

            for (let i = 0; i < 90; i++) {
                const sprinkleX = x + 4 + random() * 45;
                const sprinkleY = y + 4 + random() * 45;
                const sprinkleAngle = random() * 2 * Math.PI;

                crc2.save();
                crc2.translate(sprinkleX, sprinkleY);
                crc2.rotate(sprinkleAngle);

                crc2.beginPath();
                crc2.rect(0, 0, 2, 4); // Kleine Rechtecke für Schokostreusel
                crc2.fillStyle = "green"; // Schokoladenfarbe
                crc2.fill();
                crc2.closePath();

                crc2.restore();
            }  
        }

        private drawLemon():void{
            const x = this.position.x;
            const y = this.position.y;

            // Draw the square ice cream (chocolate)
            crc2.save();
            crc2.beginPath();
            crc2.rect(x, y,50, 50); // Square shape
            crc2.fillStyle = "#ffff00"; // Chocolate color
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.lineWidth = 1;
            crc2.stroke();
            crc2.closePath();
            crc2.restore();
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