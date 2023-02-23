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

function landing() {
  const title = document.getElementById('landing-title');
  typingAnimation(title, false, { speed: 100 });
}

function navbar() {
  const navbar = document.querySelector('#navbar');
  const navMenu = navbar.querySelector('#nav-menu');
  const toggler = navbar.querySelector('#nav-toggler button');
  const overlay = navbar.querySelector('.overlay');
  let countDownTimer;
  for (const link of navMenu.children) {
    const anchor = link.firstElementChild;
    anchor.addEventListener('focus', () => {
      clearTimer();
      toggleMenu(true);
    });
    anchor.addEventListener('blur', () => {
      setTimer(500);
    });
  }

  overlay.addEventListener('click', toggleMenu);
  // load proper icon on the first load
  setTogglerIcon();

  // resize to change menu toggler icon
  window.addEventListener('resize', handleResize);

  // show menu on large screen by default
  isLargeScreen() && toggleMenu(true);

  // handle focusing on menu
  navbar.addEventListener('mouseenter', handleMouseEnter);
  navbar.addEventListener('mouseleave', handleMouseLeave);
  toggler.addEventListener('click', toggleMenu);

  function setTimer(duration) {
    countDownTimer = setTimeout(() => toggleMenu(false), duration || 1000);
  }
  function clearTimer() {
    clearInterval(countDownTimer);
  }
  function handleMouseEnter() {
    if (!isLargeScreen()) return;
    clearTimer();
    toggleMenu(true);
  }
  function handleMouseLeave() {
    if (!isLargeScreen()) return;
    setTimer();
  }

  function setTogglerIcon() {
    const type = isLargeScreen() ? 'xl' : 's';
    fetch(`../imgs/icons/nav/menu-${type}.svg`)
      .then((res) => res.text())
      .then((content) => {
        toggler.innerHTML = content;
        toggler.setAttribute('data-icon-type', type);
      });
  }
  function handleResize() {
    const current = toggler.dataset.iconType;
    const type = isLargeScreen() ? 'xl' : 's';
    if (current === type) return;
    setTogglerIcon();
  }

  function toggleMenu(val) {
    let res;

    if (typeof val === 'boolean') res = val;
    else {
      const current = navMenu.getAttribute('aria-expanded');
      res = current === 'true' ? false : true;
    }
    navMenu.setAttribute('aria-expanded', res);
    toggler.setAttribute('aria-expanded', res);
  }
}

function about() {
  const skills = document.getElementById('about-skills');
  console.log(skills);
  const skillsContainer = skills.querySelector('#skills-container');
  const skillsItems = skills.querySelectorAll('.skill');
  const skillsTitle = skills.querySelector('.skills-intro');

  typingAnimation(
    skillsTitle,
    () => {
      skillsContainer.classList.add('active');
    },
    {
      speed: 80,
      cursor: { remove: false },
    }
  );
  let delayCount = 0;
  skillsItems.forEach((skill) => {
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
// callback
function typingAnimation(element, callback, props = {}) {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    return console.error(new Error('only accept node elements'));
  }
  const content = element.textContent.trim();
  element.textContent = '';

  let cursor;
  if (props.cursor === false) {
    cursor = {};
  } else
    cursor = {
      enable: props.cursor?.enable ?? true,
      remove: props.cursor?.remove ?? true,
      vanishDelay: props.cursor?.vanishDelay ?? 1000,
    };

  props = {
    delay: props.delay || 1000, // typing delay before start
    speed: props.speed || 50, // speed of typing
    cursor,
  };

  function insertText(insertCallback) {
    let count = 0;
    const interval = setInterval(() => {
      element.textContent += content[count++];
      if (count >= content.length) {
        clearInterval(interval);
        insertCallback();
      }
    }, props.speed);
  }

  function addCursor(element) {
    if (!props.cursor.enable) return false;
    element.classList.add('typing-cursor');
    return true;
  }
  function callMainCallback() {
    if (typeof callback === 'function') return callback();
    else return false;
  }
  function removeCursor() {
    if (props.cursor.remove) {
      setTimeout(() => {
        element.classList.remove('typing-cursor');
        callMainCallback();
      }, props.cursor.vanishDelay);
    } else callMainCallback();
  }

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

  addCursor(element);
  window.addEventListener('load', eventHandler, { once: true });
  window.addEventListener('scroll', eventHandler);
}
function appendElements(target, ...elements) {
  elements.forEach((element) => target.appendChild(element));
}
function isLargeScreen() {
  if (window.innerWidth > breakPoints.s) return true;
  return false;
}
function isElementVisible(el, width, height) {
  const y = el.getBoundingClientRect().top;
  const x = el.getBoundingClientRect().left;
  const w = width || el.offsetWidth;
  const h = height || el.offsetHeight;
  return (
    y <= window.innerHeight &&
    y + h >= 0 &&
    x >= 0 &&
    x + w <= window.innerWidth
  );
}
