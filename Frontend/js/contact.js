// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Contact form handling
    function setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleFormSubmission();
            });
        }
    }

    // Initialize contact form
    setupContactForm();

    // Handle form submission
    function handleFormSubmission() {
        const form = document.getElementById('contact-form');
        const formData = new FormData(form);
        
        // Validate form
        if (validateForm(formData)) {
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Here you would typically send the form data to your backend
                console.log('Form submitted:', Object.fromEntries(formData));
                
                // Show success message
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                
                // Reset form
                form.reset();
                
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Track form submission
                trackFormSubmission(formData);
            }, 2000);
        }
    }

    // Validate form
    function validateForm(formData) {
        const requiredFields = ['first-name', 'last-name', 'email', 'subject', 'message'];
        let isValid = true;
        
        requiredFields.forEach(field => {
            const value = formData.get(field);
            const input = document.getElementById(field);
            
            if (!value || value.trim() === '') {
                showFieldError(input, 'This field is required');
                isValid = false;
            } else if (field === 'email' && !isValidEmail(value)) {
                showFieldError(input, 'Please enter a valid email address');
                isValid = false;
            } else {
                clearFieldError(input);
            }
        });
        
        return isValid;
    }

    // Validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show field error
    function showFieldError(input, message) {
        const errorDiv = input.parentNode.querySelector('.field-error') || 
                        document.createElement('div');
        errorDiv.className = 'field-error text-red-500 text-sm mt-1';
        errorDiv.textContent = message;
        
        if (!input.parentNode.querySelector('.field-error')) {
            input.parentNode.appendChild(errorDiv);
        }
        
        input.classList.add('border-red-500');
        input.classList.remove('border-gray-300');
    }

    // Clear field error
    function clearFieldError(input) {
        const errorDiv = input.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
        
        input.classList.remove('border-red-500');
        input.classList.add('border-gray-300');
    }

    // Track form submission
    function trackFormSubmission(formData) {
        const subject = formData.get('subject');
        console.log(`Contact form submitted with subject: ${subject}`);
        // Here you would typically send analytics data
    }

    // Show notification
    function showNotification(message, type = 'info') {
        const colors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            info: 'bg-blue-500'
        };

        const notification = document.createElement('div');
        notification.className = `fixed top-20 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
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
        }, 5000);
    }

    // Real-time form validation
    function setupRealTimeValidation() {
        const inputs = document.querySelectorAll('#contact-form input, #contact-form textarea, #contact-form select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('border-red-500')) {
                    validateField(this);
                }
            });
        });
    }

    // Initialize real-time validation
    setupRealTimeValidation();

    // Validate individual field
    function validateField(input) {
        const value = input.value.trim();
        const fieldName = input.name;
        
        if (!value) {
            showFieldError(input, 'This field is required');
            return false;
        }
        
        if (fieldName === 'email' && !isValidEmail(value)) {
            showFieldError(input, 'Please enter a valid email address');
            return false;
        }
        
        clearFieldError(input);
        return true;
    }

    // Character counter for message field
    function setupCharacterCounter() {
        const messageField = document.getElementById('message');
        if (messageField) {
            const counter = document.createElement('div');
            counter.className = 'text-sm text-gray-500 mt-1 text-right';
            messageField.parentNode.appendChild(counter);
            
            messageField.addEventListener('input', function() {
                const remaining = 1000 - this.value.length;
                counter.textContent = `${remaining} characters remaining`;
                
                if (remaining < 0) {
                    counter.classList.add('text-red-500');
                } else {
                    counter.classList.remove('text-red-500');
                }
            });
        }
    }

    // Initialize character counter
    setupCharacterCounter();

    // Contact method tracking
    function setupContactMethodTracking() {
        const contactMethods = document.querySelectorAll('[data-contact-method]');
        contactMethods.forEach(method => {
            method.addEventListener('click', function() {
                const methodType = this.getAttribute('data-contact-method');
                trackContactMethodClick(methodType);
            });
        });
    }

    // Initialize contact method tracking
    setupContactMethodTracking();

    // Track contact method clicks
    function trackContactMethodClick(method) {
        console.log(`Contact method clicked: ${method}`);
        // Here you would typically send analytics data
    }

    // FAQ functionality
    function setupFAQ() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.closest('.group');
                const isActive = faqItem.classList.contains('active');
                
                // Close all other FAQ items
                document.querySelectorAll('.group').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Toggle current item
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });
    }

    // Initialize FAQ
    setupFAQ();

    // Social media link tracking
    function setupSocialMediaTracking() {
        const socialLinks = document.querySelectorAll('a[href^="#"]');
        socialLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const platform = this.querySelector('i').className.includes('twitter') ? 'Twitter' :
                               this.querySelector('i').className.includes('linkedin') ? 'LinkedIn' :
                               this.querySelector('i').className.includes('github') ? 'GitHub' :
                               this.querySelector('i').className.includes('youtube') ? 'YouTube' : 'Other';
                
                trackSocialMediaClick(platform);
            });
        });
    }

    // Initialize social media tracking
    setupSocialMediaTracking();

    // Track social media clicks
    function trackSocialMediaClick(platform) {
        console.log(`Social media clicked: ${platform}`);
        // Here you would typically send analytics data
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

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                showNotification('Thank you for subscribing!', 'success');
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

    // Form reset functionality
    function setupFormReset() {
        const resetButton = document.querySelector('button[type="reset"]');
        if (resetButton) {
            resetButton.addEventListener('click', function() {
                // Clear all field errors
                document.querySelectorAll('.field-error').forEach(error => {
                    error.remove();
                });
                
                // Reset input styles
                document.querySelectorAll('#contact-form input, #contact-form textarea, #contact-form select').forEach(input => {
                    input.classList.remove('border-red-500');
                    input.classList.add('border-gray-300');
                });
                
                // Reset character counter
                const counter = document.querySelector('#message').parentNode.querySelector('.text-sm');
                if (counter) {
                    counter.textContent = '1000 characters remaining';
                    counter.classList.remove('text-red-500');
                }
            });
        }
    }

    // Initialize form reset
    setupFormReset();
}); 