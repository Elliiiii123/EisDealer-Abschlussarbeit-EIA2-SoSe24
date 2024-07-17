namespace EisDealer {
    export class Scoop extends Drawable{
        public price: number;
        public name: string;
        public color: string;
        //private isClicked: boolean;

        constructor (_position: Vector,  _name: string, _price: number, _color: string){
            //console.log("Scoop Constructor")
            super(_position)
            this.price = _price;
            this.name = _name;
            //this.color = this.getColor(_flavor);
            this.color = _color;
        }
        
        public handleClicked(selectionScreen: SelectionScreen): void {
            selectionScreen.addItem(this);
        }

        public drawSymbol(position: Vector): void {
            crc2.save();
            crc2.fillStyle = this.color;
            crc2.beginPath();
            crc2.arc(position.x, position.y, 20, 0, 2 * Math.PI); // Draw a circle with radius 20
            crc2.fill();
            crc2.restore();
        }

        public draw():void{

            const x = this.position.x;
            const y = this.position.y;

            // Draw the square ice cream (chocolate)
            crc2.save();
            crc2.beginPath();
            crc2.rect(x, y,50, 50); // Square shape
            crc2.fillStyle = this.color; // Chocolate color
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.lineWidth = 1;
            crc2.stroke();
            crc2.closePath();
            crc2.restore();
        }

        // private drawMint():void{
        //     const x = this.position.x;
        //     const y = this.position.y;

        //     // Draw the square ice cream (chocolate)
        //     crc2.save();
        //     crc2.beginPath();
        //     crc2.rect(x, y,50, 50); // Square shape
        //     crc2.fillStyle = "#99f09b"; // Chocolate color
        //     crc2.fill();
        //     crc2.strokeStyle = "black";
        //     crc2.lineWidth = 1;
        //     crc2.stroke();
        //     crc2.closePath();
        //     crc2.restore();
        // }


        // private drawStrawberry():void{
        //     const x = this.position.x;
        //     const y = this.position.y;

        //     // Draw the square ice cream (chocolate)
        //     crc2.save();
        //     crc2.beginPath();
        //     crc2.rect(x, y,50, 50); // Square shape
        //     crc2.fillStyle = "#ffc0cb"; // Strawberry color
        //     crc2.fill();
        //     crc2.strokeStyle = "black";
        //     crc2.lineWidth = 1;
        //     crc2.stroke();
        //     crc2.closePath();
        //     crc2.restore();
        // }


        // private drawStraciatella():void{
            
        //     const x = this.position.x;
        //     const y = this.position.y;
        //     let random = this.pseudoRandom(100);

        //     // Draw the square ice cream (chocolate)
        //     crc2.save();
        //     crc2.beginPath();
        //     crc2.rect(x, y,50, 50); // Square shape
        //     crc2.fillStyle = " #ffffff"; // Chocolate color
        //     crc2.fill();
        //     crc2.strokeStyle = "black";
        //     crc2.lineWidth = 1;
        //     crc2.stroke();
        //     crc2.closePath();
        //     crc2.restore();

        //     for (let i = 0; i < 90; i++) {
        //         const sprinkleX = x + 4 + random() * 45;
        //         const sprinkleY = y + 4 + random() * 45;
        //         const sprinkleAngle = random() * 2 * Math.PI;

        //         crc2.save();
        //         crc2.translate(sprinkleX, sprinkleY);
        //         crc2.rotate(sprinkleAngle);

        //         crc2.beginPath();
        //         crc2.rect(0, 0, 2, 4); // Kleine Rechtecke für Schokostreusel
        //         crc2.fillStyle = "black"; // Schokoladenfarbe
        //         crc2.fill();
        //         crc2.closePath();

        //         crc2.restore();
        //     }    
        // }

        // private drawPistachio():void{
        //     const x = this.position.x;
        //     const y = this.position.y;
        //     let random = this.pseudoRandom(100);

        //     // Draw the square ice cream (chocolate)
        //     crc2.save();
        //     crc2.beginPath();
        //     crc2.rect(x, y,50, 50); // Square shape
        //     crc2.fillStyle = "#90b083"; // Pistaccio color
        //     crc2.fill();
        //     crc2.strokeStyle = "black";
        //     crc2.lineWidth = 1;
        //     crc2.stroke();
        //     crc2.closePath();
        //     crc2.restore();

        //     for (let i = 0; i < 90; i++) {
        //         const sprinkleX = x + 4 + random() * 45;
        //         const sprinkleY = y + 4 + random() * 45;
        //         const sprinkleAngle = random() * 2 * Math.PI;

        //         crc2.save();
        //         crc2.translate(sprinkleX, sprinkleY);
        //         crc2.rotate(sprinkleAngle);

        //         crc2.beginPath();
        //         crc2.rect(0, 0, 2, 4); // Kleine Rechtecke für Schokostreusel
        //         crc2.fillStyle = "green"; // Schokoladenfarbe
        //         crc2.fill();
        //         crc2.closePath();

        //         crc2.restore();
        //     }  
        // }

        // private drawLemon():void{
        //     const x = this.position.x;
        //     const y = this.position.y;

        //     // Draw the square ice cream (chocolate)
        //     crc2.save();
        //     crc2.beginPath();
        //     crc2.rect(x, y,50, 50); // Square shape
        //     crc2.fillStyle = "#ffff00"; // Lemon color
        //     crc2.fill();
        //     crc2.strokeStyle = "black";
        //     crc2.lineWidth = 1;
        //     crc2.stroke();
        //     crc2.closePath();
        //     crc2.restore();
        // }

        // private pseudoRandom(seed: number): () => number {
        //     let value = seed;
        //     return function () {
        //       value = (value * 9301 + 49297) % 233280;
        //       return value / 233280;
        //     };
        // }
    }
    
}