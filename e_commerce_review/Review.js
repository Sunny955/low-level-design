"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
var Review = /** @class */ (function () {
    function Review(id, user, product, rating, content) {
        this.id = id;
        this.user = user;
        this.product = product;
        this.rating = rating;
        this.content = content;
    }
    return Review;
}());
exports.Review = Review;
