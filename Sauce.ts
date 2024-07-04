namespace EisDealer {
    export class Sauce extends Drawable{

        //private isClicked: boolean;

        constructor (_position: Vector){
            //console.log("Sauce Constructor")
            super(_position)
        }
        
        public handleClicked():void{

        }
    
        protected draw():void{
            console.log("Sauce draw")
            this.drawCaramel();
            this.drawStrawberry();
            this.drawChoclate();
        }

        private drawChoclate():void{

        }


        private drawCaramel():void{
            
        }


        private drawStrawberry():void{
            
        }

    }
}