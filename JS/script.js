const menu = document.querySelector(".menu");
const navLinksUl = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links li a");
const header = document.querySelector("header");

let headerCountDown = setTimeout(() => {
  header.classList.add("hide");
}, 4000);

header.addEventListener("mousemove", () => {
  header.classList.remove("hide");
  clearTimeout(headerCountDown);
});
menu.addEventListener("click", () => {
  header.classList.add("hide");
  navLinksUl.classList.toggle("hide");
});
menu.addEventListener("mouseleave", () => {
  headerCountDown = setTimeout(() => {
    header.classList.add("hide");
  }, 2000);
});

function changeImg() {
  const img = document.querySelector(".menu img");
  let src1 = "../imgs/icons/menu.svg";
  let src2 = "../imgs/icons/head-arrow-down.svg";

  if (window.innerWidth < 768) {
    if (location.origin + src1.slice(2) === img.src) return;
    img.src = src1;
  } else {
    if (location.origin + src2.slice(2) === img.src) return;
    img.src = src2;
  }
}
changeImg();
function changeClassOnResize(element, className, condition) {
  if (condition) {
    element.classList.add(className);
  } else {
    element.classList.remove(className);
  }
}
changeClassOnResize(header, "container", window.innerWidth > 768);

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinksUl.classList.add("hide");
    if (window.innerWidth > 768) {
      header.classList.add("hide");
    }
  });
});
// Window Events
window.addEventListener("resize", () => {
  changeImg();
  changeClassOnResize(header, "container", window.innerWidth > 768);
});
