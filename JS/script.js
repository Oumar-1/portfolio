class Header {
  constructor() {
    this.navLinks = document.querySelectorAll(".nav-links li a");
    this.header = document.querySelector("header");
    this.nav = document.querySelector(".nav-links");
    this.menu = document.querySelector(".menu");
    this.menuImg = document.querySelector(".menu img");
    this.menuImgSrc = [
      "../imgs/icons/mob-menu.svg",
      "../imgs/icons/monitor-menu.svg",
    ];
    this.countDown = setTimeout(() => {
      this.header.classList.add("active");
    }, 4000);
    this.initial();
  }
  initial() {
    this.header.addEventListener("mouseenter", () => 
      this.handleMouseEnter()
    );
    this.header.addEventListener("mouseleave", () => 
      this.handleMouseLeave()
    );
    this.menu.addEventListener("click", () => this.handleMenuClick());
    this.handleMenuClick();
    this.updateOnResize();
    this.handleLinksClick();
  }

  handleMouseEnter() {
    if (window.innerWidth < 768) return;
    clearTimeout(this.countDown);
    this.header.classList.add("active");
  }

  handleMouseLeave() {
    if (window.innerWidth < 768) return;
    this.countDown = setTimeout(() => {
      this.header.classList.remove("active");
    }, 2000);
  }

  handleMenuClick() {
    if (window.innerWidth < 768) {
      this.nav.classList.toggle("active");
    } else {
      this.header.classList.toggle("active");
    }
  }

  handleLinksClick() {
    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth > 768) {
          this.header.classList.remove("active");
          return;
        }
        nav.classList.remove("active");
      });
    });
  }

  updateOnResize() {
    if (window.innerWidth > 768) {
      this.menuImg.src = this.menuImgSrc[1];
      this.header.classList.add("container");
    } else {
      this.menuImg.src = this.menuImgSrc[0];
      this.header.classList.remove("container");
    }
  }
}
const header = new Header();

// Window Events
window.addEventListener("resize", () => {
  header.updateOnResize();
});
