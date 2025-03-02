document.addEventListener('DOMContentLoaded', () => {
  const inicio = document.getElementById('inicio');
  const rules = document.getElementById('rules');
  const app = document.getElementById('app');
  const rulesBtn = document.getElementById('rulesBtn');
  const backBtn = document.getElementById('backBtn');
  const startBtn = document.getElementById('startBtn');
  const canvas = document.querySelector('canvas');
  const context = canvas.getContext('2d');
  const $score = document.querySelector('span');

  const BLOCK_SIZE = 20;
  const BOARD_WIDTH = 14;
  const BOARD_HEIGHT = 30;

  let score = 0;

  canvas.width = BLOCK_SIZE * BOARD_WIDTH;
  canvas.height = BLOCK_SIZE * BOARD_HEIGHT;

  context.scale(BLOCK_SIZE, BLOCK_SIZE);

  // Crear el tablero
  const board = createBoard(BOARD_WIDTH, BOARD_HEIGHT);

  function createBoard(width, height) {
    return Array(height).fill().map(() => Array(width).fill(0));
  }

  // Piezas
  const PIECES = [
    [
      [1, 1],
      [1, 1]
    ],
    [
      [1, 1, 1, 1]
    ],
    [
      [0, 1, 0],
      [1, 1, 1]
    ],
    [
      [1, 1, 0],
      [0, 1, 1]
    ],
    [
      [0, 1, 1],
      [1, 1, 0]
    ],
    [
      [1, 0],
      [1, 0],
      [1, 1]
    ],
    [
      [0, 1],
      [0, 1],
      [1, 1]
    ]
  ];

  let dropCounter = 0;
  let lastTime = 0;

  const piece = {
    position: { x: 5, y: 5 },
    shape: PIECES[Math.floor(Math.random() * PIECES.length)]
  };

  function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;

    if (dropCounter > 1000) {
      piece.position.y++;
      dropCounter = 0;

      if (checkCollision()) {
        piece.position.y--;
        solidifyPiece();
        removeRows();
      }
    }

    draw();
    window.requestAnimationFrame(update);
  }

  function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    board.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === 1) {
          context.fillStyle = 'yellow';
          context.fillRect(x, y, 1, 1);
        }
      });
    });
    piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          context.fillStyle = 'red';
          context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1);
        }
      });
    });

    $score.innerText = score;
  }

  document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
      piece.position.x--;
      if (checkCollision()) {
        piece.position.x++;
      }
    }
    if (event.key === 'ArrowRight') {
      piece.position.x++;
      if (checkCollision()) {
        piece.position.x--;
      }
    }
    if (event.key === 'ArrowDown') {
      piece.position.y++;
      if (checkCollision()) {
        piece.position.y--;
        solidifyPiece();
        removeRows();
      }
    }

    if (event.key === 'ArrowUp') {
      const rotated = [];

      for (let i = 0; i < piece.shape[0].length; i++) {
        const row = [];

        for (let j = piece.shape.length - 1; j >= 0; j--) {
          row.push(piece.shape[j][i]);
        }
        rotated.push(row);
      }

      const previousShape = piece.shape;
      piece.shape = rotated;
      if (checkCollision()) {
        piece.shape = previousShape;
      }
    }
  });

  function checkCollision() {
    return piece.shape.find((row, y) => {
      return row.find((value, x) => {
        return (
          value !== 0 &&
          board[y + piece.position.y]?.[x + piece.position.x] !== 0
        );
      });
    });
  }

  function solidifyPiece() {
    piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === 1) {
          board[y + piece.position.y][x + piece.position.x] = 1;
        }
      });
    });

    piece.position.x = Math.floor(BOARD_WIDTH / 2 - 2);
    piece.position.y = 0;
    piece.shape = PIECES[Math.floor(Math.random() * PIECES.length)];

    // Game Over
    if (checkCollision()) {
      showGameOver().then(() => {
        resetGame();
        document.getElementById('app').style.display = 'none';
        document.getElementById('inicio').style.display = 'block';
      });
    }
  }

  function resetGame() {
    board.forEach((row) => row.fill(0));
    score = 0;
  }

  function removeRows() {
    const rowsToRemove = [];

    board.forEach((row, y) => {
      if (row.every(value => value === 1)) {
        rowsToRemove.push(y);
      }
    });
    rowsToRemove.forEach(y => {
      board.splice(y, 1);
      const newRow = Array(BOARD_WIDTH).fill(0);
      board.unshift(newRow);
      score += 100;
    });
  }

  // Mostrar mensaje de Game Over
  function showGameOver() {
    return new Promise((resolve) => {
      const gameOverMessage = document.createElement('div');
      gameOverMessage.innerHTML = '<h2>¡Juego Terminado!</h2>';
      gameOverMessage.style.position = 'absolute';
      gameOverMessage.style.top = '50%';
      gameOverMessage.style.left = '50%';
      gameOverMessage.style.transform = 'translate(-50%, -50%)';
      gameOverMessage.style.color = 'white';
      gameOverMessage.style.fontSize = '24px';
      document.body.appendChild(gameOverMessage);

      setTimeout(() => {
        document.body.removeChild(gameOverMessage);
        resolve();
      }, 1500);
    });
  }

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
    score = 0;
    update(); 
  });
});
