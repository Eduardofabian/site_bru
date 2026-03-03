document.addEventListener('DOMContentLoaded', () => {
    const navRoot = document.getElementById('nav-root');
    const openChat = document.getElementById('open-chat');
    const closeChat = document.getElementById('close-chat');
    const chatWidget = document.getElementById('chat-box');

    // 1. NAVBAR DUAL-STATE (LÓGICA INDICIUM)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navRoot.classList.add('scrolled');
        } else {
            navRoot.classList.remove('scrolled');
        }
    }, { passive: true });

    // 2. BOTÃO SOBRE (SMOOTH SCROLL AO TOPO)
    const homeLinks = document.querySelectorAll('a[href="#home"]');
    homeLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // 3. CHATBOT TOGGLE
    openChat.addEventListener('click', () => {
        chatWidget.style.display = chatWidget.style.display === 'flex' ? 'none' : 'flex';
    });
    closeChat.addEventListener('click', () => {
        chatWidget.style.display = 'none';
    });

    // 4. CONTADORES (INTERSECTION OBSERVER)
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
