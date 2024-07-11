namespace EisDealer {
    export interface Product {
        name: string;
        price: number;
    }

    export interface Data {
        Ice: Product[];
        Toppings: Product[];
        Sauce: Product[];
    }

    export let data: Data = {
        Ice: [
            {name: "Chocolate", price: 1.50},
            {name: "Mint", price: 1},
            {name: "Strawberry", price: 1.50},
            {name: "Straciatella", price: 2},
            {name: "Pistaccio", price: 2},
            {name: "Lemon", price: 1}
        ],
        Toppings: [
            {name: "Sprinkles", price: 0.50},
            {name: "Cookie", price: 1},
            {name: "Strawberry", price: 0.50}
        ],
        Sauce: [
            {name: "Chocolate", price: 0.20},
            {name: "Caramel", price: 0.20},
            {name: "Strawberry", price: 0.50}
        ]
    };
}