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

            const totalPrice = this.calculateTotalPrice();
            if (this.moneyScreen) {
                this.moneyScreen.addToTotal(totalPrice);
            } else {
                console.error("moneyScreen is not defined in Receipt.");
            }

            const customer = this.findAssociatedCustomer();
            if (customer) {
                customer.changeToHappy();
            }

            this.remove();
        }

        private calculateTotalPrice(): number {
            let totalPrice = 0;
            const order = orderScreen.getOrder();

            order.scoops.forEach(scoop => totalPrice += scoop.price);
            if (order.sauce) totalPrice += order.sauce.price;
            if (order.topping) totalPrice += order.topping.price;

            return totalPrice;
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

            crc2.save();

            // Kassenbon Hintergrund
            crc2.fillStyle = "white";
            crc2.fillRect(this.position.x, this.position.y, 50, 60); // Kleineres Rechteck für den Bon
        
            // Kassenbon Rahmen
            crc2.strokeStyle = "black";
            crc2.lineWidth = 1;
            crc2.strokeRect(this.position.x, this.position.y, 50, 60);
        
            // Simulierte Schriftlinien
            crc2.strokeStyle = "black";
            crc2.lineWidth = 1;
        
            // Linien für den "Text" auf dem Kassenbon
            // const lineSpacing = 10;
            // for (let i = 1; i <= 5; i++) {
            //     crc2.beginPath();
            //     crc2.moveTo(this.position.x + 5, this.position.y + i * lineSpacing);
            //     crc2.lineTo(this.position.x + 45, this.position.y + i * lineSpacing);
            //     crc2.stroke();
            // }
        
            // Optional: Beschriftung des Kassenbons
            crc2.fillStyle = "black";
            crc2.font = "8px Arial";
            crc2.fillText("Receipt", this.position.x + 5, this.position.y + 10);

            // Zeige Bestellungen an
            const order = orderScreen.getOrder();
            const items = [...order.scoops, order.topping, order.sauce].filter(item => item !== null) as (Scoop | Topping | Sauce)[];
            
            crc2.font = "10px Arial";
            let yOffset = 30; // Startposition für die ersten Textzeilen

            items.forEach((item) => {
                const name = item.name;
                const price = item.price.toFixed(2);
                crc2.fillText(`${name}: $${price}`, this.position.x + 10, this.position.y + yOffset);
                yOffset += 15; // Abstand zwischen den Zeilen
            });
        
            crc2.restore();
        }
    }
}