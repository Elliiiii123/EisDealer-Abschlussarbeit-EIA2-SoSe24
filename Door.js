"use strict";
var EisDealer;
(function (EisDealer) {
    class Door extends EisDealer.Moveable {
        state;
        constructor(_position, _speed, _direction) {
            super(_position, _speed, _direction);
            this.position = _position;
            this.speed = _speed;
            this.direction = _direction;
        }
        move() {
        }
        draw() {
            this.drawOpen();
            this.drawClose();
        }
        drawOpen() {
        }
        drawClose() {
            //console.log("draw closed door")
            EisDealer.crc2.save();
            EisDealer.crc2.translate(this.position.x, this.position.y);
            EisDealer.crc2.beginPath();
            EisDealer.crc2.moveTo(0, 0);
            EisDealer.crc2.lineTo(0, 50);
            EisDealer.crc2.fillStyle = "brown";
            EisDealer.crc2.stroke();
            EisDealer.crc2.restore();
        }
    }
    EisDealer.Door = Door;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Door.js.map