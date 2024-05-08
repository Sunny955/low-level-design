// Factory method pattern

interface Permission {
    read: boolean;
    write: boolean;
    delete: boolean;
    manageUsers: boolean;
    managePermissions: boolean
}

class User_Base {
    protected permissions: Permission;

    constructor() {
        this.permissions = {
            read: false,
            write: false,
            delete: false,
            manageUsers: false,
            managePermissions: false
        }
    }

    checkPermission(permission: keyof Permission): boolean {
        return this.permissions[permission];
    }
}

class RegularUser extends User_Base {
    constructor() {
        super();
        this.permissions.read = true;
        this.permissions.write = true;
    }
}

class Moderator extends User_Base {
    constructor() {
        super();
        this.permissions.delete = true;
    }
}

class Administrator extends User_Base {
    constructor() {
        super();
        this.permissions.managePermissions = true;
        this.permissions.manageUsers = true;
    }
}

const regularUser = new RegularUser();
const moderator = new Moderator();
const administrator = new Administrator();

console.log(regularUser.checkPermission("write"));
console.log(moderator.checkPermission("delete"));

console.log(regularUser.checkPermission("delete"));
console.log(administrator.checkPermission("managePermissions"));
