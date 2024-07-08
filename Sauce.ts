namespace EisDealer {
    export class Sauce extends Drawable{

        //private isClicked: boolean;

        constructor (_position: Vector){
            //console.log("Sauce Constructor")
            super(_position)

        }
        
        public handleClicked():void{

        }
    
        protected draw():void{
            console.log("Sauce draw")
            this.drawCaramel();
            this.drawStrawberry();
            this.drawChoclate();
        }

        private drawChoclate():void{
            console.log("Sauce choclate")
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
            
        }


        private drawStrawberry():void{
            
        }

    }
}