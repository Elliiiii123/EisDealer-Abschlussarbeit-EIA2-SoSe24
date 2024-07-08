"use strict";
var EisDealer;
(function (EisDealer) {
    class Sauce extends EisDealer.Drawable {
        //private isClicked: boolean;
        constructor(_position) {
            //console.log("Sauce Constructor")
            super(_position);
        }
        handleClicked() {
        }
        draw() {
            console.log("Sauce draw");
            this.drawCaramel();
            this.drawStrawberry();
            this.drawChoclate();
        }
        drawChoclate() {
            console.log("Sauce choclate");
            const centerX = this.position.x;
            const centerY = this.position.y;
            // Zeichne den Körper der Flasche
            EisDealer.crc2.save();
            EisDealer.crc2.translate(centerX, centerY);
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(0, 0, 15, 0, Math.PI * 2); // Runder Flaschenkörper
            EisDealer.crc2.closePath();
            EisDealer.crc2.fillStyle = "#8B4513"; // Schokoladenfarbe für den Flaschenkörper
            EisDealer.crc2.fill();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 2;
            EisDealer.crc2.stroke();
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(0, -7, 15, 0, Math.PI * 2); // Runder Flaschenkörper
            EisDealer.crc2.closePath();
            EisDealer.crc2.fillStyle = "#8B4513"; // Schokoladenfarbe für den Flaschenkörper
            EisDealer.crc2.fill();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 2;
            EisDealer.crc2.stroke();
            // Zeichne den spitzen Deckel der Flasche
            EisDealer.crc2.beginPath();
            EisDealer.crc2.moveTo(0, -20); // Spitze des Deckels
            EisDealer.crc2.lineTo(-5, -6); // Linke Ecke des Deckels
            EisDealer.crc2.lineTo(5, -6); // Rechte Ecke des Deckels
            EisDealer.crc2.closePath();
            EisDealer.crc2.fillStyle = "#D2B48C"; // Beige Farbe für den Deckel
            EisDealer.crc2.fill();
            EisDealer.crc2.stroke();
            EisDealer.crc2.restore(); // Zurücksetzen der Transformation
        }
        drawCaramel() {
        }
        drawStrawberry() {
        }
    }
    EisDealer.Sauce = Sauce;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Sauce.js.map