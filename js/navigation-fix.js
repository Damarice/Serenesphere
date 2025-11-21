// Fix navigation links based on current page location
(function() {
    'use strict';
    
    document.addEventListener('DOMContentLoaded', function() {
        const isInPagesFolder = window.location.pathname.includes('/pages/');
        const prefix = isInPagesFolder ? '' : 'pages/';
        const homePrefix = isInPagesFolder ? '../' : '';
        
        // Update all navigation links
        const navLinks = {
            'Retreats': prefix + 'retreats.html',
            'Circles': prefix + 'circles.html',
            'Markets': prefix + 'markets.html',
            'Chapters': prefix + 'chapters.html',
            'About Us': prefix + 'about.html',
            'Blog': '/wp/',
            'Podcast': prefix + 'podcast.html',
            'Resources': prefix + 'resources.html',
            'Contact Us': prefix + 'contact.html',
            'Connect': prefix + 'contact.html'
        };
        
        // Update desktop nav
        document.querySelectorAll('.nav-link').forEach(link => {
            const text = link.textContent.trim();
            if (navLinks[text]) {
                link.href = navLinks[text];
            }
        });
        
        // Update mobile nav
        document.querySelectorAll('.nav-items-mobile .nav-link').forEach(link => {
            const text = link.textContent.trim();
            if (navLinks[text]) {
                link.href = navLinks[text];
            }
        });
        
        // Fix logo link
        const logoLink = document.querySelector('.logo');
        if (logoLink) {
            logoLink.href = homePrefix + 'index.html';
        }
        
        // Remove all hash-only links and replace with actual pages
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            const hash = link.getAttribute('href');
            
            // Map hash links to actual pages
            const hashToPage = {
                '#markets': prefix + 'markets.html',
                '#chapters': prefix + 'chapters.html',
                '#resources': prefix + 'resources.html',
                '#connect': prefix + 'contact.html',
                '#blog': '/wp/',
                '#chat': prefix + 'contact.html'
            };
            
            if (hashToPage[hash]) {
                link.href = hashToPage[hash];
            }
        });
    });
})();
