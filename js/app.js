let selectedWord = '';
let attempts = 2;
let guessedLetters = [];
let correctLetters = [];
const button = document.getElementById('changeC');
let isInverted = false; // Estado para verificar si los colores están invertidos
 
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
    attempts = 2;
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
 
    if (guess && !guessedLetters.includes(guess)) {
        guessedLetters.push(guess); // Agregar letra a las intentadas
        updateDisplay(); // Actualizar visualización antes de procesar el intento
 
        if (selectedWord.includes(guess)) {
            correctLetters.push(guess);
            if (selectedWord.split('').every(letter => correctLetters.includes(letter))) {
                document.getElementById('message').style.display = 'block';
                document.getElementById('message').innerText = '¡Ganaste!';
                document.getElementById('submit').disabled = true; // Deshabilitar botón
            }
        } else {
            attempts--;
            if (attempts === 0) {
                document.getElementById('message').style.display = 'block';
                document.getElementById('message').innerText = `Perdiste. La palabra era: ${selectedWord}`;
                document.getElementById('submit').style.cursor = 'not-allowed';
                document.getElementById('submit').disabled = true; // Deshabilitar botón
            }
        }
    }
 
    guessInput.value = '';
    updateDisplay(); // Actualizar visualización después de procesar el intento
}
 
//Funcion para cambiar el color de la pagina cuando se da clic

 
//Cuando el jugador hace clic en el botón de inicio (startGame), se llama a la función startGame.
document.getElementById('startGame').addEventListener('click', startGame);
//Cuando el jugador hace clic en el botón de enviar (submit), se llama a la función makeGuess
document.getElementById('submit').addEventListener('click', makeGuess);

button.addEventListener('click', () => {
    const body = document.getElementById('bodyCode');
    const containerDivs = document.querySelectorAll('.container__div, .container__div--second');
    
    if (!isInverted) {
        body.style.backgroundColor = 'black';
        body.style.color = 'white';
        containerDivs.forEach(div => {
            div.style.border = '1px solid white'; // Cambia el color del borde
        });
        button.style.backgroundColor = 'black'; // Cambia el color del botón
        button.style.border = '4px solid white'; // Cambia el borde del botón
    } else {
        body.style.backgroundColor = 'var(--whiteC)';
        body.style.color = 'var(--txtColor)';
        containerDivs.forEach(div => {
            div.style.border = '1px solid black'; // Regresa al color original
        });
        button.style.backgroundColor = 'var(--whiteC)'; // Regresa el color del botón
        button.style.border = '4px solid var(--txtColor)'; // Regresa el borde del botón
    }
    isInverted = !isInverted; // Alternar el estado
});