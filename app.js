// Dark Theme Portfolio - Enhanced Interactive JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initNavigation();
    initHeroAnimations();
    initScrollAnimations();
    initContactForm();
    initScrollProgress();
    initParallaxEffects();
    initEnhancedHoverEffects();
    initCounterAnimations();
    initTypingAnimations();

    console.log('🚀 Dark Theme Portfolio Loaded Successfully!');
});

// Navigation System
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Enhanced smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                updateActiveNavLink(this);
                return;
            }

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navbarHeight = navbar ? navbar.offsetHeight : 70;
                const offsetTop = targetSection.offsetTop - navbarHeight - 10;

                window.scrollTo({
                    top: Math.max(0, offsetTop),
                    behavior: 'smooth'
                });

                updateActiveNavLink(this);
            }
        });
    });

    // Hero buttons smooth scrolling
    const heroButtons = document.querySelectorAll('.hero-buttons a[href^="#"]');
    heroButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navbarHeight = navbar ? navbar.offsetHeight : 70;
                const offsetTop = targetSection.offsetTop - navbarHeight - 10;

                window.scrollTo({
                    top: Math.max(0, offsetTop),
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll-based navigation updates
    const throttledScrollHandler = throttle(() => {
        updateActiveNavigation();
        updateNavbarBackground();
    }, 16);

    window.addEventListener('scroll', throttledScrollHandler);

    function updateActiveNavLink(activeLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + (navbar ? navbar.offsetHeight : 70) + 50;

        let currentSection = null;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        if (window.scrollY < 100) {
            currentSection = 'home';
        }

        if (currentSection) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[href="#${currentSection}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }

    function updateNavbarBackground() {
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}

// Hero Animations and Background Effects
function initHeroAnimations() {
    // Enhanced floating shapes animation
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const randomDelay = Math.random() * 3;
        const randomDuration = 6 + Math.random() * 4;
        const randomScale = 0.8 + Math.random() * 0.4;

        shape.style.animationDelay = `${randomDelay}s`;
        shape.style.animationDuration = `${randomDuration}s`;
        shape.style.transform = `scale(${randomScale})`;

        // Enhanced mouse interaction
        shape.addEventListener('mouseenter', function () {
            this.style.animationPlayState = 'paused';
            this.style.transform = `scale(${randomScale * 1.5}) rotate(15deg)`;
            this.style.opacity = '0.3';
            this.style.filter = 'blur(0px)';
        });

        shape.addEventListener('mouseleave', function () {
            this.style.animationPlayState = 'running';
            this.style.transform = `scale(${randomScale}) rotate(0deg)`;
            this.style.opacity = '0.1';
            this.style.filter = 'blur(1px)';
        });
    });

    // Particle system animation
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const randomDelay = Math.random() * 12;
        const randomDuration = 8 + Math.random() * 8;
        const randomColor = ['#00D4FF', '#0084FF', '#22D3EE', '#06B6D4', '#10B981'][Math.floor(Math.random() * 5)];

        particle.style.animationDelay = `${randomDelay}s`;
        particle.style.animationDuration = `${randomDuration}s`;
        particle.style.backgroundColor = randomColor;
        particle.style.boxShadow = `0 0 10px ${randomColor}`;
    });

    // Hero stats counter animation (triggered after page load)
    setTimeout(() => {
        animateCounters();
    }, 1500);
}

// Counter Animations
function initCounterAnimations() {
    // This will be called from initHeroAnimations with delay
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const increment = target / 120; // Slower animation
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (target === 8.7) {
                    counter.textContent = Math.min(current, target).toFixed(1);
                } else {
                    counter.textContent = Math.min(Math.ceil(current), target);
                }
                requestAnimationFrame(updateCounter);
            } else {
                if (target === 8.7) {
                    counter.textContent = target.toFixed(1);
                } else {
                    counter.textContent = target;
                }

                // Add glow effect when complete
                counter.style.textShadow = '0 0 20px rgba(0, 212, 255, 0.6)';
                setTimeout(() => {
                    counter.style.textShadow = '';
                }, 1000);
            }
        };

        updateCounter();
    });
}

// Typing Animations
function initTypingAnimations() {
    setTimeout(() => {
        const heroTitle = document.getElementById('hero-title');
        const heroSubtitle = document.getElementById('hero-subtitle');

        if (heroTitle) {
            const titleText = heroTitle.textContent;
            typeWriter(heroTitle, titleText, 100, () => {
                // Start subtitle animation after title is complete
                if (heroSubtitle) {
                    const subtitleText = heroSubtitle.textContent;
                    heroSubtitle.style.background = 'none';
                    heroSubtitle.style.color = 'transparent';
                    typeWriter(heroSubtitle, subtitleText, 80, () => {
                        // Restore gradient after typing
                        heroSubtitle.style.background = 'linear-gradient(45deg, #00D4FF, #0084FF)';
                        heroSubtitle.style.webkitBackgroundClip = 'text';
                        heroSubtitle.style.webkitTextFillColor = 'transparent';
                        heroSubtitle.style.backgroundClip = 'text';
                    });
                }
            });
        }
    }, 2000);
}

function typeWriter(element, text, speed = 100, callback = null) {
    // Reset content and prepare a centered caret
    element.textContent = '';
    element.style.background = 'none';
    element.style.webkitTextFillColor = '#FFFFFF';

    const caret = document.createElement('span');
    caret.className = 'typing-caret';
    element.appendChild(caret);

    let i = 0;
    function type() {
        if (i < text.length) {
            caret.insertAdjacentText('beforebegin', text.charAt(i));
            i++;
            setTimeout(type, speed);
        } else {
            // Remove caret and restore gradient
            setTimeout(() => {
                if (caret.parentNode) caret.remove();
                element.style.background = 'linear-gradient(45deg, #00D4FF, #0084FF, #06B6D4, #10B981)';
                element.style.webkitBackgroundClip = 'text';
                element.style.webkitTextFillColor = 'transparent';
                element.style.backgroundClip = 'text';
                if (callback) callback();
            }, 500);
        }
    }
    type();
}

// Scroll-based Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.skill-category, .project-card, .education-card, .cert-card, .timeline-item, .highlight-item'
    );

    // Add loading class initially
    animatedElements.forEach(element => {
        element.classList.add('loading');
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.remove('loading');
                    entry.target.classList.add('loaded');

                    // Add special effect for skill categories
                    if (entry.target.classList.contains('skill-category')) {
                        addSkillCategoryEffect(entry.target);
                    }
                }, index * 100);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    function addSkillCategoryEffect(element) {
        const skillItems = element.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateX(0)';
                item.style.opacity = '1';
            }, index * 50);
        });
    }
}

// Enhanced Hover Effects with Gradient Backlighting
function initEnhancedHoverEffects() {
    // Enhanced button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        addRippleEffect(button);

        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px) scale(1.02)';

            if (this.classList.contains('btn--primary')) {
                this.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.4), 0 0 30px rgba(0, 212, 255, 0.3)';
            } else if (this.classList.contains('btn--outline')) {
                this.style.boxShadow = '0 15px 30px rgba(0, 212, 255, 0.3)';
            }
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Social links enhanced hover
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px) scale(1.15) rotate(5deg)';
            this.style.boxShadow = '0 15px 30px rgba(0, 212, 255, 0.4)';
        });

        link.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
            this.style.boxShadow = '';
        });
    });

    // Skill items enhanced hover
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateX(12px) scale(1.03)';
            this.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.2)';

            const icon = this.querySelector('.skill-icon');
            if (icon) {
                icon.style.transform = 'scale(1.3) rotate(10deg)';
                icon.style.filter = 'drop-shadow(0 0 10px rgba(0, 212, 255, 0.5))';
            }
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.boxShadow = '';

            const icon = this.querySelector('.skill-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.filter = '';
            }
        });
    });

    // Tech tags enhanced hover
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.1) translateY(-3px) rotate(2deg)';
            this.style.boxShadow = '0 10px 25px rgba(0, 212, 255, 0.4)';
            this.style.filter = 'brightness(1.2)';
        });

        tag.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1) translateY(0) rotate(0deg)';
            this.style.boxShadow = '';
            this.style.filter = '';
        });
    });

    // Project cards enhanced hover
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.borderColor = 'rgba(0, 212, 255, 0.5)';

            const links = this.querySelectorAll('.project-link');
            links.forEach((link, index) => {
                setTimeout(() => {
                    link.style.transform = 'translateY(-3px) scale(1.05)';
                }, index * 100);
            });
        });

        card.addEventListener('mouseleave', function () {
            this.style.borderColor = 'rgba(0, 212, 255, 0.2)';

            const links = this.querySelectorAll('.project-link');
            links.forEach(link => {
                link.style.transform = 'translateY(0) scale(1)';
            });
        });
    });

    // Contact items enhanced hover
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateX(10px) scale(1.02)';
            this.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.3)';

            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.6)';
            }
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.boxShadow = '';

            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.boxShadow = '';
            }
        });
    });
}

// Ripple Effect for Buttons
function addRippleEffect(button) {
    button.addEventListener('click', function (e) {
        const circle = document.createElement('span');
        const diameter = Math.max(this.clientWidth, this.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - this.offsetLeft - radius}px`;
        circle.style.top = `${e.clientY - this.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const ripple = this.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        this.appendChild(circle);

        setTimeout(() => {
            if (circle.parentNode) {
                circle.remove();
            }
        }, 600);
    });
}

// Contact Form with Enhanced Validation
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formInputs = document.querySelectorAll('.form-control');

    if (!contactForm) return;

    // Enhanced form field animations
    formInputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.style.borderColor = '#00D4FF';
            this.style.boxShadow = '0 0 0 3px rgba(0, 212, 255, 0.2), 0 0 20px rgba(0, 212, 255, 0.1)';
            this.style.transform = 'scale(1.02)';
        });

        input.addEventListener('blur', function () {
            this.style.borderColor = 'rgba(0, 212, 255, 0.2)';
            this.style.boxShadow = '';
            this.style.transform = 'scale(1)';
        });

        input.addEventListener('input', function () {
            const isValid = validateInput(this);
            if (isValid) {
                this.style.borderColor = '#10B981';
                this.style.boxShadow = '0 0 0 2px rgba(16, 185, 129, 0.2)';
            } else if (this.value.length > 0) {
                this.style.borderColor = '#EF4444';
                this.style.boxShadow = '0 0 0 2px rgba(239, 68, 68, 0.2)';
            }
        });
    });

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitButton = this.querySelector('button[type="submit"]');
        const originalContent = submitButton.innerHTML;

        // Enhanced loading state
        submitButton.innerHTML = '<span><i class="fas fa-spinner fa-spin"></i> Sending...</span>';
        submitButton.disabled = true;
        submitButton.style.background = 'linear-gradient(45deg, #6B7280, #9CA3AF)';
        submitButton.style.transform = 'scale(0.95)';

        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Enhanced validation
        if (!validateForm(name, email, message)) {
            resetSubmitButton();
            return;
        }

        // Simulate form submission
        setTimeout(() => {
            showMessage('🚀 Thank you for your message! I\'ll get back to you soon.', 'success');
            this.reset();

            // Success animation
            submitButton.innerHTML = '<span><i class="fas fa-check"></i> Sent Successfully!</span>';
            submitButton.style.background = 'linear-gradient(45deg, #10B981, #059669)';
            submitButton.style.transform = 'scale(1)';

            setTimeout(() => {
                resetSubmitButton();
            }, 3000);
        }, 2000);

        function resetSubmitButton() {
            submitButton.innerHTML = originalContent;
            submitButton.disabled = false;
            submitButton.style.background = 'linear-gradient(45deg, #00D4FF, #0084FF)';
            submitButton.style.transform = 'scale(1)';
        }
    });

    function validateForm(name, email, message) {
        if (!name || name.length < 2) {
            showMessage('⚠️ Name must be at least 2 characters long.', 'error');
            return false;
        }

        if (!email || !isValidEmail(email)) {
            showMessage('⚠️ Please enter a valid email address.', 'error');
            return false;
        }

        if (!message || message.length < 10) {
            showMessage('⚠️ Message must be at least 10 characters long.', 'error');
            return false;
        }

        return true;
    }

    function validateInput(input) {
        const type = input.type;
        const value = input.value;

        switch (type) {
            case 'email':
                return isValidEmail(value);
            case 'text':
                return value.length >= 2;
            default:
                if (input.tagName === 'TEXTAREA') {
                    return value.length >= 10;
                }
                return value.length > 0;
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Enhanced Message Display
function showMessage(text, type) {
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.innerHTML = text;

    // Enhanced styling
    messageDiv.style.cssText = `
        padding: 20px 24px;
        border-radius: 12px;
        margin-bottom: 24px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 12px;
        transform: translateY(-10px) scale(0.95);
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        backdrop-filter: blur(10px);
        border: 1px solid;
        font-size: 14px;
    `;

    if (type === 'success') {
        messageDiv.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))';
        messageDiv.style.color = '#10B981';
        messageDiv.style.borderColor = 'rgba(16, 185, 129, 0.3)';
        messageDiv.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.2)';
    } else {
        messageDiv.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.05))';
        messageDiv.style.color = '#EF4444';
        messageDiv.style.borderColor = 'rgba(239, 68, 68, 0.3)';
        messageDiv.style.boxShadow = '0 8px 25px rgba(239, 68, 68, 0.2)';
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm && contactForm.parentNode) {
        contactForm.parentNode.insertBefore(messageDiv, contactForm);

        // Animate in
        requestAnimationFrame(() => {
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0) scale(1)';
        });

        // Remove after 6 seconds
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateY(-10px) scale(0.95)';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 300);
        }, 6000);
    }
}

// Scroll Progress Indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Parallax Effects
function initParallaxEffects() {
    const shapes = document.querySelectorAll('.shape');
    const particles = document.querySelectorAll('.particle');

    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;

        if (scrolled <= window.innerHeight * 1.5) {
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.1;
                const rotation = scrolled * (0.05 + index * 0.01);
                const translateY = rate * speed;

                shape.style.transform = `translateY(${translateY}px) rotate(${rotation}deg) scale(${shape.dataset.scale || 1})`;
            });

            particles.forEach((particle, index) => {
                const speed = (index + 1) * 0.05;
                const translateY = rate * speed;
                particle.style.transform = `translateY(${translateY}px)`;
            });
        }
    }, 16));
}

// Utility Functions
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Keyboard Navigation
document.addEventListener('keydown', function (e) {
    // ESC key closes mobile menu
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');

    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }

    // Enhanced tab navigation
    if (e.key === 'Tab') {
        document.body.classList.add('tab-navigation');
    }
});

// Remove tab navigation class on mouse use
document.addEventListener('mousedown', function () {
    document.body.classList.remove('tab-navigation');
});

// Performance Monitoring
window.addEventListener('load', function () {
    document.body.classList.add('loaded');

    // Performance logging
    if ('performance' in window) {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`🚀 Portfolio loaded in ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
        }, 0);
    }

    // Initialize final animations after load
    setTimeout(() => {
        const loadingElements = document.querySelectorAll('.loading');
        loadingElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }, 500);
});

// Error Handling
window.addEventListener('error', function (e) {
    console.warn('Portfolio error handled:', e.error);
});

// Accessibility Enhancements
const style = document.createElement('style');
style.textContent = `
    .tab-navigation *:focus {
        outline: 2px solid #00D4FF !important;
        outline-offset: 2px !important;
        box-shadow: 0 0 0 4px rgba(0, 212, 255, 0.3) !important;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .form-message {
        animation: messageSlideIn 0.3s ease-out;
    }
    
    @keyframes messageSlideIn {
        from {
            opacity: 0;
            transform: translateY(-20px) scale(0.9);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is ready
console.log('🌟 Dark Theme Portfolio JavaScript Initialized!');