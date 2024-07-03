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

                // Zeichne das Rechteck (den Zaun)
                const rectX = 50; // x-Position des Rechtecks
                const rectY = 50; // y-Position des Rechtecks
                const rectWidth = 700; // Breite des Rechtecks
                const rectHeight = 300; // Höhe des Rechtecks
        
                crc2.strokeStyle = '#8B4513'; // Braune Farbe für die Linie
                crc2.lineWidth = 2; // Dicke der Linie
                crc2.strokeRect(rectX, rectY, rectWidth, rectHeight);
        
                // Abstand zwischen den Pfählen (in Pixel)
                const abstand = 30; // 3cm (bei 10px pro cm)
        
                // Zeichne die Pfähle als Kreise
                const radius = 5; // Radius der Kreise (Pfähle)
                crc2.fillStyle = '#D2B48C'; // Helle Farbe für die Pfähle
        
                for (let x = rectX + abstand; x < rectX + rectWidth; x += abstand) {
                    crc2.beginPath();
                    crc2.arc(x, rectY, radius, 0, 2 * Math.PI); // Pfähle an der oberen Kante
                    crc2.fill();
        
                    crc2.beginPath();
                    crc2.arc(x, rectY + rectHeight, radius, 0, 2 * Math.PI); // Pfähle an der unteren Kante
                    crc2.fill();
                }
        
                for (let y = rectY + abstand; y < rectY + rectHeight; y += abstand) {
                    crc2.beginPath();
                    crc2.arc(rectX, y, radius, 0, 2 * Math.PI); // Pfähle an der linken Kante
                    crc2.fill();
        
                    crc2.beginPath();
                    crc2.arc(rectX + rectWidth, y, radius, 0, 2 * Math.PI); // Pfähle an der rechten Kante
                    crc2.fill();
                }
    }
}