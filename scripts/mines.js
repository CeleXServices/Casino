<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Mines Game</title>
  <link rel="stylesheet" href="styles/main.css" />
</head>
<body>
  <div id="header-container"></div>

  <main class="mines-container">
    <aside class="bet-controls">
      <h2>💸 Place Your Bet</h2>
      <input type="number" min="0.1" step="0.1" value="0.1" id="betAmount" />
      <div class="bet-buttons">
        <button onclick="adjustBet(0.5)">½</button>
        <button onclick="adjustBet(2)">2×</button>
        <button onclick="adjustBet(5)">5×</button>
        <button onclick="adjustBet(10)">10×</button>
        <button onclick="setMaxBet()">Max</button>
        <button onclick="setMinBet()">Min</button>
      </div>
      <button onclick="startGame()">Start Game</button>
    </aside>

    <section class="mines-grid" id="minesGrid">
      <!-- Grid auto-generated -->
    </section>
  </main>

  <div id="chat-box"></div>

  <script>
    // Inject header + chat
    fetch("components/header.html")
      .then(res => res.text())
      .then(html => document.getElementById("header-container").innerHTML = html);
    fetch("components/chat.html")
      .then(res => res.text())
      .then(html => document.getElementById("chat-box").outerHTML = html);
  </script>

  <script>
    const gridSize = 5;
    const mineCount = 5;
    let mines = [];
    let revealed = [];
    let gameActive = false;

    function generateGrid() {
      const grid = document.getElementById("minesGrid");
      grid.innerHTML = "";
      revealed = [];

      for (let i = 0; i < gridSize * gridSize; i++) {
        const tile = document.createElement("div");
        tile.className = "tile unrevealed";
        tile.dataset.index = i;
        tile.addEventListener("click", () => revealTile(i));
        grid.appendChild(tile);
      }
    }

    function startGame() {
      mines = [];
      gameActive = true;

      while (mines.length < mineCount) {
        const rand = Math.floor(Math.random() * gridSize * gridSize);
        if (!mines.includes(rand)) mines.push(rand);
      }

      generateGrid();
    }

    function revealTile(index) {
      if (!gameActive || revealed.includes(index)) return;

      const tile = document.querySelector(`[data-index="${index}"]`);
      revealed.push(index);

      if (mines.includes(index)) {
        tile.className = "tile mine";
        tile.textContent = "💥";
        endGame(false);
      } else {
        tile.className = "tile safe";
        tile.textContent = "💎";

        if (revealed.length === gridSize * gridSize - mineCount) {
          endGame(true);
        }
      }
    }

    function endGame(won) {
      gameActive = false;
      document.querySelectorAll(".tile").forEach(tile => {
        const i = parseInt(tile.dataset.index);
        if (mines.includes(i)) {
          tile.className = "tile mine";
          tile.textContent = "💥";
        }
      });
      setTimeout(() => {
        alert(won ? "🎉 You Win!" : "💣 You Hit a Mine!");
      }, 300);
    }

    function getUserBalance() {
      return 100; // Mock balance
    }

    function adjustBet(multiplier) {
      const input = document.getElementById("betAmount");
      input.value = Math.max(0.1, (parseFloat(input.value) * multiplier).toFixed(2));
    }

    function setMaxBet() {
      document.getElementById("betAmount").value = getUserBalance();
    }

    function setMinBet() {
      document.getElementById("betAmount").value = 0.1;
    }

    window.addEventListener("DOMContentLoaded", generateGrid);
  </script>

  <script src="scripts/chat.js"></script>
</body>
</html>
