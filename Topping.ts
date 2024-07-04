namespace EisDealer {
    export class Topping extends Drawable{

        //private isClicked: boolean;

        constructor (_position: Vector){
            //console.log("Toppings Constructor")
            super(_position)
        }
        
        public handleClicked():void{

        }
    
        protected draw():void{
            console.log("Toppings draw")
            this.drawSprinkle();
            this.drawStrawberry();
            this.drawCookie();
        }

        private drawSprinkle():void{

        }


        private drawCookie():void{
            
        }


        private drawStrawberry():void{
            
        }

    }
    
}