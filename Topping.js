"use strict";
var EisDealer;
(function (EisDealer) {
    class Topping extends EisDealer.Drawable {
        //private isClicked: boolean;
        constructor(_position) {
            //console.log("Toppings Constructor")
            super(_position);
        }
        handleClicked() {
        }
        draw() {
            console.log("Toppings draw");
            this.drawSprinkle();
            this.drawStrawberry();
            this.drawCookie();
        }
        drawSprinkle() {
            const x = this.position.x;
            const y = this.position.y;
            let random = this.pseudoRandom(100);
            // Zeichne den viereckigen Behälter
            EisDealer.crc2.beginPath();
            EisDealer.crc2.rect(x - 50, y - 50, 30, 30); // Viereckiger Behälter
            EisDealer.crc2.fillStyle = "#D2B48C"; // Beige Farbe für den Behälter
            EisDealer.crc2.fill();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 2;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
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
        }
        drawStrawberry() {
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