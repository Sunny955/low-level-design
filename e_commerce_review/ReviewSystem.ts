import { Order } from "./Order";
import { Product } from "./Product";
import { Review } from "./Review";
import { User } from "./User";

class ReviewSystem {
    users: User[];
    products: Product[];
    orders: Order[];
    reviews: Review[];

    constructor() {
        this.users = [];
        this.products = [];
        this.orders = [];
        this.reviews = [];
    }

    addUser(user: User) {
        this.users.push(user);
    }

    addProduct(product: Product) {
        this.products.push(product);
    }

    addOrder(order: Order) {
        this.orders.push(order);
    }

    addReview(review: Review) {
        if (this.isUserOrderedProduct(review.user, review.product)) {
            this.reviews.push(review);
            console.log("Review submitted successfully!");
        }
        else {
            console.log("User hasn't ordered the product, not allowed to add review!");
        }
    }

    isUserOrderedProduct(user: User, product: Product): boolean {
        return this.orders.some(order => order.user === user && order.product === product);
    }
}

const reviewSystem = new ReviewSystem();

// Users
const user1 = new User(1, "User1");
const user2 = new User(2, "User2");

// Products
const product1 = new Product(1, "Product1");
const product2 = new Product(2, "Product2");

// User1 orders Product1
const order1 = new Order(1, user1, product1);

reviewSystem.addUser(user1);
reviewSystem.addUser(user2);

reviewSystem.addProduct(product1);
reviewSystem.addProduct(product2);

reviewSystem.addOrder(order1);

const review1 = new Review(1, user1, product1, 4.5, "Great Product!");
const review2 = new Review(2, user1, product2, 3.6, "Great Product!");

reviewSystem.addReview(review1);
reviewSystem.addReview(review2);

