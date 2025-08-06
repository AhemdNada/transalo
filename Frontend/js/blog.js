// Blog Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Blog post filtering
    function setupBlogFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const blogPosts = document.querySelectorAll('[data-category]');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter posts
                blogPosts.forEach(post => {
                    if (category === 'all' || post.getAttribute('data-category') === category) {
                        post.style.display = 'block';
                        post.classList.add('animate-fade-in');
                    } else {
                        post.style.display = 'none';
                        post.classList.remove('animate-fade-in');
                    }
                });
                
                // Track filter usage
                trackFilterUsage(category);
            });
        });
    }

    // Initialize blog filtering
    setupBlogFiltering();

    // Track filter usage
    function trackFilterUsage(category) {
        console.log(`Blog filter used: ${category}`);
        // Here you would typically send analytics data
    }

    // Blog post interaction tracking
    function setupBlogPostTracking() {
        const blogPosts = document.querySelectorAll('article');
        blogPosts.forEach(post => {
            post.addEventListener('click', function() {
                const title = this.querySelector('h3')?.textContent || 'Unknown';
                const category = this.getAttribute('data-category') || 'unknown';
                trackBlogPostClick(title, category);
            });
        });
    }

    // Initialize blog post tracking
    setupBlogPostTracking();

    // Track blog post clicks
    function trackBlogPostClick(title, category) {
        console.log(`Blog post clicked: ${title} (${category})`);
        // Here you would typically send analytics data
    }

    // Newsletter subscription
    function setupNewsletterSubscription() {
        const newsletterForm = document.querySelector('form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input[type="email"]').value;
                
                if (email) {
                    subscribeToNewsletter(email);
                    this.reset();
                }
            });
        }
    }

    // Initialize newsletter subscription
    setupNewsletterSubscription();

    // Subscribe to newsletter
    function subscribeToNewsletter(email) {
        console.log(`Newsletter subscription: ${email}`);
        showNotification('Thank you for subscribing to our newsletter!');
        // Here you would typically send the email to your backend
    }

    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Load more posts functionality
    function setupLoadMorePosts() {
        const loadMoreButton = document.querySelector('button');
        if (loadMoreButton && loadMoreButton.textContent.includes('Load More')) {
            loadMoreButton.addEventListener('click', function() {
                loadMorePosts();
            });
        }
    }

    // Initialize load more posts
    setupLoadMorePosts();

    // Load more posts
    function loadMorePosts() {
        const loadMoreButton = document.querySelector('button');
        loadMoreButton.textContent = 'Loading...';
        loadMoreButton.disabled = true;
        
        // Simulate loading more posts
        setTimeout(() => {
            // Here you would typically fetch more posts from your backend
            console.log('Loading more posts...');
            
            // For demo purposes, just re-enable the button
            loadMoreButton.textContent = 'Load More Posts';
            loadMoreButton.disabled = false;
            
            showNotification('More posts loaded!');
        }, 2000);
    }

    // Search functionality
    function setupBlogSearch() {
        const searchInput = document.querySelector('#blog-search');
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                const searchTerm = e.target.value.toLowerCase();
                const blogPosts = document.querySelectorAll('article');
                
                blogPosts.forEach(post => {
                    const title = post.querySelector('h3')?.textContent.toLowerCase() || '';
                    const content = post.querySelector('p')?.textContent.toLowerCase() || '';
                    
                    if (title.includes(searchTerm) || content.includes(searchTerm)) {
                        post.style.display = 'block';
                    } else {
                        post.style.display = 'none';
                    }
                });
            });
        }
    }

    // Initialize blog search
    setupBlogSearch();

    // Reading time estimation
    function estimateReadingTime(text) {
        const wordsPerMinute = 200;
        const words = text.split(' ').length;
        return Math.ceil(words / wordsPerMinute);
    }

    // Update reading times
    function updateReadingTimes() {
        const blogPosts = document.querySelectorAll('article');
        blogPosts.forEach(post => {
            const content = post.querySelector('p')?.textContent || '';
            const readingTime = estimateReadingTime(content);
            const timeElement = post.querySelector('.text-gray-500.text-sm');
            if (timeElement && timeElement.textContent.includes('min read')) {
                timeElement.textContent = `${readingTime} min read`;
            }
        });
    }

    // Initialize reading time updates
    updateReadingTimes();

    // Social sharing
    function setupSocialSharing() {
        const shareButtons = document.querySelectorAll('[data-share]');
        shareButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const platform = this.getAttribute('data-share');
                const url = window.location.href;
                const title = document.title;
                
                sharePost(platform, url, title);
            });
        });
    }

    // Initialize social sharing
    setupSocialSharing();

    // Share post
    function sharePost(platform, url, title) {
        const shareUrls = {
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        };
        
        if (shareUrls[platform]) {
            window.open(shareUrls[platform], '_blank', 'width=600,height=400');
        }
    }

    // Bookmark functionality
    function setupBookmarking() {
        const bookmarkButtons = document.querySelectorAll('[data-bookmark]');
        bookmarkButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const postId = this.getAttribute('data-bookmark');
                toggleBookmark(postId, this);
            });
        });
    }

    // Initialize bookmarking
    setupBookmarking();

    // Toggle bookmark
    function toggleBookmark(postId, button) {
        const isBookmarked = button.classList.contains('bookmarked');
        
        if (isBookmarked) {
            button.classList.remove('bookmarked');
            button.innerHTML = '<i class="far fa-bookmark"></i>';
            showNotification('Post removed from bookmarks');
        } else {
            button.classList.add('bookmarked');
            button.innerHTML = '<i class="fas fa-bookmark"></i>';
            showNotification('Post added to bookmarks');
        }
        
        // Here you would typically save/remove the bookmark in localStorage or backend
        console.log(`Bookmark toggled for post: ${postId}`);
    }

    // Mobile menu functionality (inherited from main script)
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const mobileBackdrop = document.getElementById('mobile-backdrop');
    const mobileSidebarContent = document.getElementById('mobile-sidebar-content');
    const mobileCloseButton = document.getElementById('mobile-close-button');

    if (mobileMenuButton && mobileSidebar) {
        mobileMenuButton.addEventListener('click', function() {
            mobileSidebar.classList.remove('hidden');
            setTimeout(() => {
                mobileBackdrop.classList.remove('opacity-0', 'pointer-events-none');
                mobileSidebarContent.classList.remove('translate-x-full');
            }, 10);
        });
    }

    if (mobileCloseButton && mobileSidebar) {
        mobileCloseButton.addEventListener('click', function() {
            mobileBackdrop.classList.add('opacity-0', 'pointer-events-none');
            mobileSidebarContent.classList.add('translate-x-full');
            setTimeout(() => {
                mobileSidebar.classList.add('hidden');
            }, 300);
        });
    }

    if (mobileBackdrop && mobileSidebar) {
        mobileBackdrop.addEventListener('click', function() {
            mobileCloseButton.click();
        });
    }

    // Language selector functionality
    const languageSelectors = document.querySelectorAll('.desktop-language-selector, .mobile-language-selector');
    languageSelectors.forEach(selector => {
        selector.addEventListener('change', function(e) {
            const selectedLanguage = e.target.value;
            // Handle language change
            console.log('Language changed to:', selectedLanguage);
        });
    });

    // Button click handlers
    const loginButtons = document.querySelectorAll('.desktop-btn-secondary, .mobile-btn-secondary');
    loginButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Handle login
            console.log('Login button clicked');
        });
    });

    const signupButtons = document.querySelectorAll('.desktop-btn-primary, .mobile-btn-primary');
    signupButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Handle signup
            console.log('Sign up button clicked');
        });
    });

    // Social media links
    const socialLinks = document.querySelectorAll('.social-link-enhanced');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Handle social media navigation
            console.log('Social link clicked:', this.href);
        });
    });

    // Footer links
    const footerLinks = document.querySelectorAll('.footer-link-enhanced, .footer-bottom-link');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Handle footer link navigation
            console.log('Footer link clicked:', this.href);
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Category tracking
    function trackCategoryView(category) {
        console.log(`Category viewed: ${category}`);
        // Here you would typically send analytics data
    }

    // Setup category tracking
    function setupCategoryTracking() {
        const categoryLinks = document.querySelectorAll('[data-category]');
        categoryLinks.forEach(link => {
            link.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                trackCategoryView(category);
            });
        });
    }

    // Initialize category tracking
    setupCategoryTracking();
}); 