"use strict";
var EisDealer;
(function (EisDealer) {
    class Scoop extends EisDealer.Drawable {
        price;
        name;
        color;
        constructor(_position, _name, _price, _color) {
            //console.log("Scoop Constructor")
            super(_position);
            this.price = _price;
            this.name = _name;
            //this.color = this.getColor(_flavor);
            this.color = _color;
        }
        //Scoop nach Klick im Selection screen anzeigen
        handleClicked(selectionScreen) {
            selectionScreen.addItem(this);
        }
        //Zeichen Scoop im Screen
        drawSymbol(position) {
            EisDealer.crc2.save();
            EisDealer.crc2.fillStyle = this.color;
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(position.x, position.y, 20, 0, 2 * Math.PI); // Draw a circle with radius 20
            EisDealer.crc2.fill();
            EisDealer.crc2.restore();
        }
        //Zeichne Eis an Theke
        draw() {
            const x = this.position.x;
            const y = this.position.y;
            EisDealer.crc2.save();
            EisDealer.crc2.beginPath();
            EisDealer.crc2.rect(x, y, 50, 50);
            EisDealer.crc2.fillStyle = this.color;
            EisDealer.crc2.fill();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 1;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            EisDealer.crc2.restore();
        }
    }
    EisDealer.Scoop = Scoop;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Scoop.js.map