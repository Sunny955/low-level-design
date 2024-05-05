interface Database {
    create(data: any): void;
    read(): any;
    update(data: any): void;
    delete(): void;
}

class DatabaseImpl implements Database {
    private data: any;

    constructor() {
        this.data = {};
    }

    create(data: any): void {
        console.log(`Creating data in the database....`);
        this.data = data;
    }

    read() {
        console.log("Reading data from the database...");
        return this.data;
    }

    update(data: any): void {
        console.log("Updating data in the database...");
        this.data = data;
    }

    delete(): void {
        console.log("Deleting data from the database...");
        this.data = {};
    }

}

class DatabaseProxy implements Database {
    private readlDatabase: DatabaseImpl;
    private isAdmin: boolean;

    constructor(isAdmin: boolean) {
        this.readlDatabase = new DatabaseImpl();
        this.isAdmin = isAdmin;
    }

    private checkAdminAccess(): void {
        if (!this.isAdmin) {
            throw new Error("Access denied! Only Admin can create, delete or update the data");
        }
    }

    create(data: any): void {
        this.checkAdminAccess();
        this.readlDatabase.create(data);
    }

    read() {
        return this.readlDatabase.read();
    }

    update(data: any): void {
        this.checkAdminAccess();
        this.readlDatabase.update(data);
    }

    delete(): void {
        this.checkAdminAccess();
        this.readlDatabase.delete();
    }
}

// Example usage:
const adminProxy = new DatabaseProxy(true);
const userProxy = new DatabaseProxy(false);

adminProxy.create({ id: 1, name: "Admin" }); // Allowed
userProxy.create({ id: 2, name: "User" }); // Throws error

console.log(adminProxy.read()); // Read operation allowed for both admin and user
console.log(userProxy.read()); // Read operation allowed for both admin and user

adminProxy.update({ id: 1, name: "Admin Updated" }); // Allowed
userProxy.update({ id: 2, name: "User Updated" }); // Throws error

adminProxy.delete(); // Allowed
userProxy.delete(); // Throws error