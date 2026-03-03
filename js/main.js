document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('nav-root');
    const openChat = document.getElementById('open-chat');
    const closeChat = document.getElementById('close-chat');
    const chatWidget = document.getElementById('chat-ui');

    // 1. NAVBAR DUAL-STATE (COMPACTAO AO SCROLL)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }, { passive: true });

    // 2. CHATBOT TOGGLE
    openChat.addEventListener('click', () => {
        chatWidget.style.display = chatWidget.style.display === 'flex' ? 'none' : 'flex';
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
                    const inc = target / 50;
                    if (count < target) {
                        count += inc;
                        entry.target.innerText = Math.ceil(count);
                        setTimeout(update, 20);
                    } else { entry.target.innerText = target; }
                };
                update();
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.8 });
    counters.forEach(c => obs.observe(c));
});
