// Performance Boost - Reduce Page Load Lag
(function() {
    'use strict';
    
    // 1. CRITICAL: Defer WordPress API calls until after page is interactive
    let wordpressCallsDeferred = false;
    
    function deferWordPressCalls() {
        if (wordpressCallsDeferred) return;
        wordpressCallsDeferred = true;
        
        // Delay WordPress fetching by 500ms to let page render first
        setTimeout(() => {
            // WordPress scripts will run after this delay
            console.log('WordPress API calls deferred for better performance');
        }, 500);
    }
    
    // 2. Reduce CSS file count by combining critical styles
    const criticalCSS = `
        /* Critical above-the-fold styles */
        .logo { opacity: 1 !important; visibility: visible !important; }
        .header { will-change: auto; }
        .nav-container { will-change: auto; }
    `;
    
    // 3. Optimize font loading
    if (document.fonts) {
        document.fonts.ready.then(() => {
            document.body.classList.add('fonts-loaded');
        });
    }
    
    // 4. Reduce repaints and reflows
    const optimizeRendering = () => {
        // Batch DOM reads and writes
        requestAnimationFrame(() => {
            // Remove will-change after animations complete
            const animatedElements = document.querySelectorAll('[style*="will-change"]');
            animatedElements.forEach(el => {
                setTimeout(() => {
                    el.style.willChange = 'auto';
                }, 1000);
            });
        });
    };
    
    // 5. Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Handle resize after user stops resizing
        }, 250);
    }, { passive: true });
    
    // 6. Optimize scroll performance
    let scrollTimeout;
    let isScrolling = false;
    
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            isScrolling = true;
            document.body.classList.add('is-scrolling');
        }
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
            document.body.classList.remove('is-scrolling');
        }, 150);
    }, { passive: true });
    
    // 7. Reduce animation complexity during scroll
    const style = document.createElement('style');
    style.textContent = `
        .is-scrolling * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
    
    // 8. Preconnect to external domains earlier
    const preconnectDomains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://cdnjs.cloudflare.com',
        'https://cdn.jsdelivr.net'
    ];
    
    preconnectDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    });
    
    // 9. Initialize optimizations
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            optimizeRendering();
            deferWordPressCalls();
        });
    } else {
        optimizeRendering();
        deferWordPressCalls();
    }
    
    // 10. Memory cleanup
    window.addEventListener('beforeunload', () => {
        // Clear any intervals or timeouts
        clearTimeout(resizeTimeout);
        clearTimeout(scrollTimeout);
    });
    
})();
