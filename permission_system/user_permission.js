var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var User_Base = /** @class */ (function () {
    function User_Base() {
        this.permissions = {
            read: false,
            write: false,
            delete: false,
            manageUsers: false,
            managePermissions: false
        };
    }
    User_Base.prototype.checkPermission = function (permission) {
        return this.permissions[permission];
    };
    return User_Base;
}());
var RegularUser = /** @class */ (function (_super) {
    __extends(RegularUser, _super);
    function RegularUser() {
        var _this = _super.call(this) || this;
        _this.permissions.read = true;
        _this.permissions.write = true;
        return _this;
    }
    return RegularUser;
}(User_Base));
var Moderator = /** @class */ (function (_super) {
    __extends(Moderator, _super);
    function Moderator() {
        var _this = _super.call(this) || this;
        _this.permissions.delete = true;
        return _this;
    }
    return Moderator;
}(User_Base));
var Administrator = /** @class */ (function (_super) {
    __extends(Administrator, _super);
    function Administrator() {
        var _this = _super.call(this) || this;
        _this.permissions.managePermissions = true;
        _this.permissions.manageUsers = true;
        return _this;
    }
    return Administrator;
}(User_Base));
var regularUser = new RegularUser();
var moderator = new Moderator();
var administrator = new Administrator();
console.log(regularUser.checkPermission("write"));
console.log(moderator.checkPermission("delete"));
console.log(regularUser.checkPermission("delete"));
console.log(administrator.checkPermission("managePermissions"));
