
// ----------------DarkMode----------------- //

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);

  const isDark = theme === "dark";

  themeIcon.textContent = isDark ? "☀" : "☾";

  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Light" : "Dark"
  );

  themeToggle.setAttribute("aria-pressed", String(isDark));
};

applyTheme(root.getAttribute("data-theme") || "light");

themeToggle.addEventListener("click", () => {
  const currentTheme = root.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  applyTheme(newTheme);

  try {
    localStorage.setItem("theme", newTheme);
  } catch (error) {  }
});

// ------------------MouseEffect----------------- //

const cursorCircle =
    document.querySelector(".cursorCircle");

  document.addEventListener("mousemove", (e) => {
    cursorCircle.style.left = e.clientX + "px";
    cursorCircle.style.top = e.clientY + "px";
  });

  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursorCircle.style.width = "9px";
      cursorCircle.style.height = "9px";
      cursorCircle.style.background =
        "var(--text)";
    });

    el.addEventListener("mouseleave", () => {
      cursorCircle.style.width = "7px";
      cursorCircle.style.height = "7px";
      cursorCircle.style.background =
        "var(--text)";
    });
  });

// -------------------Loading---------------------- //


window.addEventListener("load", () => {
  document.getElementById("preloader")
    .classList.add("loaded");
});

// --------------------Scrolling----------------------- //

const scrolling = document.getElementById("scrolling");

function updateScrollIndicator() {
    const scrollTop = window.scrollY;

    const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const scrollPercent = docHeight > 0
        ? scrollTop / docHeight
        : 0;

    const container = scrolling.parentElement;
    const padding = 5;

    const maxTop =
        container.clientHeight -
        scrolling.offsetHeight -
        padding * 2;

    scrolling.style.top =
        `${padding + scrollPercent * Math.max(0, maxTop)}px`;
}

window.addEventListener("scroll", updateScrollIndicator);
window.addEventListener("load", updateScrollIndicator);

updateScrollIndicator();

// --------------------smoothScroll-----------------------//

let targetScroll = window.scrollY;
let currentScroll = window.scrollY;
let isScrolling = false;

const scrollSpeed = 1.2;
const smoothness = 0.06;

window.addEventListener("wheel", (e) => {
    e.preventDefault();

    currentScroll = window.scrollY;

    targetScroll += e.deltaY * scrollSpeed;

    targetScroll = Math.max(
        0,
        Math.min(
            targetScroll,
            document.documentElement.scrollHeight - window.innerHeight
        )
    );

    if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(smoothScroll);
    }
}, { passive: false });

function smoothScroll() {
    currentScroll += (targetScroll - currentScroll) * smoothness;

    window.scrollTo(0, currentScroll);

    if (Math.abs(targetScroll - currentScroll) > 0.5) {
        requestAnimationFrame(smoothScroll);
    } else {
        currentScroll = targetScroll;
        window.scrollTo(0, currentScroll);
        isScrolling = false;
    }
};


// ------------------------------ //

const toggle = document.getElementById("toggle");
const sideBox = document.getElementById("sideBox");
const midLine = document.getElementById("midLine");
const pageLayout = document.getElementById("pageLayout");
const toggleBack = document.getElementById("toggleBack")

toggle.addEventListener("click", () => {
    sideBox.classList.toggle("hidden");
    midLine.classList.toggle("hidden");
    pageLayout.classList.toggle("side-open");
});

toggleBack.addEventListener("click", () => {
    sideBox.classList.toggle("hidden");
    midLine.classList.toggle("hidden");
    pageLayout.classList.toggle("side-open");
});

// const toggle = document.getElementById("toggle");
// const closeSideBox = document.getElementById("toggleBack");
// const sideBox = document.getElementById("sideBox");
// const midLine = document.getElementById("midLine");
// const pageLayout = document.getElementById("pageLayout");

// function setSideBox(open) {
//   sideBox.classList.toggle("hidden", !open);
//   midLine.classList.toggle("hidden", !open);
//   pageLayout.classList.toggle("side-open", open);
// }

// toggle.addEventListener("click", () => {
//   setSideBox(sideBox.classList.contains("hidden"));
// });

// closeSideBox.addEventListener("click", () => {
//   setSideBox(false);
// });