const SCRIPT_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzxgr2tGSjN7Omo3LLu6bB9eHOhH_0LcfZbU3q5Ml_LHlZjGNlTjwgfd01YpJ2FRpkh/exec';

function initMobileNav() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('show');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    navLinks.classList.remove('show');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  });
}

function activateCurrentNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((link) => {
    const href = link.getAttribute('href') || '';
    if (href === currentPage || (href === 'index.html' && currentPage === '')) {
      link.classList.add('active');
    }
  });
}

function initHeroCarousel() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dots .dot');

  if (slides.length === 0 || dots.length === 0) return;

  let currentSlide = 0;
  let timerId;
  const updateSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      dots[i]?.classList.toggle('active', i === index);
    });
  };

  const queueNextSlide = () => {
    window.clearInterval(timerId);
    timerId = window.setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlide(currentSlide);
    }, 5000);
  };

  dots.forEach((dot, index) => {
    dot.setAttribute('role', 'button');
    dot.setAttribute('tabindex', '0');
    dot.setAttribute('aria-label', `Show campus photo ${index + 1}`);

    dot.addEventListener('click', () => {
      currentSlide = index;
      updateSlide(index);
      queueNextSlide();
    });

    dot.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      currentSlide = index;
      updateSlide(index);
      queueNextSlide();
    });
  });

  updateSlide(currentSlide);
  queueNextSlide();
}

function sendForm(formElement, statusElement) {
  const statusText = document.getElementById(statusElement);
  if (!formElement || !statusText) return;

  formElement.addEventListener('submit', async (event) => {
    event.preventDefault();
    statusText.textContent = 'Submitting...';
    statusText.style.color = varOrDefault('--muted', '#4b5563');

    const formData = new FormData(formElement);

    try {
      const response = await fetch(SCRIPT_ENDPOINT, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        statusText.textContent = 'Submitted successfully. We will contact you soon.';
        statusText.style.color = '#16a34a';
        formElement.reset();
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      statusText.textContent = 'Submission failed. Please try again later or call the school.';
      statusText.style.color = '#dc2626';
    }
  });
}

function varOrDefault(name, fallback) {
  return getComputedStyle(document.documentElement).getPropertyValue(name) || fallback;
}

function initForms() {
  const admissionForm = document.getElementById('admissionForm');
  const contactForm = document.getElementById('contactForm');

  if (admissionForm) {
    sendForm(admissionForm, 'formStatus');
  }
  if (contactForm) {
    sendForm(contactForm, 'contactStatus');
  }
}

function init() {
  initMobileNav();
  activateCurrentNavLink();
  initHeroCarousel();
  initForms();
}

document.addEventListener('DOMContentLoaded', init);
console.log('%cS.S.S.N.R.D. Inter College & Public School', 'color:#1e72f5;font-size:13px;font-weight:bold;');
