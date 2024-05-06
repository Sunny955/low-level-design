import { SnakeAndLadderBoard } from "./snake_ladder_board";
import { Player } from "./player";
import { Snake } from "./snake";
import { Ladder } from "./ladder";
import { DiceService } from "./dice";

class SnakeLadderGame {
    private snakeAndLadderBoard: SnakeAndLadderBoard;
    private initialNumberOfPlayers: number;
    private players: Player[];
    private isGameCompletedVar: boolean;

    private noOfDices: number;
    private shouldGameContinueTillLastPlayer: boolean;
    private shouldAllowMultipleDiceRollOnSix: boolean;

    private static DEFAULT_BOARD_SIZE: number = 100;
    private static DEFAULT_NO_OF_DICES: number = 1;

    constructor(boardSize?: number, noOfDices?: number) {
        const size = boardSize || SnakeLadderGame.DEFAULT_BOARD_SIZE;
        const dices = noOfDices || SnakeLadderGame.DEFAULT_NO_OF_DICES;
        this.snakeAndLadderBoard = new SnakeAndLadderBoard(size);
        this.players = [];
        this.noOfDices = dices;
        this.shouldAllowMultipleDiceRollOnSix = false;
        this.shouldGameContinueTillLastPlayer = false;
        this.initialNumberOfPlayers = 2;
        this.isGameCompletedVar = false;
    }

    setNoOfDices(noOfDices: number): void {
        this.noOfDices = noOfDices;
    }

    setShouldGameContinueTillLastPlayer(shouldGameContinueTillLastPlayer: boolean): void {
        this.shouldGameContinueTillLastPlayer = shouldGameContinueTillLastPlayer;
    }

    setShouldAllowMultipleDiceRollOnSix(shouldAllowMultipleDiceRollOnSix: boolean): void {
        this.shouldAllowMultipleDiceRollOnSix = shouldAllowMultipleDiceRollOnSix;
    }

    setPlayers(players: Player[]): void {
        this.players = players;
        this.initialNumberOfPlayers = players.length;
        const playerPieces = new Map<string, number>();
        players.forEach(player => playerPieces.set(player.getId(), 0));
        this.snakeAndLadderBoard.setPlayerPieces(playerPieces);
    }

    setSnakes(snakes: Snake[]): void {
        this.snakeAndLadderBoard.setSnakes(snakes);
    }

    setLadders(ladders: Ladder[]): void {
        this.snakeAndLadderBoard.setLadders(ladders);
    }

    private getNewPositionAfterGoingThroughSnakesAndLadders(newPosition: number): number {
        let previousPosition: number;

        do {
            previousPosition = newPosition;
            this.snakeAndLadderBoard.getSnakes().forEach(snake => {
                if (snake.getStart() === newPosition) {
                    newPosition = snake.getEnd();
                }
            });

            this.snakeAndLadderBoard.getLadders().forEach(ladder => {
                if (ladder.getStart() === newPosition) {
                    newPosition = ladder.getEnd();
                }
            });
        } while (newPosition !== previousPosition);

        return newPosition;
    }

    private movePlayer(player: Player, positions: number): void {
        let oldPosition = this.snakeAndLadderBoard.getPlayerPieces().get(player.getId())!;
        let newPosition = oldPosition + positions;

        if (newPosition > this.snakeAndLadderBoard.getSize()) {
            newPosition = oldPosition;
        } else {
            newPosition = this.getNewPositionAfterGoingThroughSnakesAndLadders(newPosition);
        }

        this.snakeAndLadderBoard.getPlayerPieces().set(player.getId(), newPosition);

        console.log(`${player.getName()} rolled a ${positions} and moved from ${oldPosition} to ${newPosition}`);
    }

    private getTotalValueAfterDiceRolls(): number {
        let totalDiceValue = 0;
        for (let i = 0; i < this.noOfDices; i++) {
            totalDiceValue += DiceService.roll();
        }
        return totalDiceValue;
    }

    private hasPlayerWon(player: Player): boolean {
        const playerPosition = this.snakeAndLadderBoard.getPlayerPieces().get(player.getId())!;
        const winningPosition = this.snakeAndLadderBoard.getSize();
        return playerPosition === winningPosition;
    }

    private isGameCompleted(): boolean {
        return this.players.length < this.initialNumberOfPlayers;
    }

    startGame(): void {
        while (!this.isGameCompleted()) {
            const totalDiceValue = this.getTotalValueAfterDiceRolls();
            const currentPlayer = this.players.shift()!;
            this.movePlayer(currentPlayer, totalDiceValue);
            if (this.hasPlayerWon(currentPlayer)) {
                console.log(`${currentPlayer.getName()} wins the game`);
                this.snakeAndLadderBoard.getPlayerPieces().delete(currentPlayer.getId());
            } else {
                this.players.push(currentPlayer);
            }
        }
    }
}

const snakes = [new Snake(16, 6), new Snake(47, 26), new Snake(49, 11), new Snake(56, 53), new Snake(62, 19), new Snake(64, 60), new Snake(87, 24), new Snake(93, 73), new Snake(95, 75), new Snake(98, 78)];
const ladders = [new Ladder(3, 38), new Ladder(6, 14), new Ladder(9, 31), new Ladder(21, 42), new Ladder(28, 84), new Ladder(36, 44), new Ladder(51, 67), new Ladder(71, 91), new Ladder(80, 100)];
const players = [new Player('Player 1'), new Player('Player 2'), new Player('Player 3')];

const snakeAndLadderService = new SnakeLadderGame();
snakeAndLadderService.setPlayers(players);
snakeAndLadderService.setSnakes(snakes);
snakeAndLadderService.setLadders(ladders);
snakeAndLadderService.setNoOfDices(2); // Optional: Customize number of dices
snakeAndLadderService.startGame();