"use strict";
var EisDealer;
(function (EisDealer) {
    class Money extends EisDealer.Drawable {
        totalPrice = 0;
        constructor(_position) {
            super(_position);
        }
        draw() {
            const x = this.position.x;
            const y = this.position.y;
            EisDealer.crc2.save();
            EisDealer.crc2.fillStyle = "beige";
            EisDealer.crc2.fillRect(x, y, 160, 50); // Draw a beige 200x200 area for the screen
            // Zeige den aktuellen Gesamtpreis
            EisDealer.crc2.fillStyle = "black";
            EisDealer.crc2.font = "20px Arial";
            EisDealer.crc2.fillText("Money: $" + this.totalPrice.toFixed(2), x + 10, y + 30);
            EisDealer.crc2.restore();
        }
        addToTotal(price) {
            this.totalPrice += price;
            this.draw();
        }
        getTotalPrice() {
            return this.totalPrice;
        }
        resetTotal() {
            this.totalPrice = 0;
            this.draw();
        }
    }
    EisDealer.Money = Money;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Money.js.map