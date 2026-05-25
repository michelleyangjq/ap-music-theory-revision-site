// flashcards.js — reusable flip-card engine
// Usage: initFlashcards(cardArray)
// cardArray = [{ front: "Term", back: "Definition" }, ...]

function initFlashcards(cards) {
  let index = 0;
  let shuffled = [...cards];

  const scene   = document.getElementById('flashcard-scene');
  const front   = document.getElementById('card-front-text');
  const back    = document.getElementById('card-back-text');
  const counter = document.getElementById('flashcard-counter');
  const prevBtn = document.getElementById('fc-prev');
  const nextBtn = document.getElementById('fc-next');
  const shuffleBtn = document.getElementById('fc-shuffle');

  if (!scene) return;

  function render() {
    front.textContent = shuffled[index].front;
    back.textContent  = shuffled[index].back;
    counter.textContent = `${index + 1} / ${shuffled.length}`;
    scene.classList.remove('flipped');
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === shuffled.length - 1;
  }

  scene.addEventListener('click', () => scene.classList.toggle('flipped'));

  prevBtn?.addEventListener('click', () => { if (index > 0) { index--; render(); } });
  nextBtn?.addEventListener('click', () => { if (index < shuffled.length - 1) { index++; render(); } });

  shuffleBtn?.addEventListener('click', () => {
    shuffled = [...cards].sort(() => Math.random() - 0.5);
    index = 0;
    render();
  });

  render();
}
