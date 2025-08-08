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