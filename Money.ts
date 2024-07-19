namespace EisDealer {
    export class Money extends Drawable{
        private totalPrice: number = 0;
        private orderScreen: OrderScreen;

        constructor(_position: Vector, orderScreen: OrderScreen){
            super(_position);
            this.orderScreen = orderScreen;
            this.updateTotalPrice(); // Initiales Setzen des Gesamtpreises
        }

        public draw():void {
            const x = this.position.x;
            const y = this.position.y;

            crc2.save();
            crc2.fillStyle = "beige";
            crc2.fillRect(x, y, 160, 50); // Draw a beige 200x200 area for the screen

            this.updateTotalPrice();

            // Draw text "Your selection:"
            crc2.fillStyle = "black";
            crc2.font = "20px Arial";
            crc2.fillText("Money: $"+ this.totalPrice.toFixed(2), x + 10, y + 30);

            crc2.restore();
        }

        public addToTotal(price: number): void {
            this.totalPrice += price;
        }

        public getTotalPrice(): number {
            return this.totalPrice;
        }

        public resetTotal(): void {
            this.totalPrice = 0;
        }

        private updateTotalPrice(): void {
            // Berechne den Gesamtpreis auf Basis der aktuellen Bestellung
            this.totalPrice = this.calculateTotalPriceFromOrder();
        }

        private calculateTotalPriceFromOrder(): number {
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
}