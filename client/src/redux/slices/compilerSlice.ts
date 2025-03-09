import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CompilerSliceStateType {
  fullCode: {
    html: string;
    css: string;
    javascript: string;
  };
  currentLanguage: "html" | "css" | "javascript";
  isOwner: boolean;
}

const initialState: CompilerSliceStateType = {
  fullCode: {
    html: `
<!DOCTYPE html>
<! Replace this CodeSnippet with your own code snippets and Start Practcing>



<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sriram's Quiz</title>
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div class="background-shapes"></div>
    <div class="quiz-container">
      <div class="quiz-header">
        <h1>Welcome !!</h1>
        <p class="subtitle">Test your JavaScript skills & know more about Sriram!</p>
      </div>
      
      <div class="card" id="question-container">
        <h2 id="question">Hiii❤️</h2>
        <div id="answers" class="answer-grid">Lets Get Started</div>
      </div>
      
      <div class="stats-container">
        <div class="stat-item">
          <span class="stat-label">Time Left:</span>
          <span id="time" class="stat-value">30</span>
          <span class="stat-unit">sec</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Score:</span>
          <span id="score" class="stat-value">0</span>
        </div>
      </div>
      
      <button id="start-btn" class="primary-button">
        <span>Start Quiz</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="button-icon">
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      </button>
    </div>
    
    <!-- Result Modal -->
    <div id="result-modal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Quiz Completed!</h2>
        </div>
        <div class="modal-body">
          <div id="result-emoji" class="result-emoji"></div>
          <h3 id="result-title" class="result-title"></h3>
          <p id="result-message" class="result-message"></p>
          <div class="score-display">
            <span>Your Score:</span>
            <span id="final-score" class="final-score">0</span>
            <span>/</span>
            <span id="total-questions">7</span>
          </div>
        </div>
        <div class="modal-footer">
          <button id="play-again-btn" class="primary-button">
            <span>Play Again</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="button-icon">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <script src="script.js"></script>
  </body>
</html>
    `,
    css: `
    :root {
  --background: #f0f4f8;
  --foreground: #1a202c;
  --primary: #3b82f6;
  --primary-hover: #2563eb;
  --secondary: #8b5cf6;
  --card: #ffffff;
  --card-foreground: #1e293b;
  --border: #e2e8f0;
  --muted: #64748b;
  --radius: 0.75rem;
  --shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Inter", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--background);
  color: var(--foreground);
  padding: 1.5rem;
  position: relative;
  overflow-x: hidden;
}

body::before,
body::after {
  content: "";
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  z-index: -1;
  filter: blur(80px);
  opacity: 0.15;
}

body::before {
  background-color: var(--primary);
  top: -100px;
  left: -100px;
}

body::after {
  background-color: var(--secondary);
  bottom: -100px;
  right: -100px;
}

.quiz-container {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.quiz-header {
  text-align: center;
  padding: 0.5rem;
}

h1 {
  font-size: 2.25rem;
  font-weight: 800;
  margin-bottom: 0.75rem;
  color: var(--foreground);
  letter-spacing: -0.025em;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  color: var(--muted);
  font-size: 1.125rem;
  max-width: 90%;
  margin: 0 auto;
  line-height: 1.5;
}

.card {
  background-color: var(--card);
  border-radius: var(--radius);
  padding: 1.75rem;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

#question {
  font-size: 1.35rem;
  margin-bottom: 1.5rem;
  color: var(--card-foreground);
  font-weight: 600;
  line-height: 1.4;
}

.answer-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.stats-container {
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  background-color: var(--card);
  border-radius: var(--radius);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stat-label {
  color: var(--muted);
  font-size: 0.875rem;
  font-weight: 500;
}

.stat-value {
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--primary);
}

.stat-unit {
  color: var(--muted);
  font-size: 0.875rem;
}

.primary-button {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  border: none;
  border-radius: var(--radius);
  padding: 0.875rem 1.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.primary-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.primary-button:active {
  transform: translateY(1px);
}

.primary-button::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 0;
  transition: transform 0.5s, opacity 1s;
}

.primary-button:active::after {
  transform: scale(0, 0);
  opacity: 0.3;
  transition: 0s;
}

#answers button {
  background-color: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1rem 1.25rem;
  font-size: 1rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  position: relative;
  overflow: hidden;
}

#answers button:hover {
  background-color: rgba(59, 130, 246, 0.05);
  border-color: var(--primary);
  transform: translateX(3px);
}

#answers button:active {
  transform: translateX(0);
}

.correct {
  background: linear-gradient(135deg, #10b981, #059669) !important;
  color: white !important;
  border-color: #059669 !important;
  transform: none !important;
  animation: pulse 0.5s ease-in-out;
}

.wrong {
  background: linear-gradient(135deg, #ef4444, #dc2626) !important;
  color: white !important;
  border-color: #dc2626 !important;
  transform: none !important;
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-5px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(5px);
  }
}

@media (max-width: 480px) {
  .quiz-container {
    max-width: 100%;
    gap: 1.25rem;
  }

  h1 {
    font-size: 1.85rem;
  }

  #question {
    font-size: 1.2rem;
  }

  .card,
  .stats-container {
    padding: 1.25rem 1rem;
  }
}

.background-shapes {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.background-shapes::before,
.background-shapes::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  animation: float 15s infinite ease-in-out;
}

.background-shapes::before {
  width: 300px;
  height: 300px;
  background-color: rgba(59, 130, 246, 0.05);
  top: -150px;
  right: -50px;
}

.background-shapes::after {
  width: 250px;
  height: 250px;
  background-color: rgba(139, 92, 246, 0.05);
  bottom: -100px;
  left: -100px;
  animation-delay: -5s;
}

@keyframes float {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    transform: translate(30px, 30px) rotate(5deg);
  }
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
}

.button-icon {
  display: inline-block;
  margin-left: 8px;
  vertical-align: middle;
  transition: transform 0.3s ease;
}

.primary-button:hover .button-icon {
  transform: translateX(4px);
}

.attribution {
  position: fixed;
  bottom: 10px;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 0.875rem;
  color: var(--muted);
  padding: 0.5rem;
}

.attribution p {
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.attribution p:hover {
  opacity: 1;
}

/* Modal Styles */
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.modal.show {
  display: flex;
  animation: fadeIn 0.3s forwards;
}

.modal-content {
  background-color: var(--card);
  border-radius: var(--radius);
  width: 90%;
  max-width: 450px;
  box-shadow: var(--shadow);
  overflow: hidden;
  transform: scale(0.9);
  transition: transform 0.3s ease;
  animation: scaleIn 0.3s forwards;
}

@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.modal-header {
  padding: 1.5rem;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  text-align: center;
}

.modal-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.modal-body {
  padding: 2rem;
  text-align: center;
}

.result-emoji {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: bounce 1s ease infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.result-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--foreground);
}

.result-message {
  color: var(--muted);
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.score-display {
  background-color: var(--background);
  padding: 1rem;
  border-radius: var(--radius);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.final-score {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid var(--border);
}

.modal-footer .primary-button {
  margin: 0;
}
    `,
    javascript: `
    document.addEventListener("DOMContentLoaded", () => {
  const questions = [
    {
      question: "What does 'DOM' stand for?",
      options: ["Document Object Model", "Data Object Model", "Document Order Module"],
      answer: "Document Object Model",
    },
    {
      question: "Which programming languages does Sriram specialize in?",
      options: ["Python & Java", "JavaScript & React", "C++ & Go"],
      answer: "JavaScript & React",
    },
    {
      question: "Sriram developed which cloud project?",
      options: ["AI Chatbot", "Multi-Region VPC Peering", "E-commerce App"],
      answer: "Multi-Region VPC Peering",
    },
    {
      question: "Sriram is the President of which association?",
      options: ["IEEE", "PAIE CELL", "Google Developers"],
      answer: "PAIE CELL",
    },
    {
      question: "What is the output of '2' + 2 in JavaScript?",
      options: ["4", "'22'", "Error"],
      answer: "'22'",
    },
    {
      question: "What framework does Sriram use for front-end projects?",
      options: ["Angular", "Vue", "React"],
      answer: "React",
    },
    {
      question: "What does 'SSS' stand for in Sriram's full name?",
      options: ["Siva Satya Sai", "Sai Satya Siva", "Satya Siva Sai"],
      answer: "Satya Siva Sai",
    },
  ]

  let currentQuestionIndex = 0
  let score = 0
  let timeLeft = 30
  let timer

  // DOM Elements
  const questionEl = document.getElementById("question")
  const answersEl = document.getElementById("answers")
  const timeEl = document.getElementById("time")
  const scoreEl = document.getElementById("score")
  const startBtn = document.getElementById("start-btn")
  const resultModal = document.getElementById("result-modal")
  const resultEmoji = document.getElementById("result-emoji")
  const resultTitle = document.getElementById("result-title")
  const resultMessage = document.getElementById("result-message")
  const finalScoreEl = document.getElementById("final-score")
  const totalQuestionsEl = document.getElementById("total-questions")
  const playAgainBtn = document.getElementById("play-again-btn")

  // Set total questions
  totalQuestionsEl.textContent = questions.length

  // Fisher-Yates shuffle algorithm
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  function startQuiz() {
    startBtn.style.display = "none"
    score = 0
    currentQuestionIndex = 0
    timeLeft = 30
    scoreEl.innerText = score
    timeEl.innerText = timeLeft

    timer = setInterval(() => {
      timeLeft--
      timeEl.innerText = timeLeft
      if (timeLeft === 0) {
        endQuiz()
      }
    }, 1000)

    loadQuestion()
  }

  function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
      endQuiz()
      return
    }

    const currentQuestion = questions[currentQuestionIndex]
    questionEl.innerText = currentQuestion.question
    answersEl.innerHTML = ""

    // Create a copy of options and shuffle them
    const shuffledOptions = shuffleArray([...currentQuestion.options])

    shuffledOptions.forEach((option) => {
      const btn = document.createElement("button")
      btn.innerText = option
      btn.classList.add("option-btn")
      btn.onclick = () => {
        checkAnswer(btn, option)
      }
      answersEl.appendChild(btn)
    })
  }

  function checkAnswer(btn, answer) {
    const correctAnswer = questions[currentQuestionIndex].answer
    const buttons = answersEl.getElementsByTagName("button")

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true
      buttons[i].classList.remove("correct", "wrong")
      if (buttons[i].innerText === correctAnswer) {
        buttons[i].classList.add("correct")
      } else {
        buttons[i].classList.add("wrong")
      }
    }

    if (answer === correctAnswer) {
      score++
      scoreEl.innerText = score
    }

    setTimeout(() => {
      currentQuestionIndex++
      loadQuestion()
    }, 1000)
  }

  function endQuiz() {
    clearInterval(timer)

    // Calculate score percentage
    const scorePercentage = (score / questions.length) * 100

    // Set final score
    finalScoreEl.textContent = score

    // Set emoji, title and message based on score
    if (scorePercentage >= 80) {
      resultEmoji.innerHTML = "🎉"
      resultTitle.textContent = "Excellent!"
      resultMessage.textContent = "Wow! You're a JavaScript and Sriram expert! Amazing performance!"
    } else if (scorePercentage >= 60) {
      resultEmoji.innerHTML = "🏆"
      resultTitle.textContent = "Great Job!"
      resultMessage.textContent = "You know Sriram and JavaScript pretty well! Keep it up!"
    } else if (scorePercentage >= 40) {
      resultEmoji.innerHTML = "👍"
      resultTitle.textContent = "Good Effort!"
      resultMessage.textContent = "Not bad! You're on your way to becoming a JavaScript pro!"
    } else if (scorePercentage >= 20) {
      resultEmoji.innerHTML = "🤔"
      resultTitle.textContent = "Nice Try!"
      resultMessage.textContent = "You're making progress! A bit more practice and you'll be a pro!"
    } else {
      resultEmoji.innerHTML = "😢"
      resultTitle.textContent = "Keep Learning!"
      resultMessage.textContent = "Don't worry! JavaScript can be tricky. Try again and you'll improve!"
    }

    // Show modal
    resultModal.classList.add("show")
  }

  function closeModal() {
    resultModal.classList.remove("show")
    startBtn.style.display = "block"
  }

  // Event Listeners
  startBtn.addEventListener("click", startQuiz)
  playAgainBtn.addEventListener("click", () => {
    closeModal()
    startQuiz()
  })

  // Close modal when clicking outside
  resultModal.addEventListener("click", (e) => {
    if (e.target === resultModal) {
      closeModal()
    }
  })
})

    `,
  },
  currentLanguage: "html",
  isOwner: false,
};

const compilerSlice = createSlice({
  name: "compilerSlice",
  initialState,
  reducers: {
    updateCurrentLanguage: (
      state,
      action: PayloadAction<CompilerSliceStateType["currentLanguage"]>
    ) => {
      state.currentLanguage = action.payload;
    },
    updateCodeValue: (state, action: PayloadAction<string>) => {
      state.fullCode[state.currentLanguage] = action.payload;
    },
    updateIsOwner: (state, action: PayloadAction<boolean>) => {
      state.isOwner = action.payload;
    },
    updateFullCode: (
      state,
      action: PayloadAction<CompilerSliceStateType["fullCode"]>
    ) => {
      state.fullCode = action.payload;
    },
  },
});

export default compilerSlice.reducer;
export const {
  updateCurrentLanguage,
  updateCodeValue,
  updateFullCode,
  updateIsOwner,
} = compilerSlice.actions;
