// API Documentation Page JavaScript

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

    // DOM Elements
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const mobileSidebarContent = document.getElementById('mobile-sidebar-content');
    const mobileBackdrop = document.getElementById('mobile-backdrop');
    const mobileCloseButton = document.getElementById('mobile-close-button');
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

    // Copy code functionality
    async function copyCode(button) {
        const codeBlock = button.closest('.bg-gray-900').querySelector('code');
        const code = codeBlock.textContent;

        try {
            await navigator.clipboard.writeText(code);
            
            // Update button temporarily
            const originalIcon = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.classList.add('text-green-400');
            
            setTimeout(() => {
                button.innerHTML = originalIcon;
                button.classList.remove('text-green-400');
            }, 2000);
            
            showNotification('Code copied to clipboard!', 'success');
        } catch (err) {
            console.error('Failed to copy code:', err);
            showNotification('Failed to copy code', 'error');
        }
    }

    // Add copy functionality to all copy buttons
    copyCodeButtons.forEach(button => {
        button.addEventListener('click', () => copyCode(button));
    });

    // Language selector functionality
    function handleLanguageChange(selectorClass) {
        const selectors = document.querySelectorAll(selectorClass);
        
        selectors.forEach(selector => {
            selector.addEventListener('change', function(e) {
                const selectedLanguage = e.target.value;
                console.log(`Language changed to: ${selectedLanguage}`);
                
                // Track language change event
                trackEvent('language_changed', {
                    language: selectedLanguage,
                    page: 'api-documentation'
                });
                
                // Show notification
                showNotification(`Language changed to ${selectedLanguage}`, 'info');
            });
        });
    }

    // Initialize language selectors
    handleLanguageChange('.desktop-language-selector');
    handleLanguageChange('.mobile-language-selector');

    // Button click tracking
    function trackButtonClicks() {
        const buttons = document.querySelectorAll('button');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const buttonText = this.textContent.trim();
                const buttonClass = this.className;
                
                trackEvent('button_clicked', {
                    button_text: buttonText,
                    button_class: buttonClass,
                    page: 'api-documentation'
                });
            });
        });
    }

    // Initialize button tracking
    trackButtonClicks();

    // Notification system
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
        }`;
        
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} mr-2"></i>
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
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Event tracking function
    function trackEvent(eventName, properties = {}) {
        // In a real application, this would send data to analytics
        console.log('Event tracked:', eventName, properties);
        
        // Example: Send to Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, properties);
        }
        
        // Example: Send to custom analytics
        if (typeof window.transaloAnalytics !== 'undefined') {
            window.transaloAnalytics.track(eventName, properties);
        }
    }

    // Performance monitoring
    function monitorPerformance() {
        // Monitor page load time
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
            
            trackEvent('page_load_time', {
                load_time: loadTime,
                page: 'api-documentation'
            });
        });
        
        // Monitor scroll performance
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                trackEvent('scroll_performance', {
                    scroll_y: window.scrollY,
                    page: 'api-documentation'
                });
            }, 1000);
        });
    }

    // Initialize performance monitoring
    monitorPerformance();

    // Document ready
    console.log('API Documentation page loaded');
    
    // Track page view
    trackEvent('page_view', {
        page: 'api-documentation',
        title: document.title
    });
}); 