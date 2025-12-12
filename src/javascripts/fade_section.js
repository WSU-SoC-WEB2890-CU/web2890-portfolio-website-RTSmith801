document.addEventListener("DOMContentLoaded", function () {
  const fadeSections = document.querySelectorAll(".fade-section")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in")
          observer.unobserve(entry.target) // Stops observing once faded in
        }
      })
    },
    { threshold: 0.25 } // Trigger when 25% of the section is visible
  )

  fadeSections.forEach((section) => observer.observe(section))
})
