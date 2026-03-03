document.addEventListener('DOMContentLoaded', () => {
    // Sticky Navbar
    const navbar = document.getElementById('navbar');
    const isHome = document.querySelector('.hero') !== null;

    if (!isHome) {
        navbar.classList.add('scrolled');
    }

    window.addEventListener('scroll', () => {
        if (isHome) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        } else {
            navbar.classList.add('scrolled');
        }
    });

    // Scroll Fade-in Animation
    const fadeElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // Statistics Counter Animation
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const countUp = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 50; // Adjust speed

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(countUp, 40);
            } else {
                counter.innerText = target;
            }
        });
    };

    const statsSection = document.getElementById('stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasCounted) {
                hasCounted = true;
                countUp();
            }
        }, { threshold: 0.5 });
        statsObserver.observe(statsSection);
    }

    // Before & After Slider
    const bnaSlider = document.querySelector('.bna-slider');
    const imgBefore = document.querySelector('.img-before');
    const sliderHandle = document.querySelector('.slider-handle');

    if (bnaSlider) {
        let isSliding = false;

        const slide = (e) => {
            if (!isSliding) return;
            const rect = bnaSlider.getBoundingClientRect();
            let x;
            if (e.type.includes('mouse')) {
                x = e.clientX - rect.left;
            } else {
                x = e.touches[0].clientX - rect.left;
            }

            let percentage = (x / rect.width) * 100;
            if (percentage < 0) percentage = 0;
            if (percentage > 100) percentage = 100;

            imgBefore.style.width = percentage + '%';
            sliderHandle.style.left = percentage + '%';
        };

        bnaSlider.addEventListener('mousedown', () => isSliding = true);
        bnaSlider.addEventListener('touchstart', () => isSliding = true);

        window.addEventListener('mouseup', () => isSliding = false);
        window.addEventListener('touchend', () => isSliding = false);

        window.addEventListener('mousemove', slide);
        window.addEventListener('touchmove', slide);
    }
});
