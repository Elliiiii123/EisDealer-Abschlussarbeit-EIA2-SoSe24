"use strict";
var EisDealer;
(function (EisDealer) {
    class Chair extends EisDealer.Drawable {
        rotation;
        occupied = false;
        id;
        constructor(_position, _rotation, _id) {
            //console.log("Chair Constructor")
            super(_position);
            this.rotation = _rotation;
            this.id = _id;
        }
        //Prüfen ob der Stuhl besetzt ist
        isOccupied() {
            return this.occupied;
        }
        occupy() {
            this.occupied = true;
        }
        free() {
            this.occupied = false;
        }
        //Zeichne den Stuhl
        draw() {
            //console.log("Chair draw")
            EisDealer.crc2.save();
            EisDealer.crc2.translate(this.position.x, this.position.y);
            EisDealer.crc2.rotate(this.rotation * Math.PI / 180);
            // Zeichne Sitzfläche
            EisDealer.crc2.beginPath();
            EisDealer.crc2.rect(0, 0, 50, 50); // Ein Rechteck für die Sitzfläche
            EisDealer.crc2.fillStyle = "brown";
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 2;
            EisDealer.crc2.stroke();
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            EisDealer.crc2.beginPath();
            EisDealer.crc2.rect(-5, 40, 60, 10); // Ein Rechteck für die Lehne
            EisDealer.crc2.fillStyle = "brown";
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 2;
            EisDealer.crc2.stroke();
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            // Zeichne Beine
            EisDealer.crc2.beginPath();
            EisDealer.crc2.moveTo(5, 50);
            EisDealer.crc2.lineTo(7, 55);
            EisDealer.crc2.moveTo(45, 50);
            EisDealer.crc2.lineTo(47, 55);
            EisDealer.crc2.moveTo(50, 2);
            EisDealer.crc2.lineTo(52, 7);
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 2;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            EisDealer.crc2.restore();
        }
    }
    EisDealer.Chair = Chair;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Chair.js.map