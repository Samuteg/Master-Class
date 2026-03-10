const quests = Array.from(document.querySelectorAll('[data-exp]'));
const rankLabel = document.getElementById('rankLabel');
const xpLabel = document.getElementById('xpLabel');
const xpBar = document.getElementById('xpBar');
const statusNote = document.getElementById('statusNote');

const ranks = [
  { name: 'Plebeu', cap: 400 },
  { name: 'Escudeiro', cap: 700 },
  { name: 'Cavaleiro', cap: 1100 },
  { name: 'Nobre', cap: 1500 },
  { name: 'Rei', cap: 2000 },
];

let currentXp = 240;

const updateUI = () => {
  let total = 0;
  let currentRank = ranks[0];
  let previousCap = 0;

  for (const rank of ranks) {
    total += rank.cap;
    if (currentXp < total) {
      currentRank = rank;
      break;
    }
    previousCap = total;
  }

  const inRankXp = currentXp - previousCap;
  const percent = Math.min((inRankXp / currentRank.cap) * 100, 100);

  rankLabel.textContent = currentRank.name;
  xpLabel.textContent = `${inRankXp} / ${currentRank.cap}`;
  xpBar.style.width = `${percent}%`;

  const nextRank = ranks[ranks.indexOf(currentRank) + 1];
  if (nextRank) {
    const remaining = currentRank.cap - inRankXp;
    statusNote.textContent = `Faltam ${remaining} XP para ${nextRank.name}`;
  } else {
    statusNote.textContent = 'Rank maximo alcançado.';
  }
};

quests.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.disabled) return;

    const exp = Number(button.dataset.exp || 0);
    currentXp += exp;
    button.disabled = true;
    button.textContent = 'Concluido';
    button.classList.add('ghost');
    updateUI();
  });
});

updateUI();
