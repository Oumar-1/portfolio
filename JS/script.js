const menu = document.querySelector(".menu");
const navLinks = document.querySelector(".nav-links");
const header = document.querySelector("header");
menu.addEventListener("click", () => {
  navLinks.classList.toggle("hide");
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
// resize Event
window.addEventListener("resize", () => {
  changeImg();
  changeClassOnResize(header, "container", window.innerWidth > 768);
});
