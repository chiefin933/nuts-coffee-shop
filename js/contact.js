// Contact form functionality

document.addEventListener('DOMContentLoaded', () => {
    initializeContactForm();
});

function initializeContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', handleContactSubmit);
        
        // Add input event listeners for real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                validateField(input);
            });
        });
    }
}

function validateContactForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(input) {
    const errorElement = input.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
    
    input.classList.remove('invalid');
    
    if (input.hasAttribute('required') && !input.value.trim()) {
        markInvalid(input, 'This field is required');
        return false;
    }
    
    if (input.type === 'email' && !validateEmail(input.value)) {
        markInvalid(input, 'Please enter a valid email address');
        return false;
    }
    
    return true;
}

function markInvalid(input, message) {
    input.classList.add('invalid');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
}

async function handleContactSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    
    if (!validateContactForm(form)) {
        return;
    }
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<div class="loading"></div>';
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        showContactConfirmation(form);
        form.reset();
    } catch (error) {
        showError('Something went wrong. Please try again.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    }
}

function showContactConfirmation(form) {
    const confirmationDiv = document.createElement('div');
    confirmationDiv.className = 'contact-confirmation fade-in';
    confirmationDiv.innerHTML = `
        <h3>Message Sent! 📧</h3>
        <p>Thank you for reaching out to Nuts Coffee Shop. We'll get back to you within 24 hours.</p>
    `;
    
    form.parentElement.insertBefore(confirmationDiv, form);
    form.style.display = 'none';
    
    // Remove confirmation after 5 seconds and show form again
    setTimeout(() => {
        confirmationDiv.remove();
        form.style.display = 'block';
    }, 5000);
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message fade-in';
    errorDiv.textContent = message;
    
    const form = document.getElementById('contactForm');
    form.parentElement.insertBefore(errorDiv, form);
    
    setTimeout(() => errorDiv.remove(), 5000);
}