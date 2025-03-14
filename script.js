let secretNumber, attempts, maxAttempts, timeLeft, timer;
const difficultySettings = {
    easy: { range: 10, attempts: 5, time: 30 },
    normal: { range: 50, attempts: 7, time: 45 },
    hard: { range: 100, attempts: 10, time: 60 }
};

function startGame() {
    const difficulty = document.getElementById("difficulty").value;
    const settings = difficultySettings[difficulty];

    secretNumber = Math.floor(Math.random() * settings.range) + 1;
    maxAttempts = settings.attempts;
    attempts = 0;
    timeLeft = settings.time;

    document.getElementById("game-area").classList.remove("hidden");
    document.getElementById("feedback").textContent = "";
    document.getElementById("attempts").textContent = `Intentos restantes: ${maxAttempts}`;
    document.getElementById("timer").textContent = `Tiempo: ${timeLeft}s`;

    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function checkGuess() {
    const guess = parseInt(document.getElementById("guess").value);
    if (isNaN(guess)) {
        document.getElementById("feedback").textContent = "Ingresa un número válido.";
        return;
    }

    attempts++;
    const remainingAttempts = maxAttempts - attempts;
    document.getElementById("attempts").textContent = `Intentos restantes: ${remainingAttempts}`;

    if (guess === secretNumber) {
        endGame(true);
    } else if (attempts >= maxAttempts) {
        endGame(false);
    } else {
        document.getElementById("feedback").textContent =
            guess < secretNumber ? "🔼 Muy bajo" : "🔽 Muy alto";
    }
}

function updateTimer() {
    timeLeft--;
    document.getElementById("timer").textContent = `Tiempo: ${timeLeft}s`;

    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame(false);
    }
}

function endGame(won) {
    clearInterval(timer);
    document.getElementById("feedback").textContent = won 
        ? `🎉 ¡Ganaste! El número era ${secretNumber}` 
        : `💀 Perdiste. El número era ${secretNumber}`;
    document.getElementById("feedback").classList.add(won ? "win" : "lose");
}
