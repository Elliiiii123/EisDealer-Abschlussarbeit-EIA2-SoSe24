namespace EisDealer{
    export function generateContent(_data:Data){
        console.log(_data)

        for (let category in _data){
            
            switch (category) {
                case "Ice":
                    EisDealer.data.Ice.forEach((product, index) => {
                        // Berechnet die Position der Eissorten in zwei vertikalen linien ( x entweder 170 oder 230, y immer +60)
                        let position = new EisDealer.Vector(170 + (index % 2) * 60, 120 + Math.floor(index / 2) * 60);
                        // Erstellt ein neues Scoop-Objekt mit der berechneten Position, dem Geschmack und dem Preis
                        let scoop = new EisDealer.Scoop(position, product.name, product.price, product.color);
                        allObjects.push(scoop);
                        //Testen ob eis seinen Preis kennt
                        //     console.log(`Mint ice cream price: ${scoop.price}`)}
                    });
                    break;
                case "Toppings":
                    EisDealer.data.Toppings.forEach((product, index) => {
                        let position = new EisDealer.Vector(180 + (index * 40), 370);
                        let topping = new EisDealer.Topping(position, product.name, product.price, product.color);
                        allObjects.push(topping);
                    }); 
                    break;
                case "Sauce":
                    EisDealer.data.Sauce.forEach((product, index) => {
                        let position = new EisDealer.Vector(180 + (index * 40), 420);
                        let sauce = new EisDealer.Sauce(position, product.name, product.price, product.color);
                        allObjects.push(sauce);
                    });
                default:
                    console.log("Unknown category: " + category);
            }
        }
    }
}