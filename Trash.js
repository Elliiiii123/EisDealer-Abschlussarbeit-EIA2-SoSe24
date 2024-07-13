"use strict";
var EisDealer;
(function (EisDealer) {
    class Trash extends EisDealer.Drawable {
        constructor(_position) {
            //console.log("Trash Constructor")
            super(_position);
        }
        draw() {
            //console.log("Trash draw")
            EisDealer.crc2.save();
            EisDealer.crc2.translate(this.position.x, this.position.y);
            let outerRadius = 30;
            let innerRadius = 10;
            // Zeichne den äußeren Kreis (oberer Rand des Mülleimers)
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(0, 0, outerRadius, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "gray";
            EisDealer.crc2.fill();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 2;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(0, 0, 20, 0, 2 * Math.PI);
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 1;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            // Zeichne den inneren Kreis (Boden des Mülleimers)
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(0, 0, innerRadius, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "gray";
            EisDealer.crc2.fill();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 1;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            // Zeichne die Gitterlinien
            EisDealer.crc2.beginPath();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 0.5;
            // Zeichne die vertikalen Gitterlinien
            let numVerticalLines = 8;
            for (let i = 0; i < numVerticalLines; i++) {
                let angle = (i / numVerticalLines) * (2 * Math.PI);
                let xOuter = outerRadius * Math.cos(angle);
                let yOuter = outerRadius * Math.sin(angle);
                let xInner = innerRadius * Math.cos(angle);
                let yInner = innerRadius * Math.sin(angle);
                EisDealer.crc2.moveTo(xOuter, yOuter);
                EisDealer.crc2.lineTo(xInner, yInner);
            }
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            EisDealer.crc2.restore();
        }
    }
    EisDealer.Trash = Trash;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Trash.js.map