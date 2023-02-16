try {
  particlesJS.load('particles-js', './js/particles.json');
} catch {
  console.error('particles did not load');
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
function isElementVisible(el) {
  const rect = el.getBoundingClientRect().top;
  return rect + 3 <= window.innerHeight;
}

function navbar() {
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.querySelector('.navbar');
  const menu = document.querySelector('.menu');
  let countDown;
  navLinks.forEach((link) => {
    link.addEventListener('click', () =>
      navbar.setAttribute('aria-expanded', 'false')
    );
  });
  const handleMouseEnter = () => {
    if (largeScreenCheck()) {
      clearTimeout(countDown);
      navbar.setAttribute('aria-expanded', 'true');
    }
  };
  const handleMouseLeave = () => {
    if (largeScreenCheck()) {
      countDown = setTimeout(() => {
        navbar.setAttribute('aria-expanded', 'false');
      }, 2000);
    }
  };

  const handleResize = () => {
    menu.firstElementChild.src = `../imgs/icons/nav/menu-${
      largeScreenCheck() ? 'xl' : 's'
    }.svg`;
  };

  window.addEventListener('resize', handleResize);
  if (window.innerWidth > 768) navbar.classList.add('active');
  navbar.addEventListener('mouseenter', handleMouseEnter);
  navbar.addEventListener('mouseleave', handleMouseLeave);
  menu.addEventListener('click', () => {
    const current = navbar.getAttribute('aria-expanded');
    navbar.setAttribute('aria-expanded', current === 'true' ? 'false' : 'true');
  });
  handleResize();
}

function about() {
  const skillsContainer = document.querySelector('.skills');
  const skills = document.querySelectorAll('.skill');
  const skillsTitle = document.querySelector('.skills-intro');
  typingAnimation(skillsTitle, () => {
    skillsTitle.classList.add('cursor-hide');
  });
  let delayCount = 0;
  skills.forEach((skill) => {
    skill.style.transitionDelay = delayCount + 'ms';
    delayCount += 200;
  });
  /* activeSkill(); */
}
function showcase() {
  const projectsContainer = document.querySelector('.showcase .container');
}

function createElement(type, content = null, attrs = {}) {
  const el = document.createElement(type);
  content && (el.innerHTML = content);
  for (let i in attrs) {
    el.setAttribute(i, attrs[i]);
  }
  return el;
}

// @params $element $callback
// $element a node element
function typingAnimation(element, props = {}, callback) {
  if (element && element.nodeType !== Node.ELEMENT_NODE) {
    return console.error(new Error('only accept node elements'));
  }
  props = {
    delay: props.delay || 1000,
    speed: props.speed || 60,
  };
  const content = element.textContent.trim();

  element.textContent = '';
  let isTyping = false; // to avoid multiple typing
  const event = () => {
    if (isTyping === true) return;
    if (isElementVisible(element)) {
      isTyping = true;
      let count = 0;
      setTimeout(() => {
        const interval = setInterval(() => {
          element.textContent += content[count++];
          if (count >= content.length) {
            clearInterval(interval);
            if (typeof callback === 'function') callback();
          }
        }, props.speed);
      }, props.delay);
      window.removeEventListener('scroll', event);
    }
  };

  window.addEventListener('load', event, { once: true });
  window.addEventListener('scroll', event);
}
function appendElements(target, ...elements) {
  elements.forEach((element) => target.appendChild(element));
}
