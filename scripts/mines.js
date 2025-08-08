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
  alert(won ? "You Win!" : "You Hit a Mine!");
}

function getUserBalance() {
  return 100; // mock balance
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

window.addEventListener("DOMContentLoaded", () => {
  generateGrid();
});
