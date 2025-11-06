// Booking form functionality

document.addEventListener('DOMContentLoaded', () => {
    initializeBookingForm();
    setMinimumDate();
});

function initializeBookingForm() {
    const form = document.getElementById('bookingForm');
    
    if (form) {
        form.addEventListener('submit', handleBookingSubmit);
        
        // Add input event listeners for real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                validateField(input);
            });
        });
    }
}

function setMinimumDate() {
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.min = tomorrow.toISOString().split('T')[0];
    }
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
    
    switch (input.type) {
        case 'email':
            if (!validateEmail(input.value)) {
                markInvalid(input, 'Please enter a valid email address');
                return false;
            }
            break;
            
        case 'tel':
            if (!validatePhone(input.value)) {
                markInvalid(input, 'Please enter a valid phone number');
                return false;
            }
            break;
            
        case 'date':
            if (!validateDate(input.value)) {
                markInvalid(input, 'Please select a future date');
                return false;
            }
            break;
            
        case 'time':
            if (!validateTime(input.value)) {
                markInvalid(input, 'Please select a time during our operating hours');
                return false;
            }
            break;
    }
    
    return true;
}

function validatePhone(phone) {
    // Basic phone validation - can be customized based on your requirements
    return /^\+?[\d\s-]{10,}$/.test(phone);
}

function validateDate(date) {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return selectedDate >= today;
}

function validateTime(time) {
    const [hours, minutes] = time.split(':').map(Number);
    // Assuming operating hours are 7am - 8pm
    return (hours >= 7 && hours < 20) || (hours === 20 && minutes === 0);
}

async function handleBookingSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    
    if (!validateForm(form)) {
        return;
    }
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<div class="loading"></div>';
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        showBookingConfirmation(form);
        form.reset();
    } catch (error) {
        showError('Something went wrong. Please try again.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Book Now';
    }
}

function showBookingConfirmation(form) {
    const confirmationDiv = document.createElement('div');
    confirmationDiv.className = 'booking-confirmation fade-in';
    confirmationDiv.innerHTML = `
        <h3>Booking Confirmed! 🎉</h3>
        <p>Thank you for choosing Nuts Coffee Shop. We've sent a confirmation email with your booking details.</p>
        <p>Looking forward to serving you!</p>
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
    
    const form = document.getElementById('bookingForm');
    form.parentElement.insertBefore(errorDiv, form);
    
    setTimeout(() => errorDiv.remove(), 5000);
}