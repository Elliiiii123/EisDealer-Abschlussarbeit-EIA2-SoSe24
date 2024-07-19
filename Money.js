"use strict";
var EisDealer;
(function (EisDealer) {
    class Money extends EisDealer.Drawable {
        totalPrice = 0;
        orderScreen;
        constructor(_position, orderScreen) {
            super(_position);
            this.orderScreen = orderScreen;
            this.updateTotalPrice(); // Initiales Setzen des Gesamtpreises
        }
        draw() {
            const x = this.position.x;
            const y = this.position.y;
            EisDealer.crc2.save();
            EisDealer.crc2.fillStyle = "beige";
            EisDealer.crc2.fillRect(x, y, 160, 50); // Draw a beige 200x200 area for the screen
            this.updateTotalPrice();
            // Draw text "Your selection:"
            EisDealer.crc2.fillStyle = "black";
            EisDealer.crc2.font = "20px Arial";
            EisDealer.crc2.fillText("Money: $" + this.totalPrice.toFixed(2), x + 10, y + 30);
            EisDealer.crc2.restore();
        }
        addToTotal(price) {
            this.totalPrice += price;
        }
        getTotalPrice() {
            return this.totalPrice;
        }
        resetTotal() {
            this.totalPrice = 0;
        }
        updateTotalPrice() {
            // Berechne den Gesamtpreis auf Basis der aktuellen Bestellung
            this.totalPrice = this.calculateTotalPriceFromOrder();
        }
        calculateTotalPriceFromOrder() {
            let totalPrice = 0;
            const order = this.orderScreen.getOrder();
            // Addiere die Preise der Scoops
            order.scoops.forEach(scoop => totalPrice += scoop.price);
            // Addiere den Preis der Sauce, falls vorhanden
            if (order.sauce) {
                totalPrice += order.sauce.price;
            }
            // Addiere den Preis des Toppings, falls vorhanden
            if (order.topping) {
                totalPrice += order.topping.price;
            }
            return totalPrice;
        }
    }
    EisDealer.Money = Money;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Money.js.map