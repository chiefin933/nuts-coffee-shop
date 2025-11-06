// Animations and effects

document.addEventListener('DOMContentLoaded', () => {
    initializeAnimations();
});

function initializeAnimations() {
    // Initialize section reveal first (so we can add animation classes)
    initializeSectionReveal();

    // Initialize scroll animations
    initializeScrollAnimations();

    // Initialize tilt effects
    initializeTiltEffects();

    // Initialize parallax effects
    initializeParallax();
}

// Reveal sections by adding animation classes when they enter the viewport
function initializeSectionReveal() {
    const sectionSelectors = [
        'main > section',
        '.story-section',
        '.values-section',
        '.interior-section',
        '.team-section',
        '.contact-section',
        '.booking-section',
        '.menu-section',
        '.gallery-grid'
    ];

    const sections = document.querySelectorAll(sectionSelectors.join(','));
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Prefer slide-in for sections with headings, otherwise fade-in
                if (entry.target.querySelector && entry.target.querySelector('h2, h3')) {
                    entry.target.classList.add('slide-in');
                } else {
                    entry.target.classList.add('fade-in');
                }
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px'
    });

    sections.forEach(s => observer.observe(s));
}

// Scroll Animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('fade-in')) {
                    observer.unobserve(entry.target);
                }
            } else if (entry.target.classList.contains('slide-in')) {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => observer.observe(element));
}

// Tilt Effects
function initializeTiltEffects() {
    const tiltElements = document.querySelectorAll('.tilt-card');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', handleTilt);
        element.addEventListener('mouseleave', resetTilt);
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

// Parallax Effects
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            element.style.backgroundPositionY = `${rate}px`;
        });
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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