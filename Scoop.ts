namespace EisDealer {
    export class Scoop extends Drawable{

        //private isClicked: boolean;

        constructor (_position: Vector){
            //console.log("Scoop Constructor")
            super(_position)
        }
        
        public handleClicked():void{

        }
    
        protected draw():void{
            console.log("Scoop draw")
            this.drawChocolate();
            this.drawStrawberry();
            this.drawMint();
            this.drawStraciatella();
            this.drawPistachio();
            this.drawLemon();

        }

        private drawChocolate():void{

            const x = this.position.x;
            const y = this.position.y;

            // Draw the square ice cream (chocolate)
            crc2.beginPath();
            crc2.rect(x, y,50, 50); // Square shape
            crc2.fillStyle = "#8B4513"; // Chocolate color
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.lineWidth = 1;
            crc2.stroke();
            crc2.closePath();
        }


        private drawMint():void{
            
        }


        private drawStrawberry():void{
            
        }


        private drawStraciatella():void{
            
        }

        private drawPistachio():void{
            
        }

        private drawLemon():void{
            
        }
    }
    
}