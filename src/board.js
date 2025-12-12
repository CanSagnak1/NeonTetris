import { ROWS, COLS, COLORS } from './constants.js';

export class Board {
    constructor(ctx) {
        this.ctx = ctx;
        this.grid = this.getEmptyBoard();
    }

    getEmptyBoard() {
        return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    }

    reset() {
        this.grid = this.getEmptyBoard();
    }

    isInside(x, y) {
        return x >= 0 && x < COLS && y < ROWS;
    }

    notOccupied(x, y) {
        return this.grid[y] && this.grid[y][x] === 0;
    }

    rotate(piece) {
        let p = JSON.parse(JSON.stringify(piece));
        for (let y = 0; y < p.shape.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [p.shape[x][y], p.shape[y][x]] = [p.shape[y][x], p.shape[x][y]];
            }
        }
        p.shape.forEach(row => row.reverse());
        return p;
    }

    drop(piece) {
        let p = { ...piece };
        p.y++;
        if (this.valid(p)) {
            piece.move(p);
        } else {
            this.freeze(piece);
            this.clearLines();
            return false;
        }
        return true;
    }

    freeze(piece) {
        piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.grid[y + piece.y][x + piece.x] = value;
                }
            });
        });
    }

    clearLines() {
        let lines = [];
        this.grid.forEach((row, y) => {
            if (row.every(value => value > 0)) {
                lines.push(y);
            }
        });

        const newGrid = this.grid.filter((row, index) => !lines.includes(index));
        while (newGrid.length < ROWS) {
            newGrid.unshift(Array(COLS).fill(0));
        }
        this.grid = newGrid;

        return lines;
    }
}
