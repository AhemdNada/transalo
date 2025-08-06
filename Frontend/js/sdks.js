// SDKs Page JavaScript

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

    // SDK installation tracking
    function trackSDKInstallation(sdkName) {
        console.log(`SDK installation tracked: ${sdkName}`);
        // Here you would typically send analytics data
    }

    // Setup SDK installation buttons
    function setupSDKInstallationButtons() {
        const installButtons = document.querySelectorAll('[data-sdk-install]');
        installButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const sdkName = this.getAttribute('data-sdk-install');
                const command = this.getAttribute('data-command');
                
                // Copy command to clipboard
                navigator.clipboard.writeText(command).then(function() {
                    showCopyNotification(`${sdkName} installation command copied!`);
                    trackSDKInstallation(sdkName);
                }).catch(function(err) {
                    console.error('Could not copy text: ', err);
                });
            });
        });
    }

    // Initialize SDK installation buttons
    setupSDKInstallationButtons();

    // GitHub link tracking
    function setupGitHubLinks() {
        const githubLinks = document.querySelectorAll('a[href*="github"]');
        githubLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const sdkName = this.closest('[data-sdk]')?.getAttribute('data-sdk') || 'Unknown';
                console.log(`GitHub link clicked for: ${sdkName}`);
                // Track GitHub link clicks
            });
        });
    }

    // Initialize GitHub links
    setupGitHubLinks();

    // Documentation link tracking
    function setupDocumentationLinks() {
        const docLinks = document.querySelectorAll('a[href*="docs"], a[href*="documentation"]');
        docLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const sdkName = this.closest('[data-sdk]')?.getAttribute('data-sdk') || 'Unknown';
                console.log(`Documentation link clicked for: ${sdkName}`);
                // Track documentation link clicks
            });
        });
    }

    // Initialize documentation links
    setupDocumentationLinks();

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
        if (code.includes('import') && code.includes('from')) return 'javascript';
        if (code.includes('from transalo import')) return 'python';
        if (code.includes('$transalo = new Transalo')) return 'php';
        if (code.includes('composer require')) return 'bash';
        if (code.includes('npm install')) return 'bash';
        if (code.includes('pip install')) return 'bash';
        return 'text';
    }

    // Initialize code highlighting
    highlightCodeExamples();

    // SDK feature comparison
    function setupSDKComparison() {
        const comparisonTable = document.querySelector('#sdk-comparison');
        if (comparisonTable) {
            const rows = comparisonTable.querySelectorAll('tr');
            rows.forEach(row => {
                row.addEventListener('click', function() {
                    this.classList.toggle('bg-gray-50');
                });
            });
        }
    }

    // Initialize SDK comparison
    setupSDKComparison();

    // Search functionality for SDKs
    const searchInput = document.querySelector('#sdk-search');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const sdkCards = document.querySelectorAll('[data-sdk]');
            
            sdkCards.forEach(card => {
                const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
                const description = card.textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // SDK download tracking
    function trackSDKDownload(sdkName, version) {
        console.log(`SDK download tracked: ${sdkName} v${version}`);
        // Here you would typically send analytics data
    }

    // Setup download buttons
    function setupDownloadButtons() {
        const downloadButtons = document.querySelectorAll('[data-sdk-download]');
        downloadButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const sdkName = this.getAttribute('data-sdk-download');
                const version = this.getAttribute('data-version') || 'latest';
                
                trackSDKDownload(sdkName, version);
                showCopyNotification(`${sdkName} download started!`);
            });
        });
    }

    // Initialize download buttons
    setupDownloadButtons();

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

    // SDK Install button functionality
    const sdkInstallButtons = document.querySelectorAll('.sdk-install-btn');
    sdkInstallButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            const command = button.textContent.trim();
            
            try {
                await navigator.clipboard.writeText(command);
                showNotification('Install command copied to clipboard!', 'success');
                
                // Visual feedback
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                button.classList.add('bg-green-600');
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.classList.remove('bg-green-600');
                }, 2000);
                
                // Track event
                trackEvent('sdk_install_copied', {
                    sdk: getSDKNameFromButton(button),
                    command: command,
                    page: 'sdks'
                });
            } catch (err) {
                console.error('Failed to copy command:', err);
                showNotification('Failed to copy command. Please try again.', 'error');
            }
        });
    });

    // SDK Docs button functionality
    const sdkDocsButtons = document.querySelectorAll('.sdk-docs-btn');
    sdkDocsButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const sdkName = getSDKNameFromButton(button);
            
            showNotification(`Opening ${sdkName} documentation...`, 'info');
            
            // Track event
            trackEvent('sdk_docs_clicked', {
                sdk: sdkName,
                page: 'sdks'
            });
            
            // In a real application, this would navigate to the docs
            // For now, we'll just show a notification
            setTimeout(() => {
                showNotification(`${sdkName} documentation opened in new tab`, 'success');
            }, 1000);
        });
    });

    // SDK GitHub button functionality
    const sdkGithubButtons = document.querySelectorAll('.sdk-github-btn');
    sdkGithubButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const sdkName = getSDKNameFromButton(button);
            
            showNotification(`Opening ${sdkName} GitHub repository...`, 'info');
            
            // Track event
            trackEvent('sdk_github_clicked', {
                sdk: sdkName,
                page: 'sdks'
            });
            
            // In a real application, this would navigate to GitHub
            // For now, we'll just show a notification
            setTimeout(() => {
                showNotification(`${sdkName} GitHub repository opened in new tab`, 'success');
            }, 1000);
        });
    });

    // Helper function to get SDK name from button
    function getSDKNameFromButton(button) {
        const card = button.closest('.bg-white, .bg-gray-50');
        if (card) {
            const title = card.querySelector('h3');
            if (title) {
                return title.textContent.trim();
            }
        }
        return 'Unknown SDK';
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
                    page: 'sdks'
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
                page: 'sdks'
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
                    page: 'sdks'
                });
            }
        }
    });

    // Initialize everything when DOM is loaded
    console.log('SDKs page loaded');
    
    // Track page view
    trackEvent('page_view', {
        page: 'sdks',
        title: document.title
    });
    
    // Add hover effects to SDK cards
    const sdkCards = document.querySelectorAll('.bg-white, .bg-gray-50');
    sdkCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}); 