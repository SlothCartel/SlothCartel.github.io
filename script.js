document.getElementById('menu-toggle').addEventListener('click', function (e) {
  e.stopPropagation(); // Prevent event bubbling
  const sidebar = document.getElementById('sidebar');
  const menuButton = document.getElementById('menu-toggle');

  sidebar.classList.toggle('collapsed');

  // Hide menu button when sidebar opens
  if (sidebar.classList.contains('collapsed')) {
    menuButton.style.display = 'none';
  } else {
    menuButton.style.display = 'flex';
  }
});

// Close sidebar when clicking outside of it
document.addEventListener('click', function(event) {
  const sidebar = document.getElementById('sidebar');
  const menuButton = document.getElementById('menu-toggle');

  // Check if sidebar is open and click is outside sidebar
  if (sidebar.classList.contains('collapsed') && !sidebar.contains(event.target)) {
    sidebar.classList.remove('collapsed');
    menuButton.style.display = 'flex';
  }
});

// Prevent sidebar clicks from closing the sidebar
document.getElementById('sidebar').addEventListener('click', function(e) {
  e.stopPropagation();
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

function typeText(el, text) {
  // Check if this is the home section with profile content
  const profileSection = el.querySelector('.profile-section');

  if (profileSection) {
    // For home section, preserve profile and add text after it
    let textElement = el.querySelector('.about-text');
    if (!textElement) {
      textElement = document.createElement('div');
      textElement.className = 'about-text';
      el.appendChild(textElement);
    }

    textElement.classList.remove('typing');
    textElement.textContent = '';
    let i = 0;
    function type() {
      if (i < text.length) {
        textElement.textContent += text.charAt(i);
        i++;
        setTimeout(type, 20);
      } else {
        textElement.classList.add('typing');
      }
    }
    type();
  } else {
    // For other sections, clear and type normally
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

    // Animate text for all sections
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

    // Hide sidebar and show menu button after selection
    sidebar.classList.remove('collapsed');
    document.getElementById('menu-toggle').style.display = 'flex';
  });
});

// Auto-load home on first visit
window.addEventListener('DOMContentLoaded', () => {
  const first = document.querySelector('.sidebar-link[data-target="home"]');
  if (first) first.click();
});

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
  ],
};

document.querySelectorAll(".readme-link").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();

        // Hide nav menu if open (mobile)
        const navMenu = document.querySelector(".nav-links");
        if (navMenu && navMenu.classList.contains("active")) {
            navMenu.classList.remove("active");
        }

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

document.getElementById('cv-download-btn').addEventListener('click', function() {
  const link = document.createElement('a');
  link.href = 'media/CV.pdf';
  link.download = 'Eugene_Holt_CV.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});


