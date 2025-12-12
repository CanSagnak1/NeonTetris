export class InputHandler {
    constructor(game) {
        this.game = game;
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    handleKeyDown(event) {
        if (this.game.isGameOver) return;
        if (!this.game.isPlaying) return;

        switch (event.code) {
            case 'ArrowLeft':
                this.game.moveLeft();
                break;
            case 'ArrowRight':
                this.game.moveRight();
                break;
            case 'ArrowDown':
                this.game.moveDown();
                break;
            case 'ArrowUp':
                this.game.rotate();
                break;
            case 'Space':
                this.game.hardDrop();
                break;
            case 'KeyC':
            case 'ShiftLeft':
            case 'ShiftRight':
                this.game.holdPiece();
                break;
        }
    }
}
