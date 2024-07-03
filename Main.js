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
    function handleClick(_event) {
        console.log("canvas is clicked");
    }
    function drawBackground() {
        EisDealer.crc2.save();
        EisDealer.crc2.fillStyle = "green";
        EisDealer.crc2.fillRect(0, 0, 1000, 600);
        EisDealer.crc2.restore();
        // Zeichne das Rechteck (den Zaun)
        const rectX = 50; // x-Position des Rechtecks
        const rectY = 50; // y-Position des Rechtecks
        const rectWidth = 700; // Breite des Rechtecks
        const rectHeight = 300; // Höhe des Rechtecks
        EisDealer.crc2.strokeStyle = '#8B4513'; // Braune Farbe für die Linie
        EisDealer.crc2.lineWidth = 2; // Dicke der Linie
        EisDealer.crc2.strokeRect(rectX, rectY, rectWidth, rectHeight);
        // Abstand zwischen den Pfählen (in Pixel)
        const abstand = 30; // 3cm (bei 10px pro cm)
        // Zeichne die Pfähle als Kreise
        const radius = 5; // Radius der Kreise (Pfähle)
        EisDealer.crc2.fillStyle = '#D2B48C'; // Helle Farbe für die Pfähle
        for (let x = rectX + abstand; x < rectX + rectWidth; x += abstand) {
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(x, rectY, radius, 0, 2 * Math.PI); // Pfähle an der oberen Kante
            EisDealer.crc2.fill();
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(x, rectY + rectHeight, radius, 0, 2 * Math.PI); // Pfähle an der unteren Kante
            EisDealer.crc2.fill();
        }
        for (let y = rectY + abstand; y < rectY + rectHeight; y += abstand) {
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(rectX, y, radius, 0, 2 * Math.PI); // Pfähle an der linken Kante
            EisDealer.crc2.fill();
            EisDealer.crc2.beginPath();
            EisDealer.crc2.arc(rectX + rectWidth, y, radius, 0, 2 * Math.PI); // Pfähle an der rechten Kante
            EisDealer.crc2.fill();
        }
    }
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Main.js.map