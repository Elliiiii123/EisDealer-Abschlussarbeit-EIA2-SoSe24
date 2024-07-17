namespace EisDealer {

    export class Vector {
       public x:number
       public y:number

        constructor (_x: number, _y: number) {
        this.set(_x, _y);
        }

        public scale(factor: number): Vector {
            return new Vector(this.x * factor, this.y * factor);
        }

        public add(vector: Vector): Vector {
            return new Vector(this.x + vector.x, this.y + vector.y);
        }

        public subtract(vector: Vector): Vector {
            return new Vector(this.x - vector.x, this.y - vector.y);
        }

        public clone(): Vector {
            return new Vector(this.x, this.y);
        }

        // Method to multiply vector by scalar
        // multiply(scalar: number): Vector {
        //     return new Vector(this.x * scalar, this.y * scalar);
        // }

        // Method to get the magnitude of the vector
        magnitude(): number {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }

        public set(_x: number, _y: number): void {
            this.x = _x;
            this.y = _y;
        }

        normalize(): Vector {
            const mag = this.magnitude();
            if (mag === 0) {
              return new Vector(0, 0);
            }
            return new Vector(this.x / mag, this.y / mag);
        }
        
            // Methode zur Überprüfung, ob zwei Vektoren gleich sind
        public equals(other: Vector): boolean {
            return this.x === other.x && this.y === other.y;
        }

        public copy(): Vector {
            return new Vector(this.x, this.y);
        }

        // public distanceTo(vector: Vector): number {
        //     let dx = this.x - vector.x;
        //     let dy = this.y - vector.y;
        //     return Math.sqrt(dx * dx + dy * dy);
        // }
    }
}