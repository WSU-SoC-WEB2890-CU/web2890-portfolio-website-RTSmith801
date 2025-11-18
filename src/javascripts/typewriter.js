// Select the element where the phrase is passed in via data attribute
const typewriterElement = document.getElementById('typewriter-output');

// Get the phrase from the data attribute
const phrase = typewriterElement.getAttribute('data-phrase');

// Split phrase into words
const words = phrase.split(" ");
const lastWord = words.pop(); // Extract last word
const mainText = words.join(" ") + (words.length > 0 ? " " : ""); // Rejoin remaining words with spacing

let index = 0;
let typingLastWord = false;
let lastWordIndex = 0;

// Create a div for the last word (for styling)
const lastWordDiv = document.createElement('div');
lastWordDiv.classList.add('styled-last-word'); // Add styling class

// Function to simulate typewriter effect
function typeWriterEffect() {
    if (!typingLastWord) {
        // Typing the main text first
        if (index < mainText.length) {
            typewriterElement.textContent += mainText[index];
            index++;
            setTimeout(typeWriterEffect, 100);
        } else {
            // Switch to typing the last word in the styled div
            typingLastWord = true;
            typewriterElement.appendChild(lastWordDiv);
            typeWriterEffect();
        }
    } else {
        // Typing the last word inside its div
        if (lastWordIndex < lastWord.length) {
            lastWordDiv.textContent += lastWord[lastWordIndex];
            lastWordIndex++;
            setTimeout(typeWriterEffect, 75);
        } else {
            // Once typing is finished, start blinking the cursor
            typewriterElement.classList.add('cursor');
        }
    }
}

// Start the typing effect
typeWriterEffect();