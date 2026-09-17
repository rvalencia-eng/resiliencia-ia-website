// app.js - Main Application Logic for Resiliencia Artificial V2 (With GA4 Tracking)

document.addEventListener('DOMContentLoaded', () => {
  // Lucide Icons Init
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtnV2');
  const mobileMenu = document.getElementById('mobileMenuV2');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Operating Model Tabs V2
  const modelTabs = document.querySelectorAll('.model-tab-btn-v2');
  const modelPhasePanels = document.querySelectorAll('.model-phase-panel-v2');

  modelTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetPhase = tab.dataset.phase;

      modelTabs.forEach(t => {
        t.classList.remove('active', 'border-cerulean-400', 'text-cerulean-400', 'bg-cerulean-950/40');
        t.classList.add('border-slate-700', 'text-slate-400');
      });

      tab.classList.add('active', 'border-cerulean-400', 'text-cerulean-400', 'bg-cerulean-950/40');
      tab.classList.remove('border-slate-700', 'text-slate-400');

      modelPhasePanels.forEach(panel => {
        if (panel.id === `phase-v2-${targetPhase}`) {
          panel.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
        }
      });

      // GA4 Event
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'select_operating_model_phase', {
          'phase_number': targetPhase
        });
      }
    });
  });

  // Case Studies Filter & Search V2
  const filterBtns = document.querySelectorAll('.case-filter-btn-v2');
  const caseCards = document.querySelectorAll('.case-card-v2');
  const caseSearchInput = document.getElementById('caseSearchInputV2');

  function filterCases() {
    const activeFilter = document.querySelector('.case-filter-btn-v2.active')?.dataset.filter || 'all';
    const searchQuery = (caseSearchInput?.value || '').toLowerCase();

    caseCards.forEach(card => {
      const category = card.dataset.category;
      const text = card.textContent.toLowerCase();

      const matchesCategory = activeFilter === 'all' || category === activeFilter;
      const matchesSearch = !searchQuery || text.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active', 'bg-cerulean-500', 'text-slate-950');
        b.classList.add('bg-slate-800', 'text-slate-300');
      });
      btn.classList.add('active', 'bg-cerulean-500', 'text-slate-950');
      btn.classList.remove('bg-slate-800', 'text-slate-300');
      filterCases();

      if (typeof window.gtag === 'function') {
        window.gtag('event', 'filter_case_studies', {
          'category': btn.dataset.filter
        });
      }
    });
  });

  if (caseSearchInput) {
    caseSearchInput.addEventListener('input', filterCases);
  }

  // Contact Form Submission V2
  const contactForm = document.getElementById('contactFormV2');
  const modalSuccess = document.getElementById('modalSuccessV2');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('formNameV2')?.value;
      const email = document.getElementById('formEmailV2')?.value;
      const company = document.getElementById('formCompanyV2')?.value;
      const service = document.getElementById('formServiceV2')?.value;

      console.log('Lead recibido:', { name, email, company, service });

      // GA4 Lead Generation Event
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          'event_category': 'Engagement',
          'event_label': service,
          'value': 1.0
        });
      }

      if (modalSuccess) {
        modalSuccess.classList.remove('hidden');
        modalSuccess.classList.add('flex');
      }
      contactForm.reset();
    });
  }

  // Close Modal
  const closeModalBtn = document.getElementById('closeModalBtnV2');
  if (closeModalBtn && modalSuccess) {
    closeModalBtn.addEventListener('click', () => {
      modalSuccess.classList.add('hidden');
      modalSuccess.classList.remove('flex');
    });
  }
});
