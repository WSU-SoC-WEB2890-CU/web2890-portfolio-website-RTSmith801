document.addEventListener("DOMContentLoaded", () => {
    // Select all <details> elements on the page
    const detailsElements = document.querySelectorAll("details");

    // Add event listeners to handle toggling
    detailsElements.forEach(details => {
        details.addEventListener("toggle", () => {
            if (details.open) {
                // Close all other <details> elements
                detailsElements.forEach(otherDetails => {
                    if (otherDetails !== details) {
                        otherDetails.open = false;
                    }
                });
            }
        });
    });
});