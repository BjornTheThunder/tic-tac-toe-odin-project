class GameBoard {
  static board = ["", "", "", "", "", "", "", "", ""];
  static winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  static turnCounter = 0;
  static Turn = {
    X: 0,
    O: 1,
  };
  static WinningCondition = {
    X_WIN: 0,
    Y_WIN: 1,
    DRAW: 2,
  };
  static currentTurn = this.Turn.X;

  static getWinningCondition() {
    for (const row of this.winningCombinations) {
      const [a, b, c] = row;

      if (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        return this.board[a] === "X"
          ? this.WinningCondition.X_WIN
          : this.WinningCondition.Y_WIN;
      }
    }

    if (this.turnCounter === 9) {
      return this.WinningCondition.DRAW;
    }

    return null;
  }
}

const cells = document.querySelectorAll(".cell");
const currentPlayerDisplay = document.getElementById("current-player");

cells.forEach((cell) => {
  cell.addEventListener("click", (e) => {
    const index = e.target.getAttribute("data-index");

    if (e.target.textContent == "") {
      if (GameBoard.currentTurn == GameBoard.Turn.X) {
        e.target.textContent = "X";
        GameBoard.board[index] = "X";
        GameBoard.currentTurn = GameBoard.Turn.O;
        currentPlayerDisplay.innerHTML = "O";
      } else {
        e.target.textContent = "O";
        GameBoard.board[index] = "O";
        GameBoard.currentTurn = GameBoard.Turn.X;
        currentPlayerDisplay.innerHTML = "X";
      }

      GameBoard.turnCounter++;
    }

    showWinner(GameBoard.getWinningCondition());
  });
});

const modal = document.getElementById("winner-modal");
const winnerMessage = document.getElementById("winner-message");
const playAgainBtn = document.getElementById("play-again-btn");

function showWinner(winner) {
  if (winner === null) return;

  if (winner === GameBoard.WinningCondition.DRAW) {
    winnerMessage.textContent = "It's a Draw!";
  } else if (winner === GameBoard.WinningCondition.X_WIN) {
    winnerMessage.textContent = "X Wins!";
  } else {
    winnerMessage.textContent = "O Wins!";
  }

  modal.classList.add("show");
}

playAgainBtn.addEventListener("click", () => {
  modal.classList.remove("show");
  location.reload();
});
