import { Game } from './game.js';

window.onload = () => {
    const game = new Game();

    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            game.start();
        });
    }
};
