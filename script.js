document.addEventListener('DOMContentLoaded', () => {

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

  
  // --- Scroll-triggered Fade-in Animations ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing after it's visible
      }
    });
  }, {
    threshold: 0.1
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

});
