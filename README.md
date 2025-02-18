📌 Project Overview

Guess the TV Show is a web-based game where players attempt to guess a TV show based on its description. The game fetches data dynamically from the TVMaze API, blurs out any explicit title mentions, and provides hints while tracking scores. The project demonstrates knowledge of HTML, CSS, JavaScript, API integration, and object-oriented programming.

🎯 Features

✔ Dynamic API Integration - Fetches TV show descriptions using TVMaze API.
✔ Interactive UI - Users can input their guess and receive instant feedback.
✔ Timer System - Players must answer within 15 seconds.
✔ Score Tracking - Tracks and displays current score and high score using local storage.
✔ Loading Indicator - Displays a spinner while fetching data.
✔ Animated UI - Includes shake animation for incorrect guesses and glow effects for buttons.
✔ Background Music & Sound Effects - Enhances the gameplay experience.
✔ Optimized UI for Readability - Data is displayed in an aesthetically pleasing way.

🛠️ Technologies Used

HTML - Structuring the game interface

CSS - Styling the game and animations

JavaScript (ES6+) - Game logic, API requests, and interactivity

TVMaze API - Fetching real-time TV show descriptions

LocalStorage - Storing high scores


📥 How to Download & Install

Clone the Repository

git clone https://github.com/YOUR_GITHUB_USERNAME/guess-the-tv-show.git
cd guess-the-tv-show

Open the Project

Open index.html in your preferred browser.

Ensure you have an internet connection (for API fetching).


🚀 How to Play

Click "Start Game" to begin.

Read the TV show description carefully.

Type your answer in the input field.

Click "Submit" to check your guess.

Correct answers reveal the show, update the score, and fetch a new show.

If incorrect, the input field shakes, and you can try again.

Answer before the timer reaches 0 seconds!


🎮 Game Flow

Start Game → API fetches TV show description.

User Inputs Guess → Check if correct.

✅ Correct Answer: Unblur the image, update the score, load a new show.

❌ Incorrect Answer: Shake animation and retry.

Timer Runs Out → Display correct answer & load a new show.

Repeat Until Game Ends.


📝 Code Structure

📌 index.html (Structure)

Homepage (#home-screen)

Game Interface (#game-screen)

Input field (#guess), submit button (#submit), and score tracker.

Embedded audio elements for sounds.


🎨 styles.css (Design & Animations)

Semantic HTML & Modern Styling using CSS3

Animations: shake, fadeIn, glow, and pulse

Responsive Design for mobile and desktop


🚀 script.js (Game Logic)

Fetches TV Show Data from the TVMaze API.

Implements Timer, Score, and High Score Tracking.

Event Listeners for startGame(), checkGuess().

Shake Animation on Wrong Answers.

Uses Classes and Private Properties to manage game state.


📌 Additional Enhancements (Bonus Features)

✅ Uses Classes with Private Properties for better code structure.

✅ Tested with Postman to verify API response.

✅ Multiple Features Implemented (timer, score, sound, animations, loading spinner).


🛠️ Troubleshooting

If API fails to load, check your internet connection.

If background music doesn’t play, ensure browser allows autoplay.

📩 For any issues or suggestions, feel free to contribute or reach out! 🚀