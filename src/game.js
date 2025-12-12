import { COLS, ROWS, POINTS, LEVEL_SPEED } from './constants.js';
import { Tetromino } from './tetromino.js';
import { Board } from './board.js';
import { Renderer } from './renderer.js';
import { InputHandler } from './input.js';

export class Game {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.holdCanvas = document.getElementById('hold-canvas');
        this.holdCtx = this.holdCanvas.getContext('2d');
        this.nextCanvas = document.getElementById('next-canvas');
        this.nextCtx = this.nextCanvas.getContext('2d');

        this.board = new Board(this.ctx);
        this.renderer = new Renderer(this.ctx, this.holdCtx, this.nextCtx);
        this.input = new InputHandler(this);

        this.reset();
    }

    reset() {
        this.board.reset();
        this.score = 0;
        this.lines = 0;
        this.level = 1;
        this.isPlaying = false;
        this.isGameOver = false;
        this.piece = null;
        this.nextPieces = [];
        this.hold = null;
        this.canHold = true;
        this.lastTime = 0;
        this.dropCounter = 0;
        this.dropInterval = LEVEL_SPEED[1];

        this.updateScore(0);
        this.draw();
    }

    start() {
        this.reset();
        this.isPlaying = true;
        this.isGameOver = false;
        document.getElementById('start-overlay').classList.add('hidden');
        document.getElementById('game-over-overlay').classList.add('hidden');

        this.fillNextPieces();
        this.createNewPiece();
        this.animate();
    }

    fillNextPieces() {
        while (this.nextPieces.length < 3) {
            this.nextPieces.push(new Tetromino(this.ctx));
        }
    }

    createNewPiece() {
        this.piece = this.nextPieces.shift();
        this.fillNextPieces();
        this.canHold = true;

        if (!this.piece.isValid(this.board)) {
            this.gameOver();
        }
    }

    animate(time = 0) {
        if (!this.isPlaying) return;

        const deltaTime = time - this.lastTime;
        this.lastTime = time;

        this.dropCounter += deltaTime;
        if (this.dropCounter > this.dropInterval) {
            this.moveDown();
        }

        this.draw();
        requestAnimationFrame(this.animate.bind(this));
    }

    draw() {
        this.renderer.clear();
        this.renderer.drawBoard(this.board);
        this.renderer.drawGhost(this.piece, this.board);
        this.renderer.drawTetromino(this.piece);
        this.renderer.drawHold(this.hold);
        this.renderer.drawNext(this.nextPieces);
    }

    moveLeft() {
        this.piece.x--;
        if (!this.piece.isValid(this.board)) {
            this.piece.x++;
        }
    }

    moveRight() {
        this.piece.x++;
        if (!this.piece.isValid(this.board)) {
            this.piece.x--;
        }
    }

    moveDown() {
        this.piece.y++;
        this.dropCounter = 0;
        if (!this.piece.isValid(this.board)) {
            this.piece.y--;
            this.lockPiece();
        } else {
            this.score += POINTS.SOFT_DROP;
            this.updateScore(0);
        }
    }

    rotate() {
        this.piece.rotate(this.board);
    }

    hardDrop() {
        while (this.piece.isValid(this.board)) {
            this.piece.y++;
            this.score += POINTS.HARD_DROP;
        }
        this.piece.y--;
        this.lockPiece();
    }

    holdPiece() {
        if (!this.canHold) return;

        if (!this.hold) {
            this.hold = this.piece;
            this.createNewPiece();
        } else {
            let temp = this.piece;
            this.piece = this.hold;
            this.hold = temp;
            this.piece.x = 3;
            this.piece.y = 0;
        }

        this.hold.spawn();
        this.canHold = false;
    }

    lockPiece() {
        this.board.freeze(this.piece);
        const clearedLines = this.board.clearLines();
        this.updateScore(clearedLines.length);

        if (clearedLines.length > 0) {
            this.shakeScreen();
            clearedLines.forEach(y => {
                for (let x = 0; x < COLS; x++) {
                    this.renderer.particleSystem.spawn(x + 0.5, y + 0.5, '#ffffff', 5);
                }
            });
        }

        this.createNewPiece();
    }

    updateScore(lines) {
        if (lines > 0) {
            const linePoints = [0, POINTS.SINGLE, POINTS.DOUBLE, POINTS.TRIPLE, POINTS.TETRIS];
            this.score += linePoints[lines] * this.level;
            this.lines += lines;
            this.level = Math.floor(this.lines / 10) + 1;
            const speedLevel = Math.min(this.level, 10);
            this.dropInterval = LEVEL_SPEED[speedLevel] || LEVEL_SPEED[10];
        }

        document.getElementById('score').innerText = this.score;
        document.getElementById('level').innerText = this.level;
        document.getElementById('lines').innerText = this.lines;
    }

    gameOver() {
        this.isPlaying = false;
        this.isGameOver = true;
        document.getElementById('game-over-overlay').classList.remove('hidden');
        document.getElementById('final-score').innerText = this.score;
        document.getElementById('restart-btn').onclick = () => this.start();
    }

    shakeScreen() {
        document.querySelector('.game-container').classList.add('shake');
        setTimeout(() => {
            document.querySelector('.game-container').classList.remove('shake');
        }, 500);
    }
}
