namespace EisDealer {

    //Eventlistener für handleLoad Funktion
    window.addEventListener("load", handleLoad);
      //Definiton der crc2 Variable als den HTML Canvas
    export let crc2: CanvasRenderingContext2D;
    export let allObjects: Drawable[] = [];


    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas) return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        canvas.addEventListener("click", handleClick);

        generateContent(data);

        let door: Door = new Door (new Vector(795, 195), new Vector(0, 0), new Vector(0, 0));
        console.log(door);
        allObjects.push(door);

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

        // let customer: Customer = new Customer(new Vector(200, 200), new Vector(0, 0),new Vector(0, 0),EisDealer.CustomerType.Normal,"Happy");
        // console.log(customer);
        // allObjects.push(customer);

        for (let i: number = 0; i < 7; i++) {
            allObjects.push(createCustomer());
          }

        let dealer: Dealer = new Dealer(new Vector(100, 200), new Vector(0, 0),new Vector(0, 0),EisDealer.DealerType.withoutIce,"Happy");
        console.log(dealer);
        allObjects.push(dealer);

        drawBackground();
        setInterval(animate, 40);
    }

    function animate(): void {
        console.log("animate");
        drawBackground();
    
        for (let object of allObjects) {
          object.update();
        }
    }

    export function createCustomer(): Customer {
        // Zufällige Position innerhalb des Canvas
        let x: number = Math.random() * 1000;
        let y: number = Math.random() * 600;

        // Zufällige Geschwindigkeit und Richtung
        let speed: Vector = new Vector(2, 2);
        let direction: Vector = new Vector(Math.random() * 2 - 1, Math.random() * 2 - 1).normalize().scale(2);

        // Erstelle einen neuen Kunden
        let customer: Customer = new Customer(new Vector(x, y), speed, direction, CustomerType.Normal, "Happy");

        // Finde den nächsten unbesetzten Stuhl für diesen Kunden
        let unoccupiedChairs = allObjects.filter(obj => obj instanceof Chair && !(obj as Chair).isOccupied) as Chair[];

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
        if (customer.position.x < 0 || customer.position.x > crc2.canvas.width || customer.position.y < 0 || customer.position.y > crc2.canvas.height) {
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

    function handleClick(_event: MouseEvent): void {
        console.log("canvas is clicked");
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
            


