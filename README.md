🎬 Guess the TV Show 🎯
Test your TV knowledge! Can you guess the show based on its description?
------------------------------------------------------------------------------

📌 Project Overview
🎥 Guess the TV Show is an interactive web game where players guess the TV show title from a given description. The game dynamically fetches data from the TVMaze API, obscures any title mentions, and provides hints while tracking scores.

This project showcases HTML, CSS, JavaScript, API integration, object-oriented programming, and UI animations for an engaging experience.
------------------------------------------------------------------------------

🎯 Key Features
✅ Dynamic API Integration – Fetches real-time TV show descriptions from TVMaze API.
✅ Interactive UI – Players can input guesses and receive instant feedback.
✅ ⏳ Timer System – Players must guess the show within 15 seconds.
✅ 🏆 Score Tracking – Tracks current score & high score using local storage.
✅ 🎭 Loading Indicator – Displays a spinner while fetching data.
✅ 🎨 Animated UI – Shake effect for incorrect guesses, glow effect for buttons.
✅ 🎵 Sound Effects & Background Music – Immersive audio for game interactions.
✅ 📱 Optimized UI – Aesthetic design for a smooth, user-friendly experience.
-----------------------------------------------------------------------------

🛠️ Technologies Used
🖥 HTML – Structures the game interface.
🎨 CSS – Styling, animations, and responsive design.
🚀 JavaScript (ES6+) – Handles game logic, API calls, and user interaction.
📡 TVMaze API – Fetches real-time TV show descriptions.
💾 LocalStorage – Saves high scores for players.
----------------------------------------------------------------------------

📥 How to Download & Install
1️⃣ Clone the Repository
bash
Copy
Edit
git clone https://github.com/YOUR_GITHUB_USERNAME/guess-the-tv-show.git
cd guess-the-tv-show
2️⃣ Open the Project
Option 1: Open index.html in your browser.
Option 2: Use a live server extension in VS Code.
Internet Required – The game fetches data from an online API.
----------------------------------------------------------------------------

🚀 How to Play
1️⃣ Click “Start Game” to begin.
2️⃣ Read the description carefully.
3️⃣ Type your guess in the input field.
4️⃣ Click “Submit” to check your answer.
5️⃣ Correct Answer? 🎉 Score increases, and a new show loads.
6️⃣ Wrong Answer? ❌ The input shakes, and you can retry.
7️⃣ Timer Runs Out? ⏳ The correct answer is revealed, and a new show appears.

🎮 Keep playing & aim for the highest score!
---------------------------------------------------------------------------

🔄 Game Flow
graph TD;
    StartGame["🟢 Start Game"] --> FetchData["🌐 Fetch TV Show Data"];
    FetchData --> UserInput["⌨ User Inputs Guess"];
    UserInput -->|✅ Correct| ShowReveal["📸 Unblur Image + Score Up"];
    UserInput -->|❌ Incorrect| ShakeEffect["🔄 Shake Animation + Retry"];
    UserInput -->|⏳ Timer Ends| RevealAnswer["📢 Show Correct Answer"];
    ShowReveal --> FetchData;
    ShakeEffect --> UserInput;
    RevealAnswer --> FetchData;
--------------------------------------------------------------------------

📝 Code Structure
📂 index.html (Structure)
✅ Homepage (#home-screen)
✅ Game Screen (#game-screen)
✅ Input field (#guess), Submit Button (#submit)
✅ Score Tracker, Sound Effects

🎨 styles.css (Design & Animations)
✅ Semantic HTML & Modern Styling
✅ Animations: Shake, Fade-in, Glow, Pulse
✅ Responsive Design – Works on mobile & desktop

🚀 script.js (Game Logic)
✅ Fetches TV Show Data from TVMaze API
✅ Implements Timer, Score, & High Score Tracking
✅ Handles Events (startGame(), checkGuess())
✅ Shake Effect on Wrong Answers
✅ Uses Classes & Private Properties for structured code
-------------------------------------------------------------------------

🌟 Bonus Features
✔ 🎭 Uses Classes with Private Properties – Ensures cleaner, modular code.
✔ 🛠 API Testing with Postman – Ensures smooth API responses.
✔ 🔄 Multi-Feature Expansion – Sorting, Timer, Animations, Sound Effects, Loading Spinner.
-------------------------------------------------------------------------

🛠️ Troubleshooting
❌ API Not Loading? – Check your internet connection.
🔇 Music Not Playing? – Ensure autoplay is allowed in your browser.
🐞 Found a Bug? – Open an issue or submit a pull request!
📩 Need Help? Feel free to contribute, fork, or reach out! 🚀
-------------------------------------------------------------------------

🔗 Future Enhancements
🔜 Leaderboard – Compete for the highest score with others!
🔜 Hint System – Unlock clues to make guessing easier.
🔜 Difficulty Levels – Easy, Medium, and Hard modes.
-------------------------------------------------------------------------

🎉 Enjoy & Have Fun! 🚀🎭