import sunIcon from "../icons/sun_icon.png"
import moonIcon from "../icons/moon_icon.png"

document.addEventListener("DOMContentLoaded", function () {
  const toggleButtons = [
    document.getElementById("toggleColorButton"),
    document.getElementById("toggleColorButtonMobile"),
  ]

  let darkMode = false
  const gold = "#E1BC29"
  const goldShadow = "0px 0px 10px 5px " + gold

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
      if (!el.dataset.originalBg) {
        el.dataset.originalBg = computed.backgroundColor
        el.dataset.originalColor = computed.color
      }
      el.style.transition = "background-color 0.5s ease, color 0.5s ease"
      el.style.backgroundColor = darkMode ? "#191b1c" : el.dataset.originalBg
      el.style.color = darkMode ? "#fbfbff" : el.dataset.originalColor
    })

    // -------------------------------
    // Form inputs toggle
    // -------------------------------
    elements_form.forEach((el) => {
      const computed = window.getComputedStyle(el)
      if (!el.dataset.originalBg) {
        el.dataset.originalBg = computed.backgroundColor
        el.dataset.originalColor = computed.color
      }
      el.style.transition = "background-color 0.5s ease, color 0.5s ease"
      el.style.backgroundColor = darkMode ? "#333333" : el.dataset.originalBg
      el.style.color = darkMode ? "#fbfbff" : el.dataset.originalColor
    })

    // -------------------------------
    // Accent elements toggle
    // -------------------------------
    elements_accent.forEach((el) => {
      const computed = window.getComputedStyle(el)
      const tag = el.tagName.toLowerCase()
      const isRealButton = tag === "button" || el.classList.contains("btn") || el.getAttribute("role") === "button"
      const isImage = tag === "img"
      const hasBackground = !isTransparent(computed.backgroundColor)

      // Save original values if not already saved
      if (!el.dataset.originalBg) el.dataset.originalBg = computed.backgroundColor
      if (!el.dataset.originalColor) el.dataset.originalColor = computed.color
      if (!el.dataset.originalBorder) el.dataset.originalBorder = computed.borderColor
      if (!el.dataset.originalShadow) el.dataset.originalShadow = computed.boxShadow

      el.style.transition = "background-color 0.3s, color 0.3s, border-color 0.3s, box-shadow 0.3s"

      if (darkMode) {
        // -------------------------------
        // Special case: resume_btn
        // -------------------------------
        if (el.classList.contains("resume_btn")) {
          el.style.backgroundColor = "#000"
          el.style.color = gold
          el.style.borderColor = "#000"

          el.onmouseenter = () => {
            el.style.backgroundColor = gold
            el.style.color = "#000"
            el.style.borderColor = "#000"
          }
          el.onmouseleave = () => {
            el.style.backgroundColor = "#000"
            el.style.color = gold
            el.style.borderColor = "#000"
          }
        }
        // -------------------------------
        // Other buttons
        // -------------------------------
        else if (isRealButton) {
          el.style.backgroundColor = "transparent"
          el.style.color = gold
          el.style.borderColor = gold

          el.onmouseenter = () => {
            el.style.backgroundColor = gold
            el.style.color = "#000"
          }
          el.onmouseleave = () => {
            el.style.backgroundColor = "transparent"
            el.style.color = gold
          }
        }
        // -------------------------------
        // Images
        // -------------------------------
        else if (isImage) {
          el.style.boxShadow = goldShadow
        }
        // -------------------------------
        // Elements with background
        // -------------------------------
        else if (hasBackground) {
          el.style.backgroundColor = gold
          el.style.color = "#000"
        }
        // -------------------------------
        // Text-only accents
        // -------------------------------
        else {
          el.style.color = gold
        }
      } else {
        // -------------------------------
        // Restore original light mode
        // -------------------------------
        el.style.backgroundColor = el.dataset.originalBg
        el.style.color = el.dataset.originalColor
        el.style.borderColor = el.dataset.originalBorder
        el.onmouseenter = null
        el.onmouseleave = null

        if (isImage) {
          el.style.boxShadow = el.dataset.originalShadow
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
