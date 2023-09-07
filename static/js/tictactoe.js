 // JavaScript code for the game logic
 document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.board');
    const cells = document.querySelectorAll('.cell');
    const restartBtn = document.createElement('button');
    restartBtn.textContent = 'Restart';
    document.body.appendChild(restartBtn);
    
    let currentPlayer = 'X';
    let gameEnded = false;
    
    // Add event listeners to each cell
    cells.forEach(cell => {
      cell.addEventListener('click', () => {
        if (!cell.textContent && !gameEnded) {
          cell.textContent = currentPlayer;
          cell.classList.add(currentPlayer);
          checkWinner(currentPlayer);
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
      });
    });
    
    // Check if a player has won
    function checkWinner(player) {
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
      ];
      
      for (const combination of winningCombinations) {
        if (
          cells[combination[0]].textContent === player &&
          cells[combination[1]].textContent === player &&
          cells[combination[2]].textContent === player
        ) {
          endGame(`${player} wins!`);
          return;
        }
      }
      
      // Check for a tie
      if (Array.from(cells).every(cell => cell.textContent)) {
        endGame("It's a tie!");
      }
    }
    
    // End the game and display the result
    function endGame(message) {
      gameEnded = true;
      restartBtn.style.display = 'block';
      restartBtn.addEventListener('click', resetBoard);
      
      const result = document.createElement('p');
      result.textContent = message;
      document.body.appendChild(result);
    }
    
    // Reset the board and start a new game
    function resetBoard() {
      cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
      });
      currentPlayer = 'X';
      gameEnded = false;
      restartBtn.style.display = 'none';
      document.querySelector('p').remove();
    }
  });