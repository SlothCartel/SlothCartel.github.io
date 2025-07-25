// DOM Elements
const sidebar = document.getElementById('sidebar');
const menuButton = document.getElementById('menu-toggle');
const links = document.querySelectorAll('.sidebar-link');
const cards = document.querySelectorAll('.card');

// Project README data
const readmeData = {
  WorkoutTracker: [
    "WorkoutTracker:",
    "",
    "WorkoutTracker is a Python-based application designed to help users track their workouts and monitor their fitness progress. The application allows users to log different types of exercises, set goals, and visualize their progress over time.",
    " ",
    "Features:",
    "Log workouts with details such as exercise type, duration, and intensity",
    "Set and track fitness goals",
    "Visualize progress with charts and graphs",
    "User-friendly interface",
    " ",
    "Stack:",
    "Python, Django, Chart.js, Bootstrap",
    " ",
    "Repo: <a href=\"https://github.com/SlothCartel/WorkoutTracker\" target=\"_blank\">https://github.com/SlothCartel/WorkoutTracker</a>"
  ],
  Blackjack: [
    "Blackjack:",
    "",
    "Blackjack is a terminal-based game between a player and dealer written in C++.",
    " ",
    "Features:",
    "- Full gameplay with deck logic",
    "- Hit / Stand choices",
    "- Win/loss tracking",
    "- Menu interface",
    " ",
    "Stack:",
    "C++",
    " ",
    "Repo: <a href=\"https://github.com/SlothCartel/Blackjack\" target=\"_blank\">https://github.com/SlothCartel/Blackjack</a>"
  ],
  MovieTopia: [
    "MovieTopia:",
    "",
    "MovieTopia is a cinema control management system for scheduling movies and selling tickets to customers. This was our team's deliverable project for the Systems Analysis and Design II module at North West University.",
    " ",
    "Stack:",
    "C#, ASP.NET, SQL Server",
    " ",
    "Repo: <a href=\"https://github.com/DevMasters-Group/MovieTopia\" target=\"_blank\">https://github.com/DevMasters-Group/MovieTopia</a>"
  ]
};

// Typing animation functions
function typeText(el, text) {
  const profileSection = el.querySelector('.profile-section');

  if (profileSection) {
    let textElement = el.querySelector('.about-text');
    if (!textElement) {
      textElement = document.createElement('div');
      textElement.className = 'about-text';
      el.appendChild(textElement);
    }
    animateText(textElement, text);
  } else {
    animateText(el, text);
  }
}

function animateText(element, text) {
  element.classList.remove('typing');
  element.textContent = '';
  let i = 0;

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, 20);
    } else {
      element.classList.add('typing');
    }
  }
  type();
}

function typeLines(el, lines) {
  el.innerHTML = '';
  let i = 0;

  function typeLine() {
    if (i >= lines.length) return;

    const div = document.createElement('div');
    div.innerHTML = lines[i];
    el.appendChild(div);
    i++;
    setTimeout(typeLine, 75);
  }
  typeLine();
}

// Sidebar functionality
menuButton.addEventListener('click', function (e) {
  e.stopPropagation();
  sidebar.classList.toggle('collapsed');

  if (sidebar.classList.contains('collapsed')) {
    menuButton.style.display = 'none';
  } else {
    menuButton.style.display = 'flex';
  }
});

document.addEventListener('click', function(event) {
  if (sidebar.classList.contains('collapsed') && !sidebar.contains(event.target)) {
    sidebar.classList.remove('collapsed');
    menuButton.style.display = 'flex';
  }
});

sidebar.addEventListener('click', function(e) {
  e.stopPropagation();
});

// Navigation functionality
links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const targetId = link.getAttribute('data-target');
    const targetCard = document.getElementById(targetId);
    if (!targetCard) return;

    cards.forEach(card => card.classList.remove('active'));
    targetCard.classList.add('active');

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

    sidebar.classList.remove('collapsed');
    menuButton.style.display = 'flex';
  });
});

// Project README links
document.querySelectorAll(".readme-link").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();

    const project = link.dataset.project;
    const readmeLines = readmeData[project];
    const body = document.getElementById("readme-body");
    const header = document.getElementById("readme-header");

    if (!body || !header || !readmeLines) return;

    header.textContent = `cat projects/${project}/README.md`;
    body.innerHTML = "";
    header.style.display = "block";
    body.style.display = "block";
    typeLines(body, readmeLines);
  });
});

// CV download functionality
document.getElementById('cv-download-btn').addEventListener('click', function() {
  const link = document.createElement('a');
  link.href = 'media/CV.pdf';
  link.download = 'Eugene_Holt_CV.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

// Initialize home section on page load
window.addEventListener('DOMContentLoaded', () => {
  const homeLink = document.querySelector('.sidebar-link[data-target="home"]');
  if (homeLink) homeLink.click();
});

