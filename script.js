// Select the background music element
let bgMusic = document.getElementById("bgMusic");

// ✅ Play background music when the homepage loads
window.addEventListener("load", function () {
    bgMusic.volume = 0.5; // Adjust volume level if needed
    bgMusic.play().catch(error => console.log("Autoplay blocked:", error));
});

// ✅ Game Class Implementation
class Game {
    #currentShow;
    #score;
    #highScore;
    #timer;
    #timeLimit = 15;
    #hintIndex;

    constructor() {
        this.#currentShow = "";
        this.#score = 0;
        this.#highScore = localStorage.getItem("highScore") || 0;
        this.#hintIndex = 0;

        document.getElementById("highScore").textContent = this.#highScore;
        
        // ✅ Setup event listeners
        document.getElementById("startGame").addEventListener("click", () => this.startGame());
        document.getElementById("submit").addEventListener("click", () => this.checkGuess());
    }

    startGame() {
        document.getElementById("home-screen").style.display = "none"; // Hide homepage
        document.getElementById("game-screen").style.display = "block"; // Show the game

        // ✅ Stop background music
        bgMusic.pause();
        bgMusic.currentTime = 0;

        // ✅ Fetch the first TV show
        this.fetchRandomShow();
    }

    async fetchRandomShow() {
        let loadingElement = document.getElementById("loading");
        let spinner = document.getElementById("spinner");

        // ✅ Show loading spinner
        loadingElement.style.display = "block";
        spinner.style.display = "block";

        try {
            let randomId = Math.floor(Math.random() * 250);
            let response = await fetch(`https://api.tvmaze.com/shows/${randomId}`);
            let data = await response.json();

            if (data.name && data.summary) {
                this.#currentShow = data.name;

                // ✅ Clean the description by removing HTML tags
                let cleanSummary = data.summary.replace(/<[^>]*>?/gm, '');

                // ✅ Remove the show title from the description
                let regex = new RegExp(this.#currentShow, "gi"); // Case-insensitive match for the title
                let filteredSummary = cleanSummary.replace(regex, "*****");

                // ✅ Keep at least two sentences
                let sentences = filteredSummary.split('. ').filter(sentence => sentence.trim().length > 0);
                let twoSentences = sentences.slice(0, 2).join('. ') + (sentences.length > 2 ? '...' : '.');

                document.getElementById("description").innerHTML = twoSentences;

                // ✅ Show more details about the TV show
                document.getElementById("details").innerHTML = `
                <div class="image-container">
                    <div class="overlay">???</div>
                    <img src="${data.image ? data.image.medium : 'images/no-image.png'}" 
                         alt="TV Show Image" 
                         class="blurred-image">
                </div>
                <p>📅 Premiered: ${data.premiered ? data.premiered.split("-")[0] : "Unknown"}</p>
                <p>🎭 Genre: ${data.genres.length > 0 ? data.genres.join(", ") : "Not Available"}</p>
            `;

                // ✅ Hide loading spinner
                loadingElement.style.display = "none";
                spinner.style.display = "none";

                this.startTimer();
            } else {
                console.warn("Invalid data received. Retrying...");
                this.fetchRandomShow();
            }
        } catch (error) {
            console.error("Error fetching show:", error);
            loadingElement.innerHTML = "⚠️ Failed to load show. Retrying...";
            setTimeout(() => this.fetchRandomShow(), 2000);
        }
    }

    startTimer() {
        let timeLeft = this.#timeLimit;
        document.getElementById("timer").textContent = `⏳ Time Left: ${timeLeft}s`;

        clearInterval(this.#timer);
        this.#timer = setInterval(() => {
            timeLeft--;
            document.getElementById("timer").textContent = `⏳ Time Left: ${timeLeft}s`;

            if (timeLeft <= 0) {
                clearInterval(this.#timer);
                document.getElementById("message").innerHTML = "⏰ Time's up! Loading new show...";

                playSound("timeUpSound", () => {
                    setTimeout(() => this.fetchRandomShow(), 500);
                });
            }
        }, 1000);
    }

    checkGuess() {
        let userGuess = document.getElementById("guess").value.trim();
    let message = document.getElementById("message");
    let inputField = document.getElementById("guess"); // Select input field
    
    if (userGuess.toLowerCase() === this.#currentShow.toLowerCase()) {
        message.innerHTML = "✅ Correct! Loading new show...";

        // ✅ Remove shake effect if correct
        inputField.classList.remove("shake");
    
        // ✅ Remove blur from the image
        let blurredImage = document.querySelector(".blurred-image");
        let overlay = document.querySelector(".overlay");
    
        if (blurredImage) {
            blurredImage.style.filter = "none"; // Remove the blur effect
        }
        if (overlay) {
            overlay.style.display = "none"; // Hide the ??? overlay
        }
    
        clearInterval(this.#timer);
        playSound("correctSound", () => {
            setTimeout(() => {
                document.getElementById("guess").value = "";
                document.getElementById("message").innerHTML = "";
                document.getElementById("hints").innerHTML = "";
                this.#hintIndex = 0;
                this.fetchRandomShow();
            }, 1000);
        });

        this.#score++;
        document.getElementById("score").textContent = this.#score;
    
        if (this.#score > this.#highScore) {
            this.#highScore = this.#score;
            localStorage.setItem("highScore", this.#highScore);
            document.getElementById("highScore").textContent = this.#highScore;
        }
    } else {
        message.innerHTML = "❌ Incorrect! Try again.";
        playSound("wrongSound");

        // ✅ Remove and re-add the shake class to restart animation
        inputField.classList.remove("shake");
        void inputField.offsetWidth; // ✅ Forces reflow to restart animation
        inputField.classList.add("shake");

        // ✅ Remove shake effect after animation completes
        setTimeout(() => {
            inputField.classList.remove("shake");
        }, 300); // Matches the animation duration
    }
}

}

// ✅ Initialize Game
const tvShowGame = new Game();

// ✅ Function to play sounds
function playSound(soundId, callback = null) {
    let sound = document.getElementById(soundId);
    if (sound) {
        sound.pause();
        sound.currentTime = 0;
        sound.play()
        .then(() => {
            if (callback) {
                sound.onended = callback;
            }
        })
        .catch(error => console.log(`Audio play failed: ${error.message}`));
    }
}