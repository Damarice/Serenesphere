// Fetch and display WordPress retreat posts (APPEND to existing)
(function() {
    'use strict';
    
    const WP_API_URL = 'https://serenesephere.com/wp/wp-json/wp/v2';
    
    // Fetch retreat posts
    async function fetchRetreats(limit = 3) {
        try {
            const response = await fetch(`${WP_API_URL}/retreats?per_page=${limit}&_embed`);
            if (!response.ok) throw new Error('Failed to fetch retreats');
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
        return 'assets/images/default-retreat.jpg'; // Fallback image
    }
    
    // Get excerpt
    function getExcerpt(retreat) {
        const div = document.createElement('div');
        div.innerHTML = retreat.excerpt.rendered;
        return div.textContent.trim().substring(0, 100) + '...';
    }
    
    // Get custom field (ACF)
    function getCustomField(retreat, fieldName) {
        return retreat.acf && retreat.acf[fieldName] ? retreat.acf[fieldName] : '';
    }
    
    // Append retreats to homepage (keep existing)
    async function appendHomepageRetreats() {
        const toursGrid = document.querySelector('.tours-grid');
        if (!toursGrid) return;
        
        const retreats = await fetchRetreats(3);
        if (retreats.length === 0) return;
        
        // Don't clear existing content - just append
        retreats.forEach(retreat => {
            const featuredImage = getFeaturedImage(retreat);
            const excerpt = getExcerpt(retreat);
            const price = getCustomField(retreat, 'price') || '$3550.00';
            const duration = getCustomField(retreat, 'duration') || '10 days';
            const location = getCustomField(retreat, 'location') || 'Kenya';
            
            const card = document.createElement('div');
            card.className = 'tour-card';
            card.innerHTML = `
                <div class="tour-images-wrapper">
                    <div class="tour-image-main">
                        <img src="${featuredImage}" alt="${retreat.title.rendered}">
                        <div class="tour-badge">40% Off</div>
                        <div class="tour-wishlist">
                            <i class="far fa-heart"></i>
                        </div>
                    </div>
                </div>
                <div class="tour-content">
                    <div class="tour-meta">
                        <span class="tour-duration"><i class="far fa-clock"></i> ${duration}</span>
                        <span class="tour-rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                            4.5
                        </span>
                    </div>
                    <h3 class="tour-name">${retreat.title.rendered}</h3>
                    <p class="tour-location"><i class="fas fa-map-marker-alt"></i> ${location}</p>
                    <p class="tour-excerpt">${excerpt}</p>
                    <div class="tour-footer">
                        <div class="tour-price">
                            <span class="price-current">${price}</span>
                        </div>
                        <a href="https://serenesephere.com${retreat.link.replace('https://serenesephere.com', '')}" class="btn btn-explore">Explore</a>
                    </div>
                </div>
            `;
            
            toursGrid.appendChild(card);
        });
    }
    
    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        if (document.querySelector('.popular-tours-section')) {
            appendHomepageRetreats();
        }
    });
})();
