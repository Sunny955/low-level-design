export class Ladder {
    private start: number;
    private end: number;

    constructor(start: number, end: number) {
        this.start = start;
        this.end = end;
    }

    getStart(): number {
        return this.start;
    }

    getEnd(): number {
        return this.end;
    }
}