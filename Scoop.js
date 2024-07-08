"use strict";
var EisDealer;
(function (EisDealer) {
    class Scoop extends EisDealer.Drawable {
        //private isClicked: boolean;
        constructor(_position) {
            //console.log("Scoop Constructor")
            super(_position);
        }
        handleClicked() {
        }
        draw() {
            console.log("Scoop draw");
            this.drawChocolate();
            this.drawStrawberry();
            this.drawMint();
            this.drawStraciatella();
            this.drawPistachio();
            this.drawLemon();
        }
        drawChocolate() {
            const x = this.position.x;
            const y = this.position.y;
            // Draw the square ice cream (chocolate)
            EisDealer.crc2.beginPath();
            EisDealer.crc2.rect(x, y, 50, 50); // Square shape
            EisDealer.crc2.fillStyle = "#8B4513"; // Chocolate color
            EisDealer.crc2.fill();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 1;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
        }
        drawMint() {
        }
        drawStrawberry() {
        }
        drawStraciatella() {
        }
        drawPistachio() {
        }
        drawLemon() {
        }
    }
    EisDealer.Scoop = Scoop;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Scoop.js.map