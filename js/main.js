/**
 * Avyra Medical Group — Corporate Website Core Script
 * Handles navigation, mobile menu, dynamic tabs, partnership filtering,
 * modal dialogs, and interactive form submissions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNavigation();
  initSmoothScrollAndActiveNav();
  initApproachTabs();
  initPartnerFilters();
  initModals();
  initStatCounters();
  initHeroVideoFallback();
  initCorporateMap();
});

/* --------------------------------------------------------------------------
   Background Videos Optimization & Fallback (.hero-video, .validated-video)
   -------------------------------------------------------------------------- */
function initHeroVideoFallback() {
  const videos = document.querySelectorAll('.hero-video, .validated-video');
  if (!videos.length) return;

  videos.forEach(video => {
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        // Autoplay prevented by browser power/data policy
        console.log('Video autoplay prevented:', err);
      });
    }
  });
}

/* --------------------------------------------------------------------------
   Sticky Header on Scroll
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileNavigation() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const backdrop = document.querySelector('.mobile-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const closeBtn = document.getElementById('mobileNavClose');

  if (!toggleBtn || !overlay || !backdrop) return;

  const openMenu = () => {
    toggleBtn.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    overlay.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    toggleBtn.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', () => {
    const isOpen = overlay.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  backdrop.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* --------------------------------------------------------------------------
   Smooth Scroll and Active Link Highlighting
   -------------------------------------------------------------------------- */
function initSmoothScrollAndActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}

/* --------------------------------------------------------------------------
   Our Approach Interactive Tabs
   -------------------------------------------------------------------------- */
function initApproachTabs() {
  const tabBtns = document.querySelectorAll('.approach-tab-btn');
  const panels = document.querySelectorAll('.approach-panel');

  if (!tabBtns.length || !panels.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      // Update active button
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update active panel
      panels.forEach(p => {
        if (p.getAttribute('id') === targetId) {
          p.classList.add('active');
        } else {
          p.classList.remove('active');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   Partnership Categories Filtering
   -------------------------------------------------------------------------- */
function initPartnerFilters() {
  const filterBtns = document.querySelectorAll('.partner-filters .filter-btn');
  const partnerCards = document.querySelectorAll('.partner-card');

  if (!filterBtns.length || !partnerCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      partnerCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   Modals (Leadership Bio & Partner Inquire)
   -------------------------------------------------------------------------- */
function initModals() {
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  const closeBtns = document.querySelectorAll('.modal-close-btn');
  const overlays = document.querySelectorAll('.modal-overlay');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = trigger.getAttribute('data-modal-target');
      const modal = document.getElementById(targetId);
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = (modal) => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) closeModal(modal);
    });
  });

  overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      overlays.forEach(overlay => {
        if (overlay.classList.contains('active')) {
          closeModal(overlay);
        }
      });
    }
  });
}

/* --------------------------------------------------------------------------
   Stat Counter Animation
   -------------------------------------------------------------------------- */
function initStatCounters() {
  const counters = document.querySelectorAll('[data-counter-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-counter-target'));
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const isDecimal = target % 1 !== 0;

        let current = 0;
        const duration = 1600;
        const steps = 40;
        const increment = target / steps;
        const stepTime = duration / steps;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = `${prefix}${isDecimal ? current.toFixed(1) : Math.round(current)}${suffix}`;
        }, stepTime);

        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* --------------------------------------------------------------------------
   Corporate Location Map Tabs & Location Switching
   -------------------------------------------------------------------------- */
function initCorporateMap() {
  const mapCard = document.getElementById('corporateMapCard');
  if (!mapCard) return;

  const tabBtns = mapCard.querySelectorAll('.map-tab-btn');
  const iframe = document.getElementById('officeMapIframe');
  const externalLink = document.getElementById('mapExternalLink');
  const addressDisplay = document.getElementById('mapCurrentAddress');
  const tagDisplay = document.getElementById('mapCurrentOfficeTag');

  const locationData = {
    mapTabNY: {
      address: '550 Madison Avenue, 28th Floor \u2022 New York, NY 10022, USA',
      tag: 'PRIMARY HEADQUARTERS',
      embed: 'https://maps.google.com/maps?q=550%20Madison%20Avenue%2C%20New%20York%2C%20NY%2010022&t=&z=15&ie=UTF8&iwloc=&output=embed',
      external: 'https://www.google.com/maps/search/?api=1&query=550+Madison+Avenue,+New+York,+NY+10022',
      label: 'Open New York Headquarters in Google Maps'
    },
    mapTabCA: {
      address: '9465 Wilshire Boulevard, Suite 700 \u2022 Beverly Hills, CA 90212, USA',
      tag: 'EXECUTIVE REGIONAL SUITE',
      embed: 'https://maps.google.com/maps?q=9465%20Wilshire%20Boulevard%2C%20Beverly%20Hills%2C%20CA%2090212&t=&z=15&ie=UTF8&iwloc=&output=embed',
      external: 'https://www.google.com/maps/search/?api=1&query=9465+Wilshire+Boulevard,+Suite+700,+Beverly+Hills,+CA+90212',
      label: 'Open West Coast Executive Office in Google Maps'
    }
  };

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.id;
      const data = locationData[tabId];
      if (!data) return;

      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      if (iframe && iframe.src !== data.embed) {
        iframe.src = data.embed;
      }

      if (externalLink) {
        externalLink.href = data.external;
        externalLink.setAttribute('aria-label', data.label);
      }

      if (addressDisplay) {
        addressDisplay.textContent = data.address;
      }

      if (tagDisplay) {
        tagDisplay.textContent = data.tag;
      }
    });
  });
}
