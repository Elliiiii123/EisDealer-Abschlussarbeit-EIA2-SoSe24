namespace EisDealer {
    export class Sauce extends Drawable{
        public name: string;
        public price: number;
        private color: string;
        //private isClicked: boolean;

        constructor (_position: Vector, _name: string, _price: number, _color: string){
            //console.log("Sauce Constructor")
            super(_position)
            this.name = _name;
            this.price = _price;
            this.color = _color;
        }
        
        public handleClicked(selectionScreen: SelectionScreen): void {
            //selectionScreen.addItem(this);
            selectionScreen.addItem(this);

        }
    
        public draw():void{
            //console.log("Sauce draw")
            //console.log("Sauce choclate")
            const centerX = this.position.x;
            const centerY = this.position.y;

            // Zeichne den Körper der Flasche
            crc2.save();
            crc2.translate(centerX, centerY);

            crc2.beginPath();
            crc2.arc(0, 0, 15, 0, Math.PI * 2); // Runder Flaschenkörper
            crc2.closePath();
            crc2.fillStyle = this.color; // Schokoladenfarbe für den Flaschenkörper
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.lineWidth = 2;
            crc2.stroke();

            crc2.beginPath();
            crc2.arc(0, -7, 15, 0, Math.PI * 2); // Runder Flaschenkörper
            crc2.closePath();
            crc2.fillStyle = this.color; // Schokoladenfarbe für den Flaschenkörper
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.lineWidth = 2;
            crc2.stroke();

            // Zeichne den spitzen Deckel der Flasche
            crc2.beginPath();
            crc2.moveTo(0, -20); // Spitze des Deckels
            crc2.lineTo(-5, -6); // Linke Ecke des Deckels
            crc2.lineTo(5, -6); // Rechte Ecke des Deckels
            crc2.closePath();
            crc2.fillStyle = "#D2B48C"; // Beige Farbe für den Deckel
            crc2.fill();
            crc2.stroke();

            crc2.restore(); // Zurücksetzen der Transformation
        }

        public drawSymbol(_position: Vector): void {
            const radius = 20;  // Der Radius der Kugel
            const waveHeight = 5;  // Die Höhe der Wellen an der unteren Kante
            const waveCount = 5;  // Die Anzahl der Wellen

            crc2.save();
            crc2.beginPath();

            // Zeichne die obere Halbkreis-Kante der Sauce
            crc2.arc(_position.x, _position.y, radius, Math.PI, 2 * Math.PI, false);

            // Zeichne die wellige untere Kante der Sauce
            for (let i = 0; i <= waveCount; i++) {
                const x = _position.x - radius + (2 * radius / waveCount) * i;
                const y = _position.y + waveHeight * (i % 2 == 0 ? 1 : -1);
                crc2.lineTo(x, y);
            }

            crc2.closePath();
            crc2.fillStyle = this.color;
            crc2.fill();
            crc2.strokeStyle = this.color;
            crc2.lineWidth = 1;
            crc2.stroke();

            crc2.restore();
        }

    }
}