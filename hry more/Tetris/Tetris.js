document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('tetris-grid');
    let squares = Array.from({ length: 200 }, () => {
        const div = document.createElement('div');
        grid.appendChild(div); // Append the created div to the grid
        return div;
    });
    let currentPosition = 4;
    let currentRotation = 0;
    let currentShape = 0;
    let timerId;

    // Tetrominoes
    const tetrominoes = [
        [[1, 11, 21, 31], [2, 12, 22, 32], [1, 2, 11, 21], [10, 11, 12, 22]],
        [[1, 2, 11, 12], [1, 2, 11, 12], [1, 2, 11, 12], [1, 2, 11, 12]],
        // Add more tetromino shapes as needed
    ];

    // Draw the Tetromino
    function draw() {
        tetrominoes[currentShape][currentRotation].forEach(index => {
            squares[currentPosition + index].classList.add('active');
        });
    }

    // Undraw the Tetromino
    function undraw() {
        tetrominoes[currentShape][currentRotation].forEach(index => {
            squares[currentPosition + index].classList.remove('active');
        });
    }

    // Move down the Tetromino
    function moveDown() {
        undraw();
        currentPosition += 10;
        draw();
        freeze();
    }

    // Freeze the Tetromino
    // Freeze the Tetromino
function freeze() {
    if (
        tetrominoes[currentShape][currentRotation].some(index =>
            squares[currentPosition + index + 10] === undefined || // Check if the square is undefined
            squares[currentPosition + index + 10].classList.contains('taken')
        )
    ) {
        tetrominoes[currentShape][currentRotation].forEach(index =>
            squares[currentPosition + index].classList.add('taken')
        );

        // Start a new Tetromino falling
        randomTetromino();
        draw();
        checkGameOver();
    }
}


    // Move the Tetromino left, right, or rotate
    function move(dir) {
        undraw();
        currentPosition += dir;
        draw();
    }

    // Rotate the Tetromino
    function rotate() {
        undraw();
        currentRotation = (currentRotation + 1) % 4;
        draw();
    }

    // Generate a random Tetromino
    function randomTetromino() {
        currentShape = Math.floor(Math.random() * tetrominoes.length);
        currentPosition = 4;
        currentRotation = 0;
    }

    // Check for game over
    function checkGameOver() {
        if (squares.slice(0, 10).some(square => square.classList.contains('taken'))) {
            clearInterval(timerId);
            alert("Game Over!");
        }
    }

    // Control the Tetromino with keyboard input
    function control(e) {
        if (e.keyCode === 37) {
            move(-1); // Move left
        } else if (e.keyCode === 39) {
            move(1); // Move right
        } else if (e.keyCode === 40) {
            moveDown(); // Move down
        } else if (e.keyCode === 38) {
            rotate(); // Rotate
        }
    }

    // Event listeners
    document.addEventListener('keydown', control);

    // Start the game
    randomTetromino();
    draw();
    timerId = setInterval(moveDown, 1000);
});
