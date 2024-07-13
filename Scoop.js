"use strict";
var EisDealer;
(function (EisDealer) {
    class Scoop extends EisDealer.Drawable {
        price;
        flavor;
        color;
        //private isClicked: boolean;
        constructor(_position, _flavor, _price) {
            //console.log("Scoop Constructor")
            super(_position);
            this.flavor = _flavor;
            this.price = _price;
            this.color = this.getColor(_flavor);
        }
        handleClicked(selectionScreen) {
            selectionScreen.addItem(this);
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
        drawSymbol(position) {
            EisDealer.crc2.save();
            EisDealer.crc2.fillStyle = this.color;
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(position.x, position.y, 20, 0, 2 * Math.PI); // Draw a circle with radius 20
            EisDealer.crc2.fill();
            EisDealer.crc2.restore();
        }
        //entsprechende farbe für die darstellung im selected screen
        getColor(_flavor) {
            switch (this.flavor) {
                case EisDealer.ScoopFlavour.Pistaccio:
                    return "#98ff98";
                case EisDealer.ScoopFlavour.Chocolate:
                    return "#8B4513";
                case EisDealer.ScoopFlavour.Straciatella:
                    return "white";
                case EisDealer.ScoopFlavour.Lemon:
                    return "yellow";
                case EisDealer.ScoopFlavour.Strawberry:
                    return "#ffc0cb";
                case EisDealer.ScoopFlavour.Mint:
                    return "#99f09b";
                // Füge hier weitere Geschmacksrichtungen hinzu
                default:
                    return "white";
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
            EisDealer.crc2.fillStyle = "#ffc0cb"; // Strawberry color
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
            EisDealer.crc2.fillStyle = "#98ff98"; // Pistaccio color
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
            EisDealer.crc2.fillStyle = "#ffff00"; // Lemon color
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