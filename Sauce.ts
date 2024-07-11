namespace EisDealer {
    export class Sauce extends Drawable{
        private flavor: SauceFlavour;
        public price: number;
        //private isClicked: boolean;

        constructor (_position: Vector, _flavor: SauceFlavour, _price: number){
            //console.log("Sauce Constructor")
            super(_position)
            this.flavor = _flavor
            this.price = _price

        }
        
        public handleClicked():void{

        }
    
        protected draw():void{
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
            crc2.fillStyle = "#8B4513"; // Schokoladenfarbe für den Flaschenkörper
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.lineWidth = 2;
            crc2.stroke();

            crc2.beginPath();
            crc2.arc(0, -7, 15, 0, Math.PI * 2); // Runder Flaschenkörper
            crc2.closePath();
            crc2.fillStyle = "#8B4513"; // Schokoladenfarbe für den Flaschenkörper
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
            crc2.fillStyle = "gold"; // Karamellfarbe für den Flaschenkörper
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.lineWidth = 2;
            crc2.stroke();

            crc2.beginPath();
            crc2.arc(0, -7, 15, 0, Math.PI * 2); // Runder Flaschenkörper
            crc2.closePath();
            crc2.fillStyle = "gold"; // Karamellfarbe für den Flaschenkörper
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
            crc2.fillStyle = "red"; // Erdbeerfarbe für den Flaschenkörper
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.lineWidth = 2;
            crc2.stroke();

            crc2.beginPath();
            crc2.arc(0, -7, 15, 0, Math.PI * 2); // Runder Flaschenkörper
            crc2.closePath();
            crc2.fillStyle = "red"; // Erdbeerfarbe für den Flaschenkörper
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