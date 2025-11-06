// Main JavaScript file

// Featured Drinks Data
const featuredDrinks = [
    {
        name: "Signature Nutty Latte",
        image: "assets/images/nutty-latte.jpg",
        description: "Our signature drink with hazelnut and almond notes",
        price: "$4.99"
    },
    {
        name: "Caramel Macchiato",
        image: "assets/images/caramel-macchiato.jpg",
        description: "Rich espresso with vanilla and caramel",
        price: "$4.49"
    },
    {
        name: "Pistachio Cold Brew",
        image: "assets/images/pistachio-coldbrew.jpg",
        description: "Smooth cold brew with pistachio cream",
        price: "$5.49"
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initializeFlipCards();
    initializeTiltEffect();
    initializeScrollAnimations();
});

// Initialize Flip Cards
function initializeFlipCards() {
    const container = document.querySelector('.flipcard-container');
    if (!container) return;

    featuredDrinks.forEach(drink => {
        const flipcard = createFlipCard(drink);
        container.appendChild(flipcard);
    });
}

// Create Flip Card Element
function createFlipCard(drink) {
    const flipcard = document.createElement('div');
    flipcard.className = 'flipcard';
    
    flipcard.innerHTML = `
        <div class="flipcard-inner">
            <div class="flipcard-front">
                <img src="${drink.image}" alt="${drink.name}">
                <h3>${drink.name}</h3>
            </div>
            <div class="flipcard-back">
                <h3>${drink.name}</h3>
                <p>${drink.description}</p>
                <p class="price">${drink.price}</p>
            </div>
        </div>
    `;
    
    return flipcard;
}

// 3D Tilt Effect
function initializeTiltEffect() {
    const cards = document.querySelectorAll('.tilt-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    });
}

function handleTilt(e) {
    const card = e.currentTarget;
    const cardRect = card.getBoundingClientRect();
    const x = e.clientX - cardRect.left;
    const y = e.clientY - cardRect.top;
    
    const centerX = cardRect.width / 2;
    const centerY = cardRect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

function resetTilt(e) {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
}

// Scroll Animations
function initializeScrollAnimations() {
    const elements = document.querySelectorAll('.slide-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => observer.observe(element));
}

// Form Validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            markInvalid(input, 'This field is required');
            isValid = false;
        } else if (input.type === 'email' && !validateEmail(input.value)) {
            markInvalid(input, 'Please enter a valid email address');
            isValid = false;
        }
    });
    
    return isValid;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function markInvalid(input, message) {
    input.classList.add('invalid');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
}

// Lightbox Gallery
function initializeLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    const lightbox = document.querySelector('.lightbox');
    
    galleryImages.forEach(image => {
        image.addEventListener('click', () => {
            const lightboxImage = document.createElement('img');
            lightboxImage.src = image.src;
            lightbox.innerHTML = '';
            lightbox.appendChild(lightboxImage);
            lightbox.classList.add('active');
        });
    });
    
    lightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });
}