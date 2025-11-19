// Mobile Menu Initialization - Works on all pages
(function() {
    'use strict';
    
    // Wait for DOM to be ready
    function initMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        
        if (!mobileMenuToggle || !mobileMenuOverlay) {
            console.warn('Mobile menu elements not found on this page');
            return;
        }
        
        console.log('Mobile menu initialized successfully');
        
        // Add touch support for better mobile experience
        let touchStartY = 0;
        let touchEndY = 0;
        
        mobileMenuOverlay.addEventListener('touchstart', function(e) {
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });
        
        mobileMenuOverlay.addEventListener('touchend', function(e) {
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            // Swipe left to close menu
            if (touchStartY - touchEndY > 50) {
                // Swiped up
            } else if (touchEndY - touchStartY > 50) {
                // Swiped down
            }
        }
        
        // Ensure menu closes on orientation change
        window.addEventListener('orientationchange', function() {
            if (mobileMenuOverlay.classList.contains('active')) {
                mobileMenuToggle.click();
            }
        });
        
        // Add visual feedback for touch
        const menuLinks = document.querySelectorAll('.nav-items-mobile .nav-link');
        menuLinks.forEach(link => {
            link.addEventListener('touchstart', function() {
                this.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
            }, { passive: true });
            
            link.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.backgroundColor = '';
                }, 200);
            }, { passive: true });
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        initMobileMenu();
    }
})();
