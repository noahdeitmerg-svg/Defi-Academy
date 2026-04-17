/* ============================================
   DeFi MASTERY — Course Platform Script
   Navigation, progress, calculators
   ============================================ */

(function() {
  'use strict';

  // ---- STATE ----
  const STORAGE_KEY = 'defi_course_progress';
  let state = {
    currentModule: 0,
    currentSlide: 0,
    completedSlides: {},
    checklistState: {}
  };

  // Load saved state
  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        state = { ...state, ...parsed };
      }
    } catch(e) {}
  }

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch(e) {}
  }

  // ---- MODULES & SLIDES ----
  function getAllSlides() {
    return document.querySelectorAll('.slide');
  }

  function getModuleSlides(moduleIdx) {
    return document.querySelectorAll(`.slide[data-module="${moduleIdx}"]`);
  }

  function getSlideKey(modIdx, slideIdx) {
    return `${modIdx}-${slideIdx}`;
  }

  function getTotalSlides() {
    return getAllSlides().length;
  }

  function getCompletedCount() {
    return Object.keys(state.completedSlides).length;
  }

  // ---- NAVIGATION ----
  function navigateTo(moduleIdx, slideIdx) {
    const slides = getAllSlides();
    slides.forEach(s => s.classList.remove('active'));

    const target = document.querySelector(`.slide[data-module="${moduleIdx}"][data-slide="${slideIdx}"]`);
    if (!target) return;

    target.classList.add('active');
    state.currentModule = moduleIdx;
    state.currentSlide = slideIdx;
    saveState();

    updateSidebar();
    updateBreadcrumb();
    updateBottomNav();
    updateProgress();

    // Scroll content to top
    const area = document.querySelector('.content-area');
    if (area) area.scrollTop = 0;

    // Close mobile sidebar
    closeMobileSidebar();
  }

  function nextSlide() {
    // Mark current as completed
    const key = getSlideKey(state.currentModule, state.currentSlide);
    state.completedSlides[key] = true;
    saveState();

    // Find next slide
    const currentSlides = getModuleSlides(state.currentModule);
    const nextIdx = state.currentSlide + 1;

    if (nextIdx < currentSlides.length) {
      navigateTo(state.currentModule, nextIdx);
    } else {
      // Move to next module
      const nextMod = state.currentModule + 1;
      const nextModSlides = getModuleSlides(nextMod);
      if (nextModSlides.length > 0) {
        navigateTo(nextMod, 0);
      }
    }
  }

  function prevSlide() {
    if (state.currentSlide > 0) {
      navigateTo(state.currentModule, state.currentSlide - 1);
    } else if (state.currentModule > 0) {
      const prevMod = state.currentModule - 1;
      const prevSlides = getModuleSlides(prevMod);
      navigateTo(prevMod, prevSlides.length - 1);
    }
  }

  // ---- SIDEBAR ----
  function updateSidebar() {
    // Update module buttons
    document.querySelectorAll('.module-group').forEach(group => {
      const modIdx = parseInt(group.dataset.module);
      const btn = group.querySelector('.module-btn');
      const isActive = modIdx === state.currentModule;

      btn.classList.toggle('active', isActive);
      group.classList.toggle('expanded', isActive);

      // Check if all slides in module completed
      const modSlides = getModuleSlides(modIdx);
      let allDone = modSlides.length > 0;
      modSlides.forEach((s, i) => {
        if (!state.completedSlides[getSlideKey(modIdx, i)]) allDone = false;
      });
      btn.classList.toggle('completed', allDone && !isActive);
    });

    // Update lesson buttons
    document.querySelectorAll('.lesson-btn').forEach(btn => {
      const modIdx = parseInt(btn.dataset.module);
      const slideIdx = parseInt(btn.dataset.slide);
      const isActive = modIdx === state.currentModule && slideIdx === state.currentSlide;
      const isDone = state.completedSlides[getSlideKey(modIdx, slideIdx)];

      btn.classList.toggle('active', isActive);
      btn.classList.toggle('completed', isDone && !isActive);
    });
  }

  function updateBreadcrumb() {
    const bc = document.getElementById('breadcrumb');
    if (!bc) return;

    const moduleNames = [];
    document.querySelectorAll('.module-btn .mod-label').forEach(el => {
      moduleNames.push(el.textContent);
    });

    const currentSlide = document.querySelector('.slide.active');
    const slideTitle = currentSlide ? currentSlide.querySelector('h2')?.textContent || '' : '';
    const modName = moduleNames[state.currentModule] || '';

    bc.innerHTML = `<span class="bc-module">${modName}</span> / ${slideTitle}`;
  }

  function updateBottomNav() {
    const prevBtn = document.getElementById('btn-prev');
    const nextBtn = document.getElementById('btn-next');
    const counter = document.getElementById('slide-counter');

    // Prev disabled on first slide of first module
    if (prevBtn) prevBtn.disabled = (state.currentModule === 0 && state.currentSlide === 0);

    // Check if last slide
    const totalModules = document.querySelectorAll('.module-group').length;
    const lastMod = totalModules - 1;
    const lastModSlides = getModuleSlides(lastMod);
    const isLast = state.currentModule === lastMod && state.currentSlide === lastModSlides.length - 1;

    if (nextBtn) {
      nextBtn.disabled = isLast;
      nextBtn.textContent = isLast ? 'Course Complete' : 'Next →';
      nextBtn.classList.toggle('primary', !isLast);
    }

    // Counter
    if (counter) {
      let globalIdx = 0;
      for (let m = 0; m < state.currentModule; m++) {
        globalIdx += getModuleSlides(m).length;
      }
      globalIdx += state.currentSlide + 1;
      counter.textContent = `${globalIdx} / ${getTotalSlides()}`;
    }
  }

  function updateProgress() {
    const total = getTotalSlides();
    const done = getCompletedCount();
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;

    const fill = document.getElementById('progress-fill');
    const label = document.getElementById('progress-pct');

    if (fill) fill.style.width = pct + '%';
    if (label) label.textContent = pct + '%';
  }

  // ---- MOBILE ----
  function closeMobileSidebar() {
    document.querySelector('.sidebar')?.classList.remove('open');
    document.querySelector('.overlay')?.classList.remove('show');
  }

  // ---- COLLAPSIBLES ----
  function initCollapsibles() {
    document.querySelectorAll('.collapse-toggle').forEach(toggle => {
      toggle.addEventListener('click', () => {
        toggle.classList.toggle('open');
        const body = toggle.nextElementSibling;
        if (body) body.classList.toggle('open');
      });
    });
  }

  // ---- CHECKLISTS ----
  function initChecklists() {
    document.querySelectorAll('.checklist input[type="checkbox"]').forEach(cb => {
      const key = cb.id;
      if (key && state.checklistState[key]) {
        cb.checked = true;
      }
      cb.addEventListener('change', () => {
        if (key) {
          state.checklistState[key] = cb.checked;
          saveState();
        }
      });
    });
  }

  // ---- CALCULATORS ----
  function initCalculators() {
    // Leverage calculator
    const leverageBtn = document.getElementById('calc-leverage-btn');
    if (leverageBtn) {
      leverageBtn.addEventListener('click', () => {
        const collateral = parseFloat(document.getElementById('lev-collateral')?.value) || 0;
        const ltv = parseFloat(document.getElementById('lev-ltv')?.value) || 0;
        const loops = parseInt(document.getElementById('lev-loops')?.value) || 1;
        const stakingApy = parseFloat(document.getElementById('lev-staking-apy')?.value) || 0;
        const borrowApy = parseFloat(document.getElementById('lev-borrow-apy')?.value) || 0;

        let totalExposure = collateral;
        let totalDebt = 0;
        let current = collateral;

        for (let i = 0; i < loops; i++) {
          const borrowed = current * (ltv / 100);
          totalDebt += borrowed;
          totalExposure += borrowed;
          current = borrowed;
        }

        const leverage = totalExposure / collateral;
        const netYield = (leverage * stakingApy) - ((leverage - 1) * borrowApy);
        const annualProfit = collateral * (netYield / 100);

        document.getElementById('lev-result-leverage').textContent = leverage.toFixed(2) + 'x';
        document.getElementById('lev-result-exposure').textContent = totalExposure.toFixed(2) + ' ETH';
        document.getElementById('lev-result-debt').textContent = totalDebt.toFixed(2) + ' ETH';
        document.getElementById('lev-result-yield').textContent = netYield.toFixed(2) + '%';
        document.getElementById('lev-result-profit').textContent = annualProfit.toFixed(3) + ' ETH/yr';
      });
    }

    // Liquidation calculator
    const liqBtn = document.getElementById('calc-liq-btn');
    if (liqBtn) {
      liqBtn.addEventListener('click', () => {
        const collateralVal = parseFloat(document.getElementById('liq-collateral')?.value) || 0;
        const debtVal = parseFloat(document.getElementById('liq-debt')?.value) || 0;
        const liqThreshold = parseFloat(document.getElementById('liq-threshold')?.value) || 82.5;
        const currentPrice = parseFloat(document.getElementById('liq-price')?.value) || 0;

        if (collateralVal === 0 || currentPrice === 0) return;

        const collateralInUnits = collateralVal; // ETH
        const hf = (collateralInUnits * currentPrice * (liqThreshold / 100)) / debtVal;
        const liqPrice = debtVal / (collateralInUnits * (liqThreshold / 100));
        const dropPct = ((currentPrice - liqPrice) / currentPrice * 100);

        document.getElementById('liq-result-hf').textContent = hf.toFixed(2);
        document.getElementById('liq-result-price').textContent = '$' + liqPrice.toFixed(0);
        document.getElementById('liq-result-drop').textContent = dropPct.toFixed(1) + '% drop';

        const hfEl = document.getElementById('liq-result-hf');
        hfEl.style.color = hf < 1.2 ? '#ef4444' : hf < 1.5 ? '#f97316' : '#00d4aa';
      });
    }
  }

  // ---- INIT ----
  function init() {
    loadState();

    // Sidebar module click
    document.querySelectorAll('.module-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const modIdx = parseInt(btn.closest('.module-group').dataset.module);
        navigateTo(modIdx, 0);
      });
    });

    // Sidebar lesson click
    document.querySelectorAll('.lesson-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const modIdx = parseInt(btn.dataset.module);
        const slideIdx = parseInt(btn.dataset.slide);
        navigateTo(modIdx, slideIdx);
      });
    });

    // Bottom nav
    document.getElementById('btn-prev')?.addEventListener('click', prevSlide);
    document.getElementById('btn-next')?.addEventListener('click', nextSlide);

    // Mobile menu
    document.querySelector('.menu-toggle')?.addEventListener('click', () => {
      document.querySelector('.sidebar')?.classList.toggle('open');
      document.querySelector('.overlay')?.classList.toggle('show');
    });

    document.querySelector('.overlay')?.addEventListener('click', closeMobileSidebar);

    // Keyboard nav
    document.addEventListener('keydown', e => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); nextSlide(); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); prevSlide(); }
    });

    initCollapsibles();
    initChecklists();
    initCalculators();

    // Navigate to saved position
    navigateTo(state.currentModule, state.currentSlide);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
