"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Order_1 = require("./Order");
var Product_1 = require("./Product");
var Review_1 = require("./Review");
var User_1 = require("./User");
var ReviewSystem = /** @class */ (function () {
    function ReviewSystem() {
        this.users = [];
        this.products = [];
        this.orders = [];
        this.reviews = [];
    }
    ReviewSystem.prototype.addUser = function (user) {
        this.users.push(user);
    };
    ReviewSystem.prototype.addProduct = function (product) {
        this.products.push(product);
    };
    ReviewSystem.prototype.addOrder = function (order) {
        this.orders.push(order);
    };
    ReviewSystem.prototype.addReview = function (review) {
        if (this.isUserOrderedProduct(review.user, review.product)) {
            this.reviews.push(review);
            console.log("Review submitted successfully!");
        }
        else {
            console.log("User hasn't ordered the product, not allowed to add review!");
        }
    };
    ReviewSystem.prototype.isUserOrderedProduct = function (user, product) {
        return this.orders.some(function (order) { return order.user === user && order.product === product; });
    };
    return ReviewSystem;
}());
var reviewSystem = new ReviewSystem();
// Users
var user1 = new User_1.User(1, "User1");
var user2 = new User_1.User(2, "User2");
// Products
var product1 = new Product_1.Product(1, "Product1");
var product2 = new Product_1.Product(2, "Product2");
// User1 orders Product1
var order1 = new Order_1.Order(1, user1, product1);
reviewSystem.addUser(user1);
reviewSystem.addUser(user2);
reviewSystem.addProduct(product1);
reviewSystem.addProduct(product2);
reviewSystem.addOrder(order1);
var review1 = new Review_1.Review(1, user1, product1, 4.5, "Great Product!");
var review2 = new Review_1.Review(2, user1, product2, 3.6, "Great Product!");
reviewSystem.addReview(review1);
reviewSystem.addReview(review2);
