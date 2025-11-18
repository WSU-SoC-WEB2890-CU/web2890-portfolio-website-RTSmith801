document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("mainHeader")
  const desktopNav = document.getElementById("desktopNav")
  const mobileToggle = document.getElementById("mobileMenuToggle")
  const mobileMenu = document.getElementById("mobileMenu")
  const hero = document.getElementById("hero")

  const heroBottom = hero.offsetHeight * 0.9

  // -------------------------
  // MOBILE MENU TOGGLE
  // -------------------------
  mobileToggle.addEventListener("click", () => {
    // console.log("Mobile toggle clicked!")
    mobileMenu.classList.toggle("active")

    // Update ARIA for accessibility
    const expanded = mobileToggle.getAttribute("aria-expanded") === "true"
    mobileToggle.setAttribute("aria-expanded", !expanded)
    if (window.scrollY < heroBottom) {
      if (header.classList.contains("header-transparent")) {
        header.classList.remove("header-transparent")
        header.classList.add("header-solid")
      } else {
        header.classList.add("header-transparent")
        header.classList.remove("header-solid")
      }
    }
  })

  // -------------------------
  // HEADER SCROLL BEHAVIOR
  // -------------------------
  window.addEventListener("scroll", () => {
    if (window.scrollY > heroBottom) {
      header.classList.remove("header-transparent")
      header.classList.add("header-solid")

      desktopNav.classList.remove("invisible-nav")
    } else {
      header.classList.add("header-transparent")
      header.classList.remove("header-solid")

      desktopNav.classList.add("invisible-nav")
    }
  })
})
