/* ================================
   BRUEMI - MAIN JAVASCRIPT
   ================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ================================
    // VARIÁVEIS GLOBAIS
    // ================================
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');
    const currentYear = document.getElementById('currentYear');
    const contatoForm = document.getElementById('contatoForm');
    const formSuccess = document.getElementById('formSuccess');
    const submitBtn = document.getElementById('submitBtn');

    // ================================
    // ANO DINÂMICO NO FOOTER
    // ================================
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // ================================
    // NAVBAR SCROLL EFFECT
    // ================================
    let lastScroll = 0;
    let ticking = false;

    function handleNavbarScroll() {
        const scrollY = window.scrollY;

        // Adiciona sombra quando rolar
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Esconde/mostra navbar ao rolar (opcional)
        // if (scrollY > lastScroll && scrollY > 200) {
        //     navbar.style.transform = 'translateY(-100%)';
        // } else {
        //     navbar.style.transform = 'translateY(0)';
        // }

        lastScroll = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(handleNavbarScroll);
            ticking = true;
        }
    });

    // ================================
    // HAMBURGER MENU (MOBILE)
    // ================================
    
    // Cria overlay para mobile
    const navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);

    function openMenu() {
        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        navMenu.classList.add('open');
        navOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
        navOverlay.classList.remove('show');
        document.body.style.overflow = '';
    }

    function toggleMenu() {
        const isOpen = navMenu.classList.contains('open');
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    // Fecha ao clicar no overlay
    navOverlay.addEventListener('click', closeMenu);

    // Fecha ao clicar em link do menu
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Fecha com tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('open')) {
            closeMenu();
        }
    });

    // ================================
    // ACTIVE NAV LINK ON SCROLL
    // ================================
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                // Remove active de todos
                navLinks.forEach(link => link.classList.remove('active'));

                // Adiciona active no link correspondente
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // ================================
    // SMOOTH SCROLL (fallback)
    // ================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetEl.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ================================
    // BOTÃO VOLTAR AO TOPO
    // ================================
    function handleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleBackToTop);

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ================================
    // CONTADOR ANIMADO (HERO STATS)
    // ================================
    const counters = document.querySelectorAll('.counter');
    let countersStarted = false;

    function animateCounters() {
        if (countersStarted) return;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 segundos
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function (ease-out)
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(easeOut * target);

                counter.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            }

            requestAnimationFrame(updateCounter);
        });

        countersStarted = true;
    }

    // Observer para iniciar contadores quando visíveis
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    // ================================
    // FADE-IN ANIMATIONS ON SCROLL
    // ================================
    function setupScrollAnimations() {
        // Seleciona elementos para animar
        const animateElements = document.querySelectorAll(
            '.servico-card, .sobre-text, .sobre-image, ' +
            '.contato-info, .contato-form-wrapper, ' +
            '.section-header, .depoimentos-slider'
        );

        // Adiciona classe base
        animateElements.forEach(el => {
            el.classList.add('fade-in');
        });

        // Intersection Observer
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Delay escalonado para cards
                    const delay = entry.target.getAttribute('data-aos-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, parseInt(delay));

                    fadeObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        animateElements.forEach(el => fadeObserver.observe(el));
    }

    setupScrollAnimations();

    // ================================
    // SLIDER DE DEPOIMENTOS
    // ================================
    const depCards = document.querySelectorAll('.depoimento-card');
    const depDots = document.querySelectorAll('.dep-dot');
    const depPrev = document.querySelector('.dep-prev');
    const depNext = document.querySelector('.dep-next');
    let currentSlide = 0;
    let slideInterval = null;
    const totalSlides = depCards.length;

    function goToSlide(index) {
        // Normaliza o index
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;

        // Remove active de todos
        depCards.forEach(card => {
            card.classList.remove('active');
            card.style.transform = 'translateX(60px)';
            card.style.opacity = '0';
        });

        depDots.forEach(dot => dot.classList.remove('active'));

        // Ativa o slide atual
        depCards[index].classList.add('active');
        depCards[index].style.transform = 'translateX(0)';
        depCards[index].style.opacity = '1';

        if (depDots[index]) {
            depDots[index].classList.add('active');
        }

        currentSlide = index;
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Auto-play
    function startAutoPlay() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
    }

    // Event Listeners do Slider
    if (depNext) {
        depNext.addEventListener('click', () => {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });
    }

    if (depPrev) {
        depPrev.addEventListener('click', () => {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });
    }

    depDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-slide'));
            stopAutoPlay();
            goToSlide(slideIndex);
            startAutoPlay();
        });
    });

    // Swipe support para mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const sliderEl = document.querySelector('.depoimentos-slider');

    if (sliderEl) {
        sliderEl.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        sliderEl.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const diff = touchStartX - touchEndX;
        const threshold = 50;

        if (Math.abs(diff) > threshold) {
            stopAutoPlay();
            if (diff > 0) {
                nextSlide(); // Swipe left = próximo
            } else {
                prevSlide(); // Swipe right = anterior
            }
            startAutoPlay();
        }
    }

    // Inicia auto-play do slider
    if (totalSlides > 0) {
        goToSlide(0);
        startAutoPlay();
    }

    // Pausa auto-play quando não visível
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    });

    // ================================
    // FORMULÁRIO DE CONTATO
    // ================================
    if (contatoForm) {
        // Máscara de telefone simples
        const telefoneInput = document.getElementById('telefone');
        if (telefoneInput) {
            telefoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');

                if (value.length <= 2) {
                    value = `(${value}`;
                } else if (value.length <= 7) {
                    value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                } else if (value.length <= 11) {
                    value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
                } else {
                    value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
                }

                e.target.value = value;
            });
        }

        // Submit do formulário
        contatoForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Checa honeypot
            const honeypot = contatoForm.querySelector('.honeypot');
            if (honeypot && honeypot.value !== '') {
                return; // É bot
            }

            // Validação básica
            const nome = document.getElementById('nome').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const email = document.getElementById('email').value.trim();

            if (!nome || !telefone || !email) {
                showFormError('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            if (!isValidEmail(email)) {
                showFormError('Por favor, insira um email válido.');
                return;
            }

            // Simula envio (loading)
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

            // Simula delay de envio (substituir por fetch real)
            setTimeout(() => {
                // Esconde o formulário e mostra sucesso
                const formFields = contatoForm.querySelectorAll('.form-group, .form-row, .btn-full, .form-note');
                formFields.forEach(field => {
                    field.style.display = 'none';
                });

                formSuccess.classList.add('show');

                // Reset após 5 segundos
                setTimeout(() => {
                    formFields.forEach(field => {
                        field.style.display = '';
                    });
                    formSuccess.classList.remove('show');
                    contatoForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
                }, 5000);

            }, 1500);
        });
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showFormError(message) {
        // Remove erro anterior se existir
        const existingError = contatoForm.querySelector('.form-error');
        if (existingError) existingError.remove();

        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.style.cssText = `
            background: rgba(231, 76, 60, 0.1);
            border: 1px solid rgba(231, 76, 60, 0.3);
            color: #e74c3c;
            padding: 0.75rem 1rem;
            border-radius: 6px;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
            animation: fadeInUp 0.3s ease;
        `;
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;

        submitBtn.parentNode.insertBefore(errorDiv, submitBtn);

        // Remove erro após 4 segundos
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.style.opacity = '0';
                errorDiv.style.transform = 'translateY(-10px)';
                errorDiv.style.transition = 'all 0.3s ease';
                setTimeout(() => errorDiv.remove(), 300);
            }
        }, 4000);
    }

    // ================================
    // PARALLAX SUTIL NO HERO (desktop)
    // ================================
    const hero = document.querySelector('.hero');

    if (hero && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                hero.style.backgroundPositionY = `${scrolled * 0.4}px`;
            }
        });
    }

    // ================================
    // CLIENTES CAROUSEL — PAUSE ON HOVER
    // ================================
    const clientesTrack = document.querySelector('.clientes-track');
    if (clientesTrack) {
        clientesTrack.addEventListener('mouseenter', () => {
            clientesTrack.style.animationPlayState = 'paused';
        });
        clientesTrack.addEventListener('mouseleave', () => {
            clientesTrack.style.animationPlayState = 'running';
        });
    }

    // ================================
    // RESIZE HANDLER
    // ================================
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Fecha menu mobile se a tela ficar grande
            if (window.innerWidth > 768) {
                closeMenu();
            }
        }, 250);
    });

    // ================================
    // CONSOLE LOG BRANDING
    // ================================
    console.log(
        '%c🏢 Bruemi Gestão Empresarial',
        'color: #C8962E; font-size: 18px; font-weight: bold;'
    );
    console.log(
        '%cInteligência Estratégica Orientada por Dados',
        'color: #1B2A4A; font-size: 12px;'
    );

});
