document.addEventListener('DOMContentLoaded', () => {
    const navRoot = document.getElementById('nav-root');
    const openChat = document.getElementById('open-chat');
    const closeChat = document.getElementById('close-chat');
    const chatBox = document.getElementById('chat-box');

    // 1. NAVBAR SCROLL
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navRoot.classList.add('scrolled');
        } else {
            navRoot.classList.remove('scrolled');
        }
    });

    // 2. CHATBOT TOGGLE
    openChat.addEventListener('click', () => {
        chatBox.style.display = chatBox.style.display === 'flex' ? 'none' : 'flex';
    });
    closeChat.addEventListener('click', () => chatBox.style.display = 'none');

    // 3. COUNTERS
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries) => {
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
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.8 });
    counters.forEach(c => observer.observe(c));
});
