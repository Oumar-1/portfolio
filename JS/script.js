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
  // options for ease modifying
  const ballOptions = {
    color: "#32b9cd",
    /*put undefined to genearate random color from the array of colors in the particle prototype*/
    minSpeed: 1,
    maxSpeed: 1,
    size: () => Math.random() * 0.5 + 1.5,
    amount: 100,
    bounce: true,
    wait: false,
  };
  const connectOptions = {
    color: "#1e6f7b",
    width: 1,
    connect: true,
    connectDistance: 80,
  };

  // generate randome number between two nums
  let randomNum = (min, max) => Math.random() * max + min;
  initialParticles(ballOptions.amount);
  // create particles loop
  function initialParticles(amount) {
    particlesArray = [];

    let i = 1;
    while (i <= amount) {
      // i put this condition here instead of outside to give each particle unique position
      let x,
        y,
        dirX,
        dirY,
        size = ballOptions.size();

      if (ballOptions.bounce) {
        x = Math.random() * landingCanvas.width;
        y = Math.random() * landingCanvas.height;
        dirX = Math.random() * 1 + -1;
        dirY = Math.random() * 1 + -1;
      } else {
        x = Math.random() * landingCanvas.width;
        y = landingCanvas.height + Math.random() * 500;
        dirX = undefined;
        dirY = 1;
      }
      // create the particles
      particlesArray.push(
        new Particle(
          landingCanvas,
          landingCtx,
          x,
          y + size * 2,
          dirX,
          dirY,
          ballOptions.color,
          ballOptions.size(),
          randomNum(ballOptions.minSpeed, ballOptions.maxSpeed)
        )
      );
      i++;
    }
  }

  // initial update method
  if (ballOptions.bounce) {
    Particle.prototype.update = function () {
      if (
        this.x + this.size >= this.canvas.height ||
        this.x - this.size * 2 <= 0
      ) {
        this.dirX *= -1;
        this.speed = randomNum(ballOptions.minSpeed, ballOptions.maxSpeed);
      }
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
    Particle.prototype.update = function () {
      if (this.y + this.size <= 0) {
        this.y = this.canvas.height + this.size;
        this.x = Math.random() * this.canvas.width;
        randomNum(ballOptions.minSpeed, ballOptions.maxSpeed);
      }
      this.y -= this.speed;
    };
  }

  function animation() {
    if (ballOptions.wait) {
      setTimeout(() => {
        window.requestAnimationFrame(animation);
      }, 3000);
      ballOptions.wait = false;
      particlesArray.forEach((particle) => {
        particle.draw();
      });
      return;
    }
    // landingCtx.clearRect(0, 0, landingCanvas.width, landingCanvas.height);

    landingCtx.beginPath();
    landingCtx.rect(0, 0, landingCanvas.width, landingCanvas.height);
    landingCtx.fillStyle = "rgba(0,0,0,0.15)";
    landingCtx.fill();

    particlesArray.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    window.requestAnimationFrame(animation);
  }
  animation();

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
}
createParticles();

const appNavbar = new Navbar();
const landingPage = new Landing();
if (window.innerWidth > 768) appNavbar.navbar.classList.add("active");
// Window Events
window.addEventListener("resize", () => {
  appNavbar.updateOnResize();
});
