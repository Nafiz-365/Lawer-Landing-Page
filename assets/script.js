document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.querySelector('.nav-overlay');
    const header = document.querySelector('.header-area');

    if (hamburger && navMenu) {
        const updateMenuState = (isOpen) => {
            hamburger.classList.toggle('active', isOpen);
            navMenu.classList.toggle('active', isOpen);
            hamburger.setAttribute('aria-expanded', String(isOpen));
            document.body.classList.toggle('menu-open', isOpen);

            if (navOverlay) {
                navOverlay.classList.toggle('active', isOpen);
            }

            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars', !isOpen);
                icon.classList.toggle('fa-xmark', isOpen);
            }
        };

        hamburger.addEventListener('click', () => {
            const isOpen = !hamburger.classList.contains('active');
            updateMenuState(isOpen);
        });

        if (navOverlay) {
            navOverlay.addEventListener('click', () => updateMenuState(false));
        }

        document
            .querySelectorAll('.nav-menu ul li a, .nav-cta')
            .forEach((link) => {
                link.addEventListener('click', () => updateMenuState(false));
            });

        document.addEventListener('keydown', (event) => {
            if (
                event.key === 'Escape' &&
                hamburger.classList.contains('active')
            ) {
                updateMenuState(false);
            }
        });
    }

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.12,
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.hero-text, .hero-panel, .single-service, .why-item, .single-stat, .single-testimonial, .question-details, .question-img',
    );

    animatedElements.forEach((element) => {
        element.classList.add('hidden-element');
        observer.observe(element);
    });
});
