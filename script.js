document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Logic
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    let mobileMenuOpen = false;

    function toggleMobileMenu() {
        mobileMenuOpen = !mobileMenuOpen;
        mobileMenuOverlay.classList.toggle('active', mobileMenuOpen);
        mobileMenuToggle.classList.toggle('active', mobileMenuOpen);
        document.body.classList.toggle('menu-open', mobileMenuOpen);
        mobileMenuToggle.setAttribute('aria-expanded', mobileMenuOpen);
    }

    mobileMenuToggle.addEventListener('click', toggleMobileMenu);

    // Toggle dropdowns inside mobile menu
    document.querySelectorAll('.nav-items-mobile .has-dropdown > .nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parentItem = this.parentElement;
                
                document.querySelectorAll('.nav-items-mobile .has-dropdown.active').forEach(item => {
                    if (item !== parentItem) {
                        item.classList.remove('active');
                    }
                });
                
                parentItem.classList.toggle('active');
            }
        });
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.mobile-menu-overlay a').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenuOpen) {
                toggleMobileMenu();
            }
        });
    });

    // Close menu on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileMenuOpen) {
            toggleMobileMenu();
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenuOpen && !e.target.closest('.mobile-menu-overlay') && !e.target.closest('.mobile-menu-toggle')) {
            toggleMobileMenu();
        }
    });

    // Hero Slideshow Logic
    const heroSection = document.querySelector('.hero-section');
    const slides = document.querySelectorAll('.hero-bg-slide');
    const dots = document.querySelectorAll('.slide-dot');
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 6000;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function goToSlide(index) {
        if (index === currentSlide) return;
        currentSlide = index;
        showSlide(currentSlide);
        // Reset and restart the interval
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, slideDuration);
    }

    function initSlideshow() {
        // Show the first slide and remove the loading class
        showSlide(0);
        heroSection.classList.remove('loading');
        
        slideInterval = setInterval(nextSlide, slideDuration);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });

        heroSection.addEventListener('mouseenter', () => clearInterval(slideInterval));
        heroSection.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, slideDuration));
    }

    initSlideshow();
    
    // Smooth scroll for CTA buttons
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});


  document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    lazyImages.forEach(img => {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      });
    });
  });


// ========================================
// TOP DESTINATIONS SLIDER
// ========================================

// Wait for Swiper library to load
// Initialize Destinations Swiper with retry mechanism
function initDestinationsSwiper() {
    if (typeof Swiper !== 'undefined') {
        console.log('Initializing destinations swiper...');
        const destinationsSwiper = new Swiper('.destinations-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            loopedSlides: 10,
            autoplay: {
                delay: 1,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
            },
            speed: 5000,
            allowTouchMove: true,
            grabCursor: true,
            centeredSlides: false,
            freeMode: false,
            breakpoints: {
                480: {
                    slidesPerView: 2.5,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 7,
                    spaceBetween: 20,
                },
                1200: {
                    slidesPerView: 8,
                    spaceBetween: 20,
                },
                1400: {
                    slidesPerView: 9,
                    spaceBetween: 20,
                },
            },
        });
        console.log('Destinations swiper initialized successfully!');
        return true;
    } else {
        console.error('Swiper library not loaded yet!');
        return false;
    }
}

// Try to initialize immediately
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(initDestinationsSwiper, 100);
    });
} else {
    setTimeout(initDestinationsSwiper, 100);
}

// Backup: Try again on window load
window.addEventListener('load', function() {
    setTimeout(initDestinationsSwiper, 200);
});
