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

        let door: Door = new Door (new Vector(795, 195), new Vector(0, 0), new Vector(0, 0));
        console.log(door);
        allObjects.push(door);

        let chairs: Chair = new Chair (new Vector(425, 420), 0);
        console.log(chairs);
        allObjects.push(chairs);

        new Chair (new Vector(300, 420), 0);
        console.log(chairs);
        allObjects.push(chairs);

        let trash: Trash =new Trash (new Vector(115, 410));
        console.log(trash);
        allObjects.push(trash);


        let scoop: Scoop =new Scoop (new Vector(170, 120));
        console.log(scoop);
        allObjects.push(scoop);

        let toppings: Topping =new Topping (new Vector(210, 400));
        console.log(toppings);
        allObjects.push(toppings);

        let saucen: Sauce =new Sauce (new Vector(180, 420));
        console.log(saucen);
        allObjects.push(saucen);

        let customer: Customer = new Customer(new Vector(200, 200), new Vector(0, 0),new Vector(0, 0),EisDealer.CustomerType.Normal,"Happy");
        console.log(customer);
        allObjects.push(customer);

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
            


