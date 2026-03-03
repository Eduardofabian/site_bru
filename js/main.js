document.addEventListener('DOMContentLoaded', () => {
    const navWrapper = document.getElementById('main-nav');
    
    // 1. LÓGICA DA NAVBAR (COMPACTA AO SCROLL)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navWrapper.classList.add('scrolled');
        } else {
            navWrapper.classList.remove('scrolled');
        }
    }, { passive: true });

    // 2. CONTADORES ANIMADOS
    const counters = document.querySelectorAll('.counter');
    const options = { threshold: 0.5 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = +target.getAttribute('data-target');
                let count = 0;
                const speed = countTo / 100;

                const updateCount = () => {
                    count += speed;
                    if (count < countTo) {
                        target.innerText = Math.ceil(count);
                        setTimeout(updateCount, 20);
                    } else {
                        target.innerText = countTo;
                    }
                };
                updateCount();
                observer.unobserve(target);
            }
        });
    }, options);

    counters.forEach(counter => observer.observe(counter));
});
