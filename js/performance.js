// Performance optimizations
(function() {
    'use strict';
    
    // Image loading optimization
    document.addEventListener('DOMContentLoaded', function() {
        // Add lazy loading to all images except logo
        const images = document.querySelectorAll('img:not(.logo-img)');
        images.forEach((img, index) => {
            // Skip first image (logo)
            if (index > 0 && !img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Add loaded class when image loads
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', function() {
                    this.classList.add('loaded');
                });
            }
        });
        
        // Lazy load YouTube video after page loads
        setTimeout(function() {
            const videoIframe = document.querySelector('.hero-bg-video');
            const videoPlaceholder = document.getElementById('video-placeholder');
            
            if (videoIframe && videoIframe.dataset.src) {
                videoIframe.src = videoIframe.dataset.src;
                videoIframe.style.display = 'block';
                if (videoPlaceholder) {
                    videoPlaceholder.style.display = 'none';
                }
            }
        }, 2000); // Load video after 2 seconds
        
        // Optimize scroll performance with throttling
        let ticking = false;
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', function() {
            lastScrollY = window.scrollY;
            
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    // Disable animations when scrolling fast
                    document.body.classList.add('is-scrolling');
                    clearTimeout(window.scrollTimeout);
                    window.scrollTimeout = setTimeout(function() {
                        document.body.classList.remove('is-scrolling');
                    }, 150);
                    
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
        
        // Intersection Observer for lazy loading sections
        if ('IntersectionObserver' in window) {
            const sectionObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            }, {
                rootMargin: '50px'
            });
            
            // Observe heavy sections
            const sections = document.querySelectorAll('.popular-tours-section, .counter-section, .blog-section');
            sections.forEach(function(section) {
                sectionObserver.observe(section);
            });
        }
    });
    
    // Defer non-critical CSS
    const loadDeferredStyles = function() {
        const addStylesNode = document.getElementById('deferred-styles');
        if (addStylesNode) {
            const replacement = document.createElement('div');
            replacement.innerHTML = addStylesNode.textContent;
            document.body.appendChild(replacement);
            addStylesNode.parentElement.removeChild(addStylesNode);
        }
    };
    
    if (window.addEventListener) {
        window.addEventListener('load', loadDeferredStyles);
    } else if (window.attachEvent) {
        window.attachEvent('onload', loadDeferredStyles);
    }
    
    // Reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.documentElement.classList.add('low-performance');
    }
    
    // Disable smooth scroll on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.documentElement.style.scrollBehavior = 'auto';
    }
})();
