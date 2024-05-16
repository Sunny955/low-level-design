"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(id, name) {
        this.id = id;
        this.name = name;
        this.orders = [];
    }
    return User;
}());
exports.User = User;
