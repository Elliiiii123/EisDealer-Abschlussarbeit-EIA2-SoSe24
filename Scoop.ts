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