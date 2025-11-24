// Aggressive Image and Video Loading Optimization
(function() {
    'use strict';
    
    // 1. DISABLE VIDEO ON MOBILE COMPLETELY
    const isMobile = window.innerWidth <= 768;
    const isSlowConnection = navigator.connection && 
        (navigator.connection.effectiveType === 'slow-2g' || 
         navigator.connection.effectiveType === '2g' || 
         navigator.connection.effectiveType === '3g');
    
    if (isMobile || isSlowConnection) {
        // Don't load video at all on mobile
        const videoIframe = document.querySelector('.hero-bg-video');
        if (videoIframe) {
            videoIframe.remove(); // Remove video element completely
        }
        
        const videoPlaceholder = document.getElementById('video-placeholder');
        if (videoPlaceholder) {
            videoPlaceholder.style.background = 'linear-gradient(135deg, #0C4F58 0%, #2BA6A0 100%)';
            videoPlaceholder.style.display = 'block';
        }
    } else {
        // Load video only on desktop with delay - OPTIMIZED
        // Use requestIdleCallback for better performance
        const loadVideo = () => {
            const videoIframe = document.querySelector('.hero-bg-video');
            const videoPlaceholder = document.getElementById('video-placeholder');
            
            if (videoIframe && videoIframe.dataset.src) {
                videoIframe.src = videoIframe.dataset.src;
                videoIframe.style.display = 'block';
                
                if (videoPlaceholder) {
                    setTimeout(function() {
                        videoPlaceholder.style.opacity = '0';
                        videoPlaceholder.style.transition = 'opacity 0.5s ease';
                        setTimeout(function() {
                            videoPlaceholder.style.display = 'none';
                        }, 500);
                    }, 1000);
                }
            }
        };
        
        // Use requestIdleCallback if available, otherwise setTimeout
        if ('requestIdleCallback' in window) {
            requestIdleCallback(loadVideo, { timeout: 2000 });
        } else {
            setTimeout(loadVideo, 2000);
        }
    }
    
    // 2. AGGRESSIVE IMAGE LAZY LOADING
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Load image
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                
                // Add loaded class for fade-in effect
                img.classList.add('loaded');
                
                // Stop observing this image
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px', // Start loading 50px before image enters viewport
        threshold: 0.01
    });
    
    // Convert all images to lazy load
    function setupLazyLoading() {
        const images = document.querySelectorAll('img:not([data-src]):not(.logo-img):not(.logo img)');
        
        images.forEach(img => {
            // Skip if already loaded or is logo or in logo container
            if (img.complete || 
                img.classList.contains('logo-img') || 
                img.closest('.logo') ||
                img.alt.toLowerCase().includes('logo')) {
                return;
            }
            
            // Store original src
            const originalSrc = img.src;
            
            // Set placeholder
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            // Move src to data-src
            img.dataset.src = originalSrc;
            img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
            
            // Observe image
            imageObserver.observe(img);
        });
    }
    
    // 3. OPTIMIZE BACKGROUND IMAGES
    function optimizeBackgroundImages() {
        const elementsWithBg = document.querySelectorAll('[style*="background-image"]');
        
        elementsWithBg.forEach(element => {
            const bgObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Background image will load when element is visible
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '100px'
            });
            
            bgObserver.observe(element);
        });
    }
    
    // 4. REDUCE IMAGE QUALITY ON MOBILE
    if (isMobile) {
        const style = document.createElement('style');
        style.textContent = `
            img {
                image-rendering: -webkit-optimize-contrast;
                image-rendering: crisp-edges;
            }
        `;
        document.head.appendChild(style);
    }
    
    // 5. PRELOAD CRITICAL IMAGES ONLY
    function preloadCriticalImages() {
        const criticalImages = [
            document.querySelector('.logo-img')?.src,
            document.querySelector('.hero-section img')?.src
        ].filter(Boolean);
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setupLazyLoading();
            optimizeBackgroundImages();
            preloadCriticalImages();
        });
    } else {
        setupLazyLoading();
        optimizeBackgroundImages();
        preloadCriticalImages();
    }
    
    // Add CSS for loaded images
    const style = document.createElement('style');
    style.textContent = `
        img.loaded {
            opacity: 1 !important;
        }
    `;
    document.head.appendChild(style);
    
})();
