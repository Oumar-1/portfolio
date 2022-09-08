particlesJS.load('particles-js', 'Json/particles.json', function() {
  console.log('callback - particles.js config loaded');
});
class Navbar {
  constructor() {
    this.navLinks = document.querySelectorAll(".nav-links li a");
    this.navbar = document.querySelector(".navbar");
    this.nav = document.querySelector(".nav-links");
    this.menu = document.querySelector(".menu");
    this.menuImg = document.querySelector(".menu img");
    this.menuImgSrc = [
      "../imgs/icons/nav/mob-menu.svg",
      "../imgs/icons/nav/monitor-menu.svg",
    ];
    this.countDown = setTimeout(() => {
      this.navbar.classList.remove("active");
    }, 4000);
    this.initial();
  }
  initial() {
    this.navbar.addEventListener("mouseenter", () => this.handleMouseEnter());
    this.navbar.addEventListener("mouseleave", () => this.handleMouseLeave());
    this.menu.addEventListener("click", () => this.handleMenuClick());
    this.updateOnResize();
    this.handleLinksClick();
  }

  handleMouseEnter() {
    if (window.innerWidth < 768) return;
    clearTimeout(this.countDown);
    this.navbar.classList.add("active");
  }

  handleMouseLeave() {
    if (window.innerWidth < 768) return;
    this.countDown = setTimeout(() => {
      this.navbar.classList.remove("active");
    }, 2000);
  }

  handleMenuClick() {
    if (window.innerWidth < 768) {
      this.nav.classList.toggle("active");
    } else {
      this.navbar.classList.toggle("active");
    }
  }

  handleLinksClick() {
    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth > 768) {
          this.navbar.classList.remove("active");
          return;
        }
        this.nav.classList.remove("active");
      });
    });
  }
  updateOnResize() {
    if (window.innerWidth > 768) {
      this.menuImg.src = this.menuImgSrc[1];
      this.navbar.classList.add("container");
    } else {
      this.menuImg.src = this.menuImgSrc[0];
      this.navbar.classList.remove("container");
    }
  }
}
class Landing {
  constructor() {
    this.section = document.querySelector(".landing");
    this.printUserAge();
  }
  printUserAge() {
    const userAge = document.querySelector("[data-my-age]");
    let birthDate = new Date("2000-07-12:00:00:00").getTime();
    birthDate = Math.round(
      (Date.now() - birthDate) / 1000 / 60 / 60 / 24 / 365
    );
    userAge.textContent = birthDate;
  }
}

const appNavbar = new Navbar();
const landingPage = new Landing();
if (window.innerWidth > 768) appNavbar.navbar.classList.add("active");
// Window Events
window.addEventListener("resize", () => {
  appNavbar.updateOnResize();
});
