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
    { num: 'Tappa 6', date: '— Mag', status: 'next' },
    { num: 'Tappa 7', date: '— Mag', status: 'future' },
    { num: 'Tappa 8', date: '— Giu', status: 'future' },
    { num: 'Tappa 9', date: '— Giu', status: 'future' },
    { num: 'Tappa 10', date: '— Giu', status: 'finale' },
  ],
  femminile: [
    { num: 'Tappa 1', date: '31 Gen', status: 'done' },
    { num: 'Tappa 2', date: '28 Feb', status: 'done' },
    { num: 'Tappa 3', date: '7 Mar', status: 'done' },
    { num: 'Tappa 4', date: '21 Mar', status: 'done' },
    { num: 'Tappa 5', date: '28 Mar', status: 'done' },
    { num: 'Tappa 6', date: '25 Apr', status: 'done' },
    { num: 'Tappa 7', date: '9 Mag', status: 'done' },
    { num: 'Tappa 8', date: '— Mag', status: 'next' },
    { num: 'Tappa 9', date: '— Giu', status: 'future' },
    { num: 'Tappa 10', date: '— Giu', status: 'finale' },
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
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.replace('#', '');
  const target = document.getElementById(hash);
  const btn = document.getElementById('tab-' + hash);
  if (target && btn) switchTab(hash, btn);
});
