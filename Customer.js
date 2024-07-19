"use strict";
var EisDealer;
(function (EisDealer) {
    class Customer extends EisDealer.Moveable {
        static WAIT_TIME_MS = 40000; // 40 Sekunden in Millisekunden
        static chairOffset = new EisDealer.Vector(25, 25);
        static waitingStartPosition = new EisDealer.Vector(810, 215); // Startposition für wartende Kunden
        static waitingSpacing = 60; // Abstand zwischen wartenden Kunden
        static waitingCustomers = []; // Warteschlange für Kunden
        static freeChair = null; // Referenz für den freigewordenen Stuhl
        targetPosition = null;
        passingPointReached = false;
        orderPlaced = false;
        type = EisDealer.CustomerType.Normal;
        order = null;
        //public proximityIntervalSet: boolean = false; // Neue Eigenschaft
        moneyScreen;
        passingPoint = new EisDealer.Vector(800, 215);
        returnPoint = new EisDealer.Vector(1100, 215);
        receiptCreated = false;
        waitStartTime = null; // Zeitpunkt, wann der Kunde draußen zu warten begonnen hat
        isSeated = false; // Status, ob der Kunde auf einem Stuhl sitzt oder in der Warteschlange ist
        constructor(_position, _speed, _direction, _type, _emotion, _moneyScreen) {
            //console.log("Receipt Constructor")
            super(_position, _speed, _direction);
            this.position = _position;
            this.speed = _speed;
            this.direction = _direction;
            this.type = _type;
            this.findNextTargetPosition(); // Initial Target setzen
            this.moneyScreen = _moneyScreen;
        }
        setPosition(position) {
            this.position = position;
        }
        setType(type) {
            this.type = type;
        }
        move() {
            if (this.speed.x === 0 && this.speed.y === 0)
                return; // Keine Bewegung, wenn Geschwindigkeit 0
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
                }
                else {
                    this.moveToPoint(this.targetPosition);
                    if (this.position.equals(this.targetPosition)) {
                        if (this.type === EisDealer.CustomerType.Happy || this.type === EisDealer.CustomerType.Sad) {
                            this.targetPosition = this.returnPoint;
                            this.passingPointReached = true;
                            this.speed = new EisDealer.Vector(5, 5); // Geschwindigkeit zurücksetzen
                            setTimeout(() => this.removeCustomer(), 5000); // 5 Sekunden warten, bevor der Kunde entfernt wird
                        }
                        else {
                            this.speed = new EisDealer.Vector(0, 0); // Geschwindigkeit stoppen, wenn der Kunde am Ziel ist
                        }
                    }
                }
            }
        }
        handleWaiting() {
            if (this.waitStartTime !== null) {
                const elapsedTime = Date.now() - this.waitStartTime;
                if (elapsedTime >= Customer.WAIT_TIME_MS) {
                    this.changeToSad();
                    this.waitStartTime = null;
                }
                if (this.targetPosition) {
                    this.moveToPoint(this.targetPosition);
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
            if (Customer.freeChair) {
                // Falls ein freigewordener Stuhl vorhanden ist
                this.targetPosition = Customer.freeChair.position.add(this.calculateOffset(Customer.freeChair.rotation));
                Customer.freeChair.occupy(); // Stuhl als belegt markieren
                Customer.freeChair = null; // Freigegebene Stuhl-Referenz zurücksetzen
                this.isSeated = true;
                this.waitStartTime = null;
            }
            else {
                const availableChairs = this.getAvailableChairs();
                // Wenn keine freie Position gefunden wurde
                if (availableChairs.length === 0) {
                    this.joinWaitingQueue();
                    return;
                }
                const chosenChair = availableChairs[0];
                this.targetPosition = chosenChair.position.add(this.calculateOffset(chosenChair.rotation));
                // Markiere die Zielposition als belegt
                chosenChair.occupy();
                //this.isSeated = true;
                this.waitStartTime = null;
            }
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
        joinWaitingQueue() {
            const queueLength = Customer.waitingCustomers.length;
            const newPosition = Customer.waitingStartPosition.copy().add(new EisDealer.Vector(0, queueLength * Customer.waitingSpacing));
            this.targetPosition = newPosition;
            Customer.waitingCustomers.push(this);
            this.waitStartTime = Date.now(); // Setze den Startzeitpunkt für das Warten
            this.speed = new EisDealer.Vector(1, 1); // Langsame Bewegung, falls nötig
        }
        freeChair() {
            console.log("chair is free");
            const chair = this.findOccupiedChair();
            if (chair) {
                Customer.freeChair = chair;
                chair.free();
                this.assignWaitingCustomerToChair();
            }
        }
        assignWaitingCustomerToChair() {
            if (Customer.waitingCustomers.length > 0) {
                this.updateWaitingQueue();
                const nextCustomer = Customer.waitingCustomers.shift(); // Hole den ersten wartenden Kunden
                if (nextCustomer) {
                    if (Customer.freeChair) {
                        nextCustomer.targetPosition = Customer.freeChair.position.add(this.calculateOffset(Customer.freeChair.rotation));
                        Customer.freeChair.occupy(); // Stuhl als belegt markieren
                        Customer.freeChair = null; // Freigegebene Stuhl-Referenz zurücksetzen
                        //nextCustomer.isSeated = true; //bestimmt wann order aufgegeben werden können
                        nextCustomer.waitStartTime = null;
                        nextCustomer.speed = new EisDealer.Vector(1, 1); // Geschwindigkeit zurücksetzen
                    }
                    else {
                        console.log("No free chair available.");
                    }
                }
            }
        }
        updateWaitingQueue() {
            for (let i = 0; i < Customer.waitingCustomers.length; i++) {
                const customer = Customer.waitingCustomers[i];
                const newPosition = Customer.waitingStartPosition.copy().add(new EisDealer.Vector(1, i * Customer.waitingSpacing));
                customer.targetPosition = newPosition;
            }
        }
        removeCustomer() {
            const index = EisDealer.allObjects.indexOf(this);
            if (index !== -1) {
                EisDealer.allObjects.splice(index, 1);
                this.freeChair();
            }
        }
        findOccupiedChair() {
            for (let obj of EisDealer.allObjects) {
                if (obj instanceof EisDealer.Chair && obj.isOccupied()) {
                    console.log("Found an occupied chair.");
                    return obj;
                }
            }
            return undefined;
        }
        moveToOriginalPosition() {
            console.log("Kunde geht");
            this.targetPosition = this.passingPoint;
            this.speed = new EisDealer.Vector(5, 5); // Geschwindigkeit zum Zurückgehen setzen
            this.passingPointReached = false; // Damit der Kunde nicht beim Punkt hängen bleibt
            this.targetPosition = this.returnPoint;
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
        placeOrder(order) {
            if (this.isSeated) {
                this.order = order;
                this.orderPlaced = true;
                console.log("Order placed:", order);
            }
            else {
                console.log("Cannot place order while waiting.");
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
            //console.log("HAPPY");
            this.setType(EisDealer.CustomerType.Happy);
            if (!this.receiptCreated) {
                if (!this.receiptExists()) {
                    const receipt = new EisDealer.Receipt(this.position.add(new EisDealer.Vector(0, -50)), this.moneyScreen);
                    EisDealer.allObjects.push(receipt);
                }
                this.receiptCreated = true;
            }
            this.targetPosition = this.passingPoint;
            this.passingPointReached = false;
            this.speed = new EisDealer.Vector(5, 5); // Geschwindigkeit zurücksetzen
        }
        // Methode zur Überprüfung, ob ein Beleg in der Nähe des Kunden existiert
        receiptExists() {
            for (let object of EisDealer.allObjects) {
                if (object instanceof EisDealer.Receipt) {
                    const receipt = object;
                    if (this.position.distanceTo(receipt.position) < 30) {
                        return true; // Beleg existiert
                    }
                }
            }
            return false; // Kein Beleg in der Nähe gefunden
        }
        changeToSad() {
            //console.log("SAD")
            this.setType(EisDealer.CustomerType.Sad);
            this.targetPosition = this.passingPoint;
            this.passingPointReached = false;
            this.speed = new EisDealer.Vector(5, 5); // Geschwindigkeit zurücksetzen
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
            // Zeichne die Augenbrauen
            const eyebrowWidth = 12;
            const eyebrowHeight = 4;
            const eyebrowOffsetY = 4; // Abstand nach oben von den Augen
            // Linke Augenbraue
            EisDealer.crc2.beginPath();
            EisDealer.crc2.moveTo(centerX - eyeOffsetX - eyebrowWidth / 2, centerY - eyeOffsetY - eyebrowOffsetY);
            EisDealer.crc2.lineTo(centerX - eyeOffsetX + eyebrowWidth / 2, centerY - eyeOffsetY - eyebrowOffsetY);
            EisDealer.crc2.lineWidth = 4;
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            // Rechte Augenbraue
            EisDealer.crc2.beginPath();
            EisDealer.crc2.moveTo(centerX + eyeOffsetX - eyebrowWidth / 2, centerY - eyeOffsetY - eyebrowOffsetY);
            EisDealer.crc2.lineTo(centerX + eyeOffsetX + eyebrowWidth / 2, centerY - eyeOffsetY - eyebrowOffsetY);
            EisDealer.crc2.lineWidth = 4;
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            // Zeichne den wütenden Mund
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX, centerY + 7, 7, Math.PI, 0, false); // Unterer Bogen des Mundes
            EisDealer.crc2.lineTo(centerX + 7, centerY + 7); // Schließt den Mund
            EisDealer.crc2.lineTo(centerX - 7, centerY + 7); // Schließt den Mund
            EisDealer.crc2.closePath();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 2;
            EisDealer.crc2.stroke();
            // Zeichne Wangenröte
            const blushRadius = 7;
            const blushOffsetX = 15;
            const blushOffsetY = 2;
            // Linke Wange
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX - blushOffsetX, centerY + blushOffsetY, blushRadius, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "red";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            // Rechte Wange
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(centerX + blushOffsetX, centerY + blushOffsetY, blushRadius, 0, 2 * Math.PI);
            EisDealer.crc2.fillStyle = "red";
            EisDealer.crc2.fill();
            EisDealer.crc2.closePath();
            EisDealer.crc2.restore();
            // Zeichne die Flügel
            const wingWidth = 20;
            const wingHeight = 20;
            const wingOffset = 0; // Abstand vom Körper
            EisDealer.crc2.beginPath();
            EisDealer.crc2.moveTo(centerX - radius - wingOffset, centerY - 5); // Ausgangspunkt des Flügels
            EisDealer.crc2.lineTo(centerX - radius - wingOffset - wingWidth, centerY - wingHeight);
            EisDealer.crc2.lineTo(centerX - radius - wingOffset - wingWidth / 2, centerY - wingHeight / 2);
            EisDealer.crc2.closePath();
            EisDealer.crc2.fillStyle = "white";
            EisDealer.crc2.fill();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.stroke();
            // Rechter Flügel
            EisDealer.crc2.beginPath();
            EisDealer.crc2.moveTo(centerX + radius + wingOffset, centerY - 5); // Ausgangspunkt des Flügels
            EisDealer.crc2.lineTo(centerX + radius + wingOffset + wingWidth, centerY - wingHeight);
            EisDealer.crc2.lineTo(centerX + radius + wingOffset + wingWidth / 2, centerY - wingHeight / 2);
            EisDealer.crc2.closePath();
            EisDealer.crc2.fillStyle = "white";
            EisDealer.crc2.fill();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.stroke();
        }
        drawHappy() {
            //console.log("Customer drawHappy")
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
            EisDealer.crc2.arc(centerX, centerY + 7, 7, 0, Math.PI, false); // Offenes Lächeln
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 2;
            EisDealer.crc2.stroke();
            EisDealer.crc2.closePath();
            // Oberer Teil des Mundes (Schlusslinie)
            EisDealer.crc2.beginPath();
            EisDealer.crc2.moveTo(centerX - 7, centerY + 7); // Links vom Mund
            EisDealer.crc2.lineTo(centerX + 7, centerY + 7); // Rechts vom Mund
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.lineWidth = 2;
            EisDealer.crc2.stroke();
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
            // Zeichne die Flügel
            const wingWidth = 30;
            const wingHeight = 20;
            const wingOffset = 0; // Abstand vom Körper
            EisDealer.crc2.beginPath();
            EisDealer.crc2.moveTo(centerX - radius - wingOffset, centerY - 5); // Ausgangspunkt des Flügels
            EisDealer.crc2.lineTo(centerX - radius - wingOffset - wingWidth, centerY - wingHeight);
            EisDealer.crc2.lineTo(centerX - radius - wingOffset - wingWidth / 2, centerY - wingHeight / 2);
            EisDealer.crc2.closePath();
            EisDealer.crc2.fillStyle = "white";
            EisDealer.crc2.fill();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.stroke();
            // Rechter Flügel
            EisDealer.crc2.beginPath();
            EisDealer.crc2.moveTo(centerX + radius + wingOffset, centerY - 5); // Ausgangspunkt des Flügels
            EisDealer.crc2.lineTo(centerX + radius + wingOffset + wingWidth, centerY - wingHeight);
            EisDealer.crc2.lineTo(centerX + radius + wingOffset + wingWidth / 2, centerY - wingHeight / 2);
            EisDealer.crc2.closePath();
            EisDealer.crc2.fillStyle = "white";
            EisDealer.crc2.fill();
            EisDealer.crc2.strokeStyle = "black";
            EisDealer.crc2.stroke();
        }
    }
    EisDealer.Customer = Customer;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Customer.js.map