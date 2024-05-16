import { Review } from './Review';
export class Product {
    id: number;
    name: string;
    reviews: Review[];

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.reviews = [];
    }
}