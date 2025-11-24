// WordPress Retreats Integration for Retreats Page
(function() {
    'use strict';
    
    const WP_API_URL = '/wp/wp-json/wp/v2';
    
    // Fetch retreat posts from WordPress
    async function fetchRetreats() {
        try {
            const response = await fetch(`${WP_API_URL}/posts?categories=retreats&per_page=10&_embed`);
            if (!response.ok) {
                throw new Error('Failed to fetch retreats');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching retreats:', error);
            return [];
        }
    }
    
    // Get featured image
    function getFeaturedImage(retreat) {
        if (retreat._embedded && retreat._embedded['wp:featuredmedia']) {
            return retreat._embedded['wp:featuredmedia'][0].source_url;
        }
        return '../assets/images/default-retreat.jpg';
    }
    
    // Get excerpt
    function getExcerpt(retreat) {
        const div = document.createElement('div');
        div.innerHTML = retreat.excerpt.rendered;
        const text = div.textContent.trim();
        return text.length > 150 ? text.substring(0, 150) + '...' : text;
    }
    
    // Get custom field value
    function getCustomField(retreat, fieldName, defaultValue = '') {
        return retreat.acf && retreat.acf[fieldName] ? retreat.acf[fieldName] : defaultValue;
    }
    
    // Add WordPress retreats to the grid
    async function addWordPressRetreats() {
        const programsGrid = document.querySelector('.programs-grid');
        if (!programsGrid) {
            console.log('Programs grid not found');
            return;
        }
        
        const retreats = await fetchRetreats();
        if (retreats.length === 0) {
            console.log('No WordPress retreats found');
            return;
        }
        
        console.log(`Found ${retreats.length} WordPress retreats`);
        
        // Add WordPress retreats to the beginning of the grid
        // Reverse to maintain correct order when inserting at beginning
        retreats.reverse().forEach(retreat => {
            const featuredImage = getFeaturedImage(retreat);
            const excerpt = getExcerpt(retreat);
            const duration = getCustomField(retreat, 'duration', '10 Days');
            const rating = getCustomField(retreat, 'rating', '4.5');
            const meta = getCustomField(retreat, 'meta', '14 Hotel - 22 Cars - 18 Tours - 95 Activity');
            
            // Create card with EXACT same structure as static cards
            const cardWrapper = document.createElement('div');
            cardWrapper.innerHTML = `
                <div class="program-card">
                    <div class="program-image">
                        <img src="${featuredImage}" alt="${retreat.title.rendered}" loading="lazy">
                        <div class="program-rating">★ ${rating}</div>
                    </div>
                    <div class="program-content">
                        <div class="program-meta">${meta}</div>
                        <h3 class="program-title">${retreat.title.rendered}</h3>
                        <p class="program-duration">${duration}</p>
                        <p class="program-description">${excerpt}</p>
                        <a href="/wp/${retreat.slug}" class="btn-discover">Discover</a>
                    </div>
                </div>
            `.trim();
            
            // Get the actual card element (not the wrapper)
            const card = cardWrapper.firstElementChild;
            
            // Insert at the beginning
            programsGrid.insertBefore(card, programsGrid.firstChild);
        });
        
        console.log('WordPress retreats added to grid');
    }
    
    // Initialize when DOM is ready - DEFERRED for performance
    const initWordPressRetreats = () => {
        // Use requestIdleCallback to not block main thread
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                addWordPressRetreats();
            }, { timeout: 2000 });
        } else {
            // Fallback: delay by 500ms to let page render first
            setTimeout(addWordPressRetreats, 500);
        }
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWordPressRetreats);
    } else {
        initWordPressRetreats();
    }
})();
