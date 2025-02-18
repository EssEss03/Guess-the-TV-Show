// Select the background music element
let bgMusic = document.getElementById("bgMusic");

// ✅ Play background music when the homepage loads
window.addEventListener("load", function () {
    bgMusic.volume = 0.5; // Adjust volume level if needed
    bgMusic.play().catch(error => console.log("Autoplay blocked:", error));
});

// Wait for the "Start Game" button click
document.getElementById("startGame").addEventListener("click", function () {
    document.getElementById("home-screen").style.display = "none"; // Hide homepage
    document.getElementById("game-screen").style.display = "block"; // Show the game

    // ✅ Stop background music
    bgMusic.pause();
    bgMusic.currentTime = 0;

    // ✅ Now that the game has started, fetch the first TV show
    fetchRandomShow();
});

let currentShow = "";
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let hintIndex = 0;
let timer;
const timeLimit = 15; // Time limit in seconds

document.getElementById("highScore").textContent = highScore;

// Fetch a random TV show
async function fetchRandomShow() {
    let loadingElement = document.getElementById("loading");
    loadingElement.style.display = "block"; // Show loading text

    try {
        let randomId = Math.floor(Math.random() * 250);
        let response = await fetch(`https://api.tvmaze.com/shows/${randomId}`);
        let data = await response.json();

        if (data.name && data.summary) {
            currentShow = data.name;

            // ✅ Clean the description by removing HTML tags
            let cleanSummary = data.summary.replace(/<[^>]*>?/gm, '');

            // ✅ Remove the show title from the description
            let regex = new RegExp(currentShow, "gi"); // Case-insensitive match for the title
            let filteredSummary = cleanSummary.replace(regex, "*****");

            // ✅ Split the summary into sentences
            let sentences = filteredSummary.split('. ').filter(sentence => sentence.trim().length > 0);

            // ✅ Keep at least two sentences
            let twoSentences = sentences.slice(0, 2).join('. ') + (sentences.length > 2 ? '...' : '.');

            document.getElementById("description").innerHTML = twoSentences;
            loadingElement.style.display = "none"; // Hide loading text
            startTimer();
        } else {
            console.warn("Invalid data received. Retrying...");
            fetchRandomShow(); // Retry fetching if data is invalid
        }
    } catch (error) {
        console.error("Error fetching show:", error);
        loadingElement.innerHTML = "⚠️ Failed to load show. Retrying...";
        setTimeout(fetchRandomShow, 2000); // Retry after delay
    }
}

// Start the timer
function startTimer() {
    let timeLeft = timeLimit;
    document.getElementById("timer").textContent = `⏳ Time Left: ${timeLeft}s`;

    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `⏳ Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById("message").innerHTML = "⏰ Time's up! Loading new show...";

            // ✅ Play time-up sound and wait until it's done before loading the next question
            playSound("timeUpSound", () => {
                setTimeout(fetchRandomShow, 500); // Small delay for smoother transition
            });
        }
    }, 1000);
}

// Function to play sounds safely
function playSound(soundId, callback = null) {
    let sound = document.getElementById(soundId);
    if (sound) {
        sound.pause(); // Stop any previous playback
        sound.currentTime = 0; // Reset to start
        sound.play()
        .then(() => {
            if (callback) {
                sound.onended = callback; // Execute callback when sound ends
            }
        })
        .catch(error => console.log(`Audio play failed: ${error.message}`));
    }
}

// Handle user guesses - play "correctSound" or "wrongSound" accordingly
document.getElementById("submit").addEventListener("click", function () {
    let userGuess = document.getElementById("guess").value.trim();
    let message = document.getElementById("message");

    if (userGuess.toLowerCase() === currentShow.toLowerCase()) {
        message.innerHTML = "✅ Correct! Loading new show...";

        clearInterval(timer);

        // ✅ Play correct sound and load the next question *after* it finishes
        playSound("correctSound", () => {
            setTimeout(() => {
                document.getElementById("guess").value = "";
                document.getElementById("message").innerHTML = "";
                document.getElementById("hints").innerHTML = "";
                hintIndex = 0;
                fetchRandomShow(); // Load next question *after* correct.mp3 finishes
            }, 500); // Small delay to ensure smooth transition
        });

        // Update score
        score++;
        document.getElementById("score").textContent = score;

        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
            document.getElementById("highScore").textContent = highScore;
        }
    } else {
        message.innerHTML = "❌ Incorrect! Try again.";
        playSound("wrongSound"); // Wrong sound plays normally
        provideHint();
    }
});

// Provide hints
function provideHint() {
    let hints = document.getElementById("hints");

    if (hintIndex === 0) {
        hints.innerHTML = "🔍 Hint: First letter is " + currentShow.charAt(0);
    } else if (hintIndex === 1) {
        hints.innerHTML = "📏 Hint: The title has " + currentShow.length + " letters.";
    } else if (hintIndex === 2) {
        hints.innerHTML = "🔀 Hint: Scrambled title: " + shuffleWord(currentShow);
    }

    hintIndex++;
}

// Shuffle title for hints
function shuffleWord(word) {
    return word.split('').sort(() => Math.random() - 0.5).join('');
}
