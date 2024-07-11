namespace EisDealer{
    export function generateContent(_data:Data){
        console.log(_data)

        for (let category in _data){
            //let products: Product[] = _data[category];
            
            //let group: HTMLElement | null = null;


            switch (category) {
                case "Ice":
                    EisDealer.data.Ice.forEach((product, index) => {
                        // Wandelt den Namen der Eissorte in einen ScoopFlavour-Enum-Wert um
                        let flavor = EisDealer.ScoopFlavour[product.name as keyof typeof EisDealer.ScoopFlavour];
                        // Berechnet die Position der Eissorten in zwei vertikalen linien ( x entweder 170 oder 230, y immer +60)
                        let position = new EisDealer.Vector(170 + (index % 2) * 60, 120 + Math.floor(index / 2) * 60);
                        // Erstellt ein neues Scoop-Objekt mit der berechneten Position, dem Geschmack und dem Preis
                        let scoop = new EisDealer.Scoop(position, flavor, product.price);
                        allObjects.push(scoop);
                        //Testen ob eis seinen Preis kennt
                        // if (flavor === EisDealer.ScoopFlavour.Mint) {
                        //     console.log(`Mint ice cream price: ${scoop.price}`)}
                    });
                    break;
                case "Toppings":
                    EisDealer.data.Toppings.forEach((product, index) => {
                        let flavor = EisDealer.ToppingFlavour[product.name as keyof typeof EisDealer.ToppingFlavour];
                        let position = new EisDealer.Vector(210 + (index * 40), 400);
                        let topping = new EisDealer.Topping(position, flavor, product.price);
                        allObjects.push(topping);
                    }); 
                    break;
                case "Sauce":
                    EisDealer.data.Sauce.forEach((product, index) => {
                        let flavor = EisDealer.SauceFlavour[product.name as keyof typeof EisDealer.SauceFlavour];
                        let position = new EisDealer.Vector(180 + (index * 40), 420);
                        let sauce = new EisDealer.Sauce(position, flavor, product.price);
                        allObjects.push(sauce);
                    });
                default:
                    console.log("Unknown category: " + category);
            }
            // let fieldset: HTMLFieldSetElement | null = document. querySelector ("fieldset#" + category);
            // if (fieldset && group)
            // fieldset.appendChild(group);
        }
    }
}