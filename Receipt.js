"use strict";
var EisDealer;
(function (EisDealer) {
    class Receipt extends EisDealer.Drawable {
        moneyScreen;
        //private isClicked: boolean;
        constructor(_position) {
            //console.log("Receipt Constructor")
            super(_position);
        }
        handleClicked() {
            // Calculate total price
            let totalPrice = 0;
            // Iterate over all objects in orderScreen
            for (let object of EisDealer.allObjects) {
                if (object instanceof EisDealer.Scoop) {
                    totalPrice += object.price;
                }
                else if (object instanceof EisDealer.Topping) {
                    totalPrice += object.price;
                }
                else if (object instanceof EisDealer.Sauce) {
                    totalPrice += object.price;
                }
            }
            // Add total price to moneyScreen
            this.moneyScreen.addToTotal(totalPrice);
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
            EisDealer.crc2.fillStyle = "white";
            EisDealer.crc2.fillRect(this.position.x, this.position.y, 20, 10);
            EisDealer.crc2.fillStyle = "white";
            EisDealer.crc2.fillText("Receipt", this.position.x, this.position.y + 10);
        }
    }
    EisDealer.Receipt = Receipt;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Receipt.js.map