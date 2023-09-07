document.addEventListener('DOMContentLoaded', () => {
    const stickFigure = document.getElementById('stick-figure');
    const cactus = document.querySelector('.cactus');
    const scoreDisplay = document.getElementById('score');
    let isJumping = false;
    let gameInterval;
    let score = 0;

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space' && !isJumping) {
            isJumping = true;
            jump();
        }
    });

    function jump() {
        let position = 0;
        const jumpInterval = setInterval(() => {
            if (position === 170) { // Adjust the jump height here (default: 150px)
                clearInterval(jumpInterval);
                returnDown();
            } else {
                position += 10; // Adjust the jump increment here (default: 10px)
                stickFigure.style.bottom = position + 'px';
            }
        }, 20);
    }

    function returnDown() {
        const returnInterval = setInterval(() => {
            if (stickFigure.style.bottom === '0px') {
                clearInterval(returnInterval);
                isJumping = false;
            } else {
                const position = parseInt(stickFigure.style.bottom) - 10;
                stickFigure.style.bottom = position + 'px';
            }
        }, 20);
    }

    function moveCactus() {
        let cactusPosition = 1400;
        gameInterval = setInterval(() => {
            if (cactusPosition === -30) {
                cactusPosition = 1400;
                incrementScore();
            } else {
                cactusPosition -= 10;
                cactus.style.left = cactusPosition + 'px';

                if (isColliding(stickFigure, cactus)) {
                    clearInterval(gameInterval);
                    alert('Game Over! Score: ' + score);
                    location.reload();
                }
            }
        }, 20);
    }

    function isColliding(element1, element2) {
        const rect1 = element1.getBoundingClientRect();
        const rect2 = element2.getBoundingClientRect();
        return !(
            rect1.top > rect2.bottom ||
            rect1.bottom < rect2.top ||
            rect1.right < rect2.left ||
            rect1.left > rect2.right
        );
    }

    function incrementScore() {
        score++;
        scoreDisplay.textContent = 'Score: ' + score;
    }

    moveCactus();
});