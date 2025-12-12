import { SHAPES, COLORS, WALL_KICKS } from './constants.js';

export class Tetromino {
    constructor(ctx) {
        this.ctx = ctx;
        this.spawn();
    }

    spawn() {
        this.typeId = this.randomizeTetrominoType(7);
        this.shape = SHAPES[this.typeId];
        this.color = COLORS[this.typeId];
        this.x = 3;
        this.y = 0;
        this.rotationIndex = 0;
    }

    randomizeTetrominoType(noOfTypes) {
        return Math.floor(Math.random() * noOfTypes) + 1;
    }

    rotate(board) {
        const originalShape = this.shape;
        const originalX = this.x;
        const originalY = this.y;
        const originalRotation = this.rotationIndex;

        this.shape = this.shape[0].map((val, index) =>
            this.shape.map(row => row[index]).reverse()
        );

        this.rotationIndex = (this.rotationIndex + 1) % 4;

        if (!this.isValid(board)) {
            if (!this.performWallKick(board, originalRotation, this.rotationIndex)) {
                this.shape = originalShape;
                this.x = originalX;
                this.y = originalY;
                this.rotationIndex = originalRotation;
            }
        }
    }

    performWallKick(board, oldRot, newRot) {
        const type = this.typeId === 1 ? 'I' : 'JLSTZ';
        if (type === 'O') return false;

        const kicks = WALL_KICKS[type][oldRot];

        for (let i = 0; i < kicks.length; i++) {
            const [kx, ky] = kicks[i];
            this.x += kx;
            this.y -= ky;

            if (this.isValid(board)) {
                return true;
            }

            this.x -= kx;
            this.y += ky;
        }
        return false;
    }

    isValid(board) {
        return this.shape.every((row, dy) => {
            return row.every((value, dx) => {
                let x = this.x + dx;
                let y = this.y + dy;
                return (
                    value === 0 ||
                    (board.isInside(x, y) && board.notOccupied(x, y))
                );
            });
        });
    }

    move(p) {
        this.x = p.x;
        this.y = p.y;
    }
}
