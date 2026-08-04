// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('open');
    }
  });
}

// Tab switching (tornei page)
const tappeData = {
  maschile: [
    { num: 'Tappa 1', date: '31 Gen', status: 'done' },
    { num: 'Tappa 2', date: '21 Feb', status: 'done' },
    { num: 'Tappa 3', date: '14 Mar', status: 'done' },
    { num: 'Tappa 4', date: '28 Mar', status: 'done' },
    { num: 'Tappa 5', date: '11 Apr', status: 'done' },
    { num: 'Tappa 6', date: '18 Apr', status: 'done' },
    { num: 'Tappa 7', date: '9 Mag', status: 'done' },
    { num: 'Tappa 8', date: '24 Mag', status: 'done' },
    { num: 'Tappa 9', date: '20 Giu', status: 'done' },
    { num: 'Tappa 10', date: '— Set', status: 'next' },
  ],
  femminile: [
    { num: 'Tappa 1', date: '31 Gen', status: 'done' },
    { num: 'Tappa 2', date: '28 Feb', status: 'done' },
    { num: 'Tappa 3', date: '7 Mar', status: 'done' },
    { num: 'Tappa 4', date: '21 Mar', status: 'done' },
    { num: 'Tappa 5', date: '28 Mar', status: 'done' },
    { num: 'Tappa 6', date: '25 Apr', status: 'done' },
    { num: 'Tappa 7', date: '9 Mag', status: 'done' },
    { num: 'Tappa 8', date: '23 Mag', status: 'done' },
    { num: 'Tappa 9', date: '6 Giu', status: 'done' },
    { num: 'Tappa 10', date: '— Set', status: 'next' },
  ],
};

function renderTappe(genere) {
  const grid = document.querySelector('.tappe-grid');
  if (!grid || !tappeData[genere]) return;
  grid.innerHTML = tappeData[genere].map(t => {
    let borderColor = '';
    let statusHtml = '';
    if (t.status === 'done') {
      borderColor = '';
      statusHtml = '<div class="tappa-status tappa-done">✓ Completata</div>';
    } else if (t.status === 'next') {
      borderColor = 'style="border-top-color: var(--yellow);"';
      statusHtml = '<div class="tappa-status"><span class="tappa-next">Prossima</span></div>';
    } else if (t.status === 'future') {
      borderColor = 'style="border-top-color: #ccc;"';
      statusHtml = '<div class="tappa-status tappa-future">In programma</div>';
    } else if (t.status === 'finale') {
      borderColor = 'style="border-top-color: #ccc;"';
      statusHtml = '<div class="tappa-status tappa-future">Finale</div>';
    }
    return `<div class="tappa-card" ${borderColor}>
      <div class="tappa-num">${t.num}</div>
      <div class="tappa-date">${t.date}</div>
      ${statusHtml}
    </div>`;
  }).join('');
}

function switchTab(id, btn) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  btn.classList.add('active');
  renderTappe(id);
}

// Auto-open tab from URL hash (#maschile / #femminile)
// Also handles smooth scroll to any anchored section (e.g. #junior-school)
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.replace('#', '');
  const target = document.getElementById(hash);
  const btn = document.getElementById('tab-' + hash);
  if (target && btn) {
    switchTab(hash, btn);
  } else if (target) {
    setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }
});

// Junior School popup
(function () {
  const STORAGE_KEY = 'junior-popup-closed-26-27';
  if (sessionStorage.getItem(STORAGE_KEY)) return;

  const popup = document.createElement('div');
  popup.id = 'junior-popup';
  popup.innerHTML = `
    <button id="junior-popup-close" aria-label="Chiudi">✕</button>
    <div id="junior-popup-inner">
      <div style="font-size:2rem">🎾</div>
      <div id="junior-popup-text">
        <strong>Nuova offerta</strong>
        <span>Junior School 26/27</span>
      </div>
    </div>
    <a id="junior-popup-cta" href="lezioni.html#junior-school">Scopri i corsi →</a>
  `;
  document.body.appendChild(popup);

  document.getElementById('junior-popup-close').addEventListener('click', () => {
    popup.classList.add('hidden');
    sessionStorage.setItem(STORAGE_KEY, '1');
  });
}());
