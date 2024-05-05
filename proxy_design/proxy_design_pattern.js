var DatabaseImpl = /** @class */ (function () {
    function DatabaseImpl() {
        this.data = {};
    }
    DatabaseImpl.prototype.create = function (data) {
        console.log("Creating data in the database....");
        this.data = data;
    };
    DatabaseImpl.prototype.read = function () {
        console.log("Reading data from the database...");
        return this.data;
    };
    DatabaseImpl.prototype.update = function (data) {
        console.log("Updating data in the database...");
        this.data = data;
    };
    DatabaseImpl.prototype.delete = function () {
        console.log("Deleting data from the database...");
        this.data = {};
    };
    return DatabaseImpl;
}());
var DatabaseProxy = /** @class */ (function () {
    function DatabaseProxy(isAdmin) {
        this.readlDatabase = new DatabaseImpl();
        this.isAdmin = isAdmin;
    }
    DatabaseProxy.prototype.checkAdminAccess = function () {
        if (!this.isAdmin) {
            throw new Error("Access denied! Only Admin can create, delete or update the data");
        }
    };
    DatabaseProxy.prototype.create = function (data) {
        this.checkAdminAccess();
        this.readlDatabase.create(data);
    };
    DatabaseProxy.prototype.read = function () {
        return this.readlDatabase.read();
    };
    DatabaseProxy.prototype.update = function (data) {
        this.checkAdminAccess();
        this.readlDatabase.update(data);
    };
    DatabaseProxy.prototype.delete = function () {
        this.checkAdminAccess();
        this.readlDatabase.delete();
    };
    return DatabaseProxy;
}());
// Example usage:
var adminProxy = new DatabaseProxy(true);
var userProxy = new DatabaseProxy(false);
adminProxy.create({ id: 1, name: "Admin" }); // Allowed
// userProxy.create({ id: 2, name: "User" }); // Throws error
console.log(adminProxy.read()); // Read operation allowed for both admin and user
console.log(userProxy.read()); // Read operation allowed for both admin and user
adminProxy.update({ id: 1, name: "Admin Updated" }); // Allowed
userProxy.update({ id: 2, name: "User Updated" }); // Throws error
adminProxy.delete(); // Allowed
userProxy.delete(); // Throws error
