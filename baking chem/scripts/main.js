document.addEventListener("DOMContentLoaded", function () {
  const quizContainer = document.getElementById("quiz-container");
  const resultsContainer = document.getElementById("results");
  const scoreDisplay = document.getElementById("score");
  const retryButton = document.getElementById("retry-button");
  const feedbackContainer = document.getElementById("feedback-container");
  const feedbackText = document.getElementById("feedback-text");

  const quizDataScript = document.getElementById("quiz-data");
  const quizQuestions = JSON.parse(quizDataScript.textContent);
  let currentQuestionIndex = 0;
  let score = 0;

  function showQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];

    const questionHTML = `
      <h3>${currentQuestion.question}</h3>
      ${currentQuestion.options
        .map((option) => `<button class="answer-option">${option}</button>`)
        .join("")}
    `;

    quizContainer.innerHTML = questionHTML;

    const answerButtons = document.querySelectorAll(".answer-option");
    answerButtons.forEach((button) => {
      button.addEventListener("click", () => {
        checkAnswer(button.textContent);
      });
    });
  }

  function checkAnswer(selectedOption) {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    let feedbackMessage = "";

    if (selectedOption === currentQuestion.correctAnswer) {
      score++;
      feedbackMessage = "✅ Correct!";
    } else {
      feedbackMessage = `❌ Incorrect! The correct answer is: ${currentQuestion.correctAnswer}`;
    }

    feedbackText.textContent = feedbackMessage;
    feedbackContainer.style.display = "block";

    currentQuestionIndex++;

    setTimeout(() => {
      feedbackContainer.style.display = "none";
      if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
      } else {
        showResults();
      }
    }, 1500);
  }

  function showResults() {
    quizContainer.style.display = "none";
    resultsContainer.style.display = "block";
    scoreDisplay.textContent = score;
  }

  retryButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    quizContainer.style.display = "block";
    resultsContainer.style.display = "none";
    feedbackContainer.style.display = "none";
    showQuestion();
  });

  showQuestion();
});
