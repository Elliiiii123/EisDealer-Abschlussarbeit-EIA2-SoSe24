"use strict";
var EisDealer;
(function (EisDealer) {
    class Receipt extends EisDealer.Drawable {
        moneyScreen;
        //private isClicked: boolean;
        constructor(_position, _moneyScreen) {
            //console.log("Receipt Constructor")
            super(_position);
            this.moneyScreen = _moneyScreen;
        }
        handleClicked() {
            // Calculate total price
            let totalPrice = 0;
            // Iterate over all objects in orderScreen
            for (let object of EisDealer.allObjects) {
                if (object instanceof EisDealer.Scoop) {
                    totalPrice += object.price;
                    console.log(object.price);
                }
                else if (object instanceof EisDealer.Topping) {
                    totalPrice += object.price;
                }
                else if (object instanceof EisDealer.Sauce) {
                    totalPrice += object.price;
                }
            }
            // Füge den Gesamtpreis zu moneyScreen hinzu
            if (this.moneyScreen) {
                this.moneyScreen.addToTotal(totalPrice); // Hier wird addToTotal auf moneyScreen aufgerufen
            }
            else {
                console.error("moneyScreen is not defined in Receipt.");
            }
            // Find associated customer and change to happy state
            const customer = this.findAssociatedCustomer();
            if (customer) {
                customer.changeToHappy();
            }
            // Remove the receipt
            this.remove();
        }
        findAssociatedCustomer() {
            for (let customer of EisDealer.allCustomers) {
                // Assuming the receipt is near the customer's position
                if (this.position.distanceTo(customer.position) < 30) {
                    return customer;
                }
            }
            return undefined;
        }
        remove() {
            const index = EisDealer.allObjects.indexOf(this);
            if (index !== -1) {
                EisDealer.allObjects.splice(index, 1);
            }
        }
        draw() {
            //console.log("Receipt draw")
            EisDealer.crc2.save();
            // Kassenbon Hintergrund
            EisDealer.crc2.fillStyle = "white";
            EisDealer.crc2.fillRect(this.position.x, this.position.y, 50, 60); // Kleineres Rechteck für den Bon
            // Kassenbon Rahmen
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 1;
            EisDealer.crc2.strokeRect(this.position.x, this.position.y, 50, 60);
            // Simulierte Schriftlinien
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 1;
            // Linien für den "Text" auf dem Kassenbon
            // const lineSpacing = 10;
            // for (let i = 1; i <= 5; i++) {
            //     crc2.beginPath();
            //     crc2.moveTo(this.position.x + 5, this.position.y + i * lineSpacing);
            //     crc2.lineTo(this.position.x + 45, this.position.y + i * lineSpacing);
            //     crc2.stroke();
            // }
            // Optional: Beschriftung des Kassenbons
            EisDealer.crc2.fillStyle = "black";
            EisDealer.crc2.font = "8px Arial";
            EisDealer.crc2.fillText("Receipt", this.position.x + 5, this.position.y + 10);
            // Zeige Bestellungen an
            const order = EisDealer.orderScreen.getOrder();
            const items = [...order.scoops, order.topping, order.sauce].filter(item => item !== null);
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