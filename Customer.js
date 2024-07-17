"use strict";
var EisDealer;
(function (EisDealer) {
    class Customer extends EisDealer.Moveable {
        targetPosition = null;
        passingPointReached = false;
        static chairOffset = new EisDealer.Vector(25, 25);
        orderPlaced = false;
        type = EisDealer.CustomerType.Normal;
        originalPosition;
        order = null;
        constructor(_position, _speed, _direction, _type, _emotion) {
            //console.log("Receipt Constructor")
            super(_position, _speed, _direction);
            this.position = _position;
            this.originalPosition = _position.copy();
            this.speed = _speed;
            this.direction = _direction;
            this.type = _type;
            this.findNextTargetPosition(); // Initial Target setzen
        }
        setPosition(position) {
            this.position = position;
        }
        setType(type) {
            this.type = type;
        }
        handleClicked() {
        }
        move() {
            if (this.speed.x === 0 && this.speed.y === 0)
                return; // Wenn die Geschwindigkeit 0 ist, nicht weiter bewegen
            const passingPoint = new EisDealer.Vector(800, 215); // Punkt, den der Customer passieren soll
            if (!this.passingPointReached) {
                this.moveToPoint(passingPoint);
                if (this.position.equals(passingPoint)) {
                    //console.log("Customer passed the point at", this.position);
                    this.passingPointReached = true;
                }
            }
            else if (this.targetPosition) {
                this.moveToPoint(this.targetPosition);
                if (this.position.equals(this.targetPosition)) {
                    //console.log("Customer reached the target position at", this.position);
                    this.speed = new EisDealer.Vector(0, 0); // Geschwindigkeit auf 0 setzen, damit der Kunde dort bleibt
                }
            }
        }
        moveToPoint(point) {
            const dx = point.x - this.position.x;
            const dy = point.y - this.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > 1) {
                const moveX = (dx / distance) * this.speed.x;
                const moveY = (dy / distance) * this.speed.y;
                this.position.x += moveX;
                this.position.y += moveY;
            }
            else {
                this.position = point;
            }
        }
        findNextTargetPosition() {
            const availableChairs = this.getAvailableChairs();
            // Wenn keine freie Position gefunden wurde
            if (availableChairs.length === 0) {
                console.warn("No available chairs found for customer.");
                return;
            }
            const chosenChair = availableChairs[0];
            this.targetPosition = chosenChair.position.add(this.calculateOffset(chosenChair.rotation));
            // Markiere die Zielposition als belegt
            availableChairs[0].occupy();
            //console.log("Customer assigned to target position at", this.targetPosition);
        }
        calculateOffset(rotation) {
            const radians = rotation * Math.PI / 180;
            const offsetX = Customer.chairOffset.x * Math.cos(radians) - Customer.chairOffset.y * Math.sin(radians);
            const offsetY = Customer.chairOffset.x * Math.sin(radians) + Customer.chairOffset.y * Math.cos(radians);
            return new EisDealer.Vector(offsetX, offsetY);
        }
        getAvailableChairs() {
            // Filtere alle Objekte und erhalte nur die verfügbaren Stühle
            return EisDealer.allObjects.filter(obj => obj instanceof EisDealer.Chair && !obj.isOccupied());
        }
        generateRandomOrder() {
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
        getRandomScoop() {
            const randomIndex = Math.floor(Math.random() * EisDealer.data.Ice.length);
            const randomIce = EisDealer.data.Ice[randomIndex];
            const scoop = new EisDealer.Scoop(new EisDealer.Vector(0, 0), randomIce.name, randomIce.price, randomIce.color); // Cast name to any to match constructor
            return scoop;
        }
        getRandomTopping() {
            const randomIndex = Math.floor(Math.random() * EisDealer.data.Toppings.length);
            const randomTopping = EisDealer.data.Toppings[randomIndex];
            const topping = new EisDealer.Topping(new EisDealer.Vector(0, 0), randomTopping.name, randomTopping.price, randomTopping.color); // Cast name to any to match constructor
            return topping;
        }
        getRandomSauce() {
            const randomIndex = Math.floor(Math.random() * EisDealer.data.Sauce.length);
            const randomSauce = EisDealer.data.Sauce[randomIndex];
            const sauce = new EisDealer.Sauce(new EisDealer.Vector(0, 0), randomSauce.name, randomSauce.price, randomSauce.color); // Cast name to any to match constructor
            return sauce;
        }
        showOrder() {
            if (!this.orderPlaced && this.targetPosition && this.position.equals(this.targetPosition)) {
                const order = this.generateRandomOrder();
                EisDealer.orderScreen.clearItems();
                order.scoops.forEach(scoop => {
                    EisDealer.orderScreen.addItem(scoop);
                });
                if (order.topping) {
                    EisDealer.orderScreen.addItem(order.topping);
                }
                if (order.sauce) {
                    EisDealer.orderScreen.addItem(order.sauce);
                }
                this.orderPlaced = true; // Markiere die Bestellung als aufgegeben
            }
            else if (this.orderPlaced) {
                //console.log("This customer has already placed an order.");
            }
            else {
                //console.log("Customer is not seated yet.");
            }
        }
        compareOrders(selectionScreen) {
            if (!this.order) {
                console.warn("Customer order has not been generated yet.");
                return false;
            }
            const selectedOrder = selectionScreen.getSelection();
            return this.compareScoops(this.order.scoops, selectedOrder.scoops) &&
                this.compareTopping(this.order.topping, selectedOrder.topping) &&
                this.compareSauce(this.order.sauce, selectedOrder.sauce);
        }
        compareScoops(scoops1, scoops2) {
            if (scoops1.length !== scoops2.length)
                return false;
            for (let i = 0; i < scoops1.length; i++) {
                if (!this.compareScoop(scoops1[i], scoops2[i])) {
                    return false;
                }
            }
            return true;
        }
        compareScoop(scoop1, scoop2) {
            return scoop1.name === scoop2.name && scoop1.color === scoop2.color;
        }
        compareTopping(topping1, topping2) {
            if (topping1 === null && topping2 === null)
                return true;
            if (topping1 === null || topping2 === null)
                return false;
            return topping1.name === topping2.name && topping1.color === topping2.color;
        }
        compareSauce(sauce1, sauce2) {
            if (sauce1 === null && sauce2 === null)
                return true;
            if (sauce1 === null || sauce2 === null)
                return false;
            return sauce1.name === sauce2.name && sauce1.color === sauce2.color;
        }
        changeToHappy() {
            console.log("HAPPY");
            this.setType(EisDealer.CustomerType.Happy);
            const receipt = new EisDealer.Receipt(this.position.add(new EisDealer.Vector(0, -50)));
            EisDealer.allObjects.push(receipt);
        }
        changeToSad() {
            console.log("SAD");
            this.setType(EisDealer.CustomerType.Sad);
            this.moveToOriginalPosition();
            setTimeout(() => {
                const index = EisDealer.allObjects.indexOf(this);
                if (index !== -1) {
                    EisDealer.allObjects.splice(index, 1);
                }
            }, 2000); // 2 Sekunden warten, bevor der Kunde entfernt wird
        }
        moveToOriginalPosition() {
            this.targetPosition = this.originalPosition;
            this.speed = new EisDealer.Vector(5, 5); // Geschwindigkeit zum Zurückgehen setzen
            this.passingPointReached = false; // Damit der Kunde nicht beim Punkt hängen bleibt
        }
        draw() {
            switch (this.type) {
                case EisDealer.CustomerType.Normal:
                    this.drawNormal();
                    break;
                case EisDealer.CustomerType.Happy:
                    this.drawHappy();
                    break;
                case EisDealer.CustomerType.Sad:
                    this.drawSad();
                    break;
                // case CustomerType.Eat:
                //     this.drawEat();
                //     console.log("Kunde isst")
                //     break;
                default:
                    console.error("Unknown state");
                    break;
            }
        }
        drawNormal() {
            //console.log("Customer draw")
            const centerX = this.position.x;
            const centerY = this.position.y;
            const radius = 25;
            EisDealer.crc2.save();
            // crc2.translate(this.position.x, this.position.y);
            // Zeichne den Kopf
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "yellow";
            EisDealer.crc2.fill();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 2;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            // Zeichne die Augen
            const eyeRadius = 5;
            const eyeOffsetX = 8;
            const eyeOffsetY = 10;
            // Linkes Auge
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX - eyeOffsetX, centerY - eyeOffsetY, eyeRadius, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "black";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            // Rechtes Auge
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX + eyeOffsetX, centerY - eyeOffsetY, eyeRadius, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "black";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            // Zeichne den Mund
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX, centerY + 7, 7, 0, Math.PI, false);
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 2;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            // Zeichne Wangenröte
            const blushRadius = 7;
            const blushOffsetX = 15;
            const blushOffsetY = 2;
            // Linke Wange
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX - blushOffsetX, centerY + blushOffsetY, blushRadius, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "pink";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            // Rechte Wange
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX + blushOffsetX, centerY + blushOffsetY, blushRadius, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "pink";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            EisDealer.crc2.restore();
        }
        drawSad() {
            //console.log("Customer drawsad")
            const centerX = this.position.x;
            const centerY = this.position.y;
            const radius = 25;
            EisDealer.crc2.save();
            // crc2.translate(this.position.x, this.position.y);
            // Zeichne den Kopf
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "blue";
            EisDealer.crc2.fill();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 2;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            // Zeichne die Augen
            const eyeRadius = 5;
            const eyeOffsetX = 8;
            const eyeOffsetY = 10;
            // Linkes Auge
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX - eyeOffsetX, centerY - eyeOffsetY, eyeRadius, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "black";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            // Rechtes Auge
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX + eyeOffsetX, centerY - eyeOffsetY, eyeRadius, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "black";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            // Zeichne den Mund
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX, centerY + 7, 7, 0, Math.PI, false);
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 2;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            // Zeichne Wangenröte
            const blushRadius = 7;
            const blushOffsetX = 15;
            const blushOffsetY = 2;
            // Linke Wange
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX - blushOffsetX, centerY + blushOffsetY, blushRadius, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "blue";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            // Rechte Wange
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX + blushOffsetX, centerY + blushOffsetY, blushRadius, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "pink";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            EisDealer.crc2.restore();
        }
        drawHappy() {
            console.log("Customer drawHappy");
            const centerX = this.position.x;
            const centerY = this.position.y;
            const radius = 25;
            EisDealer.crc2.save();
            // crc2.translate(this.position.x, this.position.y);
            // Zeichne den Kopf
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "red";
            EisDealer.crc2.fill();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 2;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            // Zeichne die Augen
            const eyeRadius = 5;
            const eyeOffsetX = 8;
            const eyeOffsetY = 10;
            // Linkes Auge
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX - eyeOffsetX, centerY - eyeOffsetY, eyeRadius, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "black";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            // Rechtes Auge
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX + eyeOffsetX, centerY - eyeOffsetY, eyeRadius, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "black";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            // Zeichne den Mund
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX, centerY + 7, 7, 0, Math.PI, false);
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 2;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            // Zeichne Wangenröte
            const blushRadius = 7;
            const blushOffsetX = 15;
            const blushOffsetY = 2;
            // Linke Wange
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX - blushOffsetX, centerY + blushOffsetY, blushRadius, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "blue";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            // Rechte Wange
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX + blushOffsetX, centerY + blushOffsetY, blushRadius, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "pink";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            EisDealer.crc2.restore();
        }
        drawEat() {
            console.log("Customer drawEat");
            const centerX = this.position.x;
            const centerY = this.position.y;
            const radius = 25;
            EisDealer.crc2.save();
            // crc2.translate(this.position.x, this.position.y);
            // Zeichne den Kopf
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "red";
            EisDealer.crc2.fill();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 2;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            // Zeichne die Augen
            const eyeRadius = 5;
            const eyeOffsetX = 8;
            const eyeOffsetY = 10;
            // Linkes Auge
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX - eyeOffsetX, centerY - eyeOffsetY, eyeRadius, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "black";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            // Rechtes Auge
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX + eyeOffsetX, centerY - eyeOffsetY, eyeRadius, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "black";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            // Zeichne den Mund
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX, centerY + 7, 7, 0, Math.PI, false);
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 2;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            // Zeichne Wangenröte
            const blushRadius = 7;
            const blushOffsetX = 15;
            const blushOffsetY = 2;
            // Linke Wange
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX - blushOffsetX, centerY + blushOffsetY, blushRadius, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "blue";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            // Rechte Wange
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX + blushOffsetX, centerY + blushOffsetY, blushRadius, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "pink";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            EisDealer.crc2.restore();
        }
    }
    EisDealer.Customer = Customer;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Customer.js.map