document.getElementById('menu-toggle').addEventListener('click', function () {
  document.getElementById('sidebar').classList.toggle('collapsed');
});

const links = document.querySelectorAll('.sidebar-link');
const cards = document.querySelectorAll('.card');
const sidebar = document.getElementById('sidebar');

function typeText(el, text) {
  el.classList.remove('typing');
  el.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(type, 20);
    } else {
      el.classList.add('typing');
    }
  }
  type();
}

links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const targetId = link.getAttribute('data-target');
    const targetCard = document.getElementById(targetId);

    if (!targetCard) return;

    cards.forEach(card => card.classList.remove('active'));

    targetCard.classList.add('active');
    const body = targetCard.querySelector('.terminal-body');
    const text = body.getAttribute('data-text').replace(/\\n/g, '\n');
    typeText(body, text);

    // Hide sidebar (especially on mobile)
    sidebar.classList.remove('collapsed');
  });
});

// Auto-load first section
window.addEventListener('DOMContentLoaded', () => {
  const first = document.querySelector('.sidebar-link[data-target="home"]');
  if (first) first.click();
});
