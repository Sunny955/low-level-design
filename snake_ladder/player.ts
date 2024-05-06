import { v4 as uuidv4 } from "uuid";

export class Player {
    private name: string;
    private id: string;

    constructor(name: string) {
        this.name = name;
        this.id = uuidv4();
    }

    getName(): string {
        return this.name;
    }

    getId(): string {
        return this.id;
    }
}