interface Observer {
    notify(productName: string): void;
}

class Product {
    private name: string;
    private inStock: boolean;
    private observers: Observer[] = [];

    constructor(name: string, inStock: boolean) {
        this.name = name;
        this.inStock = inStock;
    }

    registerObserver(observer: Observer): void {
        this.observers.push(observer);
    }

    removeObserver(observer: Observer): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    setStockStatus(inStock: boolean): void {
        if (this.inStock !== inStock) {
            this.inStock = inStock;
            this.notifyObservers();
        }
    }

    private notifyObservers(): void {
        for (const observer of this.observers) {
            observer.notify(this.name);
        }
    }
}

class User implements Observer {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    notify(productName: string): void {
        console.log(`${this.name}: ${productName} is back in stock!`);
    }
}

// Main function
function main(): void {
    const iphone = new Product("iPhone", false);

    const user1 = new User("User 1");
    const user2 = new User("User 2");

    iphone.registerObserver(user1);
    iphone.registerObserver(user2);

    iphone.setStockStatus(true);

    iphone.removeObserver(user1);
    iphone.setStockStatus(false);
}

main();
