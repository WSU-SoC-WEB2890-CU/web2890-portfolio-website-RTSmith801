document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("mainHeader")
  const desktopNav = document.getElementById("desktopNav")
  const mobileToggle = document.getElementById("mobileMenuToggle")
  const mobileMenu = document.getElementById("mobileMenu")
  const hero = document.getElementById("hero")

  // Detect whether hero exists
  const hasHero = !!hero
  const heroBottom = hasHero ? hero.offsetHeight * 0.9 : null

  // If there's *no* hero, force header solid style once
  if (!hasHero) {
    header.classList.add("header-solid")
    header.classList.remove("header-transparent")
  }

  // -------------------------
  // MOBILE MENU TOGGLE
  // -------------------------
  mobileToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")

    const expanded = mobileToggle.getAttribute("aria-expanded") === "true"
    mobileToggle.setAttribute("aria-expanded", !expanded)

    // Only toggle transparency if hero exists
    if (hasHero && window.scrollY < heroBottom) {
      header.classList.toggle("header-transparent")
      header.classList.toggle("header-solid")
    }
  })

  // -------------------------
  // HEADER SCROLL BEHAVIOR
  // -------------------------
  if (hasHero) {
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
  }
})
