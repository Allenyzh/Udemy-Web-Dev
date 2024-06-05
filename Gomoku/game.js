document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const message = document.getElementById("message");
  const historyList = document.getElementById("history");
  let history = [Array(225).fill(null)];
  let isXNext = true;
  let currentStep = 0;

  function render() {
      board.innerHTML = "";
      history[currentStep].forEach((cell, index) => {
          const button = document.createElement("button");
          button.classList.add("square");
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
      const size = 15;
      for (let i = 0; i < cells.length; i++) {
          const x = i % size;
          const y = Math.floor(i / size);

          // 水平和垂直方向
          if (x <= size - 5 && checkLine(cells, i, 1) ||
              y <= size - 5 && checkLine(cells, i, size)) {
              return true;
          }
          // 对角线方向
          if (x <= size - 5 && y <= size - 5 && checkLine(cells, i, size + 1) ||
              x >= 4 && y <= size - 5 && checkLine(cells, i, size - 1)) {
              return true;
          }
      }
      return false;
  }

  function checkLine(cells, start, step) {
      const player = cells[start];
      if (!player) return false;
      for (let j = 1; j < 5; j++) {
          if (cells[start + j * step] !== player) return false;
      }
      return true;
  }

  function updateHistory() {
      historyList.innerHTML = "";
      history.forEach((step, move) => {
          const desc = move ? `Go to move #${move}` : "Go to game start";
          const li = document.createElement("li");
          const button = document.createElement("button");
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