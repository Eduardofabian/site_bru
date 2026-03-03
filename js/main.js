document.addEventListener('DOMContentLoaded', () => {
    const navRoot = document.getElementById('nav-root');
    const openChat = document.getElementById('open-chat');
    const closeChat = document.getElementById('close-chat');
    const chatWidget = document.getElementById('chat-ui');

    // 1. NAVBAR DUAL STATE (INDICIUM STYLE)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navRoot.classList.add('scrolled');
        } else {
            navRoot.classList.remove('scrolled');
        }
    }, { passive: true });

    // 2. CHATBOT TOGGLE
    openChat.addEventListener('click', () => {
        const isFlex = chatWidget.style.display === 'flex';
        chatWidget.style.display = isFlex ? 'none' : 'flex';
    });
    closeChat.addEventListener('click', () => {
        chatWidget.style.display = 'none';
    });

    // 3. CONTADORES (INTERSECTION OBSERVER)
    const counters = document.querySelectorAll('.counter');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                let count = 0;
                const update = () => {
                    const inc = target / 60;
                    if (count < target) {
                        count += inc;
                        entry.target.innerText = Math.ceil(count);
                        setTimeout(update, 15);
                    } else { entry.target.innerText = target; }
                };
                update();
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.8 });
    counters.forEach(c => obs.observe(c));
});
