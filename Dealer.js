"use strict";
var EisDealer;
(function (EisDealer) {
    class Dealer extends EisDealer.Moveable {
        // private type: DealerType;
        constructor(_position, _speed, _direction, _type, _emotion) {
            //console.log("Receipt Constructor")
            super(_position, _speed, _direction);
            this.position = _position;
            this.speed = _speed;
            this.direction = _direction;
            // this.type = _type;
        }
        handleClicked() {
        }
        move() {
        }
        draw() {
            //console.log("Customer draw")
            this.withoutIce();
            this.withIce();
        }
        withoutIce() {
            const centerX = this.position.x;
            const centerY = this.position.y;
            const radius = 30;
            // Zeichne die Haare
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX, centerY + 5, 45, 0, Math.PI, true);
            EisDealer.crc2.fillStyle = "brown";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            EisDealer.crc2.restore();
            // Zeichne den Kopf
            EisDealer.crc2.save();
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "yellow";
            EisDealer.crc2.fill();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 1;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            // Zeichne die Augen
            const eyeRadius = 5;
            const eyeOffsetX = 15;
            const eyeOffsetY = 9;
            // Linkes Auge
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX - eyeOffsetX, centerY - eyeOffsetY, eyeRadius, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "black";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            // Rechtes Auge
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX + eyeOffsetX, centerY - eyeOffsetY, eyeRadius, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "black";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            // Zeichne die Brille - Linkes Glas
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX - eyeOffsetX, centerY - eyeOffsetY, eyeRadius + 5, 0, 2 * Math.PI);
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 1;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            // Zeichne die Brille - Rechtes Glas
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX + eyeOffsetX, centerY - eyeOffsetY, eyeRadius + 5, 0, 2 * Math.PI);
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 1;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            // Zeichne die Brillenverbindung
            EisDealer.crc2.beginPath();
            EisDealer.crc2.moveTo(centerX - eyeOffsetX + eyeRadius + 5, centerY - eyeOffsetY);
            EisDealer.crc2.lineTo(centerX + eyeOffsetX - eyeRadius - 5, centerY - eyeOffsetY);
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 2;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            // Zeichne die Knubbelnase
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX, centerY, 5, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "orange";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            // Zeichne den Mund
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX, centerY + 8, 10, 0, Math.PI, false);
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 2;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            // Zeichne die Haare
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX, centerY - 25, 20, 0, Math.PI, true);
            EisDealer.crc2.fillStyle = "brown";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            EisDealer.crc2.restore();
        }
        withIce() {
        }
    }
    EisDealer.Dealer = Dealer;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Dealer.js.map