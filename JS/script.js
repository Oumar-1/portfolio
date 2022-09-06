// landing canvas global variables

const landingCanvas = document.querySelector("#landing-canvas"),
  landingCtx = landingCanvas.getContext("2d"),
  landingCanvasParent = landingCanvas.parentElement;
let particlesArray = [];

scalableCanvas(landingCanvas, landingCanvasParent);
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

function scalableCanvas(canvas, parent) {
  // make any canvas scalable
  canvas.width = parent.offsetWidth;
  canvas.height = parent.offsetHeight;
  window.addEventListener("resize", () => {
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
  });
}

class Particle {
  constructor(canvas, ctx, x, y, dirX, dirY, color, size, speed) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.dirX = dirX;
    this.dirY = dirY;
    this.speed = speed;
    this.color = color ?? this.randomColor();
    this.size = size;
  }
  randomColor() {
    const colors = ["#32b9cd", "#2894a4", "#1e6f7b", "#144a52", "#0f373e"];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    this.ctx.fill();
  }
}

function createParticles() {
  particlesArray = [];
  let x, y, dirX, dirY;

  // generate randome number between two nums
  let randomNum = (min, max) => Math.random() * max + min;

  // options for ease modifying
  const ballOptions = {
    color: undefined,
    maxSpeed: 0.5,
    minSpeed: 0.1,
    size: () => Math.random() * 5 + 1.5,
    amount: 50,
    bounce: true,
  };
  const connectOptions = {
    color: "#1e6f7b",
    width: 1,
    connect: false,
    connectDistance: 80,
  };

  // initial update method
  if (ballOptions.bounce) {
    x = randomNum(0,Math.random() * landingCanvas.width);
    y = randomNum(0,Math.random() * landingCanvas.height);
    dirX = Math.random() * 1 + -1;
    dirY = Math.random() * 1 + -1;
    Particle.prototype.update = function () {
      if (
        this.y + this.size >= this.canvas.height ||
        this.y - this.size * 2 <= 0
      ) {
        this.dirY *= -1;
        this.speed = randomNum(ballOptions.minSpeed, ballOptions.maxSpeed);
      }
      this.x += this.speed * this.dirX;
      this.y += this.speed * this.dirY;
    };
  } else {
    x = Math.random() * landingCanvas.width;
    y = landingCanvas.height;
    dirX = null;
    dirY = 1;
    Particle.prototype.update = function () {
      if (this.y - this.size >= this.canvas.height) {
        this.y = this.canvas.height + this.size;
        this.speed = randomNum(0.3, 5);
      }
      this.y += this.speed;
    };
  }

  let i = 1;
  while (i <= ballOptions.amount) {
    console.log(x,y)
    particlesArray.push(
      new Particle(
        landingCanvas,
        landingCtx,
        x,
        y,
        dirX,
        dirY,
        ballOptions.color,
        ballOptions.size(),
        randomNum(ballOptions.maxSpeed, ballOptions.minSpeed)
      )
    );
    i++;
  }

  // connect particles methode
  function connectParticles() {
    particlesArray.forEach((ball) => {
      particlesArray.forEach((sibling) => {
        let dx = Math.pow(ball.x - sibling.x, 2);
        let dy = Math.pow(ball.y - sibling.y, 2);
        let d = Math.sqrt(dx + dy);
        if (d <= connectOptions.connectDistance) {
          landingCtx.beginPath();
          landingCtx.moveTo(ball.x, ball.y);
          landingCtx.lineWidth = connectOptions.width;
          landingCtx.strokeStyle = connectOptions.color;
          landingCtx.lineTo(sibling.x, sibling.y);
          landingCtx.stroke();
        }
      });
    });
  }

  function animation() {
    landingCtx.clearRect(0, 0, landingCanvas.width, landingCanvas.height);
    particlesArray.forEach((particle) => {
      particle.update();
      particle.draw();
      if (connectOptions.connect) connectParticles();
    });
    window.requestAnimationFrame(animation);
  }

  animation();
}

createParticles();

const appNavbar = new Navbar();
const landingPage = new Landing();
if (window.innerWidth > 768) appNavbar.navbar.classList.add("active");
// Window Events
window.addEventListener("resize", () => {
  appNavbar.updateOnResize();
  createParticles();
});
