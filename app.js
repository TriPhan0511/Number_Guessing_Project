/*
GAME FUNCTION:
- Player must guess a number between a min and max.
- Player gets a certain amount of guesses.
- Notify player of guesses remaining.
- Notify the player of the correct answer if loose
- Let player choose to play again.
*/

// Game values
const min = 1;
const max = 10;
const winningNumber = getRandomIntInclusive(min, max);
console.log(`Winning number: ${winningNumber}`); // TESTING
let remainingGuesses = 3;
let playAgain = false;

// UI elements
const guessInput = document.querySelector('#guess-input');
const guessButton = document.querySelector('#guess-button');
const messagePara = document.querySelector('#message');
const minNumber = document.querySelector('.min-number');
const maxNumber = document.querySelector('.max-number');

// Assign text for minNumber and maxNumber UI
minNumber.textContent = min;
maxNumber.textContent = max;

// Listen for guess button
guessButton.addEventListener('click', () => {
  if (playAgain) {
    window.location.reload(); // Load the page
  }
  // Get value from input
  const guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}.`, 'red');
    guessInput.style.borderColor = 'red';
    guessInput.focus();
  } else {
    remainingGuesses--;
    if (guess === winningNumber) {
      // Game over - won
      gameOver(`Congratulation, you won! ${winningNumber} is the correct number.`, true);
    } else if (remainingGuesses === 0) {
      // Game over - lost
      gameOver(`You lost! The winning number was ${winningNumber}.`, false);
    } else {
      // Game continues - wrong number
      setMessage(`Wrong choice! You still have ${remainingGuesses} remaining guess.`, 'red');
      guessInput.style.borderColor = 'red';
      guessInput.value = '';
      guessInput.focus();
    }
  }
});

// Game over
function gameOver(msg, won) {
  const color = won ? 'green' : 'red';
  // Disable input
  guessInput.disabled = true;
  // Change border color of input
  guessInput.style.borderColor = color;
  // Set message
  setMessage(msg, color);
  // Change value of button
  guessButton.value = 'Play again';
  // Change playAgain
  playAgain = true;
}

// Set message
function setMessage(msg, color) {
  messagePara.textContent = msg;
  messagePara.style.color = color;
}

// Get a random integer between two values, inclusive
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
