interface Products {
    operation() : string
}

class ConcereteProduct1 implements Products {
    operation(): string {
        return "Result of ConcereteProduct 1 ops";
    }
}

class ConcereteProduct2 implements Products {
    operation(): string {
        return "Result of ConcereteProduct 2 ops";
    }
}

interface Factory {
    createProduct() : Products
}

class ConcereteFactory1 implements Factory {
    createProduct(): Products {
        return new ConcereteProduct1();
    }
}

class ConcereteFactory2 implements Factory {
    createProduct(): Products {
        return new ConcereteProduct2();
    }
}

// Client code
function mainFactory(factory: Factory): void {
    const products = factory.createProduct();
    console.log(products.operation());
}

const factoryA = new ConcereteFactory1();
mainFactory(factoryA); 

const factoryB = new ConcereteFactory2();
mainFactory(factoryB);

