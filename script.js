// Custom Cursor
const customCursor = document.getElementById('custom-cursor');

document.addEventListener('mousemove', (e) => {
    if (customCursor) {
        customCursor.style.left = e.clientX - 10 + 'px';
        customCursor.style.top = e.clientY - 10 + 'px';
    }
});

// Hover effects on links and buttons
const interactiveElements = document.querySelectorAll('a, button, .nav-btn, .social-btn, .social-link');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        if (customCursor) {
            customCursor.style.transform = 'scale(1.3) rotate(5deg)';
            customCursor.style.transition = 'transform 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        }
    });

    element.addEventListener('mouseleave', () => {
        if (customCursor) {
            customCursor.style.transform = 'scale(1) rotate(0deg)';
            customCursor.style.transition = 'transform 0.2s ease-out';
        }
    });
});

// Click animation
document.addEventListener('mousedown', () => {
    if (customCursor) {
        customCursor.style.transform = 'scale(0.8) rotate(-5deg)';
    }
});

document.addEventListener('mouseup', () => {
    if (customCursor) {
        customCursor.style.transform = 'scale(1) rotate(0deg)';
    }
});

// Theme Toggle
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    if (currentTheme === 'dark') {
        html.setAttribute('data-theme', 'light');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
        localStorage.setItem('theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
        localStorage.setItem('theme', 'dark');
    }
}

// Load theme from localStorage
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    if (savedTheme === 'dark') {
        if (sunIcon) sunIcon.classList.add('hidden');
        if (moonIcon) moonIcon.classList.remove('hidden');
    } else {
        if (sunIcon) sunIcon.classList.remove('hidden');
        if (moonIcon) moonIcon.classList.add('hidden');
    }
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const yOffset = -80; // Offset for fixed navbar
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
}

// Scroll arrow
function scrollToHeroEnd() {
    const windowHeight = window.innerHeight;
    window.scrollTo({ top: windowHeight, behavior: 'smooth' });
}

// Experience selector
function toggleExperienceMenu() {
    const menu = document.getElementById('experience-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

function selectExperience(expId) {
    const menu = document.getElementById('experience-menu');
    const items = document.querySelectorAll('.experience-item');

    // Update active state
    items.forEach(item => {
        item.classList.remove('active');
    });

    // Find and activate selected item
    items.forEach(item => {
        if (item.getAttribute('onclick').includes(expId)) {
            item.classList.add('active');
        }
    });

    // Close menu
    if (menu) {
        menu.classList.add('hidden');
    }

    // Scroll to about section
    setTimeout(() => {
        scrollToSection('about');
    }, 100);
}

// Close experience menu when clicking outside
document.addEventListener('click', (e) => {
    const selector = document.querySelector('.experience-selector');
    const menu = document.getElementById('experience-menu');
    if (selector && !selector.contains(e.target) && menu) {
        menu.classList.add('hidden');
    }
});

// Update current year in footer
const currentYearElement = document.getElementById('current-year');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// Scroll arrow visibility
let lastScrollY = 0;
window.addEventListener('scroll', () => {
    const scrollArrow = document.querySelector('.scroll-arrow');
    const currentScrollY = window.scrollY;

    if (scrollArrow) {
        if (currentScrollY < 100) {
            scrollArrow.style.opacity = '1';
            scrollArrow.style.pointerEvents = 'auto';
        } else {
            scrollArrow.style.opacity = '0';
            scrollArrow.style.pointerEvents = 'none';
        }
    }

    lastScrollY = currentScrollY;
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    initScrollAnimations();
    initCardHoverEffect();
});

// Card hover effect - follow mouse
function initCardHoverEffect() {
    const experienceCards = document.querySelectorAll('.experience-card');

    experienceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards
    const cards = document.querySelectorAll('.card, .experience-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe sections
    const sections = document.querySelectorAll('.section-header, .hero-text');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Add animation class to cards
const style = document.createElement('style');
style.textContent = `
    .card, .section-header, .hero-text {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .card.animate-in, .section-header.animate-in, .hero-text.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
