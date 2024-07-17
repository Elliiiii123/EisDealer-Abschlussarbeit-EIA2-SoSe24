"use strict";
var EisDealer;
(function (EisDealer) {
    class Sauce extends EisDealer.Drawable {
        name;
        price;
        color;
        //private isClicked: boolean;
        constructor(_position, _name, _price, _color) {
            //console.log("Sauce Constructor")
            super(_position);
            this.name = _name;
            this.price = _price;
            this.color = _color;
        }
        handleClicked(selectionScreen) {
            //selectionScreen.addItem(this);
            selectionScreen.addItem(this);
        }
        draw() {
            //console.log("Sauce draw")
            //console.log("Sauce choclate")
            const centerX = this.position.x;
            const centerY = this.position.y;
            // Zeichne den Körper der Flasche
            EisDealer.crc2.save();
            EisDealer.crc2.translate(centerX, centerY);
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(0, 0, 15, 0, Math.PI * 2); // Runder Flaschenkörper
            EisDealer.crc2.closePath();
            EisDealer.crc2.fillStyle = this.color; // Schokoladenfarbe für den Flaschenkörper
            EisDealer.crc2.fill();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 2;
            EisDealer.crc2.stroke();
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(0, -7, 15, 0, Math.PI * 2); // Runder Flaschenkörper
            EisDealer.crc2.closePath();
            EisDealer.crc2.fillStyle = this.color; // Schokoladenfarbe für den Flaschenkörper
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
        drawSymbol(_position) {
            const radius = 20; // Der Radius der Kugel
            const waveHeight = 5; // Die Höhe der Wellen an der unteren Kante
            const waveCount = 5; // Die Anzahl der Wellen
            EisDealer.crc2.save();
            EisDealer.crc2.beginPath();
            // Zeichne die obere Halbkreis-Kante der Sauce
            EisDealer.crc2.arc(_position.x, _position.y, radius, Math.PI, 2 * Math.PI, false);
            // Zeichne die wellige untere Kante der Sauce
            for (let i = 0; i <= waveCount; i++) {
                const x = _position.x - radius + (2 * radius / waveCount) * i;
                const y = _position.y + waveHeight * (i % 2 == 0 ? 1 : -1);
                EisDealer.crc2.lineTo(x, y);
            }
            EisDealer.crc2.closePath();
            EisDealer.crc2.fillStyle = this.color;
            EisDealer.crc2.fill();
            EisDealer.crc2.strokeStyle = this.color;
            EisDealer.crc2.lineWidth = 1;
            EisDealer.crc2.stroke();
            EisDealer.crc2.restore();
        }
    }
    EisDealer.Sauce = Sauce;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Sauce.js.map