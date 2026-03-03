document.addEventListener('DOMContentLoaded', () => {
    const navContainer = document.getElementById('nav-root');
    const openChat = document.getElementById('open-chat');
    const closeChat = document.getElementById('close-chat');
    const chatWidget = document.getElementById('chat-ui');

    // 1. NAVBAR DUAL-STATE (COMPACTA AO SCROLL)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navContainer.classList.add('scrolled');
        } else {
            navContainer.classList.remove('scrolled');
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
    const observer = new IntersectionObserver((entries) => {
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
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.8 });
    counters.forEach(c => observer.observe(c));
});
