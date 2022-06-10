const gameBoard = document.getElementById('game-board');
const messageField = document.getElementById('text-field');
const restartGameBtn = document.getElementById('restart-btn');

const waysToWin = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

let playersMoves = ['', '', '', '', '', '', '', '', ''];
const cells = document.querySelectorAll('.game-container__cell');
cells.__proto__.map = Array.prototype.map;


let startGame = true;

let currentPlayer = 'X';
messageField.innerHTML = `It's ${currentPlayer}'s turn`;

gameBoard.addEventListener('click', (e) => {
  if (!e.target.classList.contains('game-container__cell')) return;

  if (!startGame) return;

  const cell = e.target;

  if (cell.innerHTML) return;

  cell.innerHTML = currentPlayer;
  cell.setAttribute('data-player', currentPlayer);
  playersMoves[cell.getAttribute('data-cell-index')] = cell.getAttribute('data-cell-index');

  changePlayer();

  messageField.innerHTML = `It's ${currentPlayer}'s turn`;

  checkWinner();
});


const changePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};

const checkWinner = () => {
  for (let i = 0; i < waysToWin.length; i++) {
    const combination = waysToWin[i];

    const A = playersMoves.find(item => +item === combination[0]);
    const B = playersMoves.find(item => +item === combination[1]);
    const C = playersMoves.find(item => +item === combination[2]);

    if (!A || !B || !C) continue;



    if (document.querySelector(`[data-cell-index = "${A}"]`).getAttribute('data-player') === document.querySelector(`[data-cell-index = "${B}"]`).getAttribute('data-player') && document.querySelector(`[data-cell-index = "${B}"]`).getAttribute('data-player') === document.querySelector(`[data-cell-index = "${C}"]`).getAttribute('data-player')) {
      messageField.innerHTML = (`Winner is ${document.querySelector(`[data-cell-index = "${A}"]`).getAttribute('data-player')}`);

      startGame = false;
      break;
    }
  }

  const emptyPlace = playersMoves.find(item => !item);

  if (emptyPlace === undefined) {
    messageField.innerHTML = 'Draw';
    startGame = false;
  }
};

const restartGame = () => {
  cells.map(cell => cell.innerHTML = '');

  const clearMoves = playersMoves.map(index => index = '');
  playersMoves = [...clearMoves];

  currentPlayer = 'X';
  messageField.innerHTML = `It's X's turn`;

  startGame = true;
};

restartGameBtn.addEventListener('click', restartGame)


