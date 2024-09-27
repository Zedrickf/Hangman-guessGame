let selectedWord = '';
let attempts = 6;
let guessedLetters = [];
let correctLetters = [];

function initGame() {
    guessedLetters = [];
    correctLetters = [];
    attempts = 6;
    updateDisplay();
}

function updateDisplay() {
    const wordDisplay = selectedWord.split('').map(letter => (correctLetters.includes(letter) ? letter : '_')).join(' ');
    document.getElementById('word').innerText = wordDisplay;
    document.getElementById('attempts').innerText = `Intentos restantes: ${attempts}`;
    document.getElementById('message').innerText = '';
    document.getElementById('guessedLetters').innerText = `Letras intentadas: ${guessedLetters.join(', ')}`; // Mostrar letras intentadas
}

function makeGuess() {
    const guessInput = document.getElementById('guess');
    const guess = guessInput.value.toLowerCase();

    if (guess && !guessedLetters.includes(guess)) {
        guessedLetters.push(guess); // Agregar letra a las intentadas
        updateDisplay(); // Actualizar visualización antes de procesar el intento

        if (selectedWord.includes(guess)) {
            correctLetters.push(guess);
            if (selectedWord.split('').every(letter => correctLetters.includes(letter))) {
                document.getElementById('message').innerText = '¡Ganaste!';
                document.getElementById('submit').disabled = true; // Deshabilitar botón
            }
        } else {
            attempts--;
            if (attempts === 0) {
                document.getElementById('message').innerText = `Perdiste. La palabra era: ${selectedWord}`;
                document.getElementById('submit').disabled = true; // Deshabilitar botón
            }
        }
    }

    guessInput.value = '';
    updateDisplay(); // Actualizar visualización después de procesar el intento
}

function startGame() {
    const wordInput = document.getElementById('wordInput');
    selectedWord = wordInput.value.toLowerCase().trim();

    if (selectedWord) {
        document.getElementById('setup').style.display = 'none';
        document.getElementById('gameArea').style.display = 'block';
        initGame();
    } else {
        alert('Por favor, introduce una palabra válida.');
    }
}

document.getElementById('startGame').addEventListener('click', startGame);
document.getElementById('submit').addEventListener('click', makeGuess);
