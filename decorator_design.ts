interface Pizza {
    getDescription(): string;
    getCost() : number;
}

// different types of pizza!
class ClassicPizza implements Pizza {
    getDescription(): string {
        return "Classic Pizza";
    }

    getCost(): number {
        return 100;
    }
}

class MargerithaPizza implements Pizza {
    getDescription(): string {
        return "Margeritha Pizza";
    }

    getCost(): number {
        return 120;
    }
}

class PaneerPappyPizza implements Pizza {
    getDescription(): string {
        return "Paneer Pappy Pizza";
    }

    getCost(): number {
        return 150;
    }
}

// descorator for pizzas
abstract class PizzaDecorator implements Pizza {
    protected pizza : Pizza

    constructor(pizza: Pizza) {
        this.pizza = pizza;
    }

    getDescription(): string {
        return this.pizza.getDescription();
    }

    getCost(): number {
        return this.pizza.getCost();
    }
}


// different types of decorators
class CheseDecorator extends PizzaDecorator {
    constructor(pizza : Pizza) {
        super(pizza);
    }

    getDescription(): string {
        return this.pizza.getDescription() + ", Cheese";
    }

    getCost(): number {
        return this.pizza.getCost() + 10;
    }
}

class PapperoniDecorator extends PizzaDecorator {
    constructor(pizza : Pizza) {
        super(pizza);
    }

    getDescription(): string {
        return this.pizza.getDescription() + ", Papperoni";
    }

    getCost(): number {
        return this.pizza.getCost() + 20;
    }
}


function decorator_main(): void {
    let classicPizza: Pizza = new ClassicPizza();
    console.log(classicPizza.getDescription());
    console.log(classicPizza.getCost());

    let margerithPizza : Pizza = new MargerithaPizza();
    console.log(margerithPizza.getDescription());
    console.log(margerithPizza.getCost());

    let cheesePizza: Pizza = new CheseDecorator(classicPizza);
    console.log(cheesePizza.getDescription()); 
    console.log(cheesePizza.getCost()); 

    let margerithaCheesePizza: Pizza = new CheseDecorator(margerithPizza);
    console.log(margerithaCheesePizza.getDescription());
    console.log(margerithaCheesePizza.getCost());

    let papperoniPizza: Pizza = new PapperoniDecorator(cheesePizza);
    console.log(papperoniPizza.getDescription());
    console.log(papperoniPizza.getCost());
}

decorator_main();

