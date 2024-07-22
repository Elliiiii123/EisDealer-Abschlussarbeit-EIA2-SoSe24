namespace EisDealer {
    export class Customer extends Moveable{

        private static readonly WAIT_TIME_MS = 20000; // 40 Sekunden in Millisekunden
        private static chairOffset = new Vector(25, 25);
        private static waitingStartPosition = new Vector(810, 215); // Startposition für wartende Kunden
        private static waitingSpacing = 60; // Abstand zwischen wartenden Kunden

        private waitingCustomer: boolean; // Warteschlange für Kunden

        private chairId: number;
        private targetPosition: Vector | null = null;
        private passingPointReached: boolean = false;
        private orderPlaced: boolean = false;
        private type: CustomerType = CustomerType.Normal;
        private order: { scoops: Scoop[], topping: Topping | null, sauce: Sauce | null } | null = null;
        private moneyScreen: Money;
        private passingPoint = new Vector(800, 215);
        private returnPoint = new Vector(1100, 215);
        public receiptCreated: boolean = false;
        private waitStartTime: number | null = null; // Zeitpunkt, wann der Kunde draußen zu warten begonnen hat
        private isSeated: boolean = false; // Status, ob der Kunde auf einem Stuhl sitzt oder in der Warteschlange ist
        
        constructor (_position: Vector, _speed: Vector, _direction: Vector, _type: EisDealer.CustomerType, _emotion: string, _moneyScreen: Money){
            //console.log("Receipt Constructor")
            super(_position, _speed, _direction)
            this.position = _position;
            this.speed = _speed;
            this.direction = _direction;
            this.type = _type;
            this.moneyScreen = _moneyScreen;
            this.findNextTargetPosition(); 
        }

        public setPosition(position: Vector): void {
            this.position = position;
        }

        public setType(type: CustomerType): void {
            this.type = type;
        }

        public move(): void {
            if (this.speed.x === 0 && this.speed.y === 0) return; // Keine Bewegung, wenn Geschwindigkeit 0

            if (this.waitStartTime !== null) {
                this.handleWaiting();
                return; // Verhindere weitere Bewegungen, während der Kunde wartet
            }

            if (this.targetPosition) {
                if (!this.passingPointReached) {
                    this.moveToPoint(this.passingPoint);
                    if (this.position.equals(this.passingPoint)) {
                        this.passingPointReached = true;
                    }
                } else {
                    this.moveToPoint(this.targetPosition);
                    if (this.position.equals(this.targetPosition)) {
                        if (this.type === CustomerType.Happy || this.type === CustomerType.Sad) {
                            this.targetPosition = this.returnPoint;
                            this.speed = new Vector(5, 5); // Geschwindigkeit zurücksetzen
                            setTimeout(() => this.removeCustomer(), 5000); // 5 Sekunden warten, bevor der Kunde entfernt wird
                        } else {
                            this.speed = new Vector(0, 0); // Geschwindigkeit stoppen, wenn der Kunde am Ziel ist
                        }
                    }
                }
            }
        }    
        private handleWaiting(): void {
            const elapsedTime = Date.now() - (this.waitStartTime ?? 0);
            if (elapsedTime >= Customer.WAIT_TIME_MS) {
                this.changeToSad();
                this.waitStartTime = null;
                this.waitingCustomer = false;
                this.updateWaitingQueue();

            }
            if (this.targetPosition) {
                this.moveToPoint(this.targetPosition);
            }
        }

        private moveToPoint(point: Vector): void {
            const dx = point.x - this.position.x;
            const dy = point.y - this.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > 1) {
                const moveX = (dx / distance) * this.speed.x;
                const moveY = (dy / distance) * this.speed.y;
                this.position.x += moveX;
                this.position.y += moveY;
            } else {
                this.position = point;
            }
        }

        private findNextTargetPosition(): void {
            const availableChairs = this.getAvailableChairs();

            if (availableChairs.length === 0) {
                this.joinWaitingQueue();
                return;
            }

            const chosenChair = availableChairs[0];
            this.targetPosition = chosenChair.position.add(this.calculateOffset(chosenChair.rotation));
            this.chairId = chosenChair.id;
            this.waitingCustomer = false;
            chosenChair.occupy();
            this.isSeated = true;
            this.waitStartTime = null;
        }

        private calculateOffset(rotation: number): Vector {
            const radians = rotation * Math.PI / 180;
            const offsetX = Customer.chairOffset.x * Math.cos(radians) - Customer.chairOffset.y * Math.sin(radians);
            const offsetY = Customer.chairOffset.x * Math.sin(radians) + Customer.chairOffset.y * Math.cos(radians);
            return new Vector(offsetX, offsetY);
        }

        private getAvailableChairs(): Chair[] {
            // Filtere alle Objekte und erhalte nur die verfügbaren Stühle
            return allObjects.filter(obj => obj instanceof Chair && !obj.isOccupied()) as Chair[];
        }

        private joinWaitingQueue(): void {
            const waitingCustomers = allCustomers.filter(customer=>customer.waitingCustomer=== true);
            const queueLength = waitingCustomers.length;
            const newPosition = Customer.waitingStartPosition.copy().add(new Vector(0, queueLength * Customer.waitingSpacing));
            this.targetPosition = newPosition;
            this.waitingCustomer = true;
            this.waitStartTime = Date.now(); // Setze den Startzeitpunkt für das Warten
            this.speed = new Vector(1, 1); // Langsame Bewegung, falls nötig
        }

        private freeChair(): void {
            console.log("trigger free chair")
            const chairToFree: Chair = allObjects.find(obj => obj instanceof Chair && obj.id === this.chairId) as Chair
            chairToFree.free()
            this.assignWaitingCustomerToChair();
        }

        private assignWaitingCustomerToChair(): void {
            const waitingCustomers = allCustomers.filter(customer=>customer.waitingCustomer=== true);
            if (waitingCustomers.length > 0) {
                const nextCustomer = waitingCustomers.shift();
                if (nextCustomer) {
                    nextCustomer.findNextTargetPosition();
                    this.updateWaitingQueue();
                }
            }   
        }

        //Customer position wird geupdated
        private updateWaitingQueue(): void {
            const waitingCustomers = allCustomers.filter(customer=>customer.waitingCustomer=== true);
            for (let i = 0; i < waitingCustomers.length; i++) {
                const customer = waitingCustomers[i];
                const newPosition = Customer.waitingStartPosition.copy().add(new Vector(1, i * Customer.waitingSpacing));
                customer.targetPosition = newPosition;
            }
        }

        private removeCustomer(): void {
            const index = allObjects.indexOf(this);
            if (index !== -1) {
                allObjects.splice(index, 1);
                if (this.isSeated === true){
                this.freeChair()};
            }
        }

        public moveToOriginalPosition(): void {
            console.log("Kunde geht")
            this.targetPosition = this.returnPoint;
            this.speed = new Vector(5, 5); // Geschwindigkeit zum Zurückgehen setzen    
            this.passingPointReached = false; // Damit der Kunde nicht beim Punkt hängen bleibt
        }
    
        public generateRandomOrder(): { scoops: Scoop[], topping: Topping | null, sauce: Sauce | null }  {
            const numberOfScoops = Math.floor(Math.random() * 3) + 1; // Zufällige Anzahl von Kugeln (1 bis 3)
            const selectedScoops = [];

            for (let i = 0; i < numberOfScoops; i++) {
                const randomScoop = this.getRandomScoop();
                selectedScoops.push(randomScoop);
            }

            const addTopping = Math.random() < 0.5; // 50% Wahrscheinlichkeit für ein Topping
            const selectedTopping = addTopping ? this.getRandomTopping() : null;

            const addSauce = Math.random() < 0.5; // 50% Wahrscheinlichkeit für eine Sauce
            const selectedSauce = addSauce ? this.getRandomSauce() : null;

            console.log(selectedSauce, selectedScoops, selectedTopping);
            this.order = { scoops: selectedScoops, topping: selectedTopping, sauce: selectedSauce };
            return this.order;
        }

        private getRandomScoop(): Scoop {
            const randomIndex = Math.floor(Math.random() * EisDealer.data.Ice.length);
            const randomIce = EisDealer.data.Ice[randomIndex];
            const scoop = new Scoop(new Vector(0, 0), randomIce.name as any, randomIce.price, randomIce.color as any); // Cast name to any to match constructor
            return scoop;
        }
        private getRandomTopping(): Topping {
            const randomIndex = Math.floor(Math.random() * EisDealer.data.Toppings.length);
            const randomTopping = EisDealer.data.Toppings[randomIndex];
            const topping = new Topping(new Vector(0, 0), randomTopping.name as any, randomTopping.price, randomTopping.color as any); // Cast name to any to match constructor
            return topping;
        }

        private getRandomSauce(): Sauce {
            const randomIndex = Math.floor(Math.random() * EisDealer.data.Sauce.length);
            const randomSauce = EisDealer.data.Sauce[randomIndex];
            const sauce = new Sauce(new Vector(0, 0), randomSauce.name as any, randomSauce.price, randomSauce.color as any); // Cast name to any to match constructor
            return sauce;
        }
        public showOrder(): void {
            if (this.isSeated &&!this.orderPlaced && this.targetPosition && this.position.equals(this.targetPosition)) {
                const order = this.generateRandomOrder();

                orderScreen.clearItems();

                order.scoops.forEach(scoop => {
                    orderScreen.addItem(scoop);
                });
                if (order.topping) {
                    orderScreen.addItem(order.topping);
                }
                if (order.sauce) {
                    orderScreen.addItem(order.sauce);
                }

                this.orderPlaced = true;  // Markiere die Bestellung als aufgegeben
            } else if (this.orderPlaced) {
                //console.log("This customer has already placed an order.");
            } else {
                //console.log("Customer is not seated yet.");
            }
        }

        public placeOrder(order: { scoops: Scoop[], topping: Topping | null, sauce: Sauce | null }): void {
            if (this.isSeated) {
                this.order = order;
                this.orderPlaced = true;
                console.log("Order placed:", order);
            } else {
                console.log("Cannot place order while waiting.");
            }
        }

        public compareOrders(selectionScreen: SelectionScreen): boolean {
            if (!this.order) {
                console.warn("Customer order has not been generated yet.");
                return false;
            }

            const selectedOrder = selectionScreen.getSelection();

            return this.compareScoops(this.order.scoops, selectedOrder.scoops) &&
                   this.compareTopping(this.order.topping, selectedOrder.topping) &&
                   this.compareSauce(this.order.sauce, selectedOrder.sauce);
            }

        private compareScoops(scoops1: Scoop[], scoops2: Scoop[]): boolean {
            if (scoops1.length !== scoops2.length) return false;

            for (let i = 0; i < scoops1.length; i++) {
                if (!this.compareScoop(scoops1[i], scoops2[i])) {
                    return false;
                }
            }
            return true;
        }

        private compareScoop(scoop1: Scoop, scoop2: Scoop): boolean {
            return scoop1.name === scoop2.name && scoop1.color === scoop2.color;
        }

        private compareTopping(topping1: Topping | null, topping2: Topping | null): boolean {
            if (topping1 === null && topping2 === null) return true;
            if (topping1 === null || topping2 === null) return false;

            return topping1.name === topping2.name && topping1.color === topping2.color;
        }

        private compareSauce(sauce1: Sauce | null, sauce2: Sauce | null): boolean {
            if (sauce1 === null && sauce2 === null) return true;
            if (sauce1 === null || sauce2 === null) return false;

            return sauce1.name === sauce2.name && sauce1.color === sauce2.color;
        }

        public changeToHappy(): void {
            //console.log("HAPPY");
            this.setType(CustomerType.Happy);
    
            if (!this.receiptCreated) {
                if (!this.receiptExists()) {
                    const receipt = new Receipt(this.position.add(new Vector(0, -50)), this.moneyScreen);
                    allObjects.push(receipt);
                }
                this.receiptCreated = true;
            }
    
            this.targetPosition = this.passingPoint;
            this.passingPointReached = false;
            this.speed = new Vector(5, 5); // Geschwindigkeit zurücksetzen
        }

        // Methode zur Überprüfung, ob ein Beleg in der Nähe des Kunden existiert
        private receiptExists(): boolean {
            for (let object of allObjects) {
                if (object instanceof Receipt) {
                    const receipt = object as Receipt;
                    if (this.position.distanceTo(receipt.position) < 30) {
                        return true; // Beleg existiert
                    }
                }
            }
            return false; // Kein Beleg in der Nähe gefunden
        }

        public changeToSad(): void {
            //console.log("SAD")
            this.setType(CustomerType.Sad);
            this.targetPosition = this.passingPoint;
            this.passingPointReached = false;
            this.speed = new Vector(5, 5); // Geschwindigkeit zurücksetzen
        }

        public draw(): void {
            switch (this.type) {
                case CustomerType.Normal:
                    this.drawNormal();
                    break;
                case CustomerType.Happy:
                    this.drawHappy();
                    break;
                case CustomerType.Sad:
                    this.drawSad();
                    break;
                default:
                    console.error("Unknown state");
                    break;
            }
        }

        private drawNormal():void{
            //console.log("Customer draw")
            
            const centerX = this.position.x;
            const centerY = this.position.y;
            const radius = 25;

            crc2.save();
            // crc2.translate(this.position.x, this.position.y);
            // Zeichne den Kopf
            crc2.beginPath();
            crc2.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            crc2.fillStyle = "yellow";
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.lineWidth = 2;
            crc2.stroke();
            crc2.closePath();

            // Zeichne die Augen
            const eyeRadius = 5;
            const eyeOffsetX = 8;
            const eyeOffsetY = 10;

            // Linkes Auge
            crc2.beginPath();
            crc2.arc(centerX - eyeOffsetX, centerY - eyeOffsetY, eyeRadius, 0, 2 * Math.PI);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.closePath();

            // Rechtes Auge
            crc2.beginPath();
            crc2.arc(centerX + eyeOffsetX, centerY - eyeOffsetY, eyeRadius, 0, 2 * Math.PI);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.closePath();

            // Zeichne den Mund
            crc2.beginPath();
            crc2.arc(centerX, centerY + 7, 7, 0, Math.PI, false);
            crc2.strokeStyle = "black";
            crc2.lineWidth = 2;
            crc2.stroke();
            crc2.closePath();

            // Zeichne Wangenröte
            const blushRadius = 7;
            const blushOffsetX = 15;
            const blushOffsetY = 2;

            // Linke Wange
            crc2.beginPath();
            crc2.arc(centerX - blushOffsetX, centerY + blushOffsetY, blushRadius, 0, 2 * Math.PI);
            crc2.fillStyle = "pink";
            crc2.fill();
            crc2.closePath();

            // Rechte Wange
            crc2.beginPath();
            crc2.arc(centerX + blushOffsetX, centerY + blushOffsetY, blushRadius, 0, 2 * Math.PI);
            crc2.fillStyle = "pink";
            crc2.fill();
            crc2.closePath();
            crc2.restore();
        }

        private drawSad():void{

            //console.log("Customer drawsad")
            
            const centerX = this.position.x;
            const centerY = this.position.y;
            const radius = 25;

            crc2.save();
            // crc2.translate(this.position.x, this.position.y);
            // Zeichne den Kopf
            crc2.beginPath();
            crc2.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            crc2.fillStyle = "yellow";
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.lineWidth = 2;
            crc2.stroke();
            crc2.closePath();

            // Zeichne die Augen
            const eyeRadius = 5;
            const eyeOffsetX = 8;
            const eyeOffsetY = 10;

            // Linkes Auge
            crc2.beginPath();
            crc2.arc(centerX - eyeOffsetX, centerY - eyeOffsetY, eyeRadius, 0, 2 * Math.PI);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.closePath();

            // Rechtes Auge
            crc2.beginPath();
            crc2.arc(centerX + eyeOffsetX, centerY - eyeOffsetY, eyeRadius, 0, 2 * Math.PI);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.closePath();

            // Zeichne die Augenbrauen
            const eyebrowWidth = 12;
            const eyebrowOffsetY = 4; // Abstand nach oben von den Augen

            // Linke Augenbraue
            crc2.beginPath();
            crc2.moveTo(centerX - eyeOffsetX - eyebrowWidth / 2, centerY - eyeOffsetY - eyebrowOffsetY);
            crc2.lineTo(centerX - eyeOffsetX + eyebrowWidth / 2, centerY - eyeOffsetY - eyebrowOffsetY);
            crc2.lineWidth = 4;
            crc2.strokeStyle = "black";
            crc2.stroke();
            crc2.closePath();

            // Rechte Augenbraue
            crc2.beginPath();
            crc2.moveTo(centerX + eyeOffsetX - eyebrowWidth / 2, centerY - eyeOffsetY - eyebrowOffsetY);
            crc2.lineTo(centerX + eyeOffsetX + eyebrowWidth / 2, centerY - eyeOffsetY - eyebrowOffsetY);
            crc2.lineWidth = 4;
            crc2.strokeStyle = "black";
            crc2.stroke();
            crc2.closePath();

            // Zeichne den wütenden Mund
            crc2.beginPath();
            crc2.arc(centerX, centerY + 7, 7, Math.PI, 0, false); // Unterer Bogen des Mundes
            crc2.lineTo(centerX + 7, centerY + 7); // Schließt den Mund
            crc2.lineTo(centerX - 7, centerY + 7); // Schließt den Mund
            crc2.closePath();
            crc2.strokeStyle = "black";
            crc2.lineWidth = 2;
            crc2.stroke();
            // Zeichne Wangenröte
            const blushRadius = 7;
            const blushOffsetX = 15;
            const blushOffsetY = 2;

            // Linke Wange
            crc2.beginPath();
            crc2.arc(centerX - blushOffsetX, centerY + blushOffsetY, blushRadius, 0, 2 * Math.PI);
            crc2.fillStyle = "red";
            crc2.fill();
            crc2.closePath();

            // Rechte Wange
            crc2.beginPath();
            crc2.arc(centerX + blushOffsetX, centerY + blushOffsetY, blushRadius, 0, 2 * Math.PI);
            crc2.fillStyle = "red";
            crc2.fill();
            crc2.closePath();
            crc2.restore();

            // Zeichne die Flügel
            const wingWidth = 20;
            const wingHeight = 20;
            const wingOffset = 0; // Abstand vom Körper

            crc2.beginPath();
            crc2.moveTo(centerX - radius - wingOffset, centerY - 5); // Ausgangspunkt des Flügels
            crc2.lineTo(centerX - radius - wingOffset - wingWidth, centerY - wingHeight);
            crc2.lineTo(centerX - radius - wingOffset - wingWidth / 2, centerY - wingHeight / 2);
            crc2.closePath();
            crc2.fillStyle = "white";
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.stroke();
            
            // Rechter Flügel
            crc2.beginPath();
            crc2.moveTo(centerX + radius + wingOffset, centerY - 5); // Ausgangspunkt des Flügels
            crc2.lineTo(centerX + radius + wingOffset + wingWidth, centerY - wingHeight);
            crc2.lineTo(centerX + radius + wingOffset + wingWidth / 2, centerY - wingHeight / 2);
            crc2.closePath();
            crc2.fillStyle = "white";
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.stroke();
        }

        private drawHappy():void{
            //console.log("Customer drawHappy")
            
            const centerX = this.position.x;
            const centerY = this.position.y;
            const radius = 25;

            crc2.save();
            // crc2.translate(this.position.x, this.position.y);
            // Zeichne den Kopf
            crc2.beginPath();
            crc2.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            crc2.fillStyle = "yellow";
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.lineWidth = 2;
            crc2.stroke();
            crc2.closePath();

            // Zeichne die Augen
            const eyeRadius = 5;
            const eyeOffsetX = 8;
            const eyeOffsetY = 10;

            // Linkes Auge
            crc2.beginPath();
            crc2.arc(centerX - eyeOffsetX, centerY - eyeOffsetY, eyeRadius, 0, 2 * Math.PI);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.closePath();

            // Rechtes Auge
            crc2.beginPath();
            crc2.arc(centerX + eyeOffsetX, centerY - eyeOffsetY, eyeRadius, 0, 2 * Math.PI);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.closePath();

            // Zeichne den Mund
            crc2.beginPath();
            crc2.arc(centerX, centerY + 7, 7, 0, Math.PI, false); // Offenes Lächeln
            crc2.strokeStyle = "black";
            crc2.lineWidth = 2;
            crc2.stroke();
            crc2.closePath();

            // Oberer Teil des Mundes (Schlusslinie)
            crc2.beginPath();
            crc2.moveTo(centerX - 7, centerY + 7); // Links vom Mund
            crc2.lineTo(centerX + 7, centerY + 7); // Rechts vom Mund
            crc2.strokeStyle = "black";
            crc2.lineWidth = 2;
            crc2.stroke();

            // Zeichne Wangenröte
            const blushRadius = 7;
            const blushOffsetX = 15;
            const blushOffsetY = 2;

            // Linke Wange
            crc2.beginPath();
            crc2.arc(centerX - blushOffsetX, centerY + blushOffsetY, blushRadius, 0, 2 * Math.PI);
            crc2.fillStyle = "pink";
            crc2.fill();
            crc2.closePath();

            // Rechte Wange
            crc2.beginPath();
            crc2.arc(centerX + blushOffsetX, centerY + blushOffsetY, blushRadius, 0, 2 * Math.PI);
            crc2.fillStyle = "pink";
            crc2.fill();
            crc2.closePath();
            crc2.restore();

            // Zeichne die Flügel
            const wingWidth = 30;
            const wingHeight = 20;
            const wingOffset = 0; // Abstand vom Körper

            crc2.beginPath();
            crc2.moveTo(centerX - radius - wingOffset, centerY - 5); // Ausgangspunkt des Flügels
            crc2.lineTo(centerX - radius - wingOffset - wingWidth, centerY - wingHeight);
            crc2.lineTo(centerX - radius - wingOffset - wingWidth / 2, centerY - wingHeight / 2);
            crc2.closePath();
            crc2.fillStyle = "white";
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.stroke();
            
            // Rechter Flügel
            crc2.beginPath();
            crc2.moveTo(centerX + radius + wingOffset, centerY - 5); // Ausgangspunkt des Flügels
            crc2.lineTo(centerX + radius + wingOffset + wingWidth, centerY - wingHeight);
            crc2.lineTo(centerX + radius + wingOffset + wingWidth / 2, centerY - wingHeight / 2);
            crc2.closePath();
            crc2.fillStyle = "white";
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.stroke();

        }
    }
}