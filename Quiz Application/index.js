// Get references to the HTML elements
const welcomeScreen = document.getElementById("welcomeScreen"); // Welcome screen container
const quizArea = document.getElementById("quizArea"); // Quiz area container
const resultScreen = document.getElementById("resultScreen"); // Result screen container
const timerText = document.getElementById("timer"); // Timer text element

// Prize levels in decreasing order (highest to lowest)
const levels = [
    '₹ 1,000,000', '₹ 5,00,000', '₹ 2,50,000', '₹ 1,25,000',
    '₹ 64,000', '₹ 32,000', '₹ 16,000', '₹ 8,000', '₹ 4,000',
    '₹ 2,000', '₹ 1,000', '₹ 500', '₹ 300', '₹ 200', '₹ 100'
];

// Array of quiz questions
const questions = [
    {
        question: "Who is known as the Father of the Nation in India?",
        options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Subhas Chandra Bose", "Sardar Patel"],
        answer: 1 // Correct answer index
    },
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: 1
    },
    {
        question: "Which is the largest mammal?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
        answer: 1
    }
];

// Game state variables
let currentLevelIndex = levels.length - 1; // Track the current level
let currentQuestionIndex = 0; // Track the current question
let winningAmount = "₹ 0"; // Amount won
let timeInterval = 30; // Timer duration for each question
let interval; // Reference to the timer interval

// Function to start the game
function startGame() {
    const username = document.getElementById("username").value; // Get entered username
    const error = document.getElementById("usernameError"); // Get error message container

    if (username.trim() === "") { // Check if username is empty
        error.innerHTML = "Please enter username"; // Show error message
        return;
    }

    error.innerHTML = ""; // Clear error message if valid username
    welcomeScreen.classList.add("hide"); // Hide welcome screen
    quizArea.classList.remove("hide"); // Show quiz area
    loadLevels(); // Load the levels
    loadQuestion(); // Load the first question
}

// Function to load the prize levels dynamically
function loadLevels() {
    const levelList = document.getElementById("levelList"); // Get the levels container
    levelList.innerHTML = ""; // Clear existing levels

    levels.forEach((level, index) => { // Loop through levels
        const levelDiv = document.createElement("li"); // Create a list item for the level
        levelDiv.classList.add("level"); // Add class for styling

        // Set level number and amount
        levelDiv.innerHTML = `
          <span class="levelNumber">${levels.length - index}</span>
          <span class="levelAmount">${level}</span>
        `;

        if (currentLevelIndex === index) { // Highlight the current level
            levelDiv.classList.add("active");
        }

        levelList.appendChild(levelDiv); // Add level to the list
    });
}

// Function to load the next question
function loadQuestion() {
    const questionStatement = document.getElementById("questionStatement"); // Get question text container
    const answers = document.getElementById("answers"); // Get answers container
    answers.innerHTML = ""; // Clear previous answers

    const currentQuestion = questions[currentQuestionIndex]; // Get the current question

    questionStatement.innerHTML = currentQuestion.question; // Display the question text
    currentQuestion.options.forEach((option, index) => { // Loop through answer options
        const answerDiv = document.createElement("div"); // Create answer button
        answerDiv.classList.add("answer"); // Add class for styling
        answerDiv.innerHTML = option; // Set answer text

        // Add click event listener to check answer when clicked
        answerDiv.addEventListener("click", () => checkAnswer(index));

        answers.appendChild(answerDiv); // Add answer to the list
    });

    timeInterval = 30; // Reset timer
    interval = setInterval(timer, 1000); // Start timer countdown
}

// Function to update the timer
function timer() {
    if (timeInterval == 0) { // Check if time is up
        clearInterval(interval); // Stop timer
        manageResut(); // End the game
    }

    timerText.innerHTML = timeInterval; // Update the displayed timer value
    timeInterval--; // Decrease the timer
}

// Function to check if the selected answer is correct
function checkAnswer(option) {
    const currentQuestion = questions[currentQuestionIndex]; // Get current question

    if (option !== currentQuestion.answer) { // Check if answer is wrong
        manageResut(); // End the game
    }

    currentQuestionIndex++; // Move to the next question
    winningAmount = levels[currentLevelIndex]; // Update winning amount
    currentLevelIndex--; // Move to the next level
    clearInterval(interval); // Stop timer

    if (currentLevelIndex < 0) { // Check if all questions are completed
        manageResut(true); // User wins the game
    }

    loadLevels(); // Reload levels
    loadQuestion(); // Load next question
}

// Function to manage the result screen
function manageResut(userWon = false) {
    const priceMoney = document.getElementById("priceMoney"); // Get prize money display
    const message = document.getElementById("message"); // Get message display

    if (userWon) { // If the user won all levels
        priceMoney.innerHTML = `You won: ${levels[0]}`; // Display highest prize
        message.innerHTML = "Congratulations!"; // Show winning message
        quizArea.classList.add("hide"); // Hide quiz area
        resultScreen.classList.remove("hide"); // Show result screen
        return;
    }

    priceMoney.innerHTML = `You won: ${winningAmount}`; // Show the amount won
    quizArea.classList.add("hide"); // Hide quiz area
    resultScreen.classList.remove("hide"); // Show result screen
}
