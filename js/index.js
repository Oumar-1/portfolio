try {
  particlesJS.load('particles-js', './js/particles.json');
} catch {
  console.error('particles did not load');
}
const breakPoints = {
  s: 767,
  xl: 1200,
};
landing();
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

function landing() {
  const title = document.getElementById('landing-title');
  typingAnimation(title, false , {speed: 100});
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
  typingAnimation(
    skillsTitle,
    () => {
      setTimeout(() => skillsTitle.classList.add('cursor-hide'), 1000);
    },
    { speed: 80 }
  );
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
function typingAnimation(element, callback, props = {}) {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    return console.error(new Error('only accept node elements'));
  }

  props = {
    delay: props.delay || 1000, // typing delay before start
    speed: props.speed || 50, // speed of typing
  };

  if (props.cursor === false) {
    props.cursor = {};
  } else
    props.cursor = {
      enable: props.cursor?.enable ?? true,
      remove: props.cursor?.remove ?? true,
      vanishDelay: props.cursor?.vanishDelay ?? 1000,
    };

  function insertText(finishtyping) {
    let count = 0;
    const interval = setInterval(() => {
      element.textContent += content[count++];
      if (count >= content.length) {
        clearInterval(interval);
        finishtyping();
      }
    }, props.speed);
  }

  function addCursor(element) {
    if (!props.cursor.enable) return false;
    element.classList.add('typing-cursor');
    return true;
  }
  function removeCursor() {
    if (!props.cursor.remove) return false;
    setTimeout(() => {
      element.classList.remove('typing-cursor');
    }, props.cursor.vanishDelay);
    return true;
  }

  const content = element.textContent.trim();
  element.textContent = '';
  addCursor(element);
  let isTyping = false; // to avoid multiple typing
  function eventHandler() {
    if (isTyping) return;
    if (isElementVisible(element)) {
      isTyping = true;
      // delay timer
      setTimeout(() => {
        // callback after insertion finish
        insertText(removeCursor);
      }, props.delay);
      window.removeEventListener('scroll', eventHandler);
    }
  }

  window.addEventListener('load', eventHandler, { once: true });
  window.addEventListener('scroll', eventHandler);
}
function appendElements(target, ...elements) {
  elements.forEach((element) => target.appendChild(element));
}
