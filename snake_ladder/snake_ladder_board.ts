import { Ladder } from "./ladder";
import { Snake } from "./snake";

export class SnakeAndLadderBoard {
    private size: number;
    private snakes: Snake[];
    private ladders: Ladder[];
    private playerPieces: { [key: string]: number };

    constructor(size: number) {
        this.size = size;
        this.snakes = [];
        this.ladders = [];
        this.playerPieces = {};
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

    getPlayerPieces(): { [key: string]: number } {
        return this.playerPieces;
    }

    setPlayerPieces(playerPieces: { [key: string]: number }): void {
        this.playerPieces = playerPieces;
    }
}