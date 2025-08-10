document.addEventListener('DOMContentLoaded', () => {
  const pages = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('.nav-menu a');
  let currentPageIndex = 0;
  let isScrolling = false;

  // Function to scroll to a specific page index
  function scrollToIndex(index) {
    if (isScrolling || index < 0 || index >= pages.length) return;
    isScrolling = true;
    currentPageIndex = index;

    pages[index].scrollIntoView({ behavior: 'smooth' });

    // Update active classes after scrolling
    setTimeout(() => {
      updateActiveElements();
      isScrolling = false;
    }, 700); // Match this timeout to scroll behavior duration
  }

  // Function to update active navigation and page classes
  function updateActiveElements() {
    // Update nav links
    navLinks.forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`.nav-menu a[data-index="${currentPageIndex}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
    
    // Update page for animations
    pages.forEach(page => page.classList.remove('active'));
    pages[currentPageIndex].classList.add('active');
  }

  // Handle wheel event for scroll-jacking
  document.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    
    const scrollDirection = e.deltaY > 0 ? 'down' : 'up';
    
    if (scrollDirection === 'down') {
      scrollToIndex(currentPageIndex + 1);
    } else {
      scrollToIndex(currentPageIndex - 1);
    }
  }, { passive: false });


  // Handle navigation link clicks
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetIndex = parseInt(e.currentTarget.getAttribute('data-index'));
      scrollToIndex(targetIndex);
    });
  });
  
  // Handle logo click to go to top
   document.querySelector('.nav-logo').addEventListener('click', (e) => {
      e.preventDefault();
      scrollToIndex(0);
   });


  // Initial state setup
  updateActiveElements();
});
