namespace EisDealer {

    // rausgeh weg
    // handle click zwei mal?
    // abgleich korrekt
    // schlechte laune bei warten
    // offset bei warteschlange
    // sad, happ und receipt designen

    //Eventlistener für handleLoad Funktion
    window.addEventListener("load", handleLoad);
      //Definiton der crc2 Variable als den HTML Canvas
    export let crc2: CanvasRenderingContext2D;
    export let allObjects: Drawable[] = [];
    export let allCustomers: Customer[] = [];
    let selectionScreen: SelectionScreen;
    export let orderScreen: OrderScreen;
    let moneyScreen: Money;
    let dealer: Dealer;  

    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas) return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        canvas.addEventListener("click", handleClick);

        generateContent(data);

        const chairs = [
            { position: new Vector(425, 420), rotation: 0 },
            { position: new Vector(400, 340), rotation: 120 },
            { position: new Vector(520, 380), rotation: 240 },
            { position: new Vector(415, 155), rotation: 0 },
            { position: new Vector(410, 50), rotation: 120 },
            { position: new Vector(500, 100), rotation: 240 },
            { position: new Vector(705, 520), rotation: 300 },
            { position: new Vector(620, 450), rotation: 90 },
            { position: new Vector(710, 430), rotation: 200 },
            { position: new Vector(655, 180), rotation: 330 },
            { position: new Vector(600, 100), rotation: 90 },
            { position: new Vector(700, 90), rotation: 220 }
        ];
        
        chairs.forEach(data => {
            let chair = new Chair(data.position, data.rotation);
            //console.log(chair);
            allObjects.push(chair);
        });

        let trash: Trash =new Trash (new Vector(115, 410));
        console.log(trash);
        allObjects.push(trash);

        // Initialisieren Sie die Auswahlbildschirm-Instanz
    
        selectionScreen = new SelectionScreen(new Vector(0,0));
        orderScreen = new OrderScreen(new Vector(780,0));
        moneyScreen = new Money(new Vector(180,0))
        
        dealer = new Dealer(new Vector(100, 250), new Vector(2, 2),new Vector(0, 0),EisDealer.DealerType.withoutIce,"happy");
        console.log(dealer);
        allObjects.push(dealer);

        drawBackground();
        // setInterval(animate, 40);
        createCustomer();
        setInterval(createCustomer, 10000);
        animate(); 
    }

    function animate(): void {
        console.log("animate");
        drawBackground();

        for (let object of allObjects) {
            object.update();
        }
        selectionScreen.draw(); // Den Auswahlbildschirm in jedem Frame neu zeichnen
        orderScreen.draw();
        moneyScreen.draw();


        requestAnimationFrame(animate); // Fortlaufende Animation mit requestAnimationFrame
    }

    export function createCustomer(): void {
        // Zufällige Richtung und Geschwindigkeit
        let direction: Vector = new Vector(Math.random() * 2 - 1, Math.random() * 2 - 1).normalize().scale(2);

        // Erstelle einen neuen Kunden an der gewählten Zielkoordinate
        let customer: Customer = new Customer(new Vector(1070, 200), new Vector(1, 1), direction, CustomerType.Normal, "Happy",moneyScreen);

        allObjects.push(customer); // Füge den Kunden der Liste hinzu
        allCustomers.push(customer); // Füge den Kunden der Liste aller Kunden hinzu
    }

    function handleClick(_event: MouseEvent): void {
        //console.log("canvas is clicked");
        const x = _event.clientX;
        const y = _event.clientY;
        console.log(`Mouse clicked at (${x}, ${y})`);

        let customerClicked = false;
        let itemSelected = false;


            // Überprüfen, ob ein Kunde angeklickt wurde
            for (let customer of allCustomers) {
                const dx = x - customer.position.x;
                const dy = y - customer.position.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                //console.log(`Distance to customer at (${customer.position.x}, ${customer.position.y}): ${distance}`);
                if (distance < 25) { // Annahme: Radius des Kunden ist 25
                    console.log('Customer clicked!');
                    customerClicked = true;
                    customer.showOrder();
                    dealer.customerClicked = true;
                    dealer.handleCustomerClick(); // Setze die Eigenschaft auf true

                // Überprüfen, ob der Dealer im `withIce` Zustand ist und den Kunden erreicht hat
                const proximityInterval = setInterval(() => {
                    const dealerDistanceX = dealer.position.x - customer.position.x;
                    const dealerDistanceY = dealer.position.y - customer.position.y;
                    const dealerDistance = Math.sqrt(dealerDistanceX * dealerDistanceX + dealerDistanceY * dealerDistanceY);
    
                    if (dealer.type === DealerType.withIce && dealerDistance < 100) {
                        const customerOrderCorrect = customer.compareOrders(selectionScreen);
    
                        if (customerOrderCorrect) {
                            console.log("Customer's order matches dealer's selection!");
                            customer.changeToHappy();
                            // Additional logic for correct order
                        } else {
                            console.log("Customer's order does not match dealer's selection.");
                            customer.changeToSad();
                            // Additional logic for incorrect order
                        }
    
                        clearInterval(proximityInterval); // Clear the interval once conditions are met
                    }
                }, 200);                
                    
                    // Setze das Ziel des Dealers auf eine Position neben dem Kunden
                    const offsetAngle = Math.random() * 2 * Math.PI;
                    const offsetDistance = 80; // Verschiebung um 80 Pixel
                    const targetPosition = new Vector(
                    customer.position.x + offsetDistance * Math.cos(offsetAngle),
                    customer.position.y + offsetDistance * Math.sin(offsetAngle)
                    );

                    dealer.updateDealerType();
                    dealer.setTargetPosition(targetPosition);

                    break;
                    }
                }
            //console.log('No customer clicked.');

            // Überprüfen, ob ein Scoop angeklickt wurde
            for (let object of allObjects) {
                if (object instanceof Scoop) {
                    const scoop = object as Scoop;
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
                for (let object of allObjects) {
                    if (object instanceof Sauce) {
                        const sauce = object as Sauce;
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
                for (let object of allObjects) {
                    if (object instanceof Topping) {
                        const topping = object as Topping;
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


            // Check if a receipt was clicked
            for (let object of allObjects) {
                if (object instanceof Receipt) {
                    console.log('receipt clicked!');
                    const receipt = object as Receipt;
                    const dx = x - receipt.position.x;
                    const dy = y - receipt.position.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 50) { // Assuming the click range for receipt
                        receipt.handleClicked();
                        return;
                    }
                }
            }

            // Überprüfen, ob der Trash-Behälter angeklickt wurde
            for (let object of allObjects) {
                if (object instanceof Trash) {
                    const trash = object as Trash;
                    if (x >= trash.position.x - 20 && x <= trash.position.x + 20 &&
                        y >= trash.position.y - 20 && y <= trash.position.y + 20) {
                        // Clear all items from the selection screen
                        selectionScreen.clearItems();
                        return;
                    }
                }
            }         
        }  

    function drawBackground(): void {
        crc2.save();
        crc2.fillStyle = "green";
        crc2.fillRect(0,0,1000,600)
        crc2.restore();
        crc2.restore();

        // Zeichne das Rechteck (den Zaun)
        const rectX = -5; // x-Position des Rechtecks
        const rectY = -5; // y-Position des Rechtecks
        const rectWidth = 800; // Breite des Rechtecks
        const rectHeight = 570; // Höhe des Rechtecks

        crc2.strokeStyle = '#8B4513'; // Braune Farbe für die Linie
        crc2.lineWidth = 2; // Dicke der Linie

        // Lücke definieren
        const lueckeStart = rectY + 200; // y-Position, an der die Lücke beginnt
        const lueckeEnde = lueckeStart + 50; // y-Position, an der die Lücke endet

        // Obere Linie
        crc2.save();
        crc2.beginPath();
        crc2.moveTo(rectX, rectY);
        crc2.lineTo(rectX + rectWidth, rectY);
        crc2.stroke();
        crc2.restore();

        // Untere Linie
        crc2.save();
        crc2.beginPath();
        crc2.moveTo(rectX, rectY + rectHeight);
        crc2.lineTo(rectX + rectWidth, rectY + rectHeight);
        crc2.stroke();
        crc2.restore();

        // Linke Linie
        crc2.save();
        crc2.beginPath();
        crc2.moveTo(rectX, rectY);
        crc2.lineTo(rectX, rectY + rectHeight);
        crc2.stroke();
        crc2.restore();

        // Rechte Linie mit Lücke
        crc2.save();
        crc2.beginPath();
        crc2.moveTo(rectX + rectWidth, rectY);
        crc2.lineTo(rectX + rectWidth, lueckeStart);
        crc2.moveTo(rectX + rectWidth, lueckeEnde);
        crc2.lineTo(rectX + rectWidth, rectY + rectHeight);
        crc2.stroke();
        crc2.restore();

        // Abstand zwischen den Pfählen (in Pixel)
        const abstand = 30; // 3cm (bei 10px pro cm)

        // Zeichne die Pfähle als Kreise
        const radius = 5; // Radius der Kreise (Pfähle)
        crc2.fillStyle = '#D2B48C'; // Helle Farbe für die Pfähle

        // Pfähle an der oberen und unteren Kante zeichnen
        for (let x = rectX + abstand; x < rectX + rectWidth; x += abstand) {
            crc2.save();
            crc2.beginPath();
            crc2.arc(x, rectY, radius, 0, 2 * Math.PI); // Pfähle an der oberen Kante
            crc2.fill();
            crc2.restore();

            crc2.save();
            crc2.beginPath();
            crc2.arc(x, rectY + rectHeight, radius, 0, 2 * Math.PI); // Pfähle an der unteren Kante
            crc2.fill();
            crc2.restore();
        }

        // Pfähle an der linken und rechten Kante zeichnen
        for (let y = rectY + abstand; y < rectY + rectHeight; y += abstand) {
            crc2.save();
            crc2.beginPath();
            crc2.arc(rectX, y, radius, 0, 2 * Math.PI); // Pfähle an der linken Kante
            crc2.fill();
            crc2.restore();

            // Rechte Kante, aber mit einer Lücke
            if (y < lueckeStart || y > lueckeEnde) {
                crc2.save();
                crc2.beginPath();
                crc2.arc(rectX + rectWidth, y, radius, 0, 2 * Math.PI); // Pfähle an der rechten Kante
                crc2.fill();
                crc2.restore();
                }
             }
                //Zeichne den Thekenbereich
                crc2.save();
                crc2.beginPath();
                crc2.moveTo(0, 100);
                crc2.lineTo(300,100);
                crc2.lineTo(300,450);
                crc2.lineTo(0,450);
                crc2.fillStyle = "lightbrown";
                crc2.stroke();
                crc2.fill();
                crc2.restore();

                crc2.save();
                crc2.beginPath();
                crc2.moveTo(150, 100);
                crc2.lineTo(300,100);
                crc2.lineTo(300,450);
                crc2.lineTo(150,450);
                crc2.fillStyle = "brown";
                crc2.stroke();
                crc2.fill();
                crc2.restore();

                //Eisbehälterbereich
                crc2.save();
                crc2.beginPath();
                crc2.moveTo(160, 110);
                crc2.lineTo(290,110);
                crc2.lineTo(290,300);
                crc2.lineTo(160,300);
                crc2.fillStyle = "grey";
                crc2.stroke();
                crc2.fill();
                crc2.restore();

                //Eisbehälter
                crc2.save();
                crc2.beginPath();
                crc2.moveTo(170, 120);
                crc2.lineTo(220,120);
                crc2.lineTo(220,170);
                crc2.lineTo(170,170);
                crc2.lineTo(170,120);
                crc2.fillStyle = "black";
                crc2.stroke();
                crc2.fill();
                crc2.restore();

                crc2.save();
                crc2.beginPath();
                crc2.moveTo(230, 120);
                crc2.lineTo(280,120);
                crc2.lineTo(280,170);
                crc2.lineTo(230,170);
                crc2.lineTo(230,120);
                crc2.fillStyle = "black";
                crc2.stroke();
                crc2.fill();
                crc2.restore();

                crc2.save();
                crc2.beginPath();
                crc2.moveTo(230, 180);
                crc2.lineTo(280,180);
                crc2.lineTo(280,230);
                crc2.lineTo(230,230);
                crc2.lineTo(230,180);
                crc2.fillStyle = "black";
                crc2.stroke();
                crc2.fill();
                crc2.restore();

                crc2.save();
                crc2.beginPath();
                crc2.moveTo(230, 240);
                crc2.lineTo(280,240);
                crc2.lineTo(280,290);
                crc2.lineTo(230,290);
                crc2.lineTo(230,240);
                crc2.fillStyle = "black";
                crc2.stroke();
                crc2.fill();
                crc2.restore();

                crc2.save();
                crc2.beginPath();
                crc2.moveTo(170, 180);
                crc2.lineTo(220,180);
                crc2.lineTo(220,230);
                crc2.lineTo(170,230);
                crc2.lineTo(170,180);
                crc2.fillStyle = "black";
                crc2.stroke();
                crc2.fill();
                crc2.restore();

                crc2.save();
                crc2.beginPath();
                crc2.moveTo(170, 240);
                crc2.lineTo(220,240);
                crc2.lineTo(220,290);
                crc2.lineTo(170,290);
                crc2.lineTo(170,240);
                crc2.fillStyle = "black";
                crc2.stroke();
                crc2.fill();
                crc2.restore();

                //Zeichne die Tische
                crc2.save();
                crc2.beginPath();
                crc2.arc(440, 100, 45, 0, 2 * Math.PI);
                crc2.fillStyle = "#D2B48C"; // Hellbraune Farbe
                crc2.strokeStyle = "black";
                crc2.fill();
                crc2.stroke();
                crc2.restore();

                crc2.save();
                crc2.beginPath();
                crc2.arc(650, 120, 45, 0, 2 * Math.PI);
                crc2.fillStyle = "#D2B48C"; // Hellbraune Farbe
                crc2.strokeStyle = "black";
                crc2.fill();
                crc2.stroke();
                crc2.restore();

                crc2.save();
                crc2.beginPath();
                crc2.arc(450, 370, 45, 0, 2 * Math.PI);
                crc2.fillStyle = "#D2B48C"; // Hellbraune Farbe
                crc2.strokeStyle = "black";
                crc2.fill();
                crc2.stroke();
                crc2.restore();

                crc2.save();
                crc2.beginPath();
                crc2.arc(670, 470, 45, 0, 2 * Math.PI);
                crc2.fillStyle = "#D2B48C"; // Hellbraune Farbe
                crc2.strokeStyle = "black";
                crc2.fill();
                crc2.stroke();
                crc2.restore();


                crc2.save();
                const x = 200;
                const y = 370;

                // Zeichne den äußeren rechteckigen Becher
                crc2.beginPath();
                crc2.rect(x - 45, y - 65, 50, 30); // Äußeres Rechteck
                crc2.fillStyle = "#D2B48C"; // Beige Farbe für den Becher
                crc2.fill();
                crc2.strokeStyle = "black";
                crc2.lineWidth = 2;
                crc2.stroke();
                crc2.closePath();

                // Zeichne das innere Rechteck (Boden des Bechers)
                crc2.beginPath();
                crc2.rect(x - 40, y - 60, 40, 20); // Inneres Rechteck
                crc2.fillStyle = "#ffffff"; // Weiß für den Boden
                crc2.fill();
                crc2.strokeStyle = "black";
                crc2.lineWidth = 1;
                crc2.stroke();
                crc2.closePath();
                crc2.restore();
            }
}
            


