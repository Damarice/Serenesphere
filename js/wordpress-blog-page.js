// WordPress Blog Integration for Blog Page
(function() {
    'use strict';
    
    const WP_API_URL = '/wp/wp-json/wp/v2/posts';
    const POSTS_PER_PAGE = 12;
    
    // Fetch blog posts from WordPress
    async function fetchBlogPosts() {
        try {
            const response = await fetch(`${WP_API_URL}?per_page=${POSTS_PER_PAGE}&_embed`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch blog posts');
            }
            
            const posts = await response.json();
            displayBlogPosts(posts);
        } catch (error) {
            console.error('Error fetching blog posts:', error);
            // If WordPress fetch fails, just show static posts
            document.getElementById('wordpress-blog-posts').style.display = 'none';
        }
    }
    
    // Display blog posts
    function displayBlogPosts(posts) {
        const container = document.getElementById('wordpress-blog-posts');
        
        if (!container || posts.length === 0) {
            container.style.display = 'none';
            return;
        }
        
        container.innerHTML = posts.map(post => {
            // Get featured image
            const featuredImage = post._embedded && post._embedded['wp:featuredmedia'] 
                ? post._embedded['wp:featuredmedia'][0].source_url 
                : '../assets/images/default-blog.jpg';
            
            // Get author name
            const authorName = post._embedded && post._embedded.author 
                ? post._embedded.author[0].name 
                : 'Admin';
            
            // Format date
            const postDate = new Date(post.date).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
            });
            
            // Get excerpt
            const excerpt = post.excerpt.rendered
                .replace(/<[^>]*>/g, '')
                .substring(0, 150) + '...';
            
            // Get comment count (if available)
            const commentCount = post.comment_count || 0;
            
            return `
                <div class="blog-post-card">
                    <div class="blog-post-image">
                        <img src="${featuredImage}" alt="${post.title.rendered}" loading="lazy">
                    </div>
                    <div class="blog-post-content">
                        <div class="blog-post-meta">
                            <span class="blog-author"><i class="fas fa-user"></i> ${authorName}</span>
                            <span class="blog-date">${postDate}</span>
                            <span class="blog-comments">${commentCount} Comment${commentCount !== 1 ? 's' : ''}</span>
                        </div>
                        <h3 class="blog-post-title">${post.title.rendered}</h3>
                        <p class="blog-post-excerpt">${excerpt}</p>
                        <a href="/wp/${post.slug}" class="btn-read-more">Read more <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fetchBlogPosts);
    } else {
        fetchBlogPosts();
    }
})();
