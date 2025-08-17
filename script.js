// Contact Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initContactForm();
    initCharacterCounter();
    initFormValidation();
    initSmoothScrolling();
    initMobileMenu();
});

// Initialize contact form functionality
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const successModal = document.getElementById('successModal');

    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    // Handle form submission
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        // Show loading spinner
        showLoadingSpinner();
        
        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        try {
            // Simulate form submission (replace with actual API call)
            await simulateFormSubmission();
            
            // Hide loading spinner
            hideLoadingSpinner();
            
            // Show success modal
            showSuccessModal();
            
            // Reset form
            form.reset();
            resetFormValidation();
            
        } catch (error) {
            console.error('Form submission error:', error);
            hideLoadingSpinner();
            showErrorMessage('An error occurred while sending your message. Please try again.');
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        }
    }

    // Simulate form submission (replace with actual API call)
    function simulateFormSubmission() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 2000); // Simulate 2-second delay
        });
    }

    // Show loading spinner
    function showLoadingSpinner() {
        if (loadingSpinner) {
            loadingSpinner.style.display = 'flex';
        }
    }

    // Hide loading spinner
    function hideLoadingSpinner() {
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none';
        }
    }

    // Show success modal
    function showSuccessModal() {
        if (successModal) {
            successModal.style.display = 'flex';
        }
    }
}

// Initialize character counter for message field
function initCharacterCounter() {
    const messageField = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    const maxLength = 500;

    if (messageField && charCount) {
        messageField.addEventListener('input', function() {
            const currentLength = this.value.length;
            charCount.textContent = currentLength;
            
            // Update character counter color based on length
            if (currentLength > maxLength * 0.9) {
                charCount.style.color = '#f59e0b'; // Warning color
            } else if (currentLength > maxLength * 0.8) {
                charCount.style.color = '#64748b'; // Secondary color
            } else {
                charCount.style.color = '#94a3b8'; // Light color
            }
            
            // Prevent typing beyond max length
            if (currentLength > maxLength) {
                this.value = this.value.substring(0, maxLength);
                charCount.textContent = maxLength;
            }
        });
    }
}

// Initialize form validation
function initFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Get all form fields
    const fields = {
        firstName: document.getElementById('firstName'),
        lastName: document.getElementById('lastName'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message'),
        privacy: document.getElementById('privacy')
    };

    // Add event listeners for real-time validation
    Object.keys(fields).forEach(fieldName => {
        const field = fields[fieldName];
        if (field) {
            field.addEventListener('blur', () => validateField(fieldName, field.value));
            field.addEventListener('input', () => clearFieldError(fieldName));
        }
    });

    // Validation functions
    function validateField(fieldName, value) {
        const field = fields[fieldName];
        const errorElement = document.getElementById(fieldName + 'Error');
        
        if (!field || !errorElement) return true;

        let isValid = true;
        let errorMessage = '';

        switch (fieldName) {
            case 'firstName':
            case 'lastName':
                if (!value.trim()) {
                    errorMessage = `${fieldName === 'firstName' ? 'First name' : 'Last name'} is required`;
                    isValid = false;
                } else if (value.trim().length < 2) {
                    errorMessage = `${fieldName === 'firstName' ? 'First name' : 'Last name'} must be at least 2 characters`;
                    isValid = false;
                } else if (!/^[a-zA-Z\s'-]+$/.test(value.trim())) {
                    errorMessage = `${fieldName === 'firstName' ? 'First name' : 'Last name'} can only contain letters, spaces, hyphens, and apostrophes`;
                    isValid = false;
                }
                break;

            case 'email':
                if (!value.trim()) {
                    errorMessage = 'Email address is required';
                    isValid = false;
                } else if (!isValidEmail(value.trim())) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;

            case 'phone':
                if (value.trim() && !isValidPhone(value.trim())) {
                    errorMessage = 'Please enter a valid phone number';
                    isValid = false;
                }
                break;

            case 'subject':
                if (!value) {
                    errorMessage = 'Please select a subject';
                    isValid = false;
                }
                break;

            case 'message':
                if (!value.trim()) {
                    errorMessage = 'Message is required';
                    isValid = false;
                } else if (value.trim().length < 10) {
                    errorMessage = 'Message must be at least 10 characters';
                    isValid = false;
                } else if (value.trim().length > 500) {
                    errorMessage = 'Message cannot exceed 500 characters';
                    isValid = false;
                }
                break;

            case 'privacy':
                if (!field.checked) {
                    errorMessage = 'You must agree to the Privacy Policy and Terms of Service';
                    isValid = false;
                }
                break;
        }

        // Update field styling and error message
        if (!isValid) {
            field.classList.add('error');
            field.classList.remove('success');
            errorElement.textContent = errorMessage;
        } else {
            field.classList.remove('error');
            field.classList.add('success');
            errorElement.textContent = '';
        }

        return isValid;
    }

    // Clear field error
    function clearFieldError(fieldName) {
        const field = fields[fieldName];
        const errorElement = document.getElementById(fieldName + 'Error');
        
        if (field && errorElement) {
            field.classList.remove('error', 'success');
            errorElement.textContent = '';
        }
    }

    // Validate entire form
    window.validateForm = function() {
        let isValid = true;
        
        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName];
            if (field) {
                if (!validateField(fieldName, field.value)) {
                    isValid = false;
                }
            }
        });

        return isValid;
    };

    // Reset form validation
    window.resetFormValidation = function() {
        Object.keys(fields).forEach(fieldName => {
            clearFieldError(fieldName);
        });
    };
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation helper
function isValidPhone(phone) {
    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, '');
    
    // Check if it's a valid phone number (7-15 digits)
    return digitsOnly.length >= 7 && digitsOnly.length <= 15;
}

// Initialize smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                updateActiveNavLink(this);
            }
        });
    });
}

// Update active navigation link
function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Initialize mobile menu (for future mobile navigation)
function initMobileMenu() {
    // This can be expanded for mobile menu functionality
    console.log('Mobile menu initialized');
}

// Show error message
function showErrorMessage(message) {
    // Create a temporary error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ef4444;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    errorDiv.textContent = message;
    
    document.body.appendChild(errorDiv);
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        errorDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 300);
    }, 5000);
}

// Close modal function (called from HTML)
window.closeModal = function() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.style.display = 'none';
    }
};

// Add CSS animations for error messages
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Form field enhancement: Auto-resize textarea
function initTextareaAutoResize() {
    const textarea = document.getElementById('message');
    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 200) + 'px';
        });
    }
}

// Initialize textarea auto-resize
initTextareaAutoResize();

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const form = document.getElementById('contactForm');
        if (form && document.activeElement.closest('#contactForm')) {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    }
    
    // Escape key to close modal
    if (e.key === 'Escape') {
        const successModal = document.getElementById('successModal');
        if (successModal && successModal.style.display === 'flex') {
            closeModal();
        }
    }
});

// Add form analytics (optional)
function trackFormInteraction(action, fieldName = null) {
    // This can be connected to Google Analytics or other tracking services
    console.log('Form interaction:', { action, fieldName, timestamp: new Date().toISOString() });
}

// Enhance form fields with tracking
document.addEventListener('DOMContentLoaded', function() {
    const formFields = document.querySelectorAll('#contactForm input, #contactForm textarea, #contactForm select');
    
    formFields.forEach(field => {
        field.addEventListener('focus', () => {
            trackFormInteraction('focus', field.name);
        });
        
        field.addEventListener('blur', () => {
            trackFormInteraction('blur', field.name);
        });
    });
});

// Add loading state management
function setFormLoadingState(isLoading) {
    const submitBtn = document.getElementById('submitBtn');
    const form = document.getElementById('contactForm');
    
    if (isLoading) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        form.style.opacity = '0.7';
        form.style.pointerEvents = 'none';
    } else {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        form.style.opacity = '1';
        form.style.pointerEvents = 'auto';
    }
}

// Export functions for potential external use
window.ContactForm = {
    validateForm: window.validateForm,
    resetFormValidation: window.resetFormValidation,
    closeModal: window.closeModal,
    setFormLoadingState: setFormLoadingState,
    trackFormInteraction: trackFormInteraction
};
