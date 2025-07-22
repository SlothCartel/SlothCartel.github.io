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

function typeLines(el, lines) {
  el.innerHTML = ''; // clear
  let i = 0;

  function typeLine() {
    if (i >= lines.length) return;

    const span = document.createElement('div');
    span.innerHTML = lines[i];
    el.appendChild(span);
    i++;

    setTimeout(typeLine, 75); // Adjust speed here
  }

  typeLine();
}

links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const targetId = link.getAttribute('data-target');
    const targetCard = document.getElementById(targetId);
    if (!targetCard) return;

    // Hide all cards
    cards.forEach(card => {
      card.classList.remove('active');
    });

    // Show the clicked one
    targetCard.classList.add('active');

    // Animate text
    const body = targetCard.querySelector('.terminal-body');
    const text = body.getAttribute('data-text');
    const linesRaw = body.getAttribute('data-lines');

    if (linesRaw) {
    try {
        const lines = JSON.parse(linesRaw);
        typeLines(body, lines);
    } catch (err) {
        console.error("Failed to parse data-lines JSON:", err);
    }
    } else if (text) {
    typeText(body, text.replace(/\\n/g, '\n'));
    }

    // Hide sidebar after selection
    sidebar.classList.remove('collapsed');
  });
});

// Auto-load home on first visit
window.addEventListener('DOMContentLoaded', () => {
  const first = document.querySelector('.sidebar-link[data-target="home"]');
  if (first) first.click();
});

const readmeData = {
  WorkoutTracker: [
    "WorkoutTracker is a Python web app to track workouts, set goals, and monitor progress.",
    "",
    "Features:",
    "- Log workouts (exercise, duration, intensity)",
    "- Set/track goals",
    "- Progress visualization",
    "- Clean interface",
    "",
    "Stack:",
    "Python, Django, Chart.js, Bootstrap",
    "",
    "Repo: https://github.com/SlothCartel/WorkoutTracker"
  ],
  Blackjack: [
    "Blackjack is a terminal-based game between a player and dealer written in C++.",
    "",
    "Features:",
    "- Full gameplay with deck logic",
    "- Hit / Stand choices",
    "- Win/loss tracking",
    "- Menu interface",
    "",
    "Stack:",
    "C++",
    "",
    "Repo: https://github.com/SlothCartel/Blackjack"
  ]
};

document.querySelectorAll('.readme-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const project = e.target.getAttribute('data-project');
    const readmeLines = readmeData[project];

    if (readmeLines) {
        const body = document.getElementById("readme-body");
        const header = document.getElementById("readme-header");

        header.textContent = `cat projects/${project}/README.md`;
        body.innerHTML = "";
        header.style.display = "block";
        body.style.display = "block";
        typeLines(body, readmeLines);
    }
  });
});
