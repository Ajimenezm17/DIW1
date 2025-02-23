document.addEventListener('DOMContentLoaded', () => {
  const inicio = document.getElementById('inicio');
  const rules = document.getElementById('rules');
  const app = document.getElementById('app');
  const rulesBtn = document.getElementById('rulesBtn');
  const backBtn = document.getElementById('backBtn');
  const startBtn = document.getElementById('startBtn');
  const canvas = document.getElementById('tetrisCanvas');
  const context = canvas.getContext('2d');
  const scoreDisplay = document.getElementById('score');

  rulesBtn.addEventListener('click', () => {
      inicio.style.display = 'none';
      rules.style.display = 'block';
  });

  backBtn.addEventListener('click', () => {
      rules.style.display = 'none';
      inicio.style.display = 'block';
  });

  startBtn.addEventListener('click', () => {
      inicio.style.display = 'none';
      app.style.display = 'block';
      startGame(); 
  });
});

const BLOCK_SIZE = 20;
const BOARD_WIDTH = 14;
const BOARD_HEIGHT = 30;

const canvas = document.getElementById('tetrisCanvas');
canvas.width = BLOCK_SIZE * BOARD_WIDTH;
canvas.height = BLOCK_SIZE * BOARD_HEIGHT;
const context = canvas.getContext('2d');

function createBoard(width, height) {
  return Array(height).fill().map(() => Array(width).fill(0));
}
