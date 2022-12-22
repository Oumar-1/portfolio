particlesJS.load("particles-js", "Json/particles.json");

function navbar() {
  const linksContainer = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-link");
  const navbar = document.querySelector(".navbar");
  const menu = document.querySelector(".menu");
  const menuIcons = ["", ""];
  let countDown;
  navLinks.forEach((link) =>
    link.addEventListener("click", () => {
      navbar.classList.remove("active");
    })
  );
  function handleMouseEnter() {
    if (window.innerWidth < 768) return;
    clearTimeout(countDown);
    navbar.classList.add("active");
  }

  function handleMouseLeave() {
    if (window.innerWidth < 768) return;
    countDown = setTimeout(() => {
      navbar.classList.remove("active");
    }, 2000);
  }

  function handleMenuClick() {
    navbar.classList.toggle("active");
  }

  function handleResize() {
    if (window.innerWidth > 768) {
      menu.firstElementChild.src = "../imgs/icons/nav/monitor-menu.svg";
      navbar.classList.add("container");
    } else {
      menu.firstElementChild.src = "../imgs/icons/nav/mob-menu.svg";
      navbar.classList.remove("container");
    }
  }

  window.addEventListener("resize", handleResize);
  if (window.innerWidth > 768) navbar.classList.add("active");
  navbar.addEventListener("mouseenter", handleMouseEnter);
  navbar.addEventListener("mouseleave", handleMouseLeave);
  menu.addEventListener("click", handleMenuClick);
  handleResize();
}

navbar();
