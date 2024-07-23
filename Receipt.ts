namespace EisDealer {
    export class Receipt extends Drawable{
        private moneyScreen: Money;

        constructor (_position: Vector, _moneyScreen: Money){
            //console.log("Receipt Constructor")
            super(_position)
            this.moneyScreen = _moneyScreen;
        }

        // handler Funktion für wenn der Kassenbong geklickt wird
        public handleClicked():void{
            const totalPrice = this.calculateTotalPrice();
            //total preis für den money screen wird aktualisiert
            if (this.moneyScreen) {
                this.moneyScreen.addToTotal(totalPrice);
            } else {
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
        private calculateTotalPrice(): number {
            let totalPrice = 0;
            const order = orderScreen.getOrder();

            order._scoops.forEach(scoop => totalPrice += scoop.price);
            if (order._sauce) totalPrice += order._sauce.price;
            if (order._topping) totalPrice += order._topping.price;

            return totalPrice;
        }

        //Rechnung wird in der nähe des zugehörigen Kunden erstellt
        private findAssociatedCustomer(): Customer | undefined {
            for (let customer of allCustomers) {
                if (this.position.distanceTo(customer.position) < 30) {
                    return customer;
                }
            }
            return undefined;
        }

        //Rechnung wird bei klick entfernt
        private remove(): void {
            const index = allObjects.indexOf(this);
            if (index !== -1) {
                allObjects.splice(index, 1);
            }
        }
    
        //Funktion zum zeichnen der Rechnung
        public draw():void{
            //console.log("Receipt draw")
            crc2.save();

            // Kassenbon Hintergrund
            crc2.fillStyle = "white";
            crc2.fillRect(this.position.x, this.position.y, 100, 80); // Kleineres Rechteck für den Bon
        
            // Kassenbon Rahmen
            crc2.strokeStyle = "black";
            crc2.lineWidth = 1;
            crc2.strokeRect(this.position.x, this.position.y, 100, 80);
        
            // Simulierte Schriftlinien
            crc2.strokeStyle = "black";
            crc2.lineWidth = 1;
        
            // Beschriftung des Kassenbons mit Bestellung
            crc2.fillStyle = "black";
            crc2.font = "8px Arial";
            crc2.fillText("Receipt", this.position.x + 5, this.position.y + 10);

            // Zeige Bestellungen an
            const order = orderScreen.getOrder();
            const items = [...order._scoops, order._topping, order._sauce].filter(item => item !== null) as (Scoop | Topping | Sauce)[];
            
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