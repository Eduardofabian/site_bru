document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
    const counters = document.querySelectorAll('.counter');
    let ticking = false;

    // 1. NAVBAR SCROLL LOGIC
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 20) {
                    nav.classList.add('state-compact');
                } else {
                    nav.classList.remove('state-compact');
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // 2. COUNTERS ANIMATION (USANDO INTERSECTION OBSERVER)
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    function startCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000;
            let start = 0;
            const increment = target / (duration / 16);

            const update = () => {
                start += increment;
                if (start < target) {
                    counter.innerText = Math.ceil(start);
                    requestAnimationFrame(update);
                } else {
                    counter.innerText = target;
                }
            };
            update();
        });
    }

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) statsObserver.observe(statsSection);

    // 3. CONSOLE BRANDING (ELEGANCE)
    console.log('%c🏢 BRUEMI GESTÃO', 'color: #C8962E; font-size: 20px; font-weight: bold;');
    console.log('%cPerformance: Optimized | Typography: Balanced', 'color: #8A97B0;');
});
