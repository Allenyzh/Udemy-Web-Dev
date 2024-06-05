document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const message = document.getElementById("message");
  const historyList = document.getElementById("history");
  let history = [Array(9).fill(null)];
  let isXNext = true;
  let currentStep = 0;

  function render() {
    board.innerHTML = "";
    history[currentStep].forEach((cell, index) => {
      const button = document.createElement("button");
      button.classList.add("square", "rounded");
      button.textContent = cell;
      button.addEventListener("click", () => handleClick(index));
      board.appendChild(button);
    });
    updateHistory();
  }

  function handleClick(index) {
    const historyCopy = history[currentStep].slice();
    if (historyCopy[index] || checkWinner(historyCopy)) return;
    historyCopy[index] = isXNext ? "X" : "O";
    history = history.slice(0, currentStep + 1);
    history.push(historyCopy);
    currentStep++;
    isXNext = !isXNext;
    render();
    if (checkWinner(historyCopy)) {
      message.textContent = `${historyCopy[index]} wins!`;
    } else if (historyCopy.every((cell) => cell)) {
      message.textContent = "It's a draw!";
    } else {
      message.textContent = `Next player: ${isXNext ? "X" : "O"}`;
    }
  }

  function checkWinner(cells) {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    return winningCombinations.some((combination) => {
      const [a, b, c] = combination;
      return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
    });
  }

  function updateHistory() {
    historyList.innerHTML = "";
    history.forEach((step, move) => {
      const desc = move ? `Go to move #${move}` : "Go to game start";
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.classList.add("text-white", "bg-blue-700", "hover:bg-blue-800", "focus:ring-4", "focus:outline-none", "focus:ring-blue-300", "font-medium", "rounded-lg", "text-sm", "px-5", "py-2.5", "text-center", "inline-flex", "items-center", "dark:bg-blue-600", "dark:hover:bg-blue-700", "dark:focus:ring-blue-800", "m-2");
      button.textContent = desc;
      button.onclick = () => {
        currentStep = move;
        render();
      };
      li.appendChild(button);
      historyList.appendChild(li);
    });
  }

  render();
});
