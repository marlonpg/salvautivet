// ==========================================
// SALVA CLIENTS - Interactive JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollAnimations();
    initFormHandling();
    initSmoothScroll();
});

// ==========================================
// NAVIGATION FUNCTIONALITY
// ==========================================

function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);

        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements that need animation
    const animateElements = document.querySelectorAll(
        '.service-card, .feature-item, .info-card'
    );

    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// ==========================================
// FORM HANDLING
// ==========================================

function initFormHandling() {
    const form = document.getElementById('contact-form');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const pet = document.getElementById('pet').value.trim();
            const message = document.getElementById('message').value.trim();

            // Validate form
            if (!validateForm(name, email, pet, message)) {
                showNotification('Please fill in all fields correctly', 'error');
                return;
            }

            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual endpoint)
            setTimeout(() => {
                // Success notification
                showNotification('Thank you! We\'ll contact you within 1 hour.', 'success');

                // Reset form
                form.reset();

                // Restore button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                // In production, send to: /api/contact or use a service like Formspree
            }, 1500);
        });
    }
}

// ==========================================
// FORM VALIDATION
// ==========================================

function validateForm(name, email, pet, message) {
    if (!name || name.length < 2) {
        return false;
    }

    if (!email || !isValidEmail(email)) {
        return false;
    }

    if (!pet || pet.length < 1) {
        return false;
    }

    if (!message || message.length < 10) {
        return false;
    }

    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ==========================================
// NOTIFICATION SYSTEM
// ==========================================

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    const style = document.createElement('style');
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        style.textContent = `
            .notification {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                padding: 1rem 1.5rem;
                border-radius: 0.5rem;
                font-weight: 600;
                z-index: 10000;
                animation: slideInRight 0.3s ease-out;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                max-width: 400px;
            }

            .notification-success {
                background: #10b981;
                color: white;
            }

            .notification-error {
                background: #ef4444;
                color: white;
            }

            .notification-info {
                background: #3b82f6;
                color: white;
            }

            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            @keyframes slideOutRight {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(100px);
                }
            }

            @media (max-width: 480px) {
                .notification {
                    bottom: 1rem;
                    right: 1rem;
                    left: 1rem;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================

let lastScrollY = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    lastScrollY = window.scrollY;

    if (lastScrollY > 50) {
        navbar.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// ==========================================
// COUNTER ANIMATION (for Why Us section)
// ==========================================

function animateCounters() {
    const counters = document.querySelectorAll('.counter');

    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target) || 0;
        const increment = target / 50;

        const updateCount = () => {
            const count = parseInt(counter.textContent);

            if (count < target) {
                counter.textContent = Math.ceil(count + increment);
                setTimeout(updateCount, 30);
            } else {
                counter.textContent = target;
            }
        };

        updateCount();
    });
}

// Trigger counter animation when section is in view
const whyUsSection = document.getElementById('why-us');
if (whyUsSection) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });
    observer.observe(whyUsSection);
}

// ==========================================
// ACCESSIBILITY: KEYBOARD NAVIGATION
// ==========================================

document.addEventListener('keydown', function(event) {
    // Press 'E' to call emergency number
    if (event.key === 'e' || event.key === 'E') {
        const telLink = document.querySelector('a[href^="tel:"]');
        if (telLink) {
            telLink.click();
        }
    }

    // Press 'C' to go to contact
    if (event.key === 'c' || event.key === 'C') {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ==========================================
// DYNAMIC YEAR IN FOOTER
// ==========================================

const yearElement = document.querySelector('.footer-bottom');
if (yearElement && yearElement.textContent.includes('2026')) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = yearElement.textContent.replace('2026', currentYear.toString());
}

// ==========================================
// LAZY LOADING FOR IMAGES (if added later)
// ==========================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Call lazy loading function
initLazyLoading();

// ==========================================
// CONSOLE GREETING
// ==========================================

console.log('%cWelcome to Salva Clients!', 'color: #1B4332; font-size: 24px; font-weight: bold;');
console.log('%cProfessional Veterinary Emergency Services', 'color: #DC2626; font-size: 14px;');
console.log('%cAvailable 24/7 | Call: +1 (234) 567-8900', 'color: #2D6A4F; font-size: 12px;');
