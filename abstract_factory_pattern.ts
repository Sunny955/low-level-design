interface Vehicle {
    drive() : string
}

// luxury vehicles
class LuxuryCar implements Vehicle {
    drive(): string {
        return "Driving luxury car";
    }
}

class LuxuryBike implements Vehicle {
    drive(): string {
        return "Driving luxury bike";
    }
}

// ordinary vehicles
class OrdinaryCar implements Vehicle {
    drive(): string {
        return "Driving ordinary car";
    }
}

class OrdinaryBike implements Vehicle {
    drive(): string {
        return "Driving ordinary bike"
    }
}

interface VehiclesFactory {
    createCar() : Vehicle;
    createBike() : Vehicle;
}

class LuxuryVehicleFactory implements VehiclesFactory {
    createCar(): Vehicle {
        return new LuxuryCar();
    }

    createBike(): Vehicle {
        return new LuxuryBike();
    }
}

class OrdinaryVehicleFactory implements VehiclesFactory {
    createCar(): Vehicle {
        return new OrdinaryCar();
    }

    createBike(): Vehicle {
        return new OrdinaryBike();
    }
}

function mainAbstractFactory(factory: VehiclesFactory): void {
    const Car = factory.createCar();
    const Bike = factory.createBike();

    console.log(Bike.drive());
    console.log(Car.drive());
}

const LuxuryFactory = new LuxuryVehicleFactory();
const OrdinaryFactory = new OrdinaryVehicleFactory();

mainAbstractFactory(LuxuryFactory);
mainAbstractFactory(OrdinaryFactory);

