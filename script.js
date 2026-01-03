// ==========================================
// SALVA CLIENTS - JavaScript Interativo
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollAnimations();
    initFormHandling();
    initSmoothScroll();
});

// ==========================================
// FUNCIONALIDADE DE NAVEGAÇÃO
// ==========================================

function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Alterna o menu móvel
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Fecha o menu quando o link é clicado
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Fecha o menu ao clicar fora
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
// ROLAGEM SUAVE PARA LINKS DE ÂNCORA
// ==========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Conta com a navbar fixa
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// ANIMAÇÕES DE ROLAGEM
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

    // Observa todos os elementos que precisam de animação
    const animateElements = document.querySelectorAll(
        '.service-card, .feature-item, .info-card'
    );

    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// ==========================================
// MANIPULAÇÃO DE FORMULÁRIO
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
                showNotification('Por favor, preencha todos os campos corretamente', 'error');
                return;
            }

            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual endpoint)
            setTimeout(() => {
                // Success notification
                showNotification('Obrigado! Entraremos em contato em até 1 hora.', 'success');

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
// VALIDAÇÃO DE FORMULÁRIO
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
// SISTEMA DE NOTIFICAÇÃO
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
// EFEITO DE ROLAGEM DA NAVBAR
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
// ANIMAÇÃO DE CONTADOR (para seção Por Que Nós)
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

// Ativa animação de contador quando a seção está visível
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
// ACESSIBILIDADE: NAVEGAÇÃO POR TECLADO
// ==========================================

document.addEventListener('keydown', function(event) {
    // Pressione 'E' para ligar para número de emergência
    if (event.key === 'e' || event.key === 'E') {
        const telLink = document.querySelector('a[href^="tel:"]');
        if (telLink) {
            telLink.click();
        }
    }

    // Pressione 'C' para ir para contato
    if (event.key === 'c' || event.key === 'C') {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ==========================================
// ANO DINÂMICO NO RODAPÉ
// ==========================================

const yearElement = document.querySelector('.footer-bottom');
if (yearElement && yearElement.textContent.includes('2026')) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = yearElement.textContent.replace('2026', currentYear.toString());
}

// ==========================================
// CARREGAMENTO LENTO PARA IMAGENS (se adicionadas depois)
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
// SAUDAÇÃO DO CONSOLE
// ==========================================

console.log('%cBem-vindo a Salva Clients!', 'color: #1B4332; font-size: 24px; font-weight: bold;');
console.log('%cServiços Profissionais de Emergência Veterinária', 'color: #DC2626; font-size: 14px;');
console.log('%cDisponível 24/7 | Ligue: +1 (234) 567-8900', 'color: #2D6A4F; font-size: 12px;');
