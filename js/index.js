try {
  particlesJS.load("particles-js", "./js/particles.json");
} catch {
  console.error("particles did not load");
}
const breakPoints = {
  s: 767,
  xl: 1200,
};
navbar();
about();
showcase();
function largeScreenCheck() {
  if (window.innerWidth > breakPoints.s) return true;
  return false;
}
function isElementInViewport(el) {
  // Get the bounding rectangle of the element
  const rect = el.getBoundingClientRect();
  // Check if the element is within the bounds of the viewport
  return rect.top <= window.innerHeight;
}
function navbar() {
  const linksContainer = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-link");
  const navbar = document.querySelector(".navbar");
  const menu = document.querySelector(".menu");
  let countDown;
  navLinks.forEach((link) => {
    link.addEventListener("click", () =>
      navbar.setAttribute("aria-expanded", "false")
    );
  });
  const handleMouseEnter = () => {
    if (largeScreenCheck()) {
      clearTimeout(countDown);
      navbar.setAttribute("aria-expanded", "true");
    }
  };
  const handleMouseLeave = () => {
    if (largeScreenCheck()) {
      countDown = setTimeout(() => {
        navbar.setAttribute("aria-expanded", "false");
      }, 2000);
    }
  };

  const handleResize = () => {
    menu.firstElementChild.src = `../imgs/icons/nav/menu-${
      largeScreenCheck() ? "xl" : "s"
    }.svg`;
  };

  window.addEventListener("resize", handleResize);
  if (window.innerWidth > 768) navbar.classList.add("active");
  navbar.addEventListener("mouseenter", handleMouseEnter);
  navbar.addEventListener("mouseleave", handleMouseLeave);
  menu.addEventListener("click", () => {
    const current = navbar.getAttribute("aria-expanded");
    navbar.setAttribute("aria-expanded", current === "true" ? "false" : "true");
  });
  handleResize();
}
function about() {
  const skillsContainer = document.querySelector(".skills");
  const skills = document.querySelectorAll(".skill");
  const skillsTitle = document.querySelector(".skills-title");
  const skillsTitleContent = skillsTitle.textContent.trim();
  skillsTitle.textContent = "";
  const activeSkill = () => {
    // if the skillsContainer on the screen
    if (!isElementInViewport(skillsContainer)) return;
    // wait  before start typing
    let counter = 0;
    setTimeout(() => {
      // type the title
      const interval = setInterval(() => {
        skillsTitle.textContent += skillsTitleContent[counter++];
        if (counter >= skillsTitleContent.length) {
          clearInterval(interval);
          // hid cursor
          skillsTitle.classList.add("hide-cursor");
          // if typing the title is finish show skills
          skillsContainer.classList.add("active");
        }
      }, 60);
    }, 400);
    window.removeEventListener("scroll", activeSkill);
  };
  window.addEventListener("scroll", activeSkill);
  let delayCount = 0;
  skills.forEach((skill) => {
    skill.style.transitionDelay = delayCount + "ms";
    delayCount += 200;
  });
  activeSkill();
}
function showcase() {
  const projectsContainer = document.querySelector(".showcase .container");
  const projectsName = [
    { name: "Bondi", langs: ["html", "javascript", "Bootstrap"] },
    { name: "Memory-Game", langs: ["html", "css", "javascript(pure)"] },
    { name: "smak", langs: ["html", "css", "javascript"] },
    { name: "Quizzical", langs: ["html", "sass", "React"] },
    { name: "Tenzies", langs: ["html", "sass", "javascript"] },
    { name: "time-tracking", langs: ["html", "sass"] },
    { name: "Elzero3", langs: ["html", "css", "javascript"] },
  ];

  projectsName.forEach((project) => {
    const container = createElement("div", "project");
    const info = createElement("div", "info");
    const title = createElement("h4", "title", project.name);
    const desc = createElement("p", "description");
    const date = createElement("span", "date");
    const gitLink = createElement("a", "git-link", "source code");
    const cover = createElement("img", "cover", null, {
      src: `https://raw.githubusercontent.com/Oumar-1/${project.name}/main/cover.jpg`,
      loading: "lazy",
    });
    const liveLink = createElement("a", "live-link", "Live", {
      href: `https://oumar-1.github.io/${project.name}`,
    });
    projectsContainer.appendChild(container);
    fetch(`https://api.github.com/repos/Oumar-1/${project.name}`)
      .then((res) => res.json())
      .then((data) => {
        desc.textContent = data.description;
        date.textContent = data.created_at;
        gitLink.href = data.html_url;
        appendElements(info, date, gitLink, liveLink);
        appendElements(container, title, cover, desc, info);
      })
      .catch((reso) => console.error(reso));
  });
}

//        const frame = createElement(
//          "iframe",
//          "project-frame",
//          "your browser does not support ifram",
//          { src: `https://oumar-1.github.io/${project.name}`, scrolling: "no" }
//        );
// const frag = document.createDocumentFragment();
function createElement(type, className = null, content = null, attrs = {}) {
  const el = document.createElement(type);
  className ? (el.className = className) : "";
  content ? (el.innerHTML = content) : "";
  for (let i in attrs) {
    el.setAttribute(i, attrs[i]);
  }
  return el;
}
function appendElements(target, ...elements) {
  elements.forEach((element) => target.appendChild(element));
}
