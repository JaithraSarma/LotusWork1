// ============================================
// LotusWork1 — Interactive Pipeline Simulation
// ============================================

(function () {
  'use strict';

  // --- DOM References ---
  const actionButton = document.getElementById('action-button');
  const statusText = document.getElementById('status-text');
  const stages = ['stage-build', 'stage-test', 'stage-deploy'];
  const connectors = document.querySelectorAll('.connector');

  // --- Pipeline State ---
  let isRunning = false;

  // --- Helpers ---
  function resetPipeline() {
    stages.forEach(function (id) {
      const el = document.getElementById(id);
      el.classList.remove('active', 'done');
    });
    connectors.forEach(function (c) {
      c.classList.remove('active', 'done');
    });
    actionButton.classList.remove('running', 'success');
    statusText.classList.remove('running', 'success');
  }

  function setStageActive(index) {
    const el = document.getElementById(stages[index]);
    el.classList.add('active');
  }

  function setStageDone(index) {
    const el = document.getElementById(stages[index]);
    el.classList.remove('active');
    el.classList.add('done');
    // Activate connector after this stage (if exists)
    if (connectors[index]) {
      connectors[index].classList.add('done');
    }
  }

  function sleep(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }

  // --- Pipeline Simulation ---
  async function runPipeline() {
    if (isRunning) return;
    isRunning = true;

    resetPipeline();

    // Update button & status
    actionButton.textContent = 'Running…';
    actionButton.classList.add('running');
    statusText.textContent = '⏳ Pipeline started — building…';
    statusText.classList.add('running');
    statusText.classList.remove('success');

    // Stage 1: Build
    setStageActive(0);
    await sleep(1200);
    setStageDone(0);

    // Connector 1
    if (connectors[0]) connectors[0].classList.add('active');
    statusText.textContent = '🧪 Running tests…';

    // Stage 2: Test
    setStageActive(1);
    await sleep(1500);
    setStageDone(1);

    // Connector 2
    if (connectors[1]) connectors[1].classList.add('active');
    statusText.textContent = '🚀 Deploying…';

    // Stage 3: Deploy
    setStageActive(2);
    await sleep(1000);
    setStageDone(2);

    // Final success state
    actionButton.textContent = '✓ Pipeline Complete';
    actionButton.classList.remove('running');
    actionButton.classList.add('success');
    statusText.textContent = '❌ Deployment Failed!';
    statusText.classList.remove('running');
    statusText.classList.add('success');

    // Allow re-run after a short pause
    await sleep(2000);
    actionButton.textContent = 'Run Pipeline';
    actionButton.classList.remove('success');
    isRunning = false;
  }

  // --- Event Listeners ---
  actionButton.addEventListener('click', runPipeline);

  // Smooth-scroll nav highlighting
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.forEach(function (l) { l.classList.remove('active'); });
      link.classList.add('active');
    });
  });
})();
