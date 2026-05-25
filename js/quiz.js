// quiz.js — handles MC, True/False, and type-in questions
// Usage: initQuiz(questionsArray, unitId)
//
// Question format:
// { type: 'mc',      q: "...", options: ["A","B","C","D"], answer: "A" }
// { type: 'tf',      q: "...", answer: "True" }
// { type: 'typein',  q: "...", answer: "answer", hint: "optional hint" }

function initQuiz(questions, unitId) {
  let current = 0;
  let score = 0;
  let answered = false;

  const area       = document.getElementById('quiz-area');
  const qNum       = document.getElementById('quiz-q-num');
  const qText      = document.getElementById('quiz-question-text');
  const qBody      = document.getElementById('quiz-question-body');
  const feedback   = document.getElementById('quiz-feedback');
  const nextBtn    = document.getElementById('quiz-next');
  const progressFill = document.getElementById('quiz-progress-fill');
  const result     = document.getElementById('quiz-result');
  const scoreEl    = document.getElementById('quiz-score-big');
  const scoreMsg   = document.getElementById('quiz-score-msg');
  const retryBtn   = document.getElementById('quiz-retry');

  if (!area) return;

  function updateProgress() {
    const pct = (current / questions.length) * 100;
    if (progressFill) progressFill.style.width = pct + '%';
  }

  function renderQuestion() {
    answered = false;
    feedback.className = 'quiz-feedback';
    feedback.textContent = '';
    nextBtn.style.display = 'none';

    const q = questions[current];
    qNum.textContent = `Question ${current + 1} of ${questions.length}`;
    qText.textContent = q.q;
    updateProgress();

    if (q.type === 'mc' || q.type === 'tf') {
      const opts = q.type === 'tf' ? ['True', 'False'] : q.options;
      const letters = ['A','B','C','D'];
      qBody.innerHTML = `<div class="quiz-options">
        ${opts.map((o, i) => `
          <button class="quiz-option" data-value="${o}">
            <span class="option-letter">${letters[i] || '—'}</span>
            ${o}
          </button>`).join('')}
      </div>`;

      qBody.querySelectorAll('.quiz-option').forEach(btn => {
        btn.addEventListener('click', () => {
          if (answered) return;
          answered = true;
          const chosen = btn.dataset.value;
          const correct = String(q.answer).trim().toLowerCase() === chosen.trim().toLowerCase();
          if (correct) { score++; btn.classList.add('correct'); }
          else {
            btn.classList.add('incorrect');
            qBody.querySelectorAll('.quiz-option').forEach(b => {
              if (b.dataset.value.trim().toLowerCase() === String(q.answer).trim().toLowerCase()) b.classList.add('correct');
            });
          }
          qBody.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);
          showFeedback(correct, q.answer);
          nextBtn.style.display = 'inline-flex';
        });
      });

    } else if (q.type === 'typein') {
      qBody.innerHTML = `
        <div class="quiz-input-wrap">
          <input class="quiz-text-input" type="text" placeholder="${q.hint || 'Type your answer…'}" id="quiz-input" autocomplete="off" />
          <button class="btn btn-primary" id="quiz-submit">Check</button>
        </div>`;

      const input = document.getElementById('quiz-input');
      const submit = document.getElementById('quiz-submit');

      function checkAnswer() {
        if (answered) return;
        answered = true;
        const val = input.value.trim().toLowerCase();
        const correct = val === String(q.answer).trim().toLowerCase();
        if (correct) score++;
        input.disabled = true;
        submit.disabled = true;
        showFeedback(correct, q.answer);
        nextBtn.style.display = 'inline-flex';
      }

      submit.addEventListener('click', checkAnswer);
      input.addEventListener('keydown', e => { if (e.key === 'Enter') checkAnswer(); });
      setTimeout(() => input.focus(), 50);
    }
  }

  function showFeedback(correct, answer) {
    feedback.className = `quiz-feedback show ${correct ? 'correct' : 'incorrect'}`;
    feedback.textContent = correct
      ? '✓ Correct!'
      : `✗ Not quite — the answer is: ${answer}`;
  }

  function showResult() {
    area.style.display = 'none';
    result.classList.add('show');
    const pct = Math.round((score / questions.length) * 100);
    scoreEl.textContent = `${score}/${questions.length}`;
    if (pct === 100) scoreMsg.textContent = 'Perfect score! You\'ve got this unit down. 🎉';
    else if (pct >= 80) scoreMsg.textContent = 'Great work! Review any missed questions and try again.';
    else if (pct >= 60) scoreMsg.textContent = 'Good start! Review the reference notes and give it another go.';
    else scoreMsg.textContent = 'Keep at it — review the notes and flashcards, then try again!';
    if (typeof saveScore !== 'undefined') saveScore(unitId, score, questions.length);
  }

  nextBtn?.addEventListener('click', () => {
    current++;
    if (current >= questions.length) showResult();
    else renderQuestion();
  });

  retryBtn?.addEventListener('click', () => {
    current = 0; score = 0; answered = false;
    result.classList.remove('show');
    area.style.display = '';
    updateProgress();
    renderQuestion();
  });

  renderQuestion();
}
