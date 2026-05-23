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
function switchTab(id, btn) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  btn.classList.add('active');
}

// Auto-open tab from URL hash (#maschile / #femminile)
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.replace('#', '');
  const target = document.getElementById(hash);
  const btn = document.getElementById('tab-' + hash);
  if (target && btn) switchTab(hash, btn);
});
