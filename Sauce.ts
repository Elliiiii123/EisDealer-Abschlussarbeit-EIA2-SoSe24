namespace EisDealer {
    export class Sauce extends Drawable{
        private flavor: SauceFlavour;
        public price: number;
        private color: string;
        //private isClicked: boolean;

        constructor (_position: Vector, _flavor: SauceFlavour, _price: number){
            //console.log("Sauce Constructor")
            super(_position)
            this.flavor = _flavor
            this.price = _price
            this.color = this.getColor(_flavor);
        }
        
        public handleClicked(selectionScreen: SelectionScreen): void {
            //selectionScreen.addItem(this);
            selectionScreen.addItem(this);

        }
    
        public draw():void{
            //console.log("Sauce draw")
            switch (this.flavor) {
                case SauceFlavour.Chocolate:
                    this.drawChoclate();
                    break;
                case SauceFlavour.Caramel:
                    this.drawCaramel();
                    break;
                case SauceFlavour.Strawberry:
                    this.drawStrawberry();
                    break;
                default:
                    console.error("Unknown flavor: " + this.flavor);
            }
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

        //entsprechende farbe für die darstellung im selected screen
        public getColor(_flavor: SauceFlavour): string {
            switch (this.flavor) {
                case SauceFlavour.Caramel:
                    return "#be9b7a";
                case SauceFlavour.Chocolate:
                    return "#3f2017";
                case SauceFlavour.Strawberry:
                    return "#ff69b4";
                default:
                    return "black";
            }
        }

        private drawChoclate():void{
            //console.log("Sauce choclate")
            const centerX = this.position.x;
            const centerY = this.position.y;

            // Zeichne den Körper der Flasche
            crc2.save();
            crc2.translate(centerX, centerY);

            crc2.beginPath();
            crc2.arc(0, 0, 15, 0, Math.PI * 2); // Runder Flaschenkörper
            crc2.closePath();
            crc2.fillStyle = "#3f2017"; // Schokoladenfarbe für den Flaschenkörper
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.lineWidth = 2;
            crc2.stroke();

            crc2.beginPath();
            crc2.arc(0, -7, 15, 0, Math.PI * 2); // Runder Flaschenkörper
            crc2.closePath();
            crc2.fillStyle = "#3f2017"; // Schokoladenfarbe für den Flaschenkörper
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


        private drawCaramel():void{
            //console.log("Sauce Caramel")
            const centerX = this.position.x;
            const centerY = this.position.y;

            // Zeichne den Körper der Flasche
            crc2.save();
            crc2.translate(centerX, centerY);

            crc2.beginPath();
            crc2.arc(0, 0, 15, 0, Math.PI * 2); // Runder Flaschenkörper
            crc2.closePath();
            crc2.fillStyle = "#be9b7a"; // Karamellfarbe für den Flaschenkörper
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.lineWidth = 2;
            crc2.stroke();

            crc2.beginPath();
            crc2.arc(0, -7, 15, 0, Math.PI * 2); // Runder Flaschenkörper
            crc2.closePath();
            crc2.fillStyle = "#be9b7a"; // Karamellfarbe für den Flaschenkörper
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


        private drawStrawberry():void{
            //console.log("Sauce Strawberry")
            const centerX = this.position.x;
            const centerY = this.position.y;

            // Zeichne den Körper der Flasche
            crc2.save();
            crc2.translate(centerX, centerY);

            crc2.beginPath();
            crc2.arc(0, 0, 15, 0, Math.PI * 2); // Runder Flaschenkörper
            crc2.closePath();
            crc2.fillStyle = "#ff69b4"; // Erdbeerfarbe für den Flaschenkörper
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.lineWidth = 2;
            crc2.stroke();

            crc2.beginPath();
            crc2.arc(0, -7, 15, 0, Math.PI * 2); // Runder Flaschenkörper
            crc2.closePath();
            crc2.fillStyle = "#ff69b4"; // Erdbeerfarbe für den Flaschenkörper
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

    }
}