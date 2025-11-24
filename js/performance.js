// Performance optimizations
(function() {
    'use strict';
    
    // Image loading optimization
    document.addEventListener('DOMContentLoaded', function() {
        // Add lazy loading to all images except logo and hero images
        const images = document.querySelectorAll('img:not(.logo-img):not(.hero-image)');
        images.forEach((img, index) => {
            // Add lazy loading
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Add decoding async for better performance
            img.setAttribute('decoding', 'async');
            
            // Add loaded class when image loads
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', function() {
                    this.classList.add('loaded');
                }, { once: true });
            }
        });
        
        // Preload critical images
        const criticalImages = document.querySelectorAll('.hero-image, .logo-img');
        criticalImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
        
        // Lazy load YouTube video after page loads - reduced delay
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
        }, 1000); // Load video after 1 second for faster perceived performance
        
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
    
    // Register Service Worker for caching
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('ServiceWorker registered:', registration.scope);
                })
                .catch(function(err) {
                    console.log('ServiceWorker registration failed:', err);
                });
        });
    }
    
    // Prefetch next page resources on hover
    document.addEventListener('mouseover', function(e) {
        if (e.target.tagName === 'A' && e.target.href) {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = e.target.href;
            document.head.appendChild(link);
        }
    }, { once: true, passive: true });
})();
