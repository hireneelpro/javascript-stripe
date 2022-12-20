import sublinks from "./data.js";
const get = (selection) => {
  const element = document.querySelector(selection);
  if (!element) {
    throw new Error("no element selected");
  } else {
    return element;
  }
};
const menu = get(".menu-bar");

const sidebarCenter = get(".sidebar-center");
const sidebar = get(".sidebar");
const sidebarClose = get(".sidebar-close");
const hero = get(".hero")
const nav = get(".nav")
// ===== sidebar =====

sidebarCenter.innerHTML = sublinks
  .map((each) => {
    return `
    <article class="sub-links">
    <h4 class="sub-link-title">${each.page}</h4>
          <div class="links">
           ${each.links
        .map((link) => {
          return `<a href="${link.url}">
              <i class="${link.icon}"></i>
              <span class="link-label">${link.label}</span>
            </a>`;
        })
        .join("")}
          </div>
          </article>
          `;
  })
  .join("");
menu.addEventListener("click", () => {
  sidebar.classList.add("show");
  menu.style.opacity = 0;
});
sidebarClose.addEventListener("click", () => {
  sidebar.classList.remove("show");
  menu.style.opacity = 1;
});
// ===== dropdown link ===== //
const linkContainer = get(".link-container");
const dropdownLink = get(".dropdown-link");
const navLinks = [...document.querySelectorAll(".nav-link")];
navLinks.forEach((each) => {
  each.addEventListener("mouseover", (e) => {
    const text = e.currentTarget.textContent;
    const position = e.currentTarget.getBoundingClientRect();
    // console.log(position);
    const center = (position.left + position.right) / 2;
    const bottom = position.bottom -16;
    dropdownLink.style.left = `${center}px`;
    dropdownLink.style.top = `${bottom}px`;
    dropdownLink.classList.add("show-dropdown");

    // ===
    const x = sublinks.find((item) => {
      return item.page === text;
    });
    // console.log(x);
    // ===

    dropdownLink.innerHTML = ` <h4>${text}</h4>
  <ul class="link-container">
    
    ${x.links
      .map((link) => {
        return `
        <a href="${link.url}">
        <i class="${link.icon}"></i>
        <span class="link-label">${link.label}</span>
        </a>`
      })
      .join("")}
      </ul> ` 
    
  });
});
hero.addEventListener("mouseover", () => {
  dropdownLink.classList.remove("show-dropdown")
})
nav.addEventListener("mouseover", (e) => {
  console.log(e.target);

  if (!e.target.classList.contains("nav-link")) {
    
    dropdownLink.classList.remove("show-dropdown");
  }

})



