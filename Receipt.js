"use strict";
var EisDealer;
(function (EisDealer) {
    class Receipt extends EisDealer.Drawable {
        moneyScreen;
        constructor(_position, _moneyScreen) {
            //console.log("Receipt Constructor")
            super(_position);
            this.moneyScreen = _moneyScreen;
        }
        // handler Funktion für wenn der Kassenbong geklickt wird
        handleClicked() {
            const totalPrice = this.calculateTotalPrice();
            //total preis für den money screen wird aktualisiert
            if (this.moneyScreen) {
                this.moneyScreen.addToTotal(totalPrice);
            }
            else {
                console.error("moneyScreen is not defined in Receipt.");
            }
            //Customer wird glücklich
            const customer = this.findAssociatedCustomer();
            if (customer) {
                customer.changeToHappy();
            }
            this.remove();
        }
        //Der gesamte preis der Bestllung wird berechnet
        calculateTotalPrice() {
            let totalPrice = 0;
            const order = EisDealer.orderScreen.getOrder();
            order._scoops.forEach(scoop => totalPrice += scoop.price);
            if (order._sauce)
                totalPrice += order._sauce.price;
            if (order._topping)
                totalPrice += order._topping.price;
            return totalPrice;
        }
        //Rechnung wird in der nähe des zugehörigen Kunden erstellt
        findAssociatedCustomer() {
            for (let customer of EisDealer.allCustomers) {
                if (this.position.distanceTo(customer.position) < 30) {
                    return customer;
                }
            }
            return undefined;
        }
        //Rechnung wird bei klick entfernt
        remove() {
            const index = EisDealer.allObjects.indexOf(this);
            if (index !== -1) {
                EisDealer.allObjects.splice(index, 1);
            }
        }
        //Funktion zum zeichnen der Rechnung
        draw() {
            //console.log("Receipt draw")
            EisDealer.crc2.save();
            // Kassenbon Hintergrund
            EisDealer.crc2.fillStyle = "white";
            EisDealer.crc2.fillRect(this.position.x, this.position.y, 100, 80); // Kleineres Rechteck für den Bon
            // Kassenbon Rahmen
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 1;
            EisDealer.crc2.strokeRect(this.position.x, this.position.y, 100, 80);
            // Simulierte Schriftlinien
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 1;
            // Beschriftung des Kassenbons mit Bestellung
            EisDealer.crc2.fillStyle = "black";
            EisDealer.crc2.font = "8px Arial";
            EisDealer.crc2.fillText("Receipt", this.position.x + 5, this.position.y + 10);
            // Zeige Bestellungen an
            const order = EisDealer.orderScreen.getOrder();
            const items = [...order._scoops, order._topping, order._sauce].filter(item => item !== null);
            EisDealer.crc2.font = "10px Arial";
            let yOffset = 30; // Startposition für die ersten Textzeilen
            items.forEach((item) => {
                const name = item.name;
                const price = item.price.toFixed(2);
                EisDealer.crc2.fillText(`${name}: $${price}`, this.position.x + 10, this.position.y + yOffset);
                yOffset += 15; // Abstand zwischen den Zeilen
            });
            EisDealer.crc2.restore();
        }
    }
    EisDealer.Receipt = Receipt;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Receipt.js.map