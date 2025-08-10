document.addEventListener('DOMContentLoaded', () => {

  // --- Interactive Cursor Spotlight ---
  const spotlight = document.getElementById('cursor-spotlight');
  document.addEventListener('mousemove', (e) => {
    window.requestAnimationFrame(() => {
      spotlight.style.left = `${e.clientX}px`;
      spotlight.style.top = `${e.clientY}px`;
    });
  });

  // --- Smooth Scrolling for Navigation ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = document.getElementById('header').offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Sticky Stacking Section Animation on Scroll ---
  const pages = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('.nav-menu a');

  window.addEventListener('scroll', () => {
    let currentActive = '';
    pages.forEach((page, i) => {
      const rect = page.getBoundingClientRect();
      const scaleValue = Math.max(0.9, 1 - (rect.top / window.innerHeight) * 0.1);
      const opacityValue = Math.max(0.5, 1 - (rect.top / window.innerHeight) * 0.5);

      if (rect.top <= 100 && rect.bottom >= 100) {
        currentActive = page.id;
      }
      
      // We apply the transform only to the sections that are "behind" the current one
      if (rect.top < 0 && i < pages.length -1) {
        // The hero section (index 0) should not scale
        if (i > 0) {
            pages[i].style.transform = `scale(${Math.min(1, scaleValue)})`;
            pages[i].style.opacity = `${Math.min(1, opacityValue)}`;
        }
      } else {
        pages[i].style.transform = 'scale(1)';
        pages[i].style.opacity = '1';
      }
    });

    // Update active navigation link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href') === `#${currentActive}`) {
            link.classList.add('active');
        }
    });
  });
});
