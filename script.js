const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const startScreen = document.getElementById('startScreen');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
let gameStarted = false;
let loop;

const jump = () => {
    if (!gameStarted) return;
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

document.addEventListener('keydown', jump);

startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    document.getElementById('gameOverScreen').style.display = 'none'; // Garante que a tela de game over suma ao iniciar
    gameStarted = true;
    // Reinicia o Mario e o cano
    mario.src = 'img/mario.gif';
    mario.style.width = '150px';
    mario.style.marginLeft = '0';
    mario.style.bottom = '0';
    pipe.style.animation = '';
    pipe.style.left = '';
    loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            mario.src = 'img/game-over.png';
            mario.style.width = '75px';
            mario.style.marginLeft = '50px';

            const gameOverScreen = document.getElementById('gameOverScreen');
            gameOverScreen.classList.add('show');

            clearInterval(loop);
        }
    }, 10);
});

if (restartButton) {
    restartButton.addEventListener('click', () => {
        document.getElementById('gameOverScreen').style.display = 'none';
        setTimeout(() => {
            window.location.reload();
        }, 100);
    });
}
