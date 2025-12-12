import sunIcon from "../icons/sun_icon.png"
import moonIcon from "../icons/moon_icon.png"

document.addEventListener("DOMContentLoaded", function () {
  const toggleButtons = [
    document.getElementById("toggleColorButton"),
    document.getElementById("toggleColorButtonMobile"),
  ]

  let darkMode = false

  function isTransparent(bg) {
    if (!bg) return true
    const t = bg.trim().toLowerCase()
    return t === "transparent" || t === "rgba(0, 0, 0, 0)"
  }

  /** -----------------------------------------------------
   *  STEP 1 — SAVE ORIGINAL COLORS AT PAGE LOAD
   * ---------------------------------------------------- */
  function saveOriginalStyles() {
    const all = document.querySelectorAll(".dark_mode_toggle, .dark_mode_input, .dark_mode_accent")

    all.forEach((el) => {
      const computed = getComputedStyle(el)
      el.dataset.originalBg = computed.backgroundColor
      el.dataset.originalColor = computed.color
      el.dataset.originalBorder = computed.borderColor
    })
  }
  saveOriginalStyles()

  /** -----------------------------------------------------
   *  STEP 2 — MAIN DARK MODE TOGGLE
   * ---------------------------------------------------- */
  function toggleDarkMode() {
    darkMode = !darkMode

    const elements_toggle = document.querySelectorAll(".dark_mode_toggle")
    const elements_form = document.querySelectorAll(".dark_mode_input")
    const elements_accent = document.querySelectorAll(".dark_mode_accent")

    /* ------------------------
       Background panels
    ------------------------- */
    elements_toggle.forEach((el) => {
      el.style.transition = "background-color 0.5s ease, color 0.5s ease"
      el.style.backgroundColor = darkMode ? "#191b1c" : el.dataset.originalBg
      el.style.color = darkMode ? "#fbfbff" : el.dataset.originalColor
    })

    /* ------------------------
       Form Inputs
    ------------------------- */
    elements_form.forEach((el) => {
      el.style.transition = "background-color 0.5s ease, color 0.5s ease"
      el.style.backgroundColor = darkMode ? "#333" : el.dataset.originalBg
      el.style.color = darkMode ? "#fbfbff" : el.dataset.originalColor
    })

    /* ------------------------
       Accent Elements
       (buttons, text accents, images with shadows)
    ------------------------- */
    elements_accent.forEach((el) => {
      const computed = getComputedStyle(el)
      const tag = el.tagName.toLowerCase()

      const isRealButton = tag === "button" || el.classList.contains("btn") || el.getAttribute("role") === "button"

      const hasBackground = !isTransparent(computed.backgroundColor)
      const isImage = tag === "img"

      const gold = "#E1BC29"
      const originalShadow = "0px 0px 10px 5px #0a66c2"
      const goldShadow = `0px 0px 10px 5px ${gold}`

      // Save shadow once
      if (!el.dataset.originalShadow) {
        el.dataset.originalShadow = computed.boxShadow !== "none" ? computed.boxShadow : originalShadow
      }

      if (darkMode) {
        el.style.transition = "background-color 0.3s, color 0.3s, border-color 0.3s, box-shadow 0.3s"

        if (isRealButton) {
          // base dark mode
          el.style.backgroundColor = "transparent"
          el.style.color = gold
          el.style.borderColor = gold

          // hover rules
          el.onmouseenter = () => {
            el.style.backgroundColor = gold
            el.style.color = "#000"
          }
          el.onmouseleave = () => {
            el.style.backgroundColor = "transparent"
            el.style.color = gold
          }
        } else if (isImage) {
          // IMG shadow mode (your new rule)
          el.style.boxShadow = goldShadow
        } else if (hasBackground) {
          el.style.backgroundColor = gold
          el.style.color = "#000"
        } else {
          el.style.color = gold
        }
      } else {
        /** -------------------------------------------
         * RESTORE ORIGINAL (LIGHT MODE)
         * -------------------------------------------
         */
        el.style.backgroundColor = el.dataset.originalBg
        el.style.color = el.dataset.originalColor
        el.style.borderColor = el.dataset.originalBorder

        // remove hover JS handlers
        el.onmouseenter = null
        el.onmouseleave = null

        // remove inline styles to restore CSS hover behavior
        el.style.removeProperty("background-color")
        el.style.removeProperty("color")
        el.style.removeProperty("border-color")

        // restore shadow for images
        if (isImage) {
          el.style.boxShadow = el.dataset.originalShadow
        }
      }
    })

    /* ------------------------
       Update Icons
    ------------------------- */
    toggleButtons.forEach((btn) => {
      if (btn) btn.src = darkMode ? moonIcon : sunIcon
    })
  }

  toggleButtons.forEach((btn) => {
    if (btn) btn.addEventListener("click", toggleDarkMode)
  })
})
