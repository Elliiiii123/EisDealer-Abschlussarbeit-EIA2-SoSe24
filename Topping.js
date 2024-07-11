"use strict";
var EisDealer;
(function (EisDealer) {
    class Topping extends EisDealer.Drawable {
        flavor;
        price;
        //private isClicked: boolean;
        constructor(_position, _flavour, _price) {
            //console.log("Toppings Constructor")
            super(_position);
            this.flavor = _flavour;
            this.price = _price;
        }
        handleClicked() {
        }
        draw() {
            //console.log("Toppings draw")
            switch (this.flavor) {
                case EisDealer.ToppingFlavour.Sprinkles:
                    this.drawSprinkle();
                    break;
                case EisDealer.ToppingFlavour.Cookie:
                    this.drawCookie();
                    break;
                case EisDealer.ToppingFlavour.Strawberry:
                    this.drawStrawberry();
                    break;
                default:
                    console.error("Unknown flavor: " + this.flavor);
            }
        }
        drawSprinkle() {
            const x = this.position.x;
            const y = this.position.y;
            let random = this.pseudoRandom(100);
            // Zeichne den viereckigen Behälter
            EisDealer.crc2.save();
            EisDealer.crc2.beginPath();
            EisDealer.crc2.rect(x - 50, y - 50, 30, 30); // Viereckiger Behälter
            EisDealer.crc2.fillStyle = "#D2B48C"; // Beige Farbe für den Behälter
            EisDealer.crc2.fill();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 2;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            EisDealer.crc2.restore();
            // Zeichne Schokostreusel im Behälter
            for (let i = 0; i < 90; i++) {
                const sprinkleX = x - 47 + random() * 25;
                const sprinkleY = y - 47 + random() * 25;
                const sprinkleAngle = random() * 2 * Math.PI;
                EisDealer.crc2.save();
                EisDealer.crc2.translate(sprinkleX, sprinkleY);
                EisDealer.crc2.rotate(sprinkleAngle);
                EisDealer.crc2.beginPath();
                EisDealer.crc2.rect(0, 0, 2, 4); // Kleine Rechtecke für Schokostreusel
                EisDealer.crc2.fillStyle = "#8B4513"; // Schokoladenfarbe
                EisDealer.crc2.fill();
                EisDealer.crc2.closePath();
                EisDealer.crc2.restore();
            }
        }
        drawCookie() {
            const x = this.position.x;
            const y = this.position.y;
            let random = this.pseudoRandom(100);
            // Zeichne den viereckigen Behälter
            EisDealer.crc2.save();
            EisDealer.crc2.beginPath();
            EisDealer.crc2.rect(x - 50, y - 50, 30, 30); // Viereckiger Behälter
            EisDealer.crc2.fillStyle = "#D2B48C"; // Beige Farbe für den Behälter
            EisDealer.crc2.fill();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 2;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            EisDealer.crc2.restore();
            // Zeichne Cookie-Stückchen im Behälter
            for (let i = 0; i < 30; i++) { // Weniger Stückchen als bei den Schokostreuseln
                const cookieX = x - 50 + random() * 25;
                const cookieY = y - 50 + random() * 25;
                const cookieSize = 3 + random() * 4; // Größere und variablere Größe für die Stückchen
                EisDealer.crc2.save();
                EisDealer.crc2.translate(cookieX, cookieY);
                EisDealer.crc2.beginPath();
                EisDealer.crc2.rect(0, 0, cookieSize, cookieSize); // Quadrate für Cookie-Stückchen
                EisDealer.crc2.fillStyle = "#8B451F"; // Cookie Farbe (dunkelbraun)
                EisDealer.crc2.fill();
                EisDealer.crc2.closePath();
                EisDealer.crc2.restore();
            }
        }
        drawStrawberry() {
            const x = this.position.x;
            const y = this.position.y;
            let random = this.pseudoRandom(100);
            // Zeichne den viereckigen Behälter
            EisDealer.crc2.save();
            EisDealer.crc2.beginPath();
            EisDealer.crc2.rect(x - 50, y - 50, 30, 30); // Viereckiger Behälter
            EisDealer.crc2.fillStyle = "#D2B48C"; // Beige Farbe für den Behälter
            EisDealer.crc2.fill();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 2;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            EisDealer.crc2.restore();
            // Zeichne kleine Erdbeeren im Behälter
            for (let i = 0; i < 20; i++) { // Weniger Stückchen als bei den Schokostreuseln
                const strawberryX = x - 47 + random() * 23;
                const strawberryY = y - 47 + random() * 23;
                const strawberryWidth = 3 + random() * 2; // Breite der Erdbeerstückchen
                const strawberryHeight = 5 + random() * 2; // Höhe der Erdbeerstückchen
                const strawberryAngle = random() * 2 * Math.PI; // Zufälliger Winkel für die Drehung
                EisDealer.crc2.save();
                EisDealer.crc2.translate(strawberryX, strawberryY);
                EisDealer.crc2.rotate(strawberryAngle);
                EisDealer.crc2.beginPath();
                EisDealer.crc2.ellipse(0, 0, strawberryWidth, strawberryHeight, 0, 0, 2 * Math.PI); // Ellipsenform für Erdbeerstückchen
                EisDealer.crc2.fillStyle = "red"; // Erdbeerfarbe 
                EisDealer.crc2.fill();
                EisDealer.crc2.closePath();
                EisDealer.crc2.restore();
            }
        }
        pseudoRandom(seed) {
            let value = seed;
            return function () {
                value = (value * 9301 + 49297) % 233280;
                return value / 233280;
            };
        }
    }
    EisDealer.Topping = Topping;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Topping.js.map