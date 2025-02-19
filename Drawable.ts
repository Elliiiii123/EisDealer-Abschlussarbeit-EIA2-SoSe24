namespace EisDealer {
    export abstract class Drawable {
        public position: Vector

        constructor (_position: Vector){
            this.position = _position
        }

        public abstract draw() :void   
    
        public update(): void {
            this.draw();
        }
    }
}