"use strict";
var EisDealer;
(function (EisDealer) {
    class Scoop extends EisDealer.Drawable {
        price;
        flavor;
        //private isClicked: boolean;
        constructor(_position, _flavor, _price) {
            //console.log("Scoop Constructor")
            super(_position);
            this.flavor = _flavor;
            this.price = _price;
        }
        handleClicked() {
        }
        draw() {
            //console.log("Scoop draw")
            switch (this.flavor) {
                case EisDealer.ScoopFlavour.Chocolate:
                    this.drawChocolate();
                    break;
                case EisDealer.ScoopFlavour.Strawberry:
                    this.drawStrawberry();
                    break;
                case EisDealer.ScoopFlavour.Mint:
                    this.drawMint();
                    break;
                case EisDealer.ScoopFlavour.Straciatella:
                    this.drawStraciatella();
                    break;
                case EisDealer.ScoopFlavour.Pistaccio:
                    this.drawPistachio();
                    break;
                case EisDealer.ScoopFlavour.Lemon:
                    this.drawLemon();
                    break;
                default:
                    console.error("Unknown flavor: " + this.flavor);
            }
        }
        drawChocolate() {
            const x = this.position.x;
            const y = this.position.y;
            // Draw the square ice cream (chocolate)
            EisDealer.crc2.save();
            EisDealer.crc2.beginPath();
            EisDealer.crc2.rect(x, y, 50, 50); // Square shape
            EisDealer.crc2.fillStyle = "#8B4513"; // Chocolate color
            EisDealer.crc2.fill();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 1;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            EisDealer.crc2.restore();
        }
        drawMint() {
            const x = this.position.x;
            const y = this.position.y;
            // Draw the square ice cream (chocolate)
            EisDealer.crc2.save();
            EisDealer.crc2.beginPath();
            EisDealer.crc2.rect(x, y, 50, 50); // Square shape
            EisDealer.crc2.fillStyle = "#99f09b"; // Chocolate color
            EisDealer.crc2.fill();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 1;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            EisDealer.crc2.restore();
        }
        drawStrawberry() {
            const x = this.position.x;
            const y = this.position.y;
            // Draw the square ice cream (chocolate)
            EisDealer.crc2.save();
            EisDealer.crc2.beginPath();
            EisDealer.crc2.rect(x, y, 50, 50); // Square shape
            EisDealer.crc2.fillStyle = "#ffc0cb"; // Chocolate color
            EisDealer.crc2.fill();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 1;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            EisDealer.crc2.restore();
        }
        drawStraciatella() {
            const x = this.position.x;
            const y = this.position.y;
            let random = this.pseudoRandom(100);
            // Draw the square ice cream (chocolate)
            EisDealer.crc2.save();
            EisDealer.crc2.beginPath();
            EisDealer.crc2.rect(x, y, 50, 50); // Square shape
            EisDealer.crc2.fillStyle = " #ffffff"; // Chocolate color
            EisDealer.crc2.fill();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 1;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            EisDealer.crc2.restore();
            for (let i = 0; i < 90; i++) {
                const sprinkleX = x + 4 + random() * 45;
                const sprinkleY = y + 4 + random() * 45;
                const sprinkleAngle = random() * 2 * Math.PI;
                EisDealer.crc2.save();
                EisDealer.crc2.translate(sprinkleX, sprinkleY);
                EisDealer.crc2.rotate(sprinkleAngle);
                EisDealer.crc2.beginPath();
                EisDealer.crc2.rect(0, 0, 2, 4); // Kleine Rechtecke für Schokostreusel
                EisDealer.crc2.fillStyle = "black"; // Schokoladenfarbe
                EisDealer.crc2.fill();
                EisDealer.crc2.closePath();
                EisDealer.crc2.restore();
            }
        }
        drawPistachio() {
            const x = this.position.x;
            const y = this.position.y;
            let random = this.pseudoRandom(100);
            // Draw the square ice cream (chocolate)
            EisDealer.crc2.save();
            EisDealer.crc2.beginPath();
            EisDealer.crc2.rect(x, y, 50, 50); // Square shape
            EisDealer.crc2.fillStyle = "#98ff98"; // Chocolate color
            EisDealer.crc2.fill();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 1;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            EisDealer.crc2.restore();
            for (let i = 0; i < 90; i++) {
                const sprinkleX = x + 4 + random() * 45;
                const sprinkleY = y + 4 + random() * 45;
                const sprinkleAngle = random() * 2 * Math.PI;
                EisDealer.crc2.save();
                EisDealer.crc2.translate(sprinkleX, sprinkleY);
                EisDealer.crc2.rotate(sprinkleAngle);
                EisDealer.crc2.beginPath();
                EisDealer.crc2.rect(0, 0, 2, 4); // Kleine Rechtecke für Schokostreusel
                EisDealer.crc2.fillStyle = "green"; // Schokoladenfarbe
                EisDealer.crc2.fill();
                EisDealer.crc2.closePath();
                EisDealer.crc2.restore();
            }
        }
        drawLemon() {
            const x = this.position.x;
            const y = this.position.y;
            // Draw the square ice cream (chocolate)
            EisDealer.crc2.save();
            EisDealer.crc2.beginPath();
            EisDealer.crc2.rect(x, y, 50, 50); // Square shape
            EisDealer.crc2.fillStyle = "#ffff00"; // Chocolate color
            EisDealer.crc2.fill();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 1;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            EisDealer.crc2.restore();
        }
        pseudoRandom(seed) {
            let value = seed;
            return function () {
                value = (value * 9301 + 49297) % 233280;
                return value / 233280;
            };
        }
    }
    EisDealer.Scoop = Scoop;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Scoop.js.map