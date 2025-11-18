document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".toggle-gif").forEach(img => {
        img.addEventListener("click", function() {
            const currentSrc = this.getAttribute('src');
            const staticSrc = this.dataset.static;
            const gifSrc = this.dataset.gif;
            this.setAttribute('src', currentSrc === staticSrc ? gifSrc : staticSrc);
        });
    });
});