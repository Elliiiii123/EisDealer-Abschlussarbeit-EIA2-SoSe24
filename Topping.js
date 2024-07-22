"use strict";
var EisDealer;
(function (EisDealer) {
    class Topping extends EisDealer.Drawable {
        name;
        price;
        color;
        //private isClicked: boolean;
        constructor(_position, _name, _price, _color) {
            //console.log("Toppings Constructor")
            super(_position);
            this.name = _name;
            this.price = _price;
            this.color = _color;
        }
        handleClicked(selectionScreen) {
            selectionScreen.addItem(this);
        }
        drawSymbol(_position) {
            const centerX = _position.x; // Center of the scoop
            const centerY = _position.y;
            let random = this.pseudoRandom(100);
            EisDealer.crc2.save();
            EisDealer.crc2.beginPath();
            // Draw sprinkles on the scoop
            for (let i = 0; i < 50; i++) { // Reduce the number of sprinkles for a looser distribution
                // Randomize the position within a larger range and ensure offsetY is negative
                const offsetX = random() * 30 - 15; // Randomize the position within a larger range
                const offsetY = -(random() * 14); // Ensure offsetY is negative for upper half
                const sprinkleAngle = random() * 2 * Math.PI;
                EisDealer.crc2.save();
                EisDealer.crc2.translate(centerX + offsetX, centerY + offsetY);
                EisDealer.crc2.rotate(sprinkleAngle);
                EisDealer.crc2.beginPath();
                EisDealer.crc2.rect(1, -2, 2, 4); // Small rectangles for sprinkles
                EisDealer.crc2.fillStyle = this.color; // Chocolate color
                EisDealer.crc2.fill();
                EisDealer.crc2.closePath();
                EisDealer.crc2.restore();
            }
            EisDealer.crc2.restore();
        }
        draw() {
            //console.log("Toppings draw")
            const x = this.position.x;
            const y = this.position.y;
            let random = this.pseudoRandom(100);
            // Zeichne den viereckigen Behälter
            EisDealer.crc2.save();
            EisDealer.crc2.beginPath();
            EisDealer.crc2.rect(x - 15, y - 15, 30, 30); // Viereckiger Behälter
            EisDealer.crc2.fillStyle = "#D2B48C"; // Beige Farbe für den Behälter
            EisDealer.crc2.fill();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 2;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            EisDealer.crc2.restore();
            // Zeichne Cookie-Stückchen im Behälter
            for (let i = 0; i < 30; i++) { // Weniger Stückchen als bei den Schokostreuseln
                const cookieX = x - 15 + random() * 25;
                const cookieY = y - 15 + random() * 25;
                const cookieSize = 3 + random() * 4;
                EisDealer.crc2.save();
                EisDealer.crc2.translate(cookieX, cookieY);
                EisDealer.crc2.beginPath();
                EisDealer.crc2.rect(0, 0, cookieSize, cookieSize); // Quadrate für Cookie-Stückchen
                EisDealer.crc2.fillStyle = this.color; // Cookie Farbe (dunkelbraun)
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