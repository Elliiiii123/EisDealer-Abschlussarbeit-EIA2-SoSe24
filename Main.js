"use strict";
var EisDealer;
(function (EisDealer) {
    // handle click zwei mal?
    // freien stuhl nach warteschlange finden
    //Eventlistener für handleLoad Funktion
    window.addEventListener("load", handleLoad);
    //Array mit allen Objekten
    EisDealer.allObjects = [];
    // (globale) relevante Variablen
    EisDealer.allCustomers = [];
    let selectionScreen;
    let moneyScreen;
    let dealer;
    //Funktion die nach der geladenen seite ausgeführt wird
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        EisDealer.crc2 = canvas.getContext("2d");
        canvas.addEventListener("click", handleClick);
        //content aus data wird generiert
        EisDealer.generateContent(EisDealer.data);
        //Die Positionen der Stühle
        const chairs = [
            { position: new EisDealer.Vector(425, 420), rotation: 0, id: 1 },
            { position: new EisDealer.Vector(400, 340), rotation: 120, id: 2 },
            { position: new EisDealer.Vector(520, 380), rotation: 240, id: 3 },
            { position: new EisDealer.Vector(415, 155), rotation: 0, id: 4 },
            { position: new EisDealer.Vector(410, 50), rotation: 120, id: 5 },
            { position: new EisDealer.Vector(500, 100), rotation: 240, id: 6 },
            { position: new EisDealer.Vector(705, 520), rotation: 300, id: 7 },
            { position: new EisDealer.Vector(620, 450), rotation: 90, id: 8 },
            { position: new EisDealer.Vector(710, 430), rotation: 200, id: 9 },
            { position: new EisDealer.Vector(655, 180), rotation: 330, id: 10 },
            { position: new EisDealer.Vector(600, 100), rotation: 90, id: 11 },
            { position: new EisDealer.Vector(700, 90), rotation: 220, id: 12 }
        ];
        //neuer stuhl wird erstellt
        chairs.forEach(data => {
            let chair = new EisDealer.Chair(data.position, data.rotation, data.id);
            //console.log(chair);
            EisDealer.allObjects.push(chair);
        });
        //Müll Objekt wird erstellt
        let trash = new EisDealer.Trash(new EisDealer.Vector(115, 410));
        console.log(trash);
        EisDealer.allObjects.push(trash);
        // Auswahl-, Bestellungs- und Geldbildschrim werden erstellt
        selectionScreen = new EisDealer.SelectionScreen(new EisDealer.Vector(0, 0));
        EisDealer.orderScreen = new EisDealer.OrderScreen(new EisDealer.Vector(780, 0));
        moneyScreen = new EisDealer.Money(new EisDealer.Vector(180, 0));
        // Dealer-Objekt wird erstellt
        dealer = new EisDealer.Dealer(new EisDealer.Vector(100, 250), new EisDealer.Vector(2, 2), new EisDealer.Vector(0, 0), EisDealer.DealerType.withoutIce, "happy");
        console.log(dealer);
        EisDealer.allObjects.push(dealer);
        //Funktion zum nHintergrund zeichnen wird aufgerufen
        drawBackground();
        // Funktion zur speziellen erstellung des customers wird aufgerufen
        createCustomer();
        //Alle 10 Sekunden wird ein neuer customer erstellt
        setInterval(createCustomer, 5000);
        animate();
    }
    EisDealer.handleLoad = handleLoad;
    //Funktion zu Animation
    function animate() {
        //console.log("animate");
        //Hintergund wird erneut gezeichnet
        drawBackground();
        //zustand aller Objekte wird aktualisiert
        for (let object of EisDealer.allObjects) {
            object.update();
        }
        //Alle Bildschirme werden neu gezeichnet
        selectionScreen.draw();
        EisDealer.orderScreen.draw();
        moneyScreen.draw();
        // Fortlaufende Animation mit requestAnimationFrame
        requestAnimationFrame(animate);
    }
    // Funktion zur Erstellung eines neuen Kunden
    function createCustomer() {
        // Zufällige Richtung und Geschwindigkeit
        let direction = new EisDealer.Vector(Math.random() * 2 - 1, Math.random() * 2 - 1).normalize().scale(2);
        // Erstelle einen neuen Kunden an der gewählten Kooridnate
        let customer = new EisDealer.Customer(new EisDealer.Vector(1070, 200), new EisDealer.Vector(1, 1), direction, EisDealer.CustomerType.Normal, "Happy", moneyScreen);
        // Füge den Kunden der Liste hinzu
        EisDealer.allObjects.push(customer);
        // Füge den Kunden der Liste aller Kunden hinzu
        EisDealer.allCustomers.push(customer);
    }
    EisDealer.createCustomer = createCustomer;
    // Event-Handler für Klicks auf das Canvas
    function handleClick(_event) {
        //console.log("canvas is clicked");
        const x = _event.clientX;
        const y = _event.clientY;
        //console.log(`Mouse clicked at (${x}, ${y})`);
        let customerClicked = false;
        let itemSelected = false;
        // Überprüfen, ob ein Kunde angeklickt wurde
        for (let customer of EisDealer.allCustomers) {
            const dx = x - customer.position.x;
            const dy = y - customer.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            //console.log(`Distance to customer at (${customer.position.x}, ${customer.position.y}): ${distance}`);
            if (distance < 25) {
                console.log('Customer clicked!');
                customerClicked = true;
                customer.showOrder();
                // Zeige die Bestellung des Kunden an
                dealer.customerClicked = true;
                dealer.handleCustomerClick();
                // Überprüfen, ob der Dealer im `withIce` Zustand ist und den Kunden erreicht hat
                const proximityInterval = setInterval(() => {
                    const dealerDistanceX = dealer.position.x - customer.position.x;
                    const dealerDistanceY = dealer.position.y - customer.position.y;
                    const dealerDistance = Math.sqrt(dealerDistanceX * dealerDistanceX + dealerDistanceY * dealerDistanceY);
                    if (dealer.type === EisDealer.DealerType.withIce && dealerDistance < 150) {
                        const customerOrderCorrect = customer.compareOrders(selectionScreen);
                        if (customerOrderCorrect) {
                            //customer wird glücklich wenn bestllung richtig ist
                            console.log("Customer's order matches dealer's selection!");
                            customer.changeToHappy();
                        }
                        else {
                            console.log("Customer's order does not match dealer's selection.");
                            //customer wird traurig wenn bestllung falsch ist
                            customer.changeToSad();
                        }
                        clearInterval(proximityInterval);
                    }
                }, 200);
                // Setze das Ziel des Dealers auf eine Position neben dem Kunden
                const offsetAngle = Math.random() * 2 * Math.PI;
                const offsetDistance = 80;
                const targetPosition = new EisDealer.Vector(customer.position.x + offsetDistance * Math.cos(offsetAngle), customer.position.y + offsetDistance * Math.sin(offsetAngle));
                dealer.updateDealerType();
                dealer.setTargetPosition(targetPosition);
                break;
            }
        }
        //console.log('No customer clicked.');
        // Überprüfen, ob ein Scoop angeklickt wurde
        for (let object of EisDealer.allObjects) {
            if (object instanceof EisDealer.Scoop) {
                const scoop = object;
                if (x >= scoop.position.x && x <= scoop.position.x + 50 &&
                    y >= scoop.position.y && y <= scoop.position.y + 50) {
                    //console.log('Scoop clicked!');
                    selectionScreen.addItem(scoop);
                    dealer.moveToOriginalPosition();
                    dealer.setSelectedScoop(scoop);
                    itemSelected = true;
                    break;
                }
            }
        }
        // Überprüfen, ob eine Sauce angeklickt wurde
        if (!itemSelected) {
            for (let object of EisDealer.allObjects) {
                if (object instanceof EisDealer.Sauce) {
                    const sauce = object;
                    if (x >= sauce.position.x - 20 && x <= sauce.position.x + 20 &&
                        y >= sauce.position.y - 20 && y <= sauce.position.y + 20) {
                        //console.log('Sauce clicked!');
                        selectionScreen.addItem(sauce);
                        dealer.moveToOriginalPosition();
                        dealer.setSelectedSauce(sauce);
                        itemSelected = true;
                        break;
                    }
                }
            }
        }
        // Überprüfen, ob ein Topping angeklickt wurde
        if (!itemSelected) {
            for (let object of EisDealer.allObjects) {
                if (object instanceof EisDealer.Topping) {
                    const topping = object;
                    if (x >= topping.position.x - 20 && x <= topping.position.x + 20 &&
                        y >= topping.position.y - 20 && y <= topping.position.y + 20) {
                        //console.log('Topping clicked!');
                        selectionScreen.addItem(topping);
                        dealer.moveToOriginalPosition();
                        dealer.addSelectedTopping(topping);
                        itemSelected = true;
                        break;
                    }
                }
            }
        }
        // Nur wenn ein Kunde angeklickt wurde und mindestens ein Item ausgewählt wurde, den Typ ändern
        if (customerClicked || itemSelected) {
            dealer.updateDealerType();
        }
        // Überprüfe ob eine Rechnung geklickt wurde
        for (let object of EisDealer.allObjects) {
            if (object instanceof EisDealer.Receipt) {
                console.log('receipt clicked!');
                const receipt = object;
                const dx = x - receipt.position.x;
                const dy = y - receipt.position.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 50) {
                    receipt.handleClicked();
                    return;
                }
            }
        }
        // Überprüfen, ob der Mülleimer angeklickt wurde und falls ja sollen items gelöscht werden
        for (let object of EisDealer.allObjects) {
            if (object instanceof EisDealer.Trash) {
                const trash = object;
                if (x >= trash.position.x - 20 && x <= trash.position.x + 20 &&
                    y >= trash.position.y - 20 && y <= trash.position.y + 20) {
                    selectionScreen.clearItems();
                    return;
                }
            }
        }
    }
    //Hintergrund wird gezeichnet    
    function drawBackground() {
        EisDealer.crc2.save();
        EisDealer.crc2.fillStyle = "green";
        EisDealer.crc2.fillRect(0, 0, 1000, 600);
        EisDealer.crc2.restore();
        EisDealer.crc2.restore();
        // Zeichne das Rechteck (den Zaun)
        const rectX = -5; // x-Position des Rechtecks
        const rectY = -5; // y-Position des Rechtecks
        const rectWidth = 800; // Breite des Rechtecks
        const rectHeight = 570; // Höhe des Rechtecks
        EisDealer.crc2.strokeStyle = '#8B4513'; // Braune Farbe für die Linie
        EisDealer.crc2.lineWidth = 2; // Dicke der Linie
        // Lücke definieren
        const lueckeStart = rectY + 200; // y-Position, an der die Lücke beginnt
        const lueckeEnde = lueckeStart + 50; // y-Position, an der die Lücke endet
        // Obere Linie
        EisDealer.crc2.save();
        EisDealer.crc2.beginPath();
        EisDealer.crc2.moveTo(rectX, rectY);
        EisDealer.crc2.lineTo(rectX + rectWidth, rectY);
        EisDealer.crc2.stroke();
        EisDealer.crc2.restore();
        // Untere Linie
        EisDealer.crc2.save();
        EisDealer.crc2.beginPath();
        EisDealer.crc2.moveTo(rectX, rectY + rectHeight);
        EisDealer.crc2.lineTo(rectX + rectWidth, rectY + rectHeight);
        EisDealer.crc2.stroke();
        EisDealer.crc2.restore();
        // Linke Linie
        EisDealer.crc2.save();
        EisDealer.crc2.beginPath();
        EisDealer.crc2.moveTo(rectX, rectY);
        EisDealer.crc2.lineTo(rectX, rectY + rectHeight);
        EisDealer.crc2.stroke();
        EisDealer.crc2.restore();
        // Rechte Linie mit Lücke
        EisDealer.crc2.save();
        EisDealer.crc2.beginPath();
        EisDealer.crc2.moveTo(rectX + rectWidth, rectY);
        EisDealer.crc2.lineTo(rectX + rectWidth, lueckeStart);
        EisDealer.crc2.moveTo(rectX + rectWidth, lueckeEnde);
        EisDealer.crc2.lineTo(rectX + rectWidth, rectY + rectHeight);
        EisDealer.crc2.stroke();
        EisDealer.crc2.restore();
        // Abstand zwischen den Pfählen (in Pixel)
        const abstand = 30; // 3cm (bei 10px pro cm)
        // Zeichne die Pfähle als Kreise
        const radius = 5; // Radius der Kreise (Pfähle)
        EisDealer.crc2.fillStyle = '#D2B48C';
        // Pfähle an der oberen und unteren Kante zeichnen
        for (let x = rectX + abstand; x < rectX + rectWidth; x += abstand) {
            EisDealer.crc2.save();
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(x, rectY, radius, 0, 2 * Math.PI); // Pfähle an der oberen Kante
            EisDealer.crc2.fill();
            EisDealer.crc2.restore();
            EisDealer.crc2.save();
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(x, rectY + rectHeight, radius, 0, 2 * Math.PI); // Pfähle an der unteren Kante
            EisDealer.crc2.fill();
            EisDealer.crc2.restore();
        }
        // Pfähle an der linken und rechten Kante zeichnen
        for (let y = rectY + abstand; y < rectY + rectHeight; y += abstand) {
            EisDealer.crc2.save();
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(rectX, y, radius, 0, 2 * Math.PI); // Pfähle an der linken Kante
            EisDealer.crc2.fill();
            EisDealer.crc2.restore();
            // Rechte Kante, aber mit einer Lücke
            if (y < lueckeStart || y > lueckeEnde) {
                EisDealer.crc2.save();
                EisDealer.crc2.beginPath();
                EisDealer.crc2.arc(rectX + rectWidth, y, radius, 0, 2 * Math.PI); // Pfähle an der rechten Kante
                EisDealer.crc2.fill();
                EisDealer.crc2.restore();
            }
        }
        //Zeichne den Thekenbereich
        EisDealer.crc2.save();
        EisDealer.crc2.beginPath();
        EisDealer.crc2.moveTo(0, 100);
        EisDealer.crc2.lineTo(300, 100);
        EisDealer.crc2.lineTo(300, 450);
        EisDealer.crc2.lineTo(0, 450);
        EisDealer.crc2.fillStyle = "lightbrown";
        EisDealer.crc2.stroke();
        EisDealer.crc2.fill();
        EisDealer.crc2.restore();
        EisDealer.crc2.save();
        EisDealer.crc2.beginPath();
        EisDealer.crc2.moveTo(150, 100);
        EisDealer.crc2.lineTo(300, 100);
        EisDealer.crc2.lineTo(300, 450);
        EisDealer.crc2.lineTo(150, 450);
        EisDealer.crc2.fillStyle = "brown";
        EisDealer.crc2.stroke();
        EisDealer.crc2.fill();
        EisDealer.crc2.restore();
        //Eisbehälterbereich
        EisDealer.crc2.save();
        EisDealer.crc2.beginPath();
        EisDealer.crc2.moveTo(160, 110);
        EisDealer.crc2.lineTo(290, 110);
        EisDealer.crc2.lineTo(290, 300);
        EisDealer.crc2.lineTo(160, 300);
        EisDealer.crc2.fillStyle = "grey";
        EisDealer.crc2.stroke();
        EisDealer.crc2.fill();
        EisDealer.crc2.restore();
        //Eisbehälter
        EisDealer.crc2.save();
        EisDealer.crc2.beginPath();
        EisDealer.crc2.moveTo(170, 120);
        EisDealer.crc2.lineTo(220, 120);
        EisDealer.crc2.lineTo(220, 170);
        EisDealer.crc2.lineTo(170, 170);
        EisDealer.crc2.lineTo(170, 120);
        EisDealer.crc2.fillStyle = "black";
        EisDealer.crc2.stroke();
        EisDealer.crc2.fill();
        EisDealer.crc2.restore();
        EisDealer.crc2.save();
        EisDealer.crc2.beginPath();
        EisDealer.crc2.moveTo(230, 120);
        EisDealer.crc2.lineTo(280, 120);
        EisDealer.crc2.lineTo(280, 170);
        EisDealer.crc2.lineTo(230, 170);
        EisDealer.crc2.lineTo(230, 120);
        EisDealer.crc2.fillStyle = "black";
        EisDealer.crc2.stroke();
        EisDealer.crc2.fill();
        EisDealer.crc2.restore();
        EisDealer.crc2.save();
        EisDealer.crc2.beginPath();
        EisDealer.crc2.moveTo(230, 180);
        EisDealer.crc2.lineTo(280, 180);
        EisDealer.crc2.lineTo(280, 230);
        EisDealer.crc2.lineTo(230, 230);
        EisDealer.crc2.lineTo(230, 180);
        EisDealer.crc2.fillStyle = "black";
        EisDealer.crc2.stroke();
        EisDealer.crc2.fill();
        EisDealer.crc2.restore();
        EisDealer.crc2.save();
        EisDealer.crc2.beginPath();
        EisDealer.crc2.moveTo(230, 240);
        EisDealer.crc2.lineTo(280, 240);
        EisDealer.crc2.lineTo(280, 290);
        EisDealer.crc2.lineTo(230, 290);
        EisDealer.crc2.lineTo(230, 240);
        EisDealer.crc2.fillStyle = "black";
        EisDealer.crc2.stroke();
        EisDealer.crc2.fill();
        EisDealer.crc2.restore();
        EisDealer.crc2.save();
        EisDealer.crc2.beginPath();
        EisDealer.crc2.moveTo(170, 180);
        EisDealer.crc2.lineTo(220, 180);
        EisDealer.crc2.lineTo(220, 230);
        EisDealer.crc2.lineTo(170, 230);
        EisDealer.crc2.lineTo(170, 180);
        EisDealer.crc2.fillStyle = "black";
        EisDealer.crc2.stroke();
        EisDealer.crc2.fill();
        EisDealer.crc2.restore();
        EisDealer.crc2.save();
        EisDealer.crc2.beginPath();
        EisDealer.crc2.moveTo(170, 240);
        EisDealer.crc2.lineTo(220, 240);
        EisDealer.crc2.lineTo(220, 290);
        EisDealer.crc2.lineTo(170, 290);
        EisDealer.crc2.lineTo(170, 240);
        EisDealer.crc2.fillStyle = "black";
        EisDealer.crc2.stroke();
        EisDealer.crc2.fill();
        EisDealer.crc2.restore();
        //Zeichne die Tische
        EisDealer.crc2.save();
        EisDealer.crc2.beginPath();
        EisDealer.crc2.arc(440, 100, 45, 0, 2 * Math.PI);
        EisDealer.crc2.fillStyle = "#D2B48C"; // Hellbraune Farbe
        EisDealer.crc2.strokeStyle = "black";
        EisDealer.crc2.fill();
        EisDealer.crc2.stroke();
        EisDealer.crc2.restore();
        EisDealer.crc2.save();
        EisDealer.crc2.beginPath();
        EisDealer.crc2.arc(650, 120, 45, 0, 2 * Math.PI);
        EisDealer.crc2.fillStyle = "#D2B48C"; // Hellbraune Farbe
        EisDealer.crc2.strokeStyle = "black";
        EisDealer.crc2.fill();
        EisDealer.crc2.stroke();
        EisDealer.crc2.restore();
        EisDealer.crc2.save();
        EisDealer.crc2.beginPath();
        EisDealer.crc2.arc(450, 370, 45, 0, 2 * Math.PI);
        EisDealer.crc2.fillStyle = "#D2B48C"; // Hellbraune Farbe
        EisDealer.crc2.strokeStyle = "black";
        EisDealer.crc2.fill();
        EisDealer.crc2.stroke();
        EisDealer.crc2.restore();
        EisDealer.crc2.save();
        EisDealer.crc2.beginPath();
        EisDealer.crc2.arc(670, 470, 45, 0, 2 * Math.PI);
        EisDealer.crc2.fillStyle = "#D2B48C"; // Hellbraune Farbe
        EisDealer.crc2.strokeStyle = "black";
        EisDealer.crc2.fill();
        EisDealer.crc2.stroke();
        EisDealer.crc2.restore();
        EisDealer.crc2.save();
        const x = 200;
        const y = 370;
        // Zeichne den äußeren rechteckigen Becher
        EisDealer.crc2.beginPath();
        EisDealer.crc2.rect(x - 45, y - 65, 50, 30); // Äußeres Rechteck
        EisDealer.crc2.fillStyle = "#D2B48C"; // Beige Farbe für den Becher
        EisDealer.crc2.fill();
        EisDealer.crc2.strokeStyle = "black";
        EisDealer.crc2.lineWidth = 2;
        EisDealer.crc2.stroke();
        EisDealer.crc2.closePath();
        // Zeichne das innere Rechteck (Boden des Bechers)
        EisDealer.crc2.beginPath();
        EisDealer.crc2.rect(x - 40, y - 60, 40, 20);
        EisDealer.crc2.fillStyle = "#ffffff";
        EisDealer.crc2.fill();
        EisDealer.crc2.strokeStyle = "black";
        EisDealer.crc2.lineWidth = 1;
        EisDealer.crc2.stroke();
        EisDealer.crc2.closePath();
        EisDealer.crc2.restore();
    }
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Main.js.map