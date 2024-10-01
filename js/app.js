let selectedWord = '';
let attempts = 4;
let guessedLetters = [];
let correctLetters = [];
const toggleModeButton = document.getElementById('changeC');
const body = document.getElementById('bodyCode');


/*
Se llama a la funcion "startGame" cuando el usuario da clic al boton
"iniciar juego" luego de que el usuario escribe la palabra a adivinar
en el text area
*/
function startGame() {
    const wordInput = document.getElementById('wordInput');
    selectedWord = wordInput.value.toLowerCase().trim();
 
    if (selectedWord) {
        document.getElementById('setup').style.display = 'none';
        document.getElementById('gameArea').style.display = 'flex';
        initGame();
    } else {
        alert('Por favor, introduce una palabra válida.');
    }
}
 
/*
Se llama esta funcion desde la funcion "startGame" para limpiar toda la
informacion en pantalla
*/
function initGame() {
    guessedLetters = [];
    correctLetters = [];
    attempts = 4;
    updateDisplay();
}
 
/*
Se llama a esta funcion desde "initGame" para actualizar la informacion
en pantalla con la nueva informacion luego de que se haga un intento
*/
function updateDisplay() {
    const wordDisplay = selectedWord.split('').map(letter => (correctLetters.includes(letter) ? letter : '_')).join(' ');
    document.getElementById('word').innerText = wordDisplay;
    document.getElementById('attempts').innerText = `Intentos restantes: ${attempts}`;
    document.getElementById('guessedLetters').innerText = `Letras intentadas: ${guessedLetters.join(', ')}`; // Mostrar letras intentadas
}
 
/*
Cuando el jugador introduce una letra y hace clic en el botón de enviar,
se ejecuta la función, y se llama a la funcion "updateDisplay" para
actualizar la pantalla
*/
function makeGuess() {
    const guessInput = document.getElementById('guess');
    const guess = guessInput.value.toLowerCase();
    const container = document.querySelector('.container');
    
    if (guess && !guessedLetters.includes(guess)) {
        guessedLetters.push(guess); // Agregar letra a las intentadas
        updateDisplay(); // Actualizar visualización antes de procesar el intento

        if (selectedWord.includes(guess)) {
            correctLetters.push(guess);
            // Cambiar el borde a verde si acierta
            container.style.borderColor = 'var(--greenC)';
            if (selectedWord.split('').every(letter => correctLetters.includes(letter))) {
                document.getElementById('message').style.display = 'block';
                document.getElementById('message').style.color = 'var(--greenC)';
                document.getElementById('message').innerText = '¡Ganaste!';
                document.getElementById('submit').disabled = true; // Deshabilitar botón
            }
        } else {
            attempts--;
            // Cambiar el borde a rojo si falla
            container.style.borderColor = 'var(--redC)';
            if (attempts === 0) {
                document.getElementById('message').style.display = 'block';
                document.getElementById('message').style.color = 'var(--redC)';
                document.getElementById('message').innerText = `Perdiste. La palabra era: ${selectedWord}`;
                document.getElementById('submit').style.cursor = 'not-allowed';
                document.getElementById('submit').disabled = true; // Deshabilitar botón
            }
        }

        // Volver al color original después de un pequeño retraso
        setTimeout(() => {
            container.style.borderColor = 'var(--borderColor)';
        }, 700);
    }

    guessInput.value = '';
    updateDisplay(); // Actualizar visualización después de procesar el intento
}
 
//Funcion para cambiar el color de la pagina cuando se da clic

 
//Cuando el jugador hace clic en el botón de inicio (startGame), se llama a la función startGame.
document.getElementById('startGame').addEventListener('click', startGame);
//Cuando el jugador hace clic en el botón de enviar (submit), se llama a la función makeGuess
document.getElementById('submit').addEventListener('click', makeGuess);

/*
Cambia el color de varios elementos de la pagina cuando el boton es presionado
*/
toggleModeButton.addEventListener('click', () => {
    body.classList.toggle('darkMode'); // Alterna entre modo claro y oscuro
});

