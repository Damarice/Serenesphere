// Fetch and display WordPress blog posts (APPEND to existing)
(function() {
    'use strict';
    
    const WP_API_URL = 'https://serenesephere.com/wp/wp-json/wp/v2';
    
    // Fetch blog posts
    async function fetchBlogPosts(limit = 3) {
        try {
            const response = await fetch(`${WP_API_URL}/posts?per_page=${limit}&_embed`);
            if (!response.ok) throw new Error('Failed to fetch posts');
            return await response.json();
        } catch (error) {
            console.error('Error fetching blog posts:', error);
            return [];
        }
    }
    
    // Format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }
    
    // Get featured image
    function getFeaturedImage(post) {
        if (post._embedded && post._embedded['wp:featuredmedia']) {
            return post._embedded['wp:featuredmedia'][0].source_url;
        }
        return 'assets/images/default-blog.jpg'; // Fallback image
    }
    
    // Get excerpt
    function getExcerpt(post) {
        const div = document.createElement('div');
        div.innerHTML = post.excerpt.rendered;
        return div.textContent.trim().substring(0, 150) + '...';
    }
    
    // Append blog posts to blog page only (keep existing)
    async function appendBlogPagePosts() {
        const blogGrid = document.querySelector('.blog-grid');
        
        // Only run on blog page, not homepage
        if (!blogGrid || !window.location.pathname.includes('blog.html')) return;
        
        const posts = await fetchBlogPosts(10);
        if (posts.length === 0) return;
        
        // Don't clear existing content - just append
        posts.forEach((post) => {
            const featuredImage = getFeaturedImage(post);
            const excerpt = getExcerpt(post);
            const date = formatDate(post.date);
            
            const card = document.createElement('div');
            card.className = 'blog-post-card';
            card.innerHTML = `
                <div class="blog-post-image">
                    <img src="${featuredImage}" alt="${post.title.rendered}" loading="lazy">
                </div>
                <div class="blog-post-content">
                    <div class="blog-post-meta">
                        <span class="blog-author"><i class="fas fa-user"></i> Admin</span>
                        <span class="blog-date">${date}</span>
                        <span class="blog-comments">${post.comment_count || 0} Comment</span>
                    </div>
                    <h3 class="blog-post-title">${post.title.rendered}</h3>
                    <p class="blog-post-excerpt">${excerpt}</p>
                    <a href="https://serenesephere.com${post.link.replace('https://serenesephere.com', '')}" class="btn-read-more">Read more <i class="fas fa-arrow-right"></i></a>
                </div>
            `;
            
            blogGrid.appendChild(card);
        });
    }
    
    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        // Only run on blog page
        appendBlogPagePosts();
    });
})();
