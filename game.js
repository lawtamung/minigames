// Initialize the random number
let randomNumber = generateRandomNumber();

// Initialize remaining guesses
let remainingGuesses = 10;

// Initialize the secret word
const secretWord = 'paramat promwichai';
let revealedCharacters = ''; // Characters revealed so far

// Flag to track if hint has been revealed
let hintRevealed = false;

// Function to generate a random number between 1 and 100
function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

// Function to save wins count to local storage
function saveWinsCount(count) {
    localStorage.setItem('winsCount', count);
}

// Function to load wins count from local storage
function loadWinsCount() {
    return parseInt(localStorage.getItem('winsCount')) || 0;
}

// Function to initialize wins count
function initializeWinsCount() {
    const winsCount = loadWinsCount();
    document.getElementById('wins').textContent = `Wins: ${winsCount}`;
}

// Function to increment wins count
function incrementWinsCount() {
    const winsCount = loadWinsCount() + 2;
    saveWinsCount(winsCount);
    document.getElementById('wins').textContent = `Wins: ${winsCount}`;
}

// Function to reset wins count
function resetWinsCount() {
    saveWinsCount(0);
    document.getElementById('wins').textContent = `Wins: 0`;
}

// Function to reset the game
function resetGame() {
    // Reset remaining guesses
    remainingGuesses = 10;
    document.getElementById('remaining').textContent = `Remaining Guesses: ${remainingGuesses}`;

    // Generate a new random number
    randomNumber = generateRandomNumber();

    // Reset revealed characters
    revealedCharacters = '';

    // Clear message
    document.getElementById('message').textContent = '';

    // Enable input
    document.getElementById('guess').disabled = false;
    document.querySelector('button').disabled = false;

    // Reset hint flag
    hintRevealed = false;
}

// Function to reveal a hint
function revealHint() {
    // Check if player has enough wins to reveal hint
    if (loadWinsCount() >= 1) {
        // Deduct 1 win from the total
        const winsCount = loadWinsCount() - 1;
        saveWinsCount(winsCount);
        document.getElementById('wins').textContent = `Wins: ${winsCount}`;

        // Get the message element
        const messageElement = document.getElementById('message');

        // Check if there are characters left to reveal in the secret word
        if (revealedCharacters.length < secretWord.length) {
            // Reveal the next character in the secret word
            const nextCharacter = secretWord.charAt(revealedCharacters.length);
            revealedCharacters += nextCharacter;
            messageElement.textContent = `Hint: ${revealedCharacters}`;
        } else {
            messageElement.textContent = `Hint: ${secretWord}`;
        }

        // Set hint revealed flag to true
        hintRevealed = true;
    } else {
        // Inform player if they don't have enough wins
        document.getElementById('message').textContent = "You don't have enough wins to reveal the hint.";
    }
}

// Function to check the user's guess
function checkGuess() {
    // Get the user's guess from the input field
    const userGuess = parseInt(document.getElementById('guess').value);

    // Get the message element
    const messageElement = document.getElementById('message');

    // Check if the user's guess is correct
    if (userGuess === randomNumber) {
        messageElement.textContent = 'Congratulations! You guessed the correct number.';

        // Reveal hint if it hasn't been revealed yet
        if (!hintRevealed) {
            revealHint();
        }

        // Increment wins count
        incrementWinsCount();

        // Start a new game
        resetGame();
        return;
    } else {
        // Provide feedback to the user
        if (userGuess < randomNumber) {
            messageElement.textContent = 'Too low! Guess higher.';
        } else {
            messageElement.textContent = 'Too high! Guess lower.';
        }

        // Decrement remaining guesses
        remainingGuesses--;

        // Check if the user has run out of guesses
        if (remainingGuesses === 0) {
            messageElement.textContent = `Game over! The correct number was: ${randomNumber}`;
            resetGame();
            return;
        }
    }

    // Clear the input field
    document.getElementById('guess').value = '';

    // Update remaining guesses display
    document.getElementById('remaining').textContent = `Remaining Guesses: ${remainingGuesses}`;
}

// Initialize remaining guesses display
document.getElementById('remaining').textContent = `Remaining Guesses: ${remainingGuesses}`;

// Initialize wins count display
initializeWinsCount();
