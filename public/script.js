window.addEventListener('DOMContentLoaded', () => {
  let currentQuestionIndex = 0;
  let questions = [];
  let selectedCategory = 'programming';
  let questionCount = 5;
  let score = 0;
  let timer;
  let timeLeft;
  let userAnswers = [];

  // DOM Elements
  const configScreen = document.getElementById('config-screen');
  const quizScreen = document.getElementById('quiz-screen');
  const resultScreen = document.getElementById('result-screen');
  const startBtn = document.getElementById('start-btn');
  const tryAgainBtn = document.getElementById('try-again-btn');
  const submitBtn = document.getElementById('submit-btn');
  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options-container');
  const questionCounter = document.getElementById('question-counter');
  const timerDisplay = document.getElementById('time-display');
  const currentQ = document.getElementById('current-q');
  const totalQs = document.getElementById('total-qs');
  const progressFill = document.getElementById('progress');
  const errorMsg = document.getElementById('error-msg');

  // Category selection
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.category-btn.active')?.classList.remove('active');
      btn.classList.add('active');
      selectedCategory = btn.dataset.category;
    });
  });

  // Question quantity selection
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.qty-btn.active')?.classList.remove('active');
      btn.classList.add('active');
      questionCount = parseInt(btn.dataset.qty);
    });
  });

  startBtn.addEventListener('click', startQuiz);
  tryAgainBtn.addEventListener('click', resetQuiz);
  submitBtn.addEventListener('click', submitAnswer);

  // Start Quiz   
  async function startQuiz() {
   
    try {
      const res = await fetch(`https://quizapp1-kwl6.onrender.com/api/questions?category=${selectedCategory}&limit=${questionCount}`);
      const data = await res.json();
      questions = data.questions;
    } catch (err) {
      alert("Failed to load questions.");
      return;
    }

    if (!questions.length) {
      alert('No questions found!');
      return;
    }

    score = 0;
    currentQuestionIndex = 0;
    userAnswers = new Array(questions.length).fill(null);
    timeLeft = questionCount * 45;

    configScreen.classList.remove('active');
    quizScreen.classList.add('active');
    totalQs.textContent = questionCount;
    currentQ.textContent = 1;

    timer = setInterval(updateTimer, 1000);
    updateTimerDisplay();
    displayQuestion();
  }

  // Display one question
  function displayQuestion() {
    const q = questions[currentQuestionIndex];
    questionText.textContent = q.question;
    optionsContainer.innerHTML = '';

    q.options.forEach((option, index) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = option;
      btn.addEventListener('click', () => selectOption(btn, index));
      optionsContainer.appendChild(btn);

      if (userAnswers[currentQuestionIndex] === index) {
        btn.classList.add('selected');
      }
    });

    currentQ.textContent = currentQuestionIndex + 1;
    progressFill.style.width = `${((currentQuestionIndex + 1) / questionCount) * 100}%`;

    submitBtn.querySelector('.btn-text').textContent =
      currentQuestionIndex === questionCount - 1 ? 'Submit Quiz' : 'Submit Answer';
  }

  function selectOption(btn, index) {
    document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    userAnswers[currentQuestionIndex] = index;
  }

  function submitAnswer() {
    if (userAnswers[currentQuestionIndex] === null) {
      errorMsg.textContent = 'Please select an answer before submitting.';
      errorMsg.classList.add('show');
      setTimeout(() => errorMsg.classList.remove('show'), 3000);
      return;
    }

    const correct = questions[currentQuestionIndex].correctAnswer;
    if (userAnswers[currentQuestionIndex] === correct) score++;

    if (currentQuestionIndex < questionCount - 1) {
      currentQuestionIndex++;
      displayQuestion();
    } else {
      endQuiz();
    }
  }

  function updateTimer() {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timer);
      endQuiz();
    }
  }

  function updateTimerDisplay() {
    const min = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const sec = (timeLeft % 60).toString().padStart(2, '0');
    timerDisplay.textContent = `${min}:${sec}`;
  }

  function endQuiz() {
    clearInterval(timer);

    document.getElementById('correct-answers').textContent = score;
    document.getElementById('total-questions').textContent = questionCount;
    document.getElementById('percentage').textContent = `${Math.round((score / questionCount) * 100)}%`;

    const totalTime = questionCount * 45 - timeLeft;
    const min = Math.floor(totalTime / 60);
    const sec = totalTime % 60;
    document.getElementById('time-taken').textContent = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;

    const resultMsg = document.getElementById('result-message');
    resultMsg.textContent = score >= questionCount * 0.8
      ? 'Excellent work! 🎉'
      : score >= questionCount * 0.5
        ? 'Good job! 👍'
        : 'Keep practicing! 💪';

    const answerKey = document.getElementById('answer-key-content');
    answerKey.innerHTML = '';

    questions.forEach((q, i) => {
      const item = document.createElement('div');
      item.className = 'question-item';

      item.innerHTML = `
        <div class="question-text">${i + 1}. ${q.question}</div>
        <div class="answer-row correct-answer">
          <span class="answer-label">Correct Answer:</span>
          <span class="answer-text">${q.options[q.correctAnswer]}</span>
        </div>
      `;

      if (userAnswers[i] !== q.correctAnswer) {
        const userAnswer = userAnswers[i] !== null ? q.options[userAnswers[i]] : 'Not answered';
        item.innerHTML += `
          <div class="answer-row user-answer">
            <span class="answer-label">Your Answer:</span>
            <span class="answer-text">${userAnswer}</span>
          </div>
        `;
      }

      answerKey.appendChild(item);
    });

    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
  }

  function resetQuiz() {
    resultScreen.classList.remove('active');
    configScreen.classList.add('active');
    document.getElementById('email').value = '';
  }
});
