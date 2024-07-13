"use strict";
var EisDealer;
(function (EisDealer) {
    class Sauce extends EisDealer.Drawable {
        flavor;
        price;
        color;
        //private isClicked: boolean;
        constructor(_position, _flavor, _price) {
            //console.log("Sauce Constructor")
            super(_position);
            this.flavor = _flavor;
            this.price = _price;
            this.color = this.getColor(_flavor);
        }
        handleClicked(selectionScreen) {
            //selectionScreen.addItem(this);
            selectionScreen.addItem(this);
        }
        draw() {
            //console.log("Sauce draw")
            switch (this.flavor) {
                case EisDealer.SauceFlavour.Chocolate:
                    this.drawChoclate();
                    break;
                case EisDealer.SauceFlavour.Caramel:
                    this.drawCaramel();
                    break;
                case EisDealer.SauceFlavour.Strawberry:
                    this.drawStrawberry();
                    break;
                default:
                    console.error("Unknown flavor: " + this.flavor);
            }
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
        //entsprechende farbe für die darstellung im selected screen
        getColor(_flavor) {
            switch (this.flavor) {
                case EisDealer.SauceFlavour.Caramel:
                    return "#be9b7a";
                case EisDealer.SauceFlavour.Chocolate:
                    return "#3f2017";
                case EisDealer.SauceFlavour.Strawberry:
                    return "#ff69b4";
                default:
                    return "black";
            }
        }
        drawChoclate() {
            //console.log("Sauce choclate")
            const centerX = this.position.x;
            const centerY = this.position.y;
            // Zeichne den Körper der Flasche
            EisDealer.crc2.save();
            EisDealer.crc2.translate(centerX, centerY);
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(0, 0, 15, 0, Math.PI * 2); // Runder Flaschenkörper
            EisDealer.crc2.closePath();
            EisDealer.crc2.fillStyle = "#3f2017"; // Schokoladenfarbe für den Flaschenkörper
            EisDealer.crc2.fill();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 2;
            EisDealer.crc2.stroke();
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(0, -7, 15, 0, Math.PI * 2); // Runder Flaschenkörper
            EisDealer.crc2.closePath();
            EisDealer.crc2.fillStyle = "#3f2017"; // Schokoladenfarbe für den Flaschenkörper
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
            //console.log("Sauce Caramel")
            const centerX = this.position.x;
            const centerY = this.position.y;
            // Zeichne den Körper der Flasche
            EisDealer.crc2.save();
            EisDealer.crc2.translate(centerX, centerY);
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(0, 0, 15, 0, Math.PI * 2); // Runder Flaschenkörper
            EisDealer.crc2.closePath();
            EisDealer.crc2.fillStyle = "#be9b7a"; // Karamellfarbe für den Flaschenkörper
            EisDealer.crc2.fill();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 2;
            EisDealer.crc2.stroke();
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(0, -7, 15, 0, Math.PI * 2); // Runder Flaschenkörper
            EisDealer.crc2.closePath();
            EisDealer.crc2.fillStyle = "#be9b7a"; // Karamellfarbe für den Flaschenkörper
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
        drawStrawberry() {
            //console.log("Sauce Strawberry")
            const centerX = this.position.x;
            const centerY = this.position.y;
            // Zeichne den Körper der Flasche
            EisDealer.crc2.save();
            EisDealer.crc2.translate(centerX, centerY);
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(0, 0, 15, 0, Math.PI * 2); // Runder Flaschenkörper
            EisDealer.crc2.closePath();
            EisDealer.crc2.fillStyle = "#ff69b4"; // Erdbeerfarbe für den Flaschenkörper
            EisDealer.crc2.fill();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 2;
            EisDealer.crc2.stroke();
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(0, -7, 15, 0, Math.PI * 2); // Runder Flaschenkörper
            EisDealer.crc2.closePath();
            EisDealer.crc2.fillStyle = "#ff69b4"; // Erdbeerfarbe für den Flaschenkörper
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
    }
    EisDealer.Sauce = Sauce;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Sauce.js.map