// Integration Guides Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll) with mobile optimizations
    const isMobile = window.innerWidth <= 768;

    AOS.init({
        duration: isMobile ? 600 : 800,
        easing: 'ease-in-out',
        once: true,
        offset: isMobile ? 80 : 100, 
        disable: false, 
        startEvent: 'DOMContentLoaded',
        initClassName: 'aos-init',
        animatedClassName: 'aos-animate',
        useClassNames: false,
        disableMutationObserver: false,
        debounceDelay: 50,
        throttleDelay: 99,
        
        mirror: false, 
        anchorPlacement: 'top-bottom'
    });

    // Reinitialize AOS on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const newIsMobile = window.innerWidth <= 768;
            if (newIsMobile !== isMobile) {
                AOS.refresh();
            }
        }, 250);
    });

    // Copy code function
    window.copyCode = function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            const text = element.textContent;
            navigator.clipboard.writeText(text).then(function() {
                showCopyNotification('Code copied to clipboard!');
            }).catch(function(err) {
                console.error('Could not copy text: ', err);
            });
        }
    };

    // Show copy notification
    function showCopyNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
        notification.textContent = message;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Platform guide tracking
    function trackPlatformGuide(platform) {
        console.log(`Platform guide viewed: ${platform}`);
        // Here you would typically send analytics data
    }

    // Setup platform guide links
    function setupPlatformGuides() {
        const platformLinks = document.querySelectorAll('[data-platform]');
        platformLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const platform = this.getAttribute('data-platform');
                trackPlatformGuide(platform);
            });
        });
    }

    // Initialize platform guides
    setupPlatformGuides();

    // Download tracking
    function trackDownload(platform, type) {
        console.log(`Download tracked: ${platform} ${type}`);
        // Here you would typically send analytics data
    }

    // Setup download buttons
    function setupDownloadButtons() {
        const downloadButtons = document.querySelectorAll('[data-download]');
        downloadButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const platform = this.getAttribute('data-download');
                const type = this.getAttribute('data-type') || 'guide';
                trackDownload(platform, type);
            });
        });
    }

    // Initialize download buttons
    setupDownloadButtons();

    // Code example highlighting
    function highlightCodeExamples() {
        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach(block => {
            // Add syntax highlighting classes based on language
            const language = detectLanguage(block.textContent);
            if (language) {
                block.classList.add(`language-${language}`);
            }
        });
    }

    // Detect programming language from code
    function detectLanguage(code) {
        if (code.includes('npm install') || code.includes('import {') || code.includes('const {') || code.includes('Transalo.init')) return 'javascript';
        if (code.includes('pip install') || code.includes('from transalo import')) return 'python';
        if (code.includes('composer require') || code.includes('$transalo = new')) return 'php';
        if (code.includes('&lt;script') || code.includes('&lt;/script&gt;')) return 'html';
        if (code.includes('app.get') || code.includes('app.post')) return 'javascript';
        return 'text';
    }

    // Initialize code highlighting
    highlightCodeExamples();

    // Interactive code examples
    function setupInteractiveExamples() {
        const examples = document.querySelectorAll('.code-example');
        examples.forEach(example => {
            const runButton = example.querySelector('.run-button');
            const output = example.querySelector('.output');
            
            if (runButton && output) {
                runButton.addEventListener('click', function() {
                    // Simulate running the code
                    output.textContent = 'Running...';
                    output.classList.add('text-blue-500');
                    
                    setTimeout(() => {
                        output.textContent = 'Translation successful!';
                        output.classList.remove('text-blue-500');
                        output.classList.add('text-green-500');
                    }, 1500);
                });
            }
        });
    }

    // Initialize interactive examples
    setupInteractiveExamples();

    // Search functionality for guides
    const searchInput = document.querySelector('#guide-search');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const guides = document.querySelectorAll('[data-platform]');
            
            guides.forEach(guide => {
                const title = guide.querySelector('h3')?.textContent.toLowerCase() || '';
                const description = guide.textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    guide.style.display = 'block';
                } else {
                    guide.style.display = 'none';
                }
            });
        });
    }

    // Progress tracking for multi-step guides
    function setupProgressTracking() {
        const progressSteps = document.querySelectorAll('.progress-step');
        progressSteps.forEach((step, index) => {
            step.addEventListener('click', function() {
                // Mark current step as active
                progressSteps.forEach(s => s.classList.remove('active'));
                this.classList.add('active');
                
                // Update progress bar
                const progress = ((index + 1) / progressSteps.length) * 100;
                const progressBar = document.querySelector('.progress-bar');
                if (progressBar) {
                    progressBar.style.width = `${progress}%`;
                }
            });
        });
    }

    // Initialize progress tracking
    setupProgressTracking();

    // Platform-specific tips
    function showPlatformTips(platform) {
        const tips = {
            'wordpress': [
                'Use child themes for customizations',
                'Test on staging environment first',
                'Backup before installation'
            ],
            'react': [
                'Use React.memo for performance',
                'Implement error boundaries',
                'Follow React best practices'
            ],
            'nodejs': [
                'Use environment variables',
                'Implement proper error handling',
                'Add request validation'
            ]
        };

        const tipContainer = document.querySelector('#platform-tips');
        if (tipContainer && tips[platform]) {
            tipContainer.innerHTML = tips[platform].map(tip => 
                `<li class="flex items-center space-x-2">
                    <i class="fas fa-check-circle text-green-500"></i>
                    <span class="text-gray-700">${tip}</span>
                </li>`
            ).join('');
        }
    }

    // Setup platform tip triggers
    function setupPlatformTips() {
        const platformCards = document.querySelectorAll('[data-platform]');
        platformCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const platform = this.getAttribute('data-platform');
                showPlatformTips(platform);
            });
        });
    }

    // Initialize platform tips
    setupPlatformTips();

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
                showCopyNotification('Thank you for subscribing!');
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

    // Guide completion tracking
    function trackGuideCompletion(guideName) {
        console.log(`Guide completed: ${guideName}`);
        // Here you would typically send analytics data
    }

    // Setup guide completion tracking
    function setupGuideCompletionTracking() {
        const completionButtons = document.querySelectorAll('[data-guide-complete]');
        completionButtons.forEach(button => {
            button.addEventListener('click', function() {
                const guideName = this.getAttribute('data-guide-complete');
                trackGuideCompletion(guideName);
                showCopyNotification('Guide completed! Check your email for next steps.');
            });
        });
    }

    // Initialize guide completion tracking
    setupGuideCompletionTracking();

    // DOM Elements
    const guideButtons = document.querySelectorAll('.guide-btn');
    const copyCodeButtons = document.querySelectorAll('.copy-code-btn');

    // Unified toggle function for mobile menu
    function toggleMobileMenu() {
        const isOpen = mobileSidebar?.classList.contains('active');

        if (!mobileSidebar || !mobileSidebarContent) {
            console.error('Mobile sidebar elements not found');
            return;
        }

        mobileSidebar.classList.toggle('active');
        document.body.classList.toggle('sidebar-open');

        // Update icon
        const icon = mobileMenuButton?.querySelector('i');
        if (icon) {
            icon.className = isOpen ? 'fas fa-bars text-xl' : 'fas fa-times text-xl';
        }

        console.log(`Mobile menu ${isOpen ? 'closed' : 'opened'}`);
    }

    // Add event listeners to multiple elements
    function addToggleListeners(element, name = 'Element') {
        if (!element) {
            console.error(`${name} not found`);
            return;
        }

        console.log(`${name} found, adding toggle event listeners`);

        ['click', 'touchstart', 'mousedown'].forEach(eventType => {
            element.addEventListener(eventType, e => {
                console.log(`${name} triggered: ${eventType}`);
                e.preventDefault();
                e.stopPropagation();
                toggleMobileMenu();
            });
        });
    }

    // Attach event listeners
    addToggleListeners(mobileMenuButton, 'Mobile menu button');
    addToggleListeners(mobileCloseButton, 'Mobile close button');
    addToggleListeners(mobileBackdrop, 'Mobile backdrop');

    // Navigation links
    function handleSidebarLinkClick(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu();

        const href = e.currentTarget.getAttribute('href');
        if (href?.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
                setTimeout(() => {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }, 300);
            }
        }
    }

    document.querySelectorAll('.mobile-sidebar-link').forEach(link => {
        ['click', 'touchstart'].forEach(eventType => {
            link.addEventListener(eventType, handleSidebarLinkClick);
        });
    });

    // Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileSidebar && mobileSidebar.classList.contains('active')) {
            console.log('Escape key pressed');
            toggleMobileMenu();
        }
    });

    // Guide button functionality
    guideButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const guideName = getGuideNameFromButton(button);
            
            showNotification(`Opening ${guideName} guide...`, 'info');
            
            // Track event
            trackEvent('guide_started', {
                guide: guideName,
                page: 'integration-guides'
            });
            
            // In a real application, this would navigate to the guide
            // For now, we'll just show a notification
            setTimeout(() => {
                showNotification(`${guideName} guide opened in new tab`, 'success');
            }, 1000);
        });
    });

    // Copy code functionality
    copyCodeButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            const codeBlock = button.closest('div').querySelector('pre code');
            if (codeBlock) {
                const codeText = codeBlock.textContent;
                
                try {
                    await navigator.clipboard.writeText(codeText);
                    showNotification('Code copied to clipboard!', 'success');
                    
                    // Visual feedback
                    const icon = button.querySelector('i');
                    if (icon) {
                        icon.className = 'fas fa-check text-green-400';
                        setTimeout(() => {
                            icon.className = 'fas fa-copy';
                        }, 2000);
                    }
                    
                    // Track event
                    trackEvent('code_copied', {
                        guide: getGuideNameFromButton(button),
                        page: 'integration-guides'
                    });
                } catch (err) {
                    console.error('Failed to copy code:', err);
                    showNotification('Failed to copy code. Please try again.', 'error');
                }
            }
        });
    });

    // Helper function to get guide name from button
    function getGuideNameFromButton(button) {
        const card = button.closest('.bg-white, .bg-gray-50');
        if (card) {
            const title = card.querySelector('h3');
            if (title) {
                return title.textContent.trim();
            }
        }
        return 'Unknown Guide';
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
        }`;
        
        notification.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas ${
                    type === 'success' ? 'fa-check-circle' :
                    type === 'error' ? 'fa-exclamation-circle' :
                    'fa-info-circle'
                }"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Language selector functionality
    function handleLanguageChange(selectorClass) {
        const selectors = document.querySelectorAll(`.${selectorClass}`);
        
        selectors.forEach(selector => {
            selector.addEventListener('change', function(e) {
                const selectedLanguage = e.target.value;
                console.log(`Language changed to: ${selectedLanguage}`);
                
                // Update all language selectors
                selectors.forEach(otherSelector => {
                    if (otherSelector !== selector) {
                        otherSelector.value = selectedLanguage;
                    }
                });
                
                // Show notification
                const languageNames = {
                    'en': 'English',
                    'es': 'Español',
                    'fr': 'Français',
                    'de': 'Deutsch'
                };
                
                showNotification(`Language changed to ${languageNames[selectedLanguage] || selectedLanguage}`, 'info');
                
                // Track event
                trackEvent('language_changed', {
                    language: selectedLanguage,
                    page: 'integration-guides'
                });
            });
        });
    }

    // Initialize language selectors
    handleLanguageChange('desktop-language-selector');
    handleLanguageChange('mobile-language-selector');

    // Button click tracking
    document.addEventListener('click', function(e) {
        if (e.target.matches('button') || e.target.closest('button')) {
            const button = e.target.matches('button') ? e.target : e.target.closest('button');
            const buttonText = button.textContent.trim();
            const buttonClass = button.className;
            
            trackEvent('button_click', {
                button_text: buttonText,
                button_class: buttonClass,
                page: 'integration-guides'
            });
        }
    });

    // Event tracking function
    function trackEvent(eventName, properties = {}) {
        // Add timestamp
        properties.timestamp = new Date().toISOString();
        properties.user_agent = navigator.userAgent;
        properties.page_url = window.location.href;
        
        console.log(`Event tracked: ${eventName}`, properties);
        
        // In a real application, you would send this to your analytics service
        // Example: analytics.track(eventName, properties);
    }

    // Smooth scrolling for anchor links
    document.addEventListener('DOMContentLoaded', function() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    });

    // Performance monitoring
    window.addEventListener('load', function() {
        // Track page load performance
        if ('performance' in window) {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                trackEvent('page_load_performance', {
                    load_time: perfData.loadEventEnd - perfData.loadEventStart,
                    dom_content_loaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                    page: 'integration-guides'
                });
            }
        }
    });

    // Initialize everything when DOM is loaded
    console.log('Integration Guides page loaded');
    
    // Track page view
    trackEvent('page_view', {
        page: 'integration-guides',
        title: document.title
    });
    
    // Add hover effects to guide cards
    const guideCards = document.querySelectorAll('.bg-white, .bg-gray-50');
    guideCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add loading states to guide buttons
    guideButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                this.disabled = true;
                
                // Remove loading state after a delay (simulate guide loading)
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.disabled = false;
                }, 2000);
            }
        });
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + G to focus guide search (if implemented)
        if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
            e.preventDefault();
            console.log('Guide search shortcut pressed');
        }
        
        // Ctrl/Cmd + / to toggle guide navigation
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            console.log('Guide navigation toggle shortcut pressed');
        }
    });
    
    // Add intersection observer for guide steps
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('step-visible');
                trackEvent('guide_step_viewed', {
                    step: entry.target.querySelector('h3')?.textContent || 'Unknown',
                    page: 'integration-guides'
                });
            }
        });
    }, observerOptions);

    document.querySelectorAll('.bg-gray-50').forEach(step => {
        stepObserver.observe(step);
    });
}); 