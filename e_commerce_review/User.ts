import { Order } from "./Order";
export class User {
    id: number;
    name: string;
    orders: Order[];

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.orders = []
    }
}