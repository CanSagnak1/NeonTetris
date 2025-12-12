import { BLOCK_SIZE, COLS, ROWS, COLORS } from './constants.js';
import { ParticleSystem } from './particles.js';

export class Renderer {
    constructor(ctx, holdCtx, nextCtx) {
        this.ctx = ctx;
        this.holdCtx = holdCtx;
        this.nextCtx = nextCtx;
        this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
        this.holdCtx.scale(25, 25);
        this.nextCtx.scale(25, 25);
        this.particleSystem = new ParticleSystem(this.ctx);
    }

    clear() {
        this.ctx.clearRect(0, 0, COLS, ROWS);
        this.holdCtx.clearRect(0, 0, 4, 4);
        this.nextCtx.clearRect(0, 0, 4, 12);
    }

    drawBoard(board) {
        this.particleSystem.update();
        this.particleSystem.draw();

        board.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.drawBlock(this.ctx, x, y, value);
                }
            });
        });
    }

    drawTetromino(piece) {
        if (!piece) return;
        piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.drawBlock(this.ctx, x + piece.x, y + piece.y, piece.typeId);
                }
            });
        });
    }

    drawGhost(piece, board) {
        if (!piece) return;
        let ghost = { ...piece, shape: piece.shape, x: piece.x, y: piece.y };
        while (this.isValid(ghost, board)) {
            ghost.y++;
        }
        ghost.y--;

        ghost.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.drawBlock(this.ctx, x + ghost.x, y + ghost.y, piece.typeId, true);
                }
            });
        });
    }

    isValid(p, board) {
        return p.shape.every((row, dy) => {
            return row.every((value, dx) => {
                let x = p.x + dx;
                let y = p.y + dy;
                return (
                    value === 0 ||
                    (board.isInside(x, y) && board.notOccupied(x, y))
                );
            });
        });
    }

    drawBlock(ctx, x, y, colorId, isGhost = false) {
        const color = COLORS[colorId];

        if (isGhost) {
            ctx.globalAlpha = 0.2;
            ctx.strokeStyle = color;
            ctx.lineWidth = 0.08;
            ctx.strokeRect(x + 0.1, y + 0.1, 0.8, 0.8);
            ctx.fillStyle = color;
            ctx.fillRect(x + 0.2, y + 0.2, 0.6, 0.6);
            ctx.globalAlpha = 1.0;
            return;
        }

        ctx.fillStyle = color;
        ctx.fillRect(x + 0.05, y + 0.05, 0.9, 0.9);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(x + 0.05, y + 0.05, 0.45, 0.9);

        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(x + 0.5, y + 0.05, 0.45, 0.9);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fillRect(x + 0.1, y + 0.1, 0.8, 0.1);

        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 0.05;
        ctx.strokeRect(x + 0.05, y + 0.05, 0.9, 0.9);
        ctx.shadowBlur = 0;
    }

    drawHold(piece) {
        if (!piece) return;
        this.drawMini(this.holdCtx, piece);
    }

    drawNext(pieces) {
        pieces.forEach((piece, index) => {
            this.drawMini(this.nextCtx, piece, 0, index * 3);
        });
    }

    drawMini(ctx, piece, offsetX = 0, offsetY = 0) {
        const shape = piece.shape;
        const xOffset = (4 - shape[0].length) / 2 + offsetX;
        const yOffset = (4 - shape.length) / 2 + offsetY;

        shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.drawBlock(ctx, x + xOffset, y + yOffset, piece.typeId);
                }
            });
        });
    }
}
