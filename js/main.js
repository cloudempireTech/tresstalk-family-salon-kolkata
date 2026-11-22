/**
 * Tresstalk Family Salon — Main Interactive Controller
 * Dynamic Typewriter, Glide-in Scroll Observer, Telemetry Counter, Mobile Drawer & Interactive Hair Estimator
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Scroll Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 2. Mobile Drawer Navigation Toggle
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerLinks = document.querySelectorAll('.mobile-nav-link');

  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
      hamburgerBtn.innerHTML = isOpen
        ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        hamburgerBtn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });
  }

  // 3. Dynamic Typewriter Effect
  const typewriterEl = document.querySelector('.dynamic-typewriter');
  if (typewriterEl) {
    const phrases = [
      'Bespoke Balayage',
      "L'Oréal Metal Detox",
      'Keratin & Botox Therapy',
      'Bridal & Groom Styling',
      'Precision Layer Cuts'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
      const current = phrases[phraseIndex];
      if (isDeleting) {
        typewriterEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
      } else {
        typewriterEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 110;
      }

      if (!isDeleting && charIndex === current.length) {
        typeSpeed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 450;
      }

      setTimeout(type, typeSpeed);
    }
    type();
  }

  // 4. Glide-in Scroll Animations (IntersectionObserver)
  const glideElements = document.querySelectorAll('.glide-in');
  if ('IntersectionObserver' in window && glideElements.length > 0) {
    const glideObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12
    });

    glideElements.forEach(el => glideObserver.observe(el));
  } else {
    glideElements.forEach(el => el.classList.add('in-view'));
  }

  // 5. Animated Telemetry Counters
  const counterElements = document.querySelectorAll('.stat-counter');
  if ('IntersectionObserver' in window && counterElements.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-target') || '0');
          const prefix = el.getAttribute('data-prefix') || '';
          const suffix = el.getAttribute('data-suffix') || '';
          const isDecimal = target % 1 !== 0;
          const duration = 1800;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = target * easeOut;

            el.textContent = `${prefix}${isDecimal ? currentVal.toFixed(1) : Math.floor(currentVal).toLocaleString()}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = `${prefix}${isDecimal ? target.toFixed(1) : target.toLocaleString()}${suffix}`;
            }
          }

          requestAnimationFrame(updateCounter);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    counterElements.forEach(el => counterObserver.observe(el));
  }

  // 6. Interactive Hair Consultation & Booking Selector
  const categorySelect = document.getElementById('consult-category');
  const lengthSelect = document.getElementById('consult-length');
  const stylistSelect = document.getElementById('consult-stylist');
  const dateInput = document.getElementById('consult-date');
  const timeSelect = document.getElementById('consult-time');
  const consultForm = document.getElementById('hair-consult-form');

  const previewService = document.getElementById('preview-service');
  const previewLength = document.getElementById('preview-length');
  const previewStylist = document.getElementById('preview-stylist');
  const previewDuration = document.getElementById('preview-duration');
  const previewSlot = document.getElementById('preview-slot');

  function updatePreview() {
    if (!categorySelect) return;

    const cat = categorySelect.value || 'Balayage & French Blending';
    const len = lengthSelect ? lengthSelect.value : 'Mid-Back Length';
    const stylist = stylistSelect ? stylistSelect.value : 'Master Color Specialist';
    const date = dateInput && dateInput.value ? dateInput.value : 'Selected Date';
    const time = timeSelect ? timeSelect.value : '11:00 AM';

    if (previewService) previewService.textContent = cat;
    if (previewLength) previewLength.textContent = len;
    if (previewStylist) previewStylist.textContent = stylist;
    if (previewSlot) previewSlot.textContent = `${date} at ${time}`;

    // Estimated duration calculation
    let est = '60 - 90 mins';
    if (cat.includes('Balayage')) est = '3.5 - 4.5 hours';
    else if (cat.includes('Keratin') || cat.includes('Botox')) est = '2.5 - 3.5 hours';
    else if (cat.includes('Detox')) est = '90 - 120 mins';
    else if (cat.includes('Bridal')) est = '3 - 4 hours';
    else if (cat.includes('Facial')) est = '75 - 90 mins';

    if (previewDuration) previewDuration.textContent = est;
  }

  if (categorySelect) {
    categorySelect.addEventListener('change', updatePreview);
    if (lengthSelect) lengthSelect.addEventListener('change', updatePreview);
    if (stylistSelect) stylistSelect.addEventListener('change', updatePreview);
    if (dateInput) dateInput.addEventListener('change', updatePreview);
    if (timeSelect) timeSelect.addEventListener('change', updatePreview);
    updatePreview();
  }

  if (consultForm) {
    consultForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const cat = categorySelect?.value || 'Hair Treatment';
      const len = lengthSelect?.value || 'Standard';
      const stylist = stylistSelect?.value || 'Any Senior Stylist';
      const date = dateInput?.value || 'Soonest available';
      const time = timeSelect?.value || 'Preferred Time';
      const clientName = document.getElementById('client-name')?.value || 'Client';

      const message = `Hello Tresstalk Family Salon! 👋\n\nI would like to book a salon appointment / hair consultation:\n• Service: ${cat}\n• Hair Length / Type: ${len}\n• Preferred Stylist: ${stylist}\n• Preferred Slot: ${date} around ${time}\n• Client Name: ${clientName}\n\nCould you please confirm availability at your Allenby Road, Bhowanipore salon? Thank you!`;

      const waUrl = `https://wa.me/919051053902?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');
    });
  }

  // 7. Video Control Button (Play/Pause)
  const videoControlBtn = document.querySelector('.video-control-btn');
  const heroVideo = document.querySelector('.hero-video');

  if (videoControlBtn && heroVideo) {
    videoControlBtn.addEventListener('click', () => {
      if (heroVideo.paused) {
        heroVideo.play();
        videoControlBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;
        videoControlBtn.setAttribute('aria-label', 'Pause Hero Video');
      } else {
        heroVideo.pause();
        videoControlBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"></polygon></svg>`;
        videoControlBtn.setAttribute('aria-label', 'Play Hero Video');
      }
    });
  }

  // 8. Gallery Filter Rail
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-card');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter') || 'all';

        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category') || '';
          if (filter === 'all' || category === filter) {
            item.style.display = 'block';
            setTimeout(() => item.classList.add('in-view'), 50);
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
});
