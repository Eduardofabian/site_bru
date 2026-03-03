document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
    
    // 1. SCROLL REVEAL NAVBAR (INDICIUM STYLE)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            nav.classList.add('is-scrolled');
        } else {
            nav.classList.remove('is-scrolled');
        }
    }, { passive: true });

    // 2. CONTADORES ANIMADOS
    const counters = document.querySelectorAll('.counter');
    const observerOptions = { threshold: 0.7 };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.getAttribute('data-target'));
                animateValue(target, 0, endValue, 1500);
                counterObserver.unobserve(target);
            }
        });
    }, observerOptions);

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    counters.forEach(c => counterObserver.observe(c));

    // 3. EFEITO DE REVELAÇÃO DE TEXTO NO SCROLL (BASIC)
    const revealText = document.querySelector('.reveal-text');
    window.addEventListener('scroll', () => {
        const rect = revealText.getBoundingClientRect();
        if(rect.top < window.innerHeight) {
            revealText.style.color = '#0E3180'; // Acende quando entra na tela
        }
    });
});
