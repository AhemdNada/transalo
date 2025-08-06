// About Us Page JavaScript

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

// Team member interaction
function setupTeamMemberInteractions() {
    const teamCards = document.querySelectorAll('[data-team-member]');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('transform', 'scale-105', 'shadow-xl');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('transform', 'scale-105', 'shadow-xl');
        });
    });
}

// Document ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Team member interaction
    function setupTeamMemberInteractions() {
        const teamCards = document.querySelectorAll('[data-team-member]');
        teamCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.classList.add('transform', 'scale-105', 'shadow-xl');
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('transform', 'scale-105', 'shadow-xl');
            });
        });
    }

    // Initialize team member interactions
    setupTeamMemberInteractions();

    // Social media link tracking
    function trackSocialMediaClick(platform, member) {
        console.log(`Social media link clicked: ${platform} for ${member}`);
        // Here you would typically send analytics data
    }

    // Setup social media links
    function setupSocialMediaLinks() {
        const socialLinks = document.querySelectorAll('.team-member a');
        socialLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const platform = this.querySelector('i').className.includes('linkedin') ? 'LinkedIn' : 
                               this.querySelector('i').className.includes('twitter') ? 'Twitter' : 
                               this.querySelector('i').className.includes('github') ? 'GitHub' : 'Other';
                const member = this.closest('[data-team-member]')?.getAttribute('data-team-member') || 'Unknown';
                trackSocialMediaClick(platform, member);
                
                // Simulate opening social media profile
                showNotification(`Opening ${platform} profile...`);
            });
        });
    }

    // Initialize social media links
    setupSocialMediaLinks();

    // Timeline animation
    function setupTimelineAnimation() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-timeline');
                }
            });
        }, { threshold: 0.5 });

        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }

    // Initialize timeline animation
    setupTimelineAnimation();

    // Company stats counter animation
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        entry.target.textContent = Math.floor(current).toLocaleString();
                    }, 16);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    // Initialize counter animation
    animateCounters();

    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
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

    // Values section interaction
    function setupValuesInteraction() {
        const valueCards = document.querySelectorAll('[data-value]');
        valueCards.forEach(card => {
            card.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                console.log(`Value clicked: ${value}`);
                
                // Add visual feedback
                this.classList.add('ring-2', 'ring-primary');
                setTimeout(() => {
                    this.classList.remove('ring-2', 'ring-primary');
                }, 500);
            });
        });
    }

    // Initialize values interaction
    setupValuesInteraction();

    // Story section parallax effect
    function setupParallaxEffect() {
        const storySection = document.querySelector('.story-section');
        if (storySection) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                storySection.style.transform = `translateY(${rate}px)`;
            });
        }
    }

    // Initialize parallax effect
    setupParallaxEffect();

    // Team member modal
    function setupTeamMemberModal() {
        const teamCards = document.querySelectorAll('[data-team-member]');
        teamCards.forEach(card => {
            card.addEventListener('click', function() {
                const member = this.getAttribute('data-team-member');
                showTeamMemberModal(member);
            });
        });
    }

    // Show team member modal
    function showTeamMemberModal(memberName) {
        // Create modal content based on member
        const modalContent = `
            <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div class="bg-white rounded-lg max-w-md w-full p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-xl font-bold">${memberName}</h3>
                        <button class="text-gray-500 hover:text-gray-700" onclick="closeModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <p class="text-gray-600 mb-4">
                        Learn more about ${memberName}'s background, expertise, and contributions to Transalo.
                    </p>
                    <div class="flex space-x-4">
                        <button class="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
                            View Profile
                        </button>
                        <button class="border border-gray-300 px-4 py-2 rounded hover:bg-gray-50" onclick="closeModal()">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalContent);
    }

    // Close modal
    window.closeModal = function() {
        const modal = document.querySelector('.fixed.inset-0');
        if (modal) {
            modal.remove();
        }
    };

    // Initialize team member modal
    setupTeamMemberModal();

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

    // Company culture section interaction
    function setupCultureInteraction() {
        const cultureItems = document.querySelectorAll('[data-culture]');
        cultureItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.classList.add('bg-primary', 'text-white');
                this.classList.remove('bg-white', 'text-gray-900');
            });
            
            item.addEventListener('mouseleave', function() {
                this.classList.remove('bg-primary', 'text-white');
                this.classList.add('bg-white', 'text-gray-900');
            });
        });
    }

    // Initialize culture interaction
    setupCultureInteraction();

    // Office locations
    function setupOfficeLocations() {
        const officeCards = document.querySelectorAll('[data-office]');
        officeCards.forEach(card => {
            card.addEventListener('click', function() {
                const office = this.getAttribute('data-office');
                console.log(`Office clicked: ${office}`);
                showNotification(`Opening ${office} office details...`);
            });
        });
    }

    // Initialize office locations
    setupOfficeLocations();
}); 