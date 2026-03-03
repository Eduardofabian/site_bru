document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
    
    // 1. NAVBAR SCROLL
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 2. BOTÃO SOBRE / LOGO (VOLTAR AO TOPO)
    const scrollButtons = document.querySelectorAll('.scroll-top');
    scrollButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // 3. CHATBOT TOGGLE
    const openChat = document.getElementById('open-chat');
    const closeChat = document.getElementById('close-chat');
    const chatWidget = document.getElementById('chat-box');

    openChat.addEventListener('click', () => {
        chatWidget.style.display = chatWidget.style.display === 'flex' ? 'none' : 'flex';
    });
    closeChat.addEventListener('click', () => {
        chatWidget.style.display = 'none';
    });

    // 4. CONTADORES (INTERSECTION OBSERVER)
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
