namespace EisDealer {
    export class Trash extends Drawable{

        //private isClicked: boolean;

        constructor (_position: Vector){
            //console.log("Trash Constructor")
            super(_position)
        }
        
        public handleClicked():void{

        }
    
        protected draw():void{
            //console.log("Trash draw")
            crc2.save();
            crc2.translate(this.position.x, this.position.y);

            let outerRadius = 30;
            let innerRadius = 10;

            // Zeichne den äußeren Kreis (oberer Rand des Mülleimers)
            crc2.beginPath();
            crc2.arc(0, 0, outerRadius, 0, 2 * Math.PI);
            crc2.fillStyle = "gray";
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.lineWidth = 2;
            crc2.stroke();
            crc2.closePath();

            crc2.beginPath();
            crc2.arc(0, 0, 20, 0, 2 * Math.PI);
            crc2.strokeStyle = "black";
            crc2.lineWidth = 1;
            crc2.stroke();
            crc2.closePath();

            // Zeichne den inneren Kreis (Boden des Mülleimers)
            crc2.beginPath();
            crc2.arc(0, 0, innerRadius, 0, 2 * Math.PI);
            crc2.fillStyle = "gray";
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.lineWidth = 1;
            crc2.stroke();
            crc2.closePath();

            // Zeichne die Gitterlinien
            crc2.beginPath();
            crc2.strokeStyle = "black";
            crc2.lineWidth = 0.5;

            // Zeichne die vertikalen Gitterlinien
            let numVerticalLines = 8;
            for (let i = 0; i < numVerticalLines; i++) {
                let angle = (i / numVerticalLines) * (2 * Math.PI);
                let xOuter = outerRadius * Math.cos(angle);
                let yOuter = outerRadius * Math.sin(angle);
                let xInner = innerRadius * Math.cos(angle);
                let yInner = innerRadius * Math.sin(angle);

                crc2.moveTo(xOuter, yOuter);
                crc2.lineTo(xInner, yInner);
            }

            crc2.stroke();
            crc2.closePath();

            crc2.restore();

        }
    }
}