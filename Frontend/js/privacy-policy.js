// Privacy Policy Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Table of contents functionality
    function setupTableOfContents() {
        const headings = document.querySelectorAll('h2');
        const tocContainer = document.createElement('div');
        tocContainer.className = 'bg-gray-50 rounded-lg p-6 mb-8';
        tocContainer.innerHTML = '<h3 class="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h3><ul class="space-y-2"></ul>';
        
        const tocList = tocContainer.querySelector('ul');
        
        headings.forEach((heading, index) => {
            const id = `section-${index + 1}`;
            heading.id = id;
            
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${id}`;
            link.textContent = heading.textContent;
            link.className = 'text-primary hover:text-primary-dark transition-colors duration-300 block py-1';
            
            listItem.appendChild(link);
            tocList.appendChild(listItem);
        });
        
        // Insert TOC after the first paragraph
        const firstParagraph = document.querySelector('.prose p');
        if (firstParagraph) {
            firstParagraph.parentNode.insertBefore(tocContainer, firstParagraph);
        }
    }

    // Initialize table of contents
    setupTableOfContents();

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

    // Policy version tracking
    function trackPolicyView() {
        const version = '2.1';
        const lastUpdated = 'March 15, 2025';
        console.log(`Privacy Policy viewed - Version: ${version}, Last Updated: ${lastUpdated}`);
        // Here you would typically send analytics data
    }

    // Initialize policy tracking
    trackPolicyView();

    // Print functionality
    function setupPrintFunctionality() {
        const printButton = document.createElement('button');
        printButton.className = 'fixed bottom-8 right-8 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-dark transition-colors duration-300 z-40';
        printButton.innerHTML = '<i class="fas fa-print"></i>';
        printButton.title = 'Print Privacy Policy';
        
        printButton.addEventListener('click', function() {
            window.print();
        });
        
        document.body.appendChild(printButton);
    }

    // Initialize print functionality
    setupPrintFunctionality();

    // Search functionality
    function setupSearchFunctionality() {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search privacy policy...';
        searchInput.className = 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent mb-6';
        
        const contentContainer = document.querySelector('.prose');
        if (contentContainer) {
            contentContainer.parentNode.insertBefore(searchInput, contentContainer);
            
            searchInput.addEventListener('input', function(e) {
                const searchTerm = e.target.value.toLowerCase();
                const paragraphs = document.querySelectorAll('.prose p, .prose h2, .prose ul');
                
                paragraphs.forEach(element => {
                    const text = element.textContent.toLowerCase();
                    if (text.includes(searchTerm)) {
                        element.style.display = 'block';
                        element.classList.add('bg-yellow-100');
                    } else if (searchTerm === '') {
                        element.style.display = 'block';
                        element.classList.remove('bg-yellow-100');
                    } else {
                        element.style.display = 'none';
                        element.classList.remove('bg-yellow-100');
                    }
                });
            });
        }
    }

    // Initialize search functionality
    setupSearchFunctionality();

    // Last updated tracking
    function trackLastUpdated() {
        const lastUpdatedElement = document.querySelector('span');
        if (lastUpdatedElement && lastUpdatedElement.textContent.includes('Last updated')) {
            const date = lastUpdatedElement.textContent.split(': ')[1];
            console.log(`Privacy Policy last updated: ${date}`);
        }
    }

    // Initialize last updated tracking
    trackLastUpdated();

    // Contact information interaction
    function setupContactInteraction() {
        const contactInfo = document.querySelector('.bg-gray-50.rounded-lg');
        if (contactInfo) {
            const emailLink = document.createElement('a');
            emailLink.href = 'mailto:privacy@transalo.com';
            emailLink.textContent = 'privacy@transalo.com';
            emailLink.className = 'text-primary hover:text-primary-dark transition-colors duration-300';
            
            const emailElement = contactInfo.querySelector('p:first-child');
            if (emailElement) {
                emailElement.innerHTML = emailElement.innerHTML.replace('privacy@transalo.com', emailLink.outerHTML);
            }
        }
    }

    // Initialize contact interaction
    setupContactInteraction();

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

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                showNotification('Thank you for subscribing!');
                this.reset();
            }
        });
    }

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

    // Policy section tracking
    function setupPolicySectionTracking() {
        const sections = document.querySelectorAll('h2');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionName = entry.target.textContent;
                    console.log(`Privacy Policy section viewed: ${sectionName}`);
                    // Here you would typically send analytics data
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Initialize policy section tracking
    setupPolicySectionTracking();

    // Copy functionality
    function setupCopyFunctionality() {
        const copyButton = document.createElement('button');
        copyButton.className = 'fixed bottom-8 right-20 bg-gray-600 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 transition-colors duration-300 z-40';
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.title = 'Copy Privacy Policy URL';
        
        copyButton.addEventListener('click', function() {
            navigator.clipboard.writeText(window.location.href).then(function() {
                showNotification('Privacy Policy URL copied to clipboard!');
            }).catch(function(err) {
                console.error('Could not copy URL: ', err);
            });
        });
        
        document.body.appendChild(copyButton);
    }

    // Initialize copy functionality
    setupCopyFunctionality();

    // Reading time estimation
    function estimateReadingTime() {
        const content = document.querySelector('.prose');
        if (content) {
            const text = content.textContent;
            const words = text.split(' ').length;
            const readingTime = Math.ceil(words / 200); // 200 words per minute
            
            const readingTimeElement = document.createElement('div');
            readingTimeElement.className = 'text-sm text-gray-500 text-center mb-6';
            readingTimeElement.textContent = `Estimated reading time: ${readingTime} minutes`;
            
            const header = document.querySelector('h1');
            if (header) {
                header.parentNode.insertBefore(readingTimeElement, header.nextSibling);
            }
        }
    }

    // Initialize reading time estimation
    estimateReadingTime();
}); 