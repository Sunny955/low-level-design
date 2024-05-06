import { Ladder } from "./ladder";
import { Snake } from "./snake";

export class SnakeAndLadderBoard {
    private size: number;
    private snakes: Snake[];
    private ladders: Ladder[];
    private playerPieces: Map<string, number>;

    constructor(size: number) {
        this.size = size;
        this.snakes = [];
        this.ladders = [];
        this.playerPieces = new Map<string, number>();
    }

    getSize(): number {
        return this.size;
    }

    getSnakes(): Snake[] {
        return this.snakes;
    }

    setSnakes(snakes: Snake[]): void {
        this.snakes = snakes;
    }

    getLadders(): Ladder[] {
        return this.ladders;
    }

    setLadders(ladders: Ladder[]): void {
        this.ladders = ladders;
    }

    getPlayerPieces(): Map<string, number> {
        return this.playerPieces;
    }

    setPlayerPieces(playerPieces: Map<string, number>): void {
        this.playerPieces = playerPieces;
    }
}