const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

if (navToggle) {
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });

  navLinks.forEach((link) =>
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
    })
  );
}

// Hero slider
const heroSlides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

function activateSlide(index) {
  heroSlides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === index);
  });
}

if (heroSlides.length > 0) {
  activateSlide(currentSlide);
  setInterval(() => {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    activateSlide(currentSlide);
  }, 5000);
}

// Testimonials slider (auto scroll)
const testimonialTrack = document.querySelector('.testimonial-track');
if (testimonialTrack) {
  let scrollPosition = 0;
  const scrollStep = 360;
  setInterval(() => {
    if (testimonialTrack.scrollWidth - testimonialTrack.clientWidth - scrollPosition <= 0) {
      scrollPosition = 0;
    } else {
      scrollPosition += scrollStep;
    }
    testimonialTrack.scrollTo({ left: scrollPosition, behavior: 'smooth' });
  }, 4500);
}

// Fade-in reveal
const fadeEls = document.querySelectorAll('.fade-in');
if (fadeEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  fadeEls.forEach((el) => observer.observe(el));
}

// Portfolio filters
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('[data-category]');

if (filterButtons.length && portfolioItems.length) {
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.filter;
      filterButtons.forEach((button) => button.classList.remove('active'));
      btn.classList.add('active');

      portfolioItems.forEach((item) => {
        const match = category === 'all' || item.dataset.category === category;
        item.style.display = match ? '' : 'none';
      });
    });
  });
}

// Project gallery controls
const projectSlides = document.querySelectorAll('.project-slide');
const projectPrev = document.querySelector('[data-project-prev]');
const projectNext = document.querySelector('[data-project-next]');
let projectIndex = 0;

function setProjectSlide(index) {
  projectSlides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === index);
  });
}

if (projectSlides.length) {
  setProjectSlide(projectIndex);

  const goTo = (direction) => {
    projectIndex = (projectIndex + direction + projectSlides.length) % projectSlides.length;
    setProjectSlide(projectIndex);
  };

  projectPrev?.addEventListener('click', () => goTo(-1));
  projectNext?.addEventListener('click', () => goTo(1));
}

// Contact form email handler
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      params.append(key, value);
    });

    const mailtoLink = document.createElement('a');
    const subject = encodeURIComponent('طلب استشارة تصميم داخلي');
    const body = encodeURIComponent(
      `الاسم: ${params.get('name')}` +
        `\nالهاتف: ${params.get('phone')}` +
        `\nالبريد الإلكتروني: ${params.get('email')}` +
        `\nالخدمة المطلوبة: ${params.get('service')}` +
        `\nالرسالة:\n${params.get('message')}`
    );

    mailtoLink.href = `mailto:projects@manazeldecor.com?subject=${subject}&body=${body}`;
    mailtoLink.style.display = 'none';
    document.body.appendChild(mailtoLink);
    mailtoLink.click();
    document.body.removeChild(mailtoLink);

    contactForm.reset();
  });
}
