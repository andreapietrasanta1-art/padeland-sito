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

// Open Day popup
(function () {
  const STORAGE_KEY = 'openday-popup-closed-5set2026';
  if (sessionStorage.getItem(STORAGE_KEY)) return;

  const overlay = document.createElement('div');
  overlay.id = 'openday-overlay';

  const popup = document.createElement('div');
  popup.id = 'openday-popup';
  popup.innerHTML = `
    <button id="openday-popup-close" aria-label="Chiudi">&times;</button>
    <div class="openday-header">
      <span class="openday-date">SABATO 5 SETTEMBRE 2026</span>
      <h2>OPEN DAY PADELAND</h2>
      <p class="openday-subtitle">Via V. Toffetti, 17 — Milano · ore 9:00–18:00</p>
    </div>
    <div class="openday-body">
      <div class="openday-cards">
        <div class="openday-card">
          <div class="openday-card-label">INGRESSO</div>
          <div class="openday-card-price">20 &euro;</div>
          <p>Comprensivo di consumazione (birra o bibita + panino) e iscrizione a un torneo</p>
        </div>
        <div class="openday-card">
          <div class="openday-card-label">LEZIONI DI PROVA</div>
          <div class="openday-card-price">Gratis</div>
          <p>Prove di 20 min con istruttori federali, dalle 9:00 alle 12:00, previa iscrizione</p>
        </div>
      </div>
      <div class="openday-schedule">
        <strong>Programma della giornata:</strong>
        <ul>
          <li>09–12: Lezioni di prova e livellamenti</li>
          <li>10–12: Torneo Under 18 + Torneo rodeo femminile Entry</li>
          <li>12–14: Torneo rodeo femminile Intermedio</li>
          <li>12–15: Test racchette e materiale sponsor</li>
          <li>14–16: Torneo rodeo maschile + Esibizione squadre</li>
          <li>16–17: Premiazione Macron League</li>
        </ul>
      </div>
    </div>
    <div class="openday-footer">
      <a id="openday-cta" href="https://www.padelandmilano.com/openday">Iscriviti ora &rarr;</a>
      <p class="openday-contact">Antonio Alleva 347 000 9037 · amministrazione@padeland.it</p>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(popup);

  function closePopup() {
    popup.classList.add('hidden');
    overlay.classList.add('hidden');
    sessionStorage.setItem(STORAGE_KEY, '1');
  }

  document.getElementById('openday-popup-close').addEventListener('click', closePopup);
  overlay.addEventListener('click', closePopup);
}());
