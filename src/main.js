import './style.css'

// Navbar scroll logic
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Simple intersection observer for future scroll animations throughout the page
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});

// Image Comparison Sliders
document.querySelectorAll('.comparison-slider').forEach(slider => {
  let isDown = false;
  
  const moveSlider = (e) => {
    if (!isDown) return;
    const rect = slider.getBoundingClientRect();
    let x = (e.clientX || e.touches[0].clientX) - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    const percent = (x / rect.width) * 100;
    slider.style.setProperty('--pos', `${percent}%`);
  };

  slider.addEventListener('mousedown', () => isDown = true);
  window.addEventListener('mouseup', () => isDown = false);
  window.addEventListener('mousemove', moveSlider);

  slider.addEventListener('touchstart', () => isDown = true);
  window.addEventListener('touchend', () => isDown = false);
  window.addEventListener('touchmove', moveSlider);
});

// Accordion Logic
const accordionItems = document.querySelectorAll('.accordion-item');

if (accordionItems.length) {
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Independent toggling for FAQ items
      if (item.classList.contains('faq-item')) {
        item.classList.toggle('active');
      } else {
        // Procedure Accordion: Keep one open, switch images
        if (isActive) return;
        
        // Remove active from sibling procedure items only
        const siblings = item.closest('.accordion-list').querySelectorAll('.accordion-item');
        siblings.forEach(acc => acc.classList.remove('active'));
        
        item.classList.add('active');
        
        // Image fade logic
        const accordionImage = document.getElementById('accordionImage');
        if (accordionImage) {
          const newSrc = item.getAttribute('data-image');
          if (newSrc) {
            accordionImage.classList.add('fade-out');
            setTimeout(() => {
              accordionImage.src = newSrc;
              accordionImage.classList.remove('fade-out');
            }, 400);
          }
        }
      }
    });
  });
}
