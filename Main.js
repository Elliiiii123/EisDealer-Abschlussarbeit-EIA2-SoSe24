"use strict";
var EisDealer;
(function (EisDealer) {
    //Eventlistener für handleLoad Funktion
    window.addEventListener("load", handleLoad);
    EisDealer.allObjects = [];
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        EisDealer.crc2 = canvas.getContext("2d");
        canvas.addEventListener("click", handleClick);
        EisDealer.generateContent(EisDealer.data);
        let door = new EisDealer.Door(new EisDealer.Vector(795, 195), new EisDealer.Vector(0, 0), new EisDealer.Vector(0, 0));
        console.log(door);
        EisDealer.allObjects.push(door);
        const chairs = [
            { position: new EisDealer.Vector(425, 420), rotation: 0 },
            { position: new EisDealer.Vector(400, 340), rotation: 120 },
            { position: new EisDealer.Vector(520, 380), rotation: 240 },
            { position: new EisDealer.Vector(415, 155), rotation: 0 },
            { position: new EisDealer.Vector(410, 50), rotation: 120 },
            { position: new EisDealer.Vector(500, 100), rotation: 240 },
            { position: new EisDealer.Vector(705, 520), rotation: 300 },
            { position: new EisDealer.Vector(620, 450), rotation: 90 },
            { position: new EisDealer.Vector(710, 430), rotation: 200 },
            { position: new EisDealer.Vector(655, 180), rotation: 330 },
            { position: new EisDealer.Vector(600, 100), rotation: 90 },
            { position: new EisDealer.Vector(700, 90), rotation: 220 }
        ];
        chairs.forEach(data => {
            let chair = new EisDealer.Chair(data.position, data.rotation);
            //console.log(chair);
            EisDealer.allObjects.push(chair);
        });
        let trash = new EisDealer.Trash(new EisDealer.Vector(115, 410));
        console.log(trash);
        EisDealer.allObjects.push(trash);
        // let customer: Customer = new Customer(new Vector(200, 200), new Vector(0, 0),new Vector(0, 0),EisDealer.CustomerType.Normal,"Happy");
        // console.log(customer);
        // allObjects.push(customer);
        for (let i = 0; i < 7; i++) {
            EisDealer.allObjects.push(createCustomer());
        }
        let dealer = new EisDealer.Dealer(new EisDealer.Vector(100, 200), new EisDealer.Vector(0, 0), new EisDealer.Vector(0, 0), EisDealer.DealerType.withoutIce, "Happy");
        console.log(dealer);
        EisDealer.allObjects.push(dealer);
        drawBackground();
        setInterval(animate, 40);
    }
    function animate() {
        console.log("animate");
        drawBackground();
        for (let object of EisDealer.allObjects) {
            object.update();
        }
    }
    function createCustomer() {
        // Zufällige Position innerhalb des Canvas
        let x = Math.random() * 1000;
        let y = Math.random() * 600;
        // Zufällige Geschwindigkeit und Richtung
        let speed = new EisDealer.Vector(2, 2);
        let direction = new EisDealer.Vector(Math.random() * 2 - 1, Math.random() * 2 - 1).normalize().scale(2);
        // Erstelle einen neuen Kunden
        let customer = new EisDealer.Customer(new EisDealer.Vector(x, y), speed, direction, EisDealer.CustomerType.Normal, "Happy");
        // Finde den nächsten unbesetzten Stuhl für diesen Kunden
        let unoccupiedChairs = EisDealer.allObjects.filter(obj => obj instanceof EisDealer.Chair && !obj.isOccupied);
        if (unoccupiedChairs.length === 0) {
            console.warn("Es gibt keine verfügbaren Stühle für diesen Kunden.");
            return customer; // Rückgabe des Kunden, auch wenn kein Stuhl verfügbar ist
        }
        // Wähle zufällig einen unbesetzten Stuhl aus
        let randomIndex = Math.floor(Math.random() * unoccupiedChairs.length);
        let chosenChair = unoccupiedChairs[randomIndex];
        // Setze die Position des Kunden auf die Position des gewählten Stuhls
        customer.position = chosenChair.position;
        chosenChair.occupied = true; // Markiere den Stuhl als besetzt
        console.log(`Kunde erstellt an Position (${x}, ${y}) am Stuhl (${chosenChair.position.x}, ${chosenChair.position.y})`);
        if (customer.position.x < 0 || customer.position.x > 1000 || customer.position.y < 0 || customer.position.y > 600) {
            console.warn("Kunde außerhalb des Canvas-Bereichs.");
        }
        if (customer.position.x < 0 || customer.position.x > EisDealer.crc2.canvas.width || customer.position.y < 0 || customer.position.y > EisDealer.crc2.canvas.height) {
            console.warn("Kunde außerhalb des Canvas-Bereichs.");
        }
        return customer;
        // // Zufällige Position innerhalb des Canvas
        // let x: number = Math.random() * canvasWidth;
        // let y: number = Math.random() * canvasHeight;
        // // Zufällige Geschwindigkeit und Richtung
        // let speed: Vector = new Vector(2, 2);
        // let direction: Vector = new Vector(Math.random() * 2 - 1, Math.random() * 2 - 1).normalize().scale(2);
        // // Erstelle einen neuen Kunden
        // let customer: Customer = new Customer(new Vector(x, y), speed, direction, CustomerType.Normal, "Happy");
        // return customer;
        // // Zufällige Position innerhalb des Canvas von 1000x600
        // let x: number = Math.random() * (canvasWidth - 200) + 100;
        // let y: number = Math.random() * (canvasHeight - 100) + 50;
        // // Geschwindigkeit und Richtung zufällig festlegen
        // let speed: Vector = new Vector(2, 2);
        // let direction: Vector = new Vector(Math.random() * 2 - 1, Math.random() * 2 - 1).normalize().scale(2);
        // // Kunden-Typ und Emotion zufällig wählen
        // let type: CustomerType = Math.random() < 0.5 ? CustomerType.Normal : CustomerType.VIP;
        // let emotion: string = Math.random() < 0.5 ? "Happy" : "Sad";
        // // Türposition und Stühle übergeben
        // let doorPosition: Vector = new Vector(795, 195); // Beispielposition
        // let chairs: Chair[] = allObjects.filter(obj => obj instanceof Chair);
        // // Kunden erstellen und zurückgeben
        // return new Customer(new Vector(x, y), speed, direction, type, emotion, doorPosition, chairs);
    }
    EisDealer.createCustomer = createCustomer;
    function handleClick(_event) {
        console.log("canvas is clicked");
    }
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
        EisDealer.crc2.fillStyle = '#D2B48C'; // Helle Farbe für die Pfähle
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
        EisDealer.crc2.rect(x - 40, y - 60, 40, 20); // Inneres Rechteck
        EisDealer.crc2.fillStyle = "#ffffff"; // Weiß für den Boden
        EisDealer.crc2.fill();
        EisDealer.crc2.strokeStyle = "black";
        EisDealer.crc2.lineWidth = 1;
        EisDealer.crc2.stroke();
        EisDealer.crc2.closePath();
        EisDealer.crc2.restore();
    }
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Main.js.map