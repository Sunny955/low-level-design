import { Product } from "./Product";
import { User } from "./User";
export class Order {
    id: number;
    user: User;
    product: Product;

    constructor(id: number, user: User, product: Product) {
        this.id = id;
        this.user = user;
        this.product = product;
    }

}