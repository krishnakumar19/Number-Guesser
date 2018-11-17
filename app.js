// Game Values
let min = 1,
    max = 10,
    winningNum = getRandomNumber(min, max),
    guessLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessInput = document.querySelector('#guess-input'),
      guessBtn = document.querySelector('#guess-btn'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Focus the input box
guessInput.focus();

// Play Again
game.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again') {
        window.location.reload();
    }
});

// Listen for guess
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);
    
    // Validate the input
    if(isNaN(guess) || guess < min || guess > max) {
        showMessage(`Please enter the number between ${min} and ${max}`, 'red');
        // Focus the input box
        guessInput.focus();
    } else {
        // Check if won
        if(guess === winningNum) {
            // Game Over - Win
            gameOver(true, `${guess} is correct... You Win`);
        } else {
            // Reduce the guesses left
            guessLeft--;

            if(guessLeft === 0) {
                // Game Over - Lost
                gameOver(false, `Game over... You lost... Correct number: ${winningNum}`);
            } else {
                // Game Continues

                // Change the border color of input
                guessInput.style.borderColor = 'red';
                // Clear input
                guessInput.value = '';
                // Focus the input box
                guessInput.focus();
                // Display message
                showMessage(`${guess} is not correct... Guess left: ${guessLeft}`, 'red');
            }
        }
    }
});

// Game Over
function gameOver(won, msg) {
    let color = won === true ? 'green' : 'red';

    // Disable the input
    guessInput.disabled = true;
    // Change the border color of input
    guessInput.style.borderColor = color;
    // Display message
    showMessage(msg, color);

    // Play Again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// Show Message
function showMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

// Get Random Number
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}