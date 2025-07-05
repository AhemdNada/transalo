// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// DOM Elements
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileSidebar = document.getElementById('mobile-sidebar');
const mobileSidebarContent = document.getElementById('mobile-sidebar-content');
const mobileBackdrop = document.getElementById('mobile-backdrop');
const mobileCloseButton = document.getElementById('mobile-close-button');
const billingToggle = document.getElementById('billing-toggle');
const toggleSlider = document.getElementById('toggle-slider');
const faqQuestions = document.querySelectorAll('.faq-question');
const codeExample = document.getElementById('code-example');

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


// Animate a single counter
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16); // 60fps

    const update = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString();
        }
    };

    update();
};

// Initialize all counters on view
const initCounterAnimation = () => {
    const counters = document.querySelectorAll('.counter');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const targetValue = parseInt(counter.getAttribute('data-target'));

                if (!isNaN(targetValue)) {
                    animateCounter(counter, targetValue);
                    observer.unobserve(counter); // Animate only once
                }
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => observer.observe(counter));
};

// Call
document.addEventListener('DOMContentLoaded', function() {

    initCounterAnimation();
});

// Billing Toggle (Monthly/Yearly)
const SLIDER_MOVE_PX = 20;
let isYearly = false;

if (billingToggle && toggleSlider) {
    billingToggle.addEventListener('click', () => {
        isYearly = !isYearly;

        // Update slider UI
        toggleSlider.style.transform = `translateX(${isYearly ? SLIDER_MOVE_PX : 0}px)`;
        billingToggle.classList.toggle('bg-primary', isYearly);
        billingToggle.classList.toggle('bg-gray-200', !isYearly);

        updatePricing();
    });
}

function updatePricing() {
    const prices = document.querySelectorAll('.price-container span:first-child');
    const monthlyPrices = ['$29', '$99', 'Custom'];
    const yearlyPrices = ['$23', '$79', 'Custom'];

    prices.forEach((price, index) => {
        const newPrice = isYearly ? yearlyPrices[index] : monthlyPrices[index];
        if (newPrice) price.textContent = newPrice;
    });

}

function toggleFaqItem(faqItem) {
    // Toggle current item
    faqItem.classList.toggle('active');

    // Close other items
    document.querySelectorAll('.group.active').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
        }
    });
}

// Handler for question click
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.closest('.group');
        if (faqItem) toggleFaqItem(faqItem);
    });
});

// Handler for icon click
document.querySelectorAll('.faq-icon-container').forEach(iconContainer => {
    iconContainer.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent question click from firing
        const faqItem = iconContainer.closest('.group');
        if (faqItem) toggleFaqItem(faqItem);
    });
});


// Copy Code Function

async function copyCode() {
    const codeText = codeExample?.textContent;
    if (!codeText) {
        showNotification('No code to copy.', 'error');
        return;
    }

    try {
        await navigator.clipboard.writeText(codeText);
        showNotification('Code copied to clipboard', 'success');
    } catch (err) {
        console.error('Clipboard error:', err);
        showNotification('Failed to copy code.', 'error');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg text-white font-medium transform translate-x-full opacity-0 transition-all duration-300 shadow-lg`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');

    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#10b981'; // Green
            break;
        case 'error':
            notification.style.backgroundColor = '#ef4444'; // Red
            break;
        default:
            notification.style.backgroundColor = '#3b82f6'; // Blue
    }

    notification.textContent = message;
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 50);

    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}


// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg');
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.classList.remove('shadow-lg');
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
});

// Language selector functionality
function handleLanguageChange(selectorClass) {
    const selector = document.querySelector(selectorClass);
    if (!selector) return;

    selector.addEventListener('change', function () {
        const selectedLanguage = this.value;
        // const selectedText = this.options[this.selectedIndex].text;

        console.log(`Language changed (${selectorClass}):`, selectedLanguage);
        // showNotification(`Language changed to ${selectedText}`, 'info');

        // TODO: Apply actual language switching logic here
    });
}

// Apply to all language selectors
['.language-selector', '.desktop-language-selector', '.mobile-language-selector'].forEach(handleLanguageChange);



// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .pricing-card, .group').forEach(el => {
    observer.observe(el);
});

// Parallax effect for header illustration
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const illustration = document.querySelector('.relative.z-10');
    
    if (illustration) {
        const rate = scrolled * -0.5;
        illustration.style.transform = `translateY(${rate}px)`;
    }
});

// Performance optimization: Lazy load images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Enter key on FAQ questions
    if (e.key === 'Enter' && e.target.classList.contains('faq-question')) {
        e.target.click();
    }
});

// Analytics tracking (demo purposes)
function trackEvent(eventName, properties = {}) {
    console.log('Analytics Event:', eventName, properties);
    // Here you would typically send to your analytics service
}

// Track important user interactions
document.addEventListener('click', (e) => {
    if (e.target.matches('button')) {
        const buttonText = e.target.textContent.trim();
        trackEvent('button_click', { button_text: buttonText });
    }
    
    if (e.target.matches('a[href^="#"]')) {
        const section = e.target.getAttribute('href').substring(1);
        trackEvent('navigation_click', { section: section });
    }
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export functions for potential external use
window.TransaloLanding = {
    copyCode,
    showNotification,
    trackEvent,
    updatePricing,
    toggleMobileMenu
}; 