/**
 * The Speaker's Journey - Main JavaScript
 * High-performance, modular landing page logic.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialization of components
    initNavbar();
    initMobileMenu();
    initTypewriter();
    initScrollReveal();
    initProgressBars();
    initCounters();
    initTestimonials();
    initFAQ();
    initSmoothScroll();
    initScrollToTop();
});

/**
 * Navbar scroll behavior
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-sticky');
        } else {
            navbar.classList.remove('navbar-sticky');
        }
    }, { passive: true });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-nav-link');

    if (!menuBtn || !menu) return;

    const toggleMenu = () => {
        const isOpen = menu.classList.toggle('active');
        const icon = menuBtn.querySelector('svg');
        if (icon) {
            icon.innerHTML = isOpen 
                ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>'
                : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
        }
    };

    menuBtn.addEventListener('click', toggleMenu);
    
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (menu.classList.contains('active')) toggleMenu();
        });
    });
}

/**
 * Hero section typewriter effect
 */
function initTypewriter() {
    const target = document.querySelector('#typed-text');
    if (!target || typeof Typed === 'undefined') return;

    new Typed('#typed-text', {
        strings: [
            'Bikin Anak Berani Bicara',
            'Percaya Diri Sejak Sekarang',
            'Jadi Pembicara Handal'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
}

/**
 * Scroll reveal animations using IntersectionObserver
 */
function initScrollReveal() {
    const targets = document.querySelectorAll('.reveal');
    if (targets.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    targets.forEach(target => observer.observe(target));
}

/**
 * Progress bar animations
 */
function initProgressBars() {
    const bars = document.querySelectorAll('.progress-bar');
    if (bars.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width') || '100';
                bar.style.width = `${width}%`;
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    bars.forEach(bar => observer.observe(bar));
}

/**
 * Statistics counters
 */
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const step = duration / 60; // 60fps
    const increment = target / (duration / step);
    let current = 0;

    const update = () => {
        current += increment;
        if (current < target) {
            el.textContent = Math.floor(current) + (target >= 100 ? '+' : '');
            setTimeout(update, step);
        } else {
            el.textContent = target + (target >= 100 ? '+' : '');
        }
    };

    update();
}

/**
 * Testimonial carousel (Splide.js)
 */
function initTestimonials() {
    const el = document.querySelector('#testimonial-slider');
    if (!el || typeof Splide === 'undefined') return;

    new Splide('#testimonial-slider', {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        gap: '2rem',
        autoplay: true,
        interval: 4000,
        pauseOnHover: true,
        arrows: false,
        pagination: true,
        breakpoints: {
            1024: { perPage: 2 },
            768: { perPage: 1 }
        }
    }).mount();
}

/**
 * FAQ Accordion
 */
function initFAQ() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close other items
            items.forEach(i => {
                i.classList.remove('active');
                const icon = i.querySelector('.faq-icon');
                if (icon) icon.textContent = '+';
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                const icon = item.querySelector('.faq-icon');
                if (icon) icon.textContent = '−';
            }
        });
    });
}

/**
 * Smooth scrolling for navigation links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll to top button visibility
 */
function initScrollToTop() {
    const btn = document.getElementById('scrollToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });
}
