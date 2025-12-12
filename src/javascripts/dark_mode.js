import sunIcon from "../icons/sun_icon.png"
import moonIcon from "../icons/moon_icon.png"

document.addEventListener("DOMContentLoaded", function () {
  const toggleButtons = [
    document.getElementById("toggleColorButton"),
    document.getElementById("toggleColorButtonMobile"),
  ]

  let darkMode = false
  const gold = "#E1BC29"
  const goldShadow = `0px 0px 10px 5px ${gold}`

  function isTransparent(bg) {
    if (!bg) return true
    const t = bg.trim().toLowerCase()
    return t === "transparent" || t === "rgba(0, 0, 0, 0)" || t === "rgba(255, 255, 255, 0)"
  }

  function toggleDarkMode() {
    darkMode = !darkMode

    const elements = document.querySelectorAll(".dark_mode_toggle")
    const elements_form = document.querySelectorAll(".dark_mode_input")
    const elements_accent = document.querySelectorAll(".dark_mode_accent")

    // -------------------------------
    // Background elements toggle
    // -------------------------------
    elements.forEach((el) => {
      const computed = window.getComputedStyle(el)
      if (!el.dataset.originalBg) el.dataset.originalBg = computed.backgroundColor
      if (!el.dataset.originalColor) el.dataset.originalColor = computed.color

      el.style.transition = "background-color 0.5s ease, color 0.5s ease"
      el.style.backgroundColor = darkMode ? "#191b1c" : el.dataset.originalBg
      el.style.color = darkMode ? "#fbfbff" : el.dataset.originalColor
    })

    // -------------------------------
    // Form inputs toggle
    // -------------------------------
    elements_form.forEach((el) => {
      const computed = window.getComputedStyle(el)
      if (!el.dataset.originalBg) el.dataset.originalBg = computed.backgroundColor
      if (!el.dataset.originalColor) el.dataset.originalColor = computed.color

      el.style.transition = "background-color 0.5s ease, color 0.5s ease"
      el.style.backgroundColor = darkMode ? "#333333" : el.dataset.originalBg
      el.style.color = darkMode ? "#fbfbff" : el.dataset.originalColor
    })

    // -------------------------------
    // Accent elements toggle
    // -------------------------------
    elements_accent.forEach((el) => {
      const tag = el.tagName.toLowerCase()
      const isRealButton = tag === "button" || el.classList.contains("btn") || el.getAttribute("role") === "button"
      const isImage = tag === "img"
      const computed = window.getComputedStyle(el)
      const hasBackground = !isTransparent(computed.backgroundColor)

      // Save original values
      if (!el.dataset.originalColor) el.dataset.originalColor = computed.color
      if (!el.dataset.originalShadow) el.dataset.originalShadow = computed.boxShadow

      // -------------------------------
      if (darkMode) {
        // Resume button
        if (el.classList.contains("resume_btn")) {
          el.classList.add("dark_resume_btn")
        }
        // Other buttons
        else if (isRealButton) {
          el.classList.add("dark_accent_btn")
        }
        // Images
        else if (isImage) {
          el.style.boxShadow = goldShadow
        }
        // Elements with background but not buttons
        else if (hasBackground) {
          el.style.backgroundColor = gold
          el.style.color = "#000"
        }
        // Text-only accents
        else {
          el.style.color = gold
        }
      } else {
        // Remove dark mode classes for buttons
        if (el.classList.contains("resume_btn")) {
          el.classList.remove("dark_resume_btn")
        }
        if (isRealButton) {
          el.classList.remove("dark_accent_btn")
        }
        // Restore images
        if (isImage && el.dataset.originalShadow) {
          el.style.boxShadow = el.dataset.originalShadow
        }
        // Restore other elements
        if (!isRealButton && !isImage && hasBackground) {
          el.style.backgroundColor = ""
          el.style.color = el.dataset.originalColor
        }
        if (!isRealButton && !isImage && !hasBackground) {
          el.style.color = el.dataset.originalColor
        }
      }
    })

    // -------------------------------
    // Toggle icons
    // -------------------------------
    toggleButtons.forEach((btn) => {
      if (btn) btn.src = darkMode ? moonIcon : sunIcon
    })
  }

  // -------------------------------
  // Attach event listeners
  // -------------------------------
  toggleButtons.forEach((btn) => {
    if (btn) btn.addEventListener("click", toggleDarkMode)
  })
})
