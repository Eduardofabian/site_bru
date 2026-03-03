/* ==========================================
   BRUEMI — CORE ENGINE (Senior JS)
   Funcionalidades: Performance & Interatividade
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. SELETORES GLOBAIS ---
    const nav = document.getElementById('navbar');
    const burger = document.getElementById('navBurger');
    const navLinks = document.getElementById('navLinks');
    const btt = document.getElementById('btt');
    const chatBtn = document.getElementById('chatBtn');
    const chatWin = document.getElementById('chatWin');
    const chatX = document.getElementById('chatX');
    const yearSpan = document.getElementById('year');

    // Ano atual no footer
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // --- 2. PERFORMANCE SCROLL (NAVBAR & BACK-TO-TOP) ---
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        // Navbar scrolled state
        if (currentScroll > 40) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Back to top visibility
        if (currentScroll > 600) {
            btt.classList.add('show');
        } else {
            btt.classList.remove('show');
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // --- 3. MOBILE MENU LOGIC ---
    if (burger) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('open');
            navLinks.classList.toggle('open');
            // Timeout para animação de slide
            setTimeout(() => navLinks.classList.toggle('showing'), 10);
        });
    }

    // Fechar ao clicar em links mobile
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('open');
            navLinks.classList.remove('open', 'showing');
        });
    });

    // --- 4. REVEAL ANIMATIONS (INTERSECTION OBSERVER) ---
    const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
        revealObserver.observe(el);
    });

    // --- 5. STATS COUNTER ---
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.getAttribute('data-target'));
                animateCount(target, endValue);
                countObserver.unobserve(target);
            }
        });
    }, { threshold: 1 });

    function animateCount(el, end) {
        let start = 0;
        const duration = 2000;
        const stepTime = Math.abs(Math.floor(duration / end));
        const timer = setInterval(() => {
            start += 1;
            el.textContent = start;
            if (start == end) clearInterval(timer);
        }, stepTime);
    }

    document.querySelectorAll('.counter').forEach(count => countObserver.observe(count));

    // --- 6. DEPOIMENTOS SLIDER ---
    const slides = document.querySelectorAll('.depoi-card');
    const dots = document.querySelectorAll('.ddot');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    document.querySelector('.depoi-next')?.addEventListener('click', () => {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    });

    document.querySelector('.depoi-prev')?.addEventListener('click', () => {
        let prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => showSlide(i));
    });

    // --- 7. CHATBOT WIDGET ---
    if (chatBtn) {
        chatBtn.addEventListener('click', () => {
            document.getElementById('chatWidget').classList.toggle('open');
            document.querySelector('.chat-badge').style.display = 'none';
        });
    }

    if (chatX) {
        chatX.addEventListener('click', () => {
            document.getElementById('chatWidget').classList.remove('open');
        });
    }

    // --- 8. HERO CANVAS (Neural Particles) ---
    const canvas = document.getElementById('heroCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 60;

        window.addEventListener('resize', resizeCanvas);
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = 1.5;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(168, 207, 255, 0.4)';
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) particles.push(new Particle());

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p, i) => {
                p.update();
                p.draw();
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = p.x - particles[j].x;
                    const dy = p.y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(168, 207, 255, ${0.15 - dist / 1000})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            });
            requestAnimationFrame(animate);
        }
        animate();
    }

    // Console Branding
    console.log('%c🏢 BRUEMI GESTÃO SÊNIOR', 'color: #17479E; font-size: 20px; font-weight: bold;');
});
