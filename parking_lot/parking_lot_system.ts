enum VehicleType {
    CAR,
    TRUCK,
    VAN,
    MOTORCYCLE
}

enum ParkingSpotType {
    COMPACT,
    LARGE,
    DISABLED,
    MOTORCYCLE
}

class ParkingTicket {
    private ticketNumber: string;
    private entryTime: Date;

    constructor(ticketNumber: string, entryTime: Date) {
        this.ticketNumber = ticketNumber;
        this.entryTime = entryTime;
    }

    getEntryTime(): Date {
        return this.entryTime;
    }
}

class Vehicle {
    private VehicleType: VehicleType;
    private licensePlate: string;

    constructor(vehicleType: VehicleType, licensePlate: string) {
        this.VehicleType = vehicleType;
        this.licensePlate = licensePlate;
    }

    getVehicleType(): VehicleType {
        return this.VehicleType;
    }

    getLincensePlate(): string {
        return this.licensePlate;
    }
}

class ParkingSpot {
    private spotNumber: string;
    private spotType: ParkingSpotType;
    private isOccupied: boolean;

    constructor(spotNumber: string, spotType: ParkingSpotType) {
        this.spotNumber = spotNumber;
        this.spotType = spotType;
        this.isOccupied = false;
    }

    occupySpot() {
        this.isOccupied = true;
    }

    vacateSpot() {
        this.isOccupied = false;
    }
}

class ParkingFloor {
    private floorNumber: number;
    private entryPoints: EntryPoint[];
    private exitPoints: ExitPoint[];
    private parkingSpots: ParkingSpot[][];

    constructor(floorNumber: number, numRows: number, numCols: number) {
        this.floorNumber = floorNumber;
        this.entryPoints = [];
        this.exitPoints = [];
        this.parkingSpots = new Array(numRows);

        for (let i = 0; i < numRows; i++) {
            this.parkingSpots[i] = new Array(numCols);
        }
    }

    addParkingSpot(row: number, col: number, spotType: ParkingSpotType) {
        this.parkingSpots[row][col] = new ParkingSpot(`F${this.floorNumber}-R${row}-C${col}`, spotType);
    }
}

class EntryPoint {
    private entryPointNumber: number;

    constructor(entryPointNumber: number) {
        this.entryPointNumber = entryPointNumber;
    }

    collectTicket(vehicle: Vehicle): ParkingTicket {
        return new ParkingTicket(`TICKET - ${Date.now()}`, new Date());
    }
}

class ExitPoint {
    private exitPointNumber: number;
    private hourlyCostCalculator: HourlyCost;

    constructor(exitPointNumber: number) {
        this.exitPointNumber = exitPointNumber;
        this.hourlyCostCalculator = new HourlyCost();
    }

    payParkingFee(ticket: ParkingTicket, vehicle: Vehicle, exitTime: Date) {
        const durationHours = Math.ceil((exitTime.getTime() - ticket.getEntryTime().getTime()) / (1000 * 60 * 60));
        const parkingFee = this.hourlyCostCalculator.calculateFee(vehicle.getVehicleType(), durationHours);
        return parkingFee;
    }
}

class HourlyCost {
    calculateFee(vehicleType: VehicleType, hours: number) {
        return 15 * hours;
    }
}

class ParkingLot {
    private floors: ParkingFloor[];
    private entryPoints: EntryPoint[];
    private exitPoints: ExitPoint[];

    constructor(numFloors: number, numRowsPerFloor: number, numColsPerFloor: number) {
        this.floors = [];
        this.entryPoints = [];
        this.exitPoints = [];

        for (let i = 0; i < numFloors; i++) {
            let floor = new ParkingFloor(i + 1, numRowsPerFloor, numColsPerFloor);
            this.floors.push(floor);
        }
    }

    addEntryPoint(entryPoint: EntryPoint) {
        this.entryPoints.push(entryPoint);
    }

    addExitPoint(exitPoint: ExitPoint) {
        this.exitPoints.push(exitPoint);
    }

    addFloor(floor: ParkingFloor) {
        this.floors.push(floor);
    }
}

class Payment {
    private paymentId: string;
    private paymentDate: Date;

    constructor(paymentId: string,) {
        this.paymentId = paymentId;
        this.paymentDate = new Date();
    }

    processPayment(ticket: ParkingTicket, vehicle: Vehicle, exitTime: Date, exitPoint: ExitPoint) {
        const parkingFee = exitPoint.payParkingFee(ticket, vehicle, exitTime);

        // simulate processing of payment
        console.log(`Processing payment of ${parkingFee} for vehicle ${vehicle.getLincensePlate()}...`);
        console.log(`Payment successful. Thank you for parking with us!`);
        console.log(`Payment ID: ${this.paymentId}`);
        console.log(`Payment Date: ${this.paymentDate}`);
    }
}

class Admin {
    addParkingFloor(parkingLot: ParkingLot, floorNumber: number, numRows: number, numCols: number) {
        let floor = new ParkingFloor(floorNumber, numRows, numCols);
        parkingLot.addFloor(floor);
    }

    addParkingSpot(parkingFloor: ParkingFloor, row: number, col: number, spotType: ParkingSpotType) {
        parkingFloor.addParkingSpot(row, col, spotType);
    }
}


/*
@startuml

enum VehicleType {
    CAR
    TRUCK
    VAN
    MOTORCYCLE
}

enum ParkingSpotType {
    COMPACT
    LARGE
    DISABLED
    MOTORCYCLE
}

class ParkingTicket {
    -ticketNumber: string
    -entryTime: Date
    +ParkingTicket(ticketNumber: string, entryTime: Date)
}

class Vehicle {
    -vehicleType: VehicleType
    -licensePlate: string
    +Vehicle(vehicleType: VehicleType, licensePlate: string)
}

class ParkingSpot {
    -spotNumber: string
    -spotType: ParkingSpotType
    -isOccupied: boolean
    +occupySpot()
    +vacateSpot()
    +ParkingSpot(spotNumber: string, spotType: ParkingSpotType)
}

class ParkingFloor {
    -floorNumber: number
    -entryPoints: EntryPoint[]
    -exitPoints: ExitPoint[]
    -parkingSpots: ParkingSpot[][] // for each ParkingSpotType we can have multiple spots
    +addParkingSpot(row: number, col: number, spotType: ParkingSpotType)
    +ParkingFloor(floorNumber: number, numRows: number, numCols: number)
}

class EntryPoint {
    -entryPointNumber: number
    +collectTicket(vehicle: Vehicle): ParkingTicket
    +EntryPoint(entryPointNumber: number)
}

class ExitPoint {
    -exitPointNumber: number
    -hourlyCostCalculator: HourlyCostCalculator
    +payParkingFee(ticket: ParkingTicket, vehicle: Vehicle, exitTime: Date)
    +ExitPoint(exitPointNumber: number)
}

class ParkingLot {
    -floors: ParkingFloor[]
    -entryPoints: EntryPoint[]
    -exitPoints: ExitPoint[]
    +addEntryPoint(entryPoint: EntryPoint)
    +addExitPoint(exitPoint: ExitPoint)
    +ParkingLot(numFloors: number, numRowsPerFloor: number, numColsPerFloor: number)
}

class Payment {
    -paymentId: string
    -paymentAmount: number
    -paymentDate: Date
    +Payment(paymentId: string, paymentAmount: number)
}

class Admin {
    +addParkingFloor(parkingLot: ParkingLot, floorNumber: number, numRows: number, numCols: number)
    +addParkingSpot(parkingFloor: ParkingFloor, row: number, col: number, spotType: ParkingSpotType)
}

class HourlyCostCalculator {
    +calculateFee(vehicleType: VehicleType, durationHours: number): number
}

ParkingLot "1" *-- "*" ParkingFloor : contains
ParkingFloor *-- "1..*" ParkingSpot : contains
ParkingFloor "1" *-- "1..*" EntryPoint : has
ParkingFloor "1" *-- "1..*" ExitPoint : has
ParkingLot "1" *-- "1..*" EntryPoint : has
ParkingLot "1" *-- "1..*" ExitPoint : has
ParkingTicket "1" -- "1" Vehicle : belongs to
ExitPoint "1" -- "1..*" Payment : accepts

@enduml
*/