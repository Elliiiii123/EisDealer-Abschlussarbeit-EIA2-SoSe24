namespace EisDealer {
    export interface Product {
        name: string;
        price: number;
        color: string; // Farbe des Produkts hinzufügen
    }

    export interface Data {
        Ice: Product[];
        Toppings: Product[];
        Sauce: Product[];
    }

    export let data: Data = {
        Ice: [
            {name: "Chocolate", price: 1.50, color: "#8B4513"},
            {name: "Mint", price: 1, color: "#99f09b"},
            {name: "Strawberry", price: 1.50, color: "#ffc0cb"},
            {name: "Straciatella", price: 2, color: "#ffffff"},
            {name: "Pistaccio", price: 2, color: "#90b083"},
            {name: "Lemon", price: 1, color: "#ffff00"}
        ],
        Toppings: [
            {name: "Sprinkles", price: 0.50, color: "black"},
            {name: "Cookie", price: 1, color: "#ffdead"},
            {name: "Strawberry", price: 0.50, color: "#FB2943"}
        ],
        Sauce: [
            {name: "Chocolate", price: 0.20, color: "#52280b"},
            {name: "Caramel", price: 0.20, color: "#cfa83c"},
            {name: "Strawberry", price: 0.50, color: "#cf3f3f"}
        ]
    };
}