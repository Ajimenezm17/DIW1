document.addEventListener('DOMContentLoaded', () => {
  const inicio = document.getElementById('inicio');
  const rules = document.getElementById('rules');
  const app = document.getElementById('app');
  const rulesBtn = document.getElementById('rulesBtn');
  const backBtn = document.getElementById('backBtn');
  const startBtn = document.getElementById('startBtn');

  rulesBtn.addEventListener('click', () => {
      inicio.style.display = 'none';
      rules.style.display = 'block';
      requestAnimationFrame(showRules);
  });

  backBtn.addEventListener('click', () => {
      rules.style.display = 'none';
      inicio.style.display = 'block';
      requestAnimationFrame(showInicio);
  });

  startBtn.addEventListener('click', () => {
      inicio.style.display = 'none';
      app.style.display = 'block';
      startGame();
  });
});