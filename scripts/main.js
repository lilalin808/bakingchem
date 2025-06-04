document.addEventListener("DOMContentLoaded", function () {
  const quizContainer = document.getElementById("quiz-container");
  const resultsContainer = document.getElementById("results");
  const scoreDisplay = document.getElementById("score");
  const retryButton = document.getElementById("retry-button");

  const quizDataScript = document.getElementById("quiz-data");
  const quizQuestions = JSON.parse(quizDataScript.textContent);
  let score = 0;

  function showAllQuestions() {
    quizContainer.innerHTML = quizQuestions
      .map((question, index) => {
        return `
          <div class="question-block" data-question-index="${index}">
            <h3>${question.question}</h3>
            ${question.options
              .map(
                (option) => `
                  <button class="answer-option" data-option="${option}">
                    ${option}
                  </button>
                `
              )
              .join("")}
            <div class="feedback" style="display: none;"></div>
          </div>
        `;
      })
      .join("");

    const answerButtons = document.querySelectorAll(".answer-option");
    answerButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const questionBlock = button.closest(".question-block");
        const index = parseInt(
          questionBlock.getAttribute("data-question-index")
        );
        const selectedOption = button.getAttribute("data-option");
        checkAnswer(index, selectedOption, questionBlock);
      });
    });
  }

  function checkAnswer(index, selectedOption, questionBlock) {
    const question = quizQuestions[index];
    const feedback = questionBlock.querySelector(".feedback");

    // Prevent multiple answers
    if (question.answered) return;

    question.answered = true;

    if (selectedOption === question.correctAnswer) {
      score++;
      feedback.textContent = "✅ Correct!";
    } else {
      feedback.textContent = `❌ Incorrect! The correct answer is: ${question.correctAnswer}`;
    }

    feedback.style.display = "block";

    // Disable all buttons in this question block
    const buttons = questionBlock.querySelectorAll(".answer-option");
    buttons.forEach((btn) => (btn.disabled = true));

    // Check if all questions answered
    if (quizQuestions.every((q) => q.answered)) {
      showResults();
    }
  }

  function showResults() {
    resultsContainer.style.display = "block";
    scoreDisplay.textContent = score;
  }

  retryButton.addEventListener("click", () => {
    score = 0;
    quizQuestions.forEach((q) => delete q.answered);
    resultsContainer.style.display = "none";
    showAllQuestions();
  });

  showAllQuestions();
});
