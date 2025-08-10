document.addEventListener('DOMContentLoaded', () => {
  const pages = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('.nav-menu a');
  let currentPageIndex = 0;
  let isScrolling = false;
  let scrollTimeout;

  // --- Debounce function to limit scroll event frequency ---
  function debounce(func, delay) {
    return function(...args) {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  // --- Function to scroll to a specific page index ---
  function scrollToIndex(index) {
    if (index < 0 || index >= pages.length) return;
    isScrolling = true;
    currentPageIndex = index;

    pages[index].scrollIntoView({ behavior: 'smooth' });

    // Update active classes after scrolling has had time to start
    setTimeout(() => {
      updateActiveElements();
      isScrolling = false;
    }, 700); // Match this timeout to scroll behavior duration
  }

  // --- Function to handle the debounced scroll ---
  const handleDebouncedScroll = debounce((scrollDirection) => {
    if (isScrolling) return;
    if (scrollDirection === 'down') {
      scrollToIndex(currentPageIndex + 1);
    } else {
      scrollToIndex(currentPageIndex - 1);
    }
  }, 100); // 100ms delay for debouncing

  // --- Function to update active navigation and page classes ---
  function updateActiveElements() {
    navLinks.forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`.nav-menu a[data-index="${currentPageIndex}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
    
    pages.forEach((page, index) => {
        if (index === currentPageIndex) {
            page.classList.add('active');
        } else {
            page.classList.remove('active');
        }
    });
  }

  // --- Event Listeners ---
  document.addEventListener('wheel', (e) => {
    e.preventDefault(); // Prevent default scroll to avoid interference
    const scrollDirection = e.deltaY > 0 ? 'down' : 'up';
    handleDebouncedScroll(scrollDirection);
  }, { passive: false });

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetIndex = parseInt(e.currentTarget.getAttribute('data-index'));
      if (!isScrolling) {
        scrollToIndex(targetIndex);
      }
    });
  });
  
  document.querySelector('.nav-logo').addEventListener('click', (e) => {
    e.preventDefault();
    if (!isScrolling) {
      scrollToIndex(0);
    }
  });

  // --- Initial state setup ---
  // A small delay to ensure the page is fully ready before the first animation class is added
  setTimeout(() => {
      updateActiveElements();
  }, 100);
});
