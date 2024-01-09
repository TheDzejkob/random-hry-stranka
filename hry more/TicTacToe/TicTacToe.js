let currentPlayer = 'X';

function handleClick(boxNumber) {
    const box = document.getElementById(`box${boxNumber}`);
    
    if (!box.textContent) {
        box.textContent = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    const boxes = Array.from(document.querySelectorAll('.box'));
    const winningCombinations = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        const boxA = boxes[a - 1].textContent;
        const boxB = boxes[b - 1].textContent;
        const boxC = boxes[c - 1].textContent;

        if (boxA && boxA === boxB && boxA === boxC) {
            alert(`${boxA} Vyhrává!`);
            resetGame();
            return;
        }
    }

    if (boxes.every(box => box.textContent)) {
        alert("Remíza!");
        resetGame();
    }
}

function resetGame() {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.textContent = '';
    });
    currentPlayer = 'X';
}
