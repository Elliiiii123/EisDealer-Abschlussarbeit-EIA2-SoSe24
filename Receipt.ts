namespace EisDealer {
    export class Receipt extends Drawable{

        private moneyScreen: Money;
        //private isClicked: boolean;

        constructor (_position: Vector, _moneyScreen: Money){
            //console.log("Receipt Constructor")
            super(_position)
            this.moneyScreen = _moneyScreen;
        }

        public handleClicked():void{

            // Calculate total price
            let totalPrice = 0;

            // Iterate over all objects in orderScreen
            for (let object of allObjects) {
                if (object instanceof Scoop) {
                    totalPrice += object.price;
                    console.log(object.price)
                } else if (object instanceof Topping) {
                    totalPrice += object.price;
                } else if (object instanceof Sauce) {
                    totalPrice += object.price;
                }
            }

            // Füge den Gesamtpreis zu moneyScreen hinzu
            if (this.moneyScreen) {
                this.moneyScreen.addToTotal(totalPrice); // Hier wird addToTotal auf moneyScreen aufgerufen
            } else {
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

        private findAssociatedCustomer(): Customer | undefined {
            for (let customer of allCustomers) {
                // Assuming the receipt is near the customer's position
                if (this.position.distanceTo(customer.position) < 30) {
                    return customer;
                }
            }
            return undefined;
        }

        private remove(): void {
            const index = allObjects.indexOf(this);
            if (index !== -1) {
                allObjects.splice(index, 1);
            }
        }
    
        public draw():void{
            //console.log("Receipt draw")
            crc2.fillStyle = "white";
            crc2.fillRect(this.position.x, this.position.y, 20, 10);
            crc2.fillStyle = "white";
            crc2.fillText("Receipt", this.position.x, this.position.y + 10);

        }
    }
}