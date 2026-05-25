// progress.js — save & render per-unit quiz scores

const PROGRESS_KEY = 'apmt_progress';

const unitLabels = {
  unit1: 'Note Reading',
  unit2: 'Scales & Keys',
  unit3: 'Chords',
  unit4: 'Ear Training',
  unit5: 'Form & Analysis',
};

function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {};
  } catch { return {}; }
}

function saveScore(unitId, score, total) {
  const progress = getProgress();
  progress[unitId] = { score, total, pct: Math.round((score / total) * 100) };
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  renderSidebarProgress();
}

function renderSidebarProgress() {
  const container = document.getElementById('sidebar-progress-items');
  if (!container) return;
  const progress = getProgress();

  container.innerHTML = Object.entries(unitLabels).map(([id, label]) => {
    const p = progress[id];
    const pct = p ? p.pct : 0;
    return `
      <div class="progress-item">
        <div class="progress-item-label">
          <span>${label}</span>
          <span>${pct}%</span>
        </div>
        <div class="progress-bar-track">
          <div class="progress-bar-fill" style="width:${pct}%"></div>
        </div>
      </div>`;
  }).join('');
}

// Auto-render on load
document.addEventListener('DOMContentLoaded', renderSidebarProgress);
