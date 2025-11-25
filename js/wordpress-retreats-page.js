// WordPress Retreats Integration for Retreats Page
(function() {
    'use strict';
    
    // Use absolute URL to work on both localhost and live server
    const WP_API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'https://serenesephere.com/wp/wp-json/wp/v2'
        : '/wp/wp-json/wp/v2';
    
    // Fetch retreat posts from WordPress custom post type
    async function fetchRetreats() {
        // Try custom post type first
        let apiUrl = `${WP_API_URL}/retreats?per_page=10`;
        console.log('WordPress Retreats: Trying custom post type:', apiUrl);
        console.log('WordPress Retreats: Current hostname:', window.location.hostname);
        
        try {
            let response = await fetch(apiUrl);
            console.log('WordPress Retreats: Custom post type response:', response.status);
            
            // If custom post type doesn't exist (404), try regular posts
            if (response.status === 404) {
                console.log('WordPress Retreats: Custom post type not found, trying regular posts...');
                apiUrl = `${WP_API_URL}/posts?per_page=10`;
                response = await fetch(apiUrl);
                console.log('WordPress Retreats: Regular posts response:', response.status);
            }
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('WordPress Retreats: API Error:', response.status, errorText);
                throw new Error(`Failed to fetch retreats: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('WordPress Retreats: Data received:', data.length, 'posts');
            console.log('WordPress Retreats: First retreat data:', data[0]);
            
            // Filter for retreat-related posts if using regular posts
            if (apiUrl.includes('/posts?')) {
                const retreatPosts = data.filter(post => {
                    const title = post.title.rendered.toLowerCase();
                    const content = post.content.rendered.toLowerCase();
                    return title.includes('retreat') || content.includes('retreat');
                });
                console.log('WordPress Retreats: Filtered to', retreatPosts.length, 'retreat posts');
                return retreatPosts;
            }
            
            return data;
        } catch (error) {
            console.error('WordPress Retreats: Fetch error:', error);
            console.log('WordPress Retreats: Please check:');
            console.log('1. Custom post type "retreats" exists in WordPress');
            console.log('2. "Show in REST API" is enabled in CPT UI settings');
            console.log('3. At least one retreat is published');
            console.log('4. Try accessing:', window.location.origin + apiUrl);
            return [];
        }
    }
    
    // Get featured image
    function getFeaturedImage(retreat) {
        // Use a default image if no featured image
        return '../assets/images/Photo A2.jpg';
    }
    
    // Get excerpt
    function getExcerpt(retreat) {
        if (retreat.excerpt && retreat.excerpt.rendered) {
            const div = document.createElement('div');
            div.innerHTML = retreat.excerpt.rendered;
            const text = div.textContent.trim();
            return text.length > 150 ? text.substring(0, 150) + '...' : text;
        }
        // Fallback if no excerpt
        return 'Experience a transformative wellness retreat in Kenya.';
    }
    
    // Get custom field value
    function getCustomField(retreat, fieldName, defaultValue = '') {
        // Check if ACF fields exist and are not empty
        if (retreat.acf && Object.keys(retreat.acf).length > 0 && retreat.acf[fieldName]) {
            return retreat.acf[fieldName];
        }
        return defaultValue;
    }
    
    // Add WordPress retreats to the grid
    async function addWordPressRetreats() {
        console.log('WordPress Retreats: Starting to fetch...');
        
        const programsGrid = document.querySelector('.programs-grid');
        if (!programsGrid) {
            console.error('WordPress Retreats: Programs grid not found! Looking for .programs-grid');
            console.log('Available grids:', document.querySelectorAll('[class*="grid"]'));
            return;
        }
        
        console.log('WordPress Retreats: Grid found, fetching retreats...');
        const retreats = await fetchRetreats();
        
        if (retreats.length === 0) {
            console.warn('WordPress Retreats: No retreats returned from API');
            return;
        }
        
        console.log(`WordPress Retreats: Found ${retreats.length} retreats`, retreats);
        
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
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('WordPress Retreats: DOM loaded, initializing...');
            setTimeout(addWordPressRetreats, 1000);
        });
    } else {
        console.log('WordPress Retreats: DOM already loaded, initializing...');
        setTimeout(addWordPressRetreats, 1000);
    }
})();
