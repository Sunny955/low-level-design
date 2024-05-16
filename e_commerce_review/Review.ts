import { Product } from "./Product";
import { User } from './User';
export class Review {
    id: number;
    user: User;
    product: Product;
    rating: number;
    content: string;

    constructor(id: number, user: User, product: Product, rating: number, content: string) {
        this.id = id;
        this.user = user;
        this.product = product;
        this.rating = rating;
        this.content = content;
    }

}