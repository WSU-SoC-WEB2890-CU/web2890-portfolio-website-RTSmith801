import sunIcon from "../icons/sun_icon.png"
import moonIcon from "../icons/moon_icon.png"

document.addEventListener("DOMContentLoaded", function () {
  const toggleButtons = [
    document.getElementById("toggleColorButton"),
    document.getElementById("toggleColorButtonMobile"),
  ]

  let darkMode = false

  // shared click handler
  function toggleDarkMode() {
    darkMode = !darkMode

    const elements = document.querySelectorAll(".dark_mode_toggle")
    const elements_form = document.querySelectorAll(".dark_mode_input")

    // Background elements dark mode toggle
    elements.forEach((element) => {
      const computedStyle = window.getComputedStyle(element)

      if (!element.dataset.originalBg) {
        element.dataset.originalBg = computedStyle.backgroundColor
        element.dataset.originalColor = computedStyle.color
      }

      element.style.transition = "background-color 0.5s ease, color 0.5s ease"
      element.style.backgroundColor = darkMode ? "#191b1c" : element.dataset.originalBg
      element.style.color = darkMode ? "#fbfbff" : element.dataset.originalColor
    })

    // Contact form input dark mode toggle
    elements_form.forEach((element) => {
      const computedStyle = window.getComputedStyle(element)

      if (!element.dataset.originalBg) {
        element.dataset.originalBg = computedStyle.backgroundColor
        element.dataset.originalColor = computedStyle.color
      }

      element.style.transition = "background-color 0.5s ease, color 0.5s ease"
      element.style.backgroundColor = darkMode ? "#333333" : element.dataset.originalBg
      element.style.color = darkMode ? "#fbfbff" : element.dataset.originalColor
    })

    // Update BOTH icons
    toggleButtons.forEach((btn) => {
      if (btn) {
        btn.src = darkMode ? moonIcon : sunIcon
      }
    })
  }

  // Attach the same event listener to both
  toggleButtons.forEach((btn) => {
    if (btn) btn.addEventListener("click", toggleDarkMode)
  })
})
