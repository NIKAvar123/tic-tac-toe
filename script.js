const gameBoard = document.getElementById('game-board');
const winnerMessage = document.getElementById('winner-message');
const currentPlayerMessage = document.getElementById('current-player-message');
const restartButton = document.getElementById('restart-button');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

function handleCellClick(event) {
  const cellIndex = event.target.getAttribute('data-index');
  
  if (board[cellIndex] !== '' || !gameActive) {
    return;
  }

  board[cellIndex] = currentPlayer;
  event.target.textContent = currentPlayer;

  checkWinner();
  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateCurrentPlayerMessage();
  }
}

function updateCurrentPlayerMessage() {
  currentPlayerMessage.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]            
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      winnerMessage.textContent = `Player ${board[a]} wins!`;
      return;
    }
  }

  if (!board.includes('')) {
    gameActive = false;
    winnerMessage.textContent = "It's a draw!";
  }
}

function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  winnerMessage.textContent = '';
  updateCurrentPlayerMessage();
  document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
}

function createBoard() {
  gameBoard.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    gameBoard.appendChild(cell);
  }
}

restartButton.addEventListener('click', restartGame);

createBoard();
updateCurrentPlayerMessage();
