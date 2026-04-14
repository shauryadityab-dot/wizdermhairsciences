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

// Mobile menu toggle
const menuToggle = document.getElementById('mobile-menu');
const navLinksContainer = document.getElementById('nav-links');
const navLinks = document.querySelectorAll('.nav-links a');

if (menuToggle && navLinksContainer) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('is-active');
    navLinksContainer.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('is-active');
      navLinksContainer.classList.remove('active');
    });
  });
}

// Floating Button Logic
const floatingBtn = document.getElementById('floating-btn');
const heroSection = document.querySelector('.hero');

if (floatingBtn && heroSection) {
  window.addEventListener('scroll', () => {
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    if (window.scrollY > heroBottom - 50) {
      floatingBtn.classList.add('visible');
    } else {
      floatingBtn.classList.remove('visible');
    }
  });
}

// Team Process Tabs Logic
const processTabs = document.querySelectorAll('.process-tab');
const progressFill = document.getElementById('progress-fill');
const teamLists = document.querySelectorAll('.team-list');

if (processTabs.length > 0) {
  processTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      processTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const target = tab.getAttribute('data-target');
      
      // Update progress bar
      if (target === 'surgery') {
        progressFill.style.width = '60%';
      } else {
        progressFill.style.width = '100%';
      }
      
      // Update lists
      teamLists.forEach(list => list.classList.add('hidden'));
      document.getElementById(`${target}-team`).classList.remove('hidden');
    });
  });
}

// WCU Auto Slider Logic
const sliderContainer = document.getElementById('wcu-container');
const sliderTrack = document.getElementById('wcu-slider-track');

if (sliderContainer && sliderTrack) {
  let scrollPos = 0;
  let isHovered = false;
  
  sliderContainer.addEventListener('mouseenter', () => isHovered = true);
  sliderContainer.addEventListener('mouseleave', () => isHovered = false);
  sliderContainer.addEventListener('touchstart', () => isHovered = true);
  sliderContainer.addEventListener('touchend', () => { setTimeout(() => isHovered = false, 1500) });
  
  // Clone cards for infinite loop effect if enough cards exist
  const cards = Array.from(sliderTrack.children);
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    sliderTrack.appendChild(clone);
  });

  setInterval(() => {
    if (!isHovered) {
      scrollPos += 1; // scroll speed
      
      // If we've scrolled past the first set of cards, instantly reset to beginning
      if (scrollPos >= sliderTrack.scrollWidth / 2) {
         scrollPos = 0;
      }
      sliderContainer.scrollLeft = scrollPos;
    } else {
      scrollPos = sliderContainer.scrollLeft;
    }
  }, 20);
}
